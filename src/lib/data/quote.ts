import type { LocalizedText } from '$lib/i18n';

/** The form's `name` attribute. */
export const QUOTE_FORM_NAME = 'quote';

export interface QuoteOption {
	id: string;
	label: LocalizedText;
}

/** STEP 2 — what the client needs. Multi-select. */
export const QUOTE_NEEDS: QuoteOption[] = [
	{ id: 'reels', label: { en: 'AI Reels', fr: 'Reels IA', ar: 'ريلز بالذكاء الاصطناعي' } },
	{ id: 'product-ads', label: { en: 'Product Ads', fr: 'Pubs produit', ar: 'إعلانات المنتجات' } },
	{
		id: 'brand-film',
		label: { en: 'Cinematic Brand Film', fr: 'Film de marque', ar: 'فيلم علامة سينمائي' }
	},
	{
		id: 'creator-ads',
		label: { en: 'AI Creator Ads', fr: 'Pubs créateur IA', ar: 'إعلانات بأسلوب صنّاع المحتوى' }
	},
	{
		id: 'product-visuals',
		label: { en: 'Product Visuals', fr: 'Visuels produit', ar: 'صور المنتجات' }
	},
	{
		id: 'monthly',
		label: { en: 'Monthly Content', fr: 'Contenu mensuel', ar: 'محتوى شهري' }
	},
	{ id: 'unsure', label: { en: 'Not Sure Yet', fr: 'Pas encore sûr', ar: 'لم أقرر بعد' } }
];

/** STEP 3 — volume. Single select. */
export const QUOTE_VOLUMES: QuoteOption[] = [
	{ id: '1', label: { en: '1 video', fr: '1 vidéo', ar: 'فيديو واحد' } },
	{ id: '2-4', label: { en: '2–4 videos', fr: '2–4 vidéos', ar: '٢–٤ فيديوهات' } },
	{ id: '5-8', label: { en: '5–8 videos', fr: '5–8 vidéos', ar: '٥–٨ فيديوهات' } },
	{ id: '8+', label: { en: '8+ videos', fr: '8+ vidéos', ar: 'أكثر من ٨ فيديوهات' } },
	{
		id: 'partnership',
		label: { en: 'Monthly partnership', fr: 'Partenariat mensuel', ar: 'شراكة شهرية' }
	}
];

/**
 * STEP 4 — budget bands.
 * ---------------------------------------------------------------
 * These are QUALIFICATION BANDS, not a price list. Edit freely —
 * currency and ranges are configured here and nowhere else.
 */
export const QUOTE_BUDGETS: QuoteOption[] = [
	{ id: 'lt-1k', label: { en: 'Under €1,000', fr: 'Moins de 1 000 €', ar: 'أقل من ١٠٠٠ يورو' } },
	{ id: '1k-3k', label: { en: '€1,000 – €3,000', fr: '1 000 € – 3 000 €', ar: '١٠٠٠ – ٣٠٠٠ يورو' } },
	{ id: '3k-7k', label: { en: '€3,000 – €7,000', fr: '3 000 € – 7 000 €', ar: '٣٠٠٠ – ٧٠٠٠ يورو' } },
	{ id: '7k-plus', label: { en: '€7,000+', fr: '7 000 € +', ar: 'أكثر من ٧٠٠٠ يورو' } },
	{
		id: 'undecided',
		label: { en: 'Not defined yet', fr: 'Pas encore défini', ar: 'غير محدد بعد' }
	}
];
