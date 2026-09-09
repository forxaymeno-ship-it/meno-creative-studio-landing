export const LOCALES = ['en', 'fr', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
	en: 'ltr',
	fr: 'ltr',
	ar: 'rtl'
};

export const LOCALE_LABEL: Record<Locale, string> = {
	en: 'EN',
	fr: 'FR',
	ar: 'AR'
};

export const LOCALE_NAME: Record<Locale, string> = {
	en: 'English',
	fr: 'Français',
	ar: 'العربية'
};

/** hreflang values emitted in <link rel="alternate"> */
export const LOCALE_HREFLANG: Record<Locale, string> = {
	en: 'en',
	fr: 'fr',
	ar: 'ar'
};

export type Localized<T> = Record<Locale, T>;
export type LocalizedText = Localized<string>;

const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** '/fr/privacy' -> 'fr' */
export const localeFromPathname = (pathname: string): Locale => {
	const segment = pathname.split('/').filter(Boolean)[0];
	return segment && isLocale(segment) ? segment : DEFAULT_LOCALE;
};

/**
 * Build a path for a locale. The default locale lives at the root.
 * localePath('fr', '/privacy') -> '/fr/privacy'
 * localePath('en', '/privacy') -> '/privacy'
 */
export const localePath = (locale: Locale, path = '/'): string => {
	const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
	const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return `${prefix}${clean}` || '/';
};

/** Strip the locale prefix from a pathname: '/fr/privacy' -> '/privacy' */
export const stripLocale = (pathname: string): string => {
	const segments = pathname.split('/').filter(Boolean);
	if (segments[0] && isLocale(segments[0])) segments.shift();
	return `/${segments.join('/')}`.replace(/\/$/, '') || '/';
};
