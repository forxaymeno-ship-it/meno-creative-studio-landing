<script lang="ts">
	import { getContent } from '$lib/content';
	import { localePath, stripLocale, type Locale } from '$lib/i18n';
	import { page } from '$app/state';

	import Seo from './Seo.svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import QuoteDialog from './QuoteDialog.svelte';

	let { locale, kind }: { locale: Locale; kind: 'privacy' | 'terms' } = $props();

	const content = $derived(getContent(locale));
	const doc = $derived(content.legal[kind]);
	const path = $derived(stripLocale(page.url.pathname));
</script>

<Seo
	{content}
	{locale}
	{path}
	title={`${doc.title} — ${content.meta.title}`}
	description={content.meta.description}
/>

<a class="skip-link" href="#main">{content.nav.skipToContent}</a>
<Header {content} {locale} {path} />

<main id="main" class="legal">
	<div class="shell legal__inner">
		<p class="eyebrow">{doc.updated}</p>
		<h1 class="display legal__title">{doc.title}</h1>

		<div class="legal__body">
			{#each doc.sections as section (section.h)}
				<section class="legal__section">
					<h2 class="legal__h">{section.h}</h2>
					<p class="legal__p">{section.p}</p>
				</section>
			{/each}
		</div>

		<a class="btn btn--ghost" href={localePath(locale)}>{content.legal.back}</a>
	</div>
</main>

<Footer {content} {locale} {path} />
<QuoteDialog {content} {locale} />

<style>
	.legal {
		padding-block: calc(var(--header-h) + clamp(3rem, 8vw, 6rem)) var(--section-y);
	}

	.legal__inner {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		align-items: flex-start;
		max-inline-size: 78ch;
	}

	.legal__title {
		margin-block-end: 1rem;
	}

	.legal__body {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-block-end: 1.5rem;
		border-block-start: 1px solid var(--line);
		padding-block-start: 2rem;
	}

	.legal__h {
		font-size: var(--fs-h4);
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		margin-block-end: 0.6rem;
	}

	.legal__p {
		color: var(--paper-50);
		font-size: var(--fs-body);
		line-height: 1.7;
	}
</style>
