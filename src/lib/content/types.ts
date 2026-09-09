import type { WorkCategory } from '$lib/data/work';

export interface NavLink {
	label: string;
	href: string;
}

export interface NumberedItem {
	index: string;
	title: string;
	body: string;
}

export interface SiteContent {
	meta: {
		title: string;
		description: string;
		ogAlt: string;
	};
	nav: {
		links: NavLink[];
		cta: string;
		openMenu: string;
		closeMenu: string;
		language: string;
		skipToContent: string;
	};
	hero: {
		eyebrow: string;
		headline: string[];
		kicker: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
		specialities: string[];
		scroll: string;
		reelLabel: string;
	};
	work: {
		eyebrow: string;
		title: string[];
		lead: string;
		filterAll: string;
		filterLabel: string;
		/** Mobile-only affordance under the reel tray */
		swipe: string;
		categories: Record<WorkCategory, string>;
		note: string;
		cta: string;
	};
	brands: {
		title: string;
		note: string;
	};
	services: {
		eyebrow: string;
		title: string[];
		lead: string;
		items: Array<NumberedItem & { tags: string[] }>;
	};
	value: {
		eyebrow: string;
		title: string[];
		lead: string;
		oldLabel: string;
		oldItems: string[];
		newLabel: string;
		newItems: string[];
		unlocks: Array<{ title: string; body: string }>;
		footnote: string;
	};
	craft: {
		eyebrow: string;
		title: string[];
		lead: string;
		layers: Array<{ index: string; label: string; detail: string }>;
		note: string;
		trackLabel: string;
	};
	process: {
		eyebrow: string;
		title: string[];
		steps: NumberedItem[];
	};
	ecom: {
		eyebrow: string;
		title: string[];
		lead: string;
		productLabel: string;
		formats: Array<{ name: string; note: string }>;
		footnote: string;
		cta: string;
	};
	engagement: {
		eyebrow: string;
		title: string[];
		lead: string;
		featuredBadge: string;
		tiers: Array<{
			id: string;
			name: string;
			tagline: string;
			body: string;
			points: string[];
			featured: boolean;
		}>;
		cta: string;
		note: string;
	};
	faq: {
		eyebrow: string;
		title: string[];
		items: Array<{ q: string; a: string }>;
	};
	finalCta: {
		title: string[];
		lead: string;
		cta: string;
		note: string;
	};
	footer: {
		tagline: string;
		blurb: string;
		navLabel: string;
		links: NavLink[];
		contactLabel: string;
		social: string;
		email: string;
		legalLabel: string;
		privacy: string;
		terms: string;
		rights: string;
		backToTop: string;
	};
	quote: {
		open: string;
		close: string;
		title: string;
		subtitle: string;
		stepLabel: string;
		of: string;
		next: string;
		back: string;
		submit: string;
		submitting: string;
		required: string;
		invalidEmail: string;
		selectOne: string;
		steps: {
			brand: { title: string; hint: string };
			needs: { title: string; hint: string };
			volume: { title: string; hint: string };
			budget: { title: string; hint: string };
			project: { title: string; hint: string };
		};
		fields: {
			name: string;
			namePlaceholder: string;
			email: string;
			emailPlaceholder: string;
			company: string;
			companyPlaceholder: string;
			url: string;
			urlPlaceholder: string;
			brief: string;
			briefPlaceholder: string;
			deadline: string;
			deadlineOptional: string;
		};
		success: {
			title: string;
			body: string;
			action: string;
		};
		error: {
			title: string;
			body: string;
			tooMany: string;
			retry: string;
		};
	};
	legal: {
		back: string;
		privacy: { title: string; updated: string; sections: Array<{ h: string; p: string }> };
		terms: { title: string; updated: string; sections: Array<{ h: string; p: string }> };
	};
	notFound: {
		title: string;
		body: string;
		cta: string;
	};
}
