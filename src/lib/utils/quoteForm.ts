import { deserialize } from '$app/forms';

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export type QuoteFailure =
	| { kind: 'invalid'; errors: Record<string, string> }
	| { kind: 'rateLimited' }
	| { kind: 'server' };

export type QuoteResponse = { ok: true } | ({ ok: false } & QuoteFailure);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: string): boolean => EMAIL_RE.test(value.trim());

/**
 * Progressive enhancement for the quote form action at /quote. Posts the form
 * without navigating, so the visitor stays inside the dialog. Without JS the
 * same form posts normally and lands on the /quote result page.
 */
export const submitQuoteForm = async (form: HTMLFormElement): Promise<QuoteResponse> => {
	const response = await fetch(form.action, {
		method: 'POST',
		body: new FormData(form),
		headers: { 'x-sveltekit-action': 'true' }
	});

	const result = deserialize(await response.text());

	if (result.type === 'success') return { ok: true };

	if (result.type === 'failure') {
		const data = (result.data ?? {}) as { errors?: Record<string, string>; rateLimited?: boolean };
		if (data.rateLimited) return { ok: false, kind: 'rateLimited' };
		if (data.errors) return { ok: false, kind: 'invalid', errors: data.errors };
		return { ok: false, kind: 'server' };
	}

	/* An uncaught server error stays inside the dialog rather than navigating away. */
	return { ok: false, kind: 'server' };
};
