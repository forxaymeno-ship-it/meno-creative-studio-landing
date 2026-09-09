import type { Locale } from '$lib/i18n';
import type { SiteContent } from './types';
import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';

export const CONTENT: Record<Locale, SiteContent> = { en, fr, ar };

export const getContent = (locale: Locale): SiteContent => CONTENT[locale];

export type { SiteContent };
