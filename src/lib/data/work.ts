import type { LocalizedText } from '$lib/i18n';

export type WorkCategory =
	| 'ai-product-film'
	| 'cinematic-reel'
	| 'ecommerce-ad'
	| 'ai-creator-ad'
	| 'brand-film'
	| 'product-visual';

/**
 * Editorial grid behaviour.
 *  feature  — 9:16, full column, sits flush with the row
 *  standard — 9:16, full column
 *  small    — 9:16, indented and dropped down the page
 *  portrait — 4:5
 *  wide     — 16:9, spans two columns
 */
export type WorkSize = 'feature' | 'standard' | 'small' | 'portrait' | 'wide';

export interface WorkItem {
	id: string;
	title: LocalizedText;
	category: WorkCategory;
	year: number;
	size: WorkSize;
	/** e.g. '/videos/work/work-01.mp4' — leave empty to render the placeholder tile */
	video: string;
	/** e.g. '/images/work/work-01.jpg' — poster frame, strongly recommended */
	poster: string;
}

export const WORK_RATIO: Record<WorkSize, string> = {
	feature: '9 / 16',
	standard: '9 / 16',
	small: '9 / 16',
	portrait: '4 / 5',
	wide: '16 / 9'
};

const slot = (n: string): LocalizedText => ({
	en: `Project ${n}`,
	fr: `Projet ${n}`,
	ar: `مشروع ${n}`
});

/**
 * PORTFOLIO
 * ---------------------------------------------------------------
 * Replace title / category / year and point video + poster at the real files.
 * Drop assets in  static/videos/work/  and  static/images/work/
 * An item with an empty `video` renders a designed placeholder tile,
 * so the layout never breaks while you are still filling this in.
 */
export const WORK_ITEMS: WorkItem[] = [
	{
		id: 'work-01',
		title: slot('01'),
		category: 'ai-product-film',
		year: 2026,
		size: 'feature',
		video: '/videos/work/work-01.mp4',
		poster: '/images/work/work-01.jpg'
	},
	{
		id: 'work-02',
		title: slot('02'),
		category: 'ecommerce-ad',
		year: 2026,
		size: 'standard',
		video: '/videos/work/work-02.mp4',
		poster: '/images/work/work-02.jpg'
	},
	{
		id: 'work-03',
		title: slot('03'),
		category: 'cinematic-reel',
		year: 2026,
		size: 'small',
		video: '/videos/work/work-03.mp4',
		poster: '/images/work/work-03.jpg'
	},
	{
		id: 'work-04',
		title: slot('04'),
		category: 'brand-film',
		year: 2026,
		size: 'wide',
		video: '/videos/work/work-04.mp4',
		poster: '/images/work/work-04.jpg'
	},
	{
		id: 'work-05',
		title: slot('05'),
		category: 'ai-creator-ad',
		year: 2026,
		size: 'standard',
		video: '/videos/work/work-05.mp4',
		poster: '/images/work/work-05.jpg'
	},
	{
		id: 'work-06',
		title: slot('06'),
		category: 'product-visual',
		year: 2026,
		size: 'portrait',
		video: '',
		poster: '/images/work/work-06.jpg'
	},
	{
		id: 'work-07',
		title: slot('07'),
		category: 'ecommerce-ad',
		year: 2026,
		size: 'small',
		video: '/videos/work/work-07.mp4',
		poster: '/images/work/work-07.jpg'
	},
	{
		id: 'work-08',
		title: slot('08'),
		category: 'cinematic-reel',
		year: 2026,
		size: 'feature',
		video: '/videos/work/work-08.mp4',
		poster: '/images/work/work-08.jpg'
	},
	{
		id: 'work-09',
		title: slot('09'),
		category: 'ai-product-film',
		year: 2026,
		size: 'standard',
		video: '/videos/work/work-09.mp4',
		poster: '/images/work/work-09.jpg'
	}
];

/** Videos used in the hero composition. Drop files in static/videos/hero/ */
export const HERO_REELS = [
	{ id: 'hero-01', video: '/videos/hero/hero-01.mp4', poster: '/images/work/hero-01.jpg' },
	{ id: 'hero-02', video: '/videos/hero/hero-02.mp4', poster: '/images/work/hero-02.jpg' },
	{ id: 'hero-03', video: '/videos/hero/hero-03.mp4', poster: '/images/work/hero-03.jpg' }
];

/**
 * Client marks for the brand strip.
 * DO NOT add a brand here until the partnership is real and you have permission.
 * Empty array => the strip renders neutral placeholder slots instead.
 */
export const CLIENT_LOGOS: Array<{ name: string; src: string }> = [];
