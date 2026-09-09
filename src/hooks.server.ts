import type { Handle } from '@sveltejs/kit';
import { LOCALE_DIR, localeFromPathname } from '$lib/i18n';

/**
 * Stamps the correct lang/dir onto <html>. Runs at prerender time for every
 * generated page, and at request time for the dynamic /quote route.
 */
export const handle: Handle = ({ event, resolve }) => {
	const locale = localeFromPathname(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%meno.lang%', locale).replace('%meno.dir%', LOCALE_DIR[locale])
	});
};
