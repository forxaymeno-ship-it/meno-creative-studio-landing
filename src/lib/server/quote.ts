import type { RequestEvent } from '@sveltejs/kit';
import { LOCALES, type Locale, DEFAULT_LOCALE } from '$lib/i18n';
import { QUOTE_BUDGETS, QUOTE_NEEDS, QUOTE_VOLUMES, type QuoteOption } from '$lib/data/quote';
import type { Db } from 'mongodb';
import { quotes, withDb, type QuoteDocument } from './mongo';

export type QuoteFieldError = 'required' | 'invalidEmail' | 'selectOne' | 'tooLong';

export type QuoteResult =
	| { ok: true }
	| { ok: false; reason: 'invalid'; errors: Record<string, QuoteFieldError> }
	| { ok: false; reason: 'rateLimited' }
	| { ok: false; reason: 'server' };

const LIMITS = {
	name: 120,
	email: 200,
	company: 160,
	url: 300,
	brief: 4000,
	deadline: 160,
	source: 60
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side rate limit fallback: submissions allowed per IP per window. */
const FALLBACK_WINDOW_MS = 60_000;
const FALLBACK_MAX = 5;

const text = (data: FormData, key: string, max: number): string =>
	String(data.get(key) ?? '')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, max);

/**
 * The browser submits English labels, but nothing stops a scripted POST sending
 * anything at all. Values are matched back to the configured options so the
 * collection only ever holds known labels.
 */
const matchOption = (options: QuoteOption[], value: string): string => {
	const found = options.find(
		(option) => option.id === value || Object.values(option.label).includes(value)
	);
	return found ? found.label.en : '';
};

const localeOf = (value: string): Locale =>
	(LOCALES as readonly string[]).includes(value) ? (value as Locale) : DEFAULT_LOCALE;

const allowed = async (event: RequestEvent, ip: string): Promise<boolean> => {
	const limiter = event.platform?.env?.QUOTE_LIMITER;
	if (limiter) {
		const { success } = await limiter.limit({ key: ip });
		return success;
	}
	return true;
};

/**
 * Second gate for when the Cloudflare binding is unavailable (local dev, or a
 * misconfigured deploy) — counts what this IP already sent inside the window.
 */
const withinFallbackLimit = async (db: Db, ip: string): Promise<boolean> => {
	const recent = await quotes(db).countDocuments(
		{ 'meta.ip': ip, createdAt: { $gte: new Date(Date.now() - FALLBACK_WINDOW_MS) } },
		{ limit: FALLBACK_MAX }
	);
	return recent < FALLBACK_MAX;
};

export const submitQuote = async (event: RequestEvent, data: FormData): Promise<QuoteResult> => {
	/* Honeypot: a real visitor never sees this field. Answer 200 so bots learn nothing. */
	if (String(data.get('bot-field') ?? '').trim()) return { ok: true };

	const errors: Record<string, QuoteFieldError> = {};

	const name = text(data, 'name', LIMITS.name);
	const email = text(data, 'email', LIMITS.email);
	const company = text(data, 'company', LIMITS.company);
	const url = text(data, 'url', LIMITS.url);
	const brief = String(data.get('brief') ?? '').trim().slice(0, LIMITS.brief);
	const deadline = text(data, 'deadline', LIMITS.deadline);

	const needs = [...new Set(data.getAll('needs').map((v) => matchOption(QUOTE_NEEDS, String(v))))]
		.filter(Boolean)
		.slice(0, QUOTE_NEEDS.length);
	const volume = matchOption(QUOTE_VOLUMES, String(data.get('volume') ?? ''));
	const budget = matchOption(QUOTE_BUDGETS, String(data.get('budget') ?? ''));

	if (!name) errors.name = 'required';
	if (!email) errors.email = 'required';
	else if (!EMAIL_RE.test(email)) errors.email = 'invalidEmail';
	if (!company) errors.company = 'required';
	if (!needs.length) errors.needs = 'selectOne';
	if (!volume) errors.volume = 'selectOne';
	if (!budget) errors.budget = 'selectOne';
	if (!brief) errors.brief = 'required';

	if (Object.keys(errors).length) return { ok: false, reason: 'invalid', errors };

	const ip = event.getClientAddress();
	const hasBinding = Boolean(event.platform?.env?.QUOTE_LIMITER);

	try {
		if (!(await allowed(event, ip))) return { ok: false, reason: 'rateLimited' };

		const document: QuoteDocument = {
			name,
			email: email.toLowerCase(),
			company,
			url,
			needs,
			volume,
			budget,
			brief,
			deadline,
			source: text(data, 'source', LIMITS.source) || 'site',
			locale: localeOf(String(data.get('locale') ?? '')),
			status: 'new',
			meta: {
				ip,
				userAgent: event.request.headers.get('user-agent') ?? '',
				referer: event.request.headers.get('referer') ?? '',
				country: event.request.headers.get('cf-ipcountry') ?? ''
			},
			createdAt: new Date()
		};

		return await withDb<QuoteResult>(async (db) => {
			if (!hasBinding && !(await withinFallbackLimit(db, ip))) {
				return { ok: false, reason: 'rateLimited' };
			}
			await quotes(db).insertOne(document);
			return { ok: true };
		});
	} catch (error) {
		console.error('[quote] submission failed', error);
		return { ok: false, reason: 'server' };
	}
};
