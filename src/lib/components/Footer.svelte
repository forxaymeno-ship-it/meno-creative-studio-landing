<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { SITE } from '$lib/data/site';
	import { localePath, type Locale } from '$lib/i18n';
	import Wordmark from './Wordmark.svelte';
	import LocaleSwitch from './LocaleSwitch.svelte';

	let {
		content,
		locale,
		path = '/'
	}: { content: SiteContent; locale: Locale; path?: string } = $props();

	const copy = $derived(content.footer);
	const home = $derived(localePath(locale));
	const anchor = (hash: string) => `${home}${hash}`;
	const year = new Date().getFullYear();
	const range = year > SITE.foundedYear ? `${SITE.foundedYear}–${year}` : `${SITE.foundedYear}`;
</script>

<footer class="foot">
	<div class="shell foot__inner">
		<div class="foot__brand">
			<Wordmark href={home} size="clamp(2.5rem, 9vw, 5rem)" />
			<p class="foot__tagline">{copy.tagline}</p>
			<p class="foot__blurb">{copy.blurb}</p>
		</div>

		<div class="foot__cols">
			<nav class="foot__col" aria-label={copy.navLabel}>
				<p class="foot__label">{copy.navLabel}</p>
				{#each copy.links as link (link.href)}
					<a class="foot__link" href={anchor(link.href)}>{link.label}</a>
				{/each}
			</nav>

			<div class="foot__col">
				<p class="foot__label">{copy.contactLabel}</p>
				<a
					class="foot__link"
					href={SITE.instagram.url}
					target="_blank"
					rel="noopener noreferrer">{copy.social}</a
				>
				<a class="foot__link" href="mailto:{SITE.email}">{SITE.email}</a>
			</div>

			<div class="foot__col">
				<p class="foot__label">{copy.legalLabel}</p>
				<a class="foot__link" href={localePath(locale, '/privacy')}>{copy.privacy}</a>
				<a class="foot__link" href={localePath(locale, '/terms')}>{copy.terms}</a>
			</div>
		</div>
	</div>

	<div class="shell foot__bar">
		<p class="foot__copy">© {range} {SITE.name}. {copy.rights}</p>
		<div class="foot__end">
			<LocaleSwitch {locale} {path} label={content.nav.language} />
			<a class="foot__top" href="#top">{copy.backToTop} ↑</a>
		</div>
	</div>
</footer>

<style>
	.foot {
		border-block-start: 1px solid var(--line);
		background: var(--ink-000);
		padding-block-start: clamp(3rem, 7vw, 5.5rem);
		padding-block-end: calc(1.5rem + env(safe-area-inset-bottom));
	}

	.foot__inner {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
		padding-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.foot__brand {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.foot__tagline {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--accent);
	}

	.foot__blurb {
		color: var(--paper-35);
		font-size: var(--fs-small);
		max-inline-size: 34ch;
		margin-block-start: 0.75rem;
	}

	.foot__cols {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem 1.5rem;
	}

	.foot__col {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.65rem;
	}

	.foot__label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-18);
		margin-block-end: 0.35rem;
	}

	.foot__link {
		font-size: var(--fs-small);
		color: var(--paper-50);
		transition: color var(--dur) var(--ease);
	}

	.foot__link:hover {
		color: var(--accent);
	}

	.foot__bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block-start: 1.5rem;
		border-block-start: 1px solid var(--line);
	}

	.foot__copy,
	.foot__top {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
	}

	.foot__top:hover {
		color: var(--accent);
	}

	.foot__end {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	@media (min-width: 860px) {
		.foot__inner {
			grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
			align-items: start;
		}

		.foot__cols {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
