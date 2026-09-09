/**
 * Studio configuration.
 * ---------------------------------------------------------------
 * TODO BEFORE LAUNCH — replace every value marked PLACEHOLDER.
 * Nothing else in the codebase hardcodes these.
 */
export const SITE = {
	name: 'MENO',
	wordmark: 'MENO',

	/**
	 * PLACEHOLDER — production domain, used for canonical + OG urls.
	 * If you change this, also update static/robots.txt and static/sitemap.xml.
	 */
	url: 'https://meno.studio',

	/** PLACEHOLDER — inbox that receives quote requests */
	email: 'hello@meno.studio',

	/** PLACEHOLDER — studio Instagram */
	instagram: {
		handle: '@meno.studio',
		url: 'https://instagram.com/meno.studio'
	},

	/** Used for the dynamic copyright range */
	foundedYear: 2026,

	/** Social share image. Replace the file at static/images/og/og-cover.png */
	ogImage: '/images/og/og-cover.png',

	/** Twitter/X card handle — leave empty to omit the tag */
	twitterHandle: ''
} as const;
