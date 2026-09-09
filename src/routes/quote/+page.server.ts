import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { localeFromPathname, type Locale } from '$lib/i18n';
import { submitQuote } from '$lib/server/quote';

export const prerender = false;

/** Nobody browses here — the route exists to receive the quote form. */
export const load: ServerLoad = () => redirect(307, '/');

const localeOf = (data: FormData): Locale =>
	localeFromPathname(`/${String(data.get('locale') ?? '')}`);

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const locale = localeOf(data);
		const result = await submitQuote(event, data);

		if (result.ok) return { success: true, locale, rateLimited: false, errors: null };

		if (result.reason === 'invalid') {
			return fail(400, { success: false, locale, rateLimited: false, errors: result.errors });
		}
		if (result.reason === 'rateLimited') {
			return fail(429, { success: false, locale, rateLimited: true, errors: null });
		}
		return fail(500, { success: false, locale, rateLimited: false, errors: null });
	}
};
