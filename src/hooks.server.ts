import type { Handle } from '@sveltejs/kit';
import { LOCALE_DIR, localeFromPathname } from '$lib/i18n';

/**
 * Runs at prerender time only (this is a fully static site).
 * Stamps the correct lang/dir onto <html> for every generated page.
 */
export const handle: Handle = ({ event, resolve }) => {
	const locale = localeFromPathname(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%meno.lang%', locale).replace('%meno.dir%', LOCALE_DIR[locale])
	});
};
