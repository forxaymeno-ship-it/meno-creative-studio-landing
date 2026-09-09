<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { SITE } from '$lib/data/site';
	import { LOCALES, LOCALE_HREFLANG, localePath, type Locale } from '$lib/i18n';

	let {
		content,
		locale,
		path = '/',
		title,
		description
	}: {
		content: SiteContent;
		locale: Locale;
		path?: string;
		title?: string;
		description?: string;
	} = $props();

	const pageTitle = $derived(title ?? content.meta.title);
	const pageDescription = $derived(description ?? content.meta.description);
	const canonical = $derived(`${SITE.url}${localePath(locale, path)}`);
	const ogImage = $derived(`${SITE.url}${SITE.ogImage}`);

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: SITE.name,
			url: SITE.url,
			description: content.meta.description,
			email: SITE.email,
			sameAs: [SITE.instagram.url]
		})
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />

	{#each LOCALES as code (code)}
		<link
			rel="alternate"
			hreflang={LOCALE_HREFLANG[code]}
			href={`${SITE.url}${localePath(code, path)}`}
		/>
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${SITE.url}${localePath('en', path)}`} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={content.meta.ogAlt} />
	<meta property="og:locale" content={locale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />
	{#if SITE.twitterHandle}
		<meta name="twitter:site" content={SITE.twitterHandle} />
	{/if}

	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>
