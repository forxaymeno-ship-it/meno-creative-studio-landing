<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { localePath, type Locale } from '$lib/i18n';
	import { quote } from '$lib/state/quote.svelte';
	import Wordmark from './Wordmark.svelte';
	import LocaleSwitch from './LocaleSwitch.svelte';

	let {
		content,
		locale,
		path = '/'
	}: { content: SiteContent; locale: Locale; path?: string } = $props();

	const home = $derived(localePath(locale));
	const anchor = (hash: string) => `${home}${hash}`;

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const onScroll = () => {
		scrolled = window.scrollY > 24;
	};

	const closeMenu = () => (menuOpen = false);

	$effect(() => {
		document.body.classList.toggle('no-scroll', menuOpen);
		return () => document.body.classList.remove('no-scroll');
	});
</script>

<svelte:window onscroll={onScroll} onkeydown={(e) => e.key === 'Escape' && closeMenu()} />

<header class="hdr" class:is-stuck={scrolled}>
	<div class="hdr__inner">
		<Wordmark href={home} size="1.05rem" />

		<nav class="hdr__nav" aria-label="Primary">
			{#each content.nav.links as link (link.href)}
				<a class="hdr__link" href={anchor(link.href)}>{link.label}</a>
			{/each}
		</nav>

		<div class="hdr__end">
			<div class="hdr__locale"><LocaleSwitch {locale} {path} label={content.nav.language} /></div>
			<button
				type="button"
				class="btn btn--primary hdr__cta"
				onclick={() => quote.show('header')}
			>
				{content.nav.cta}
			</button>
			<button
				type="button"
				class="hdr__burger"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span class="hdr__burger-bar" class:is-x={menuOpen}></span>
				<span class="hdr__burger-bar" class:is-x={menuOpen}></span>
			</button>
		</div>
	</div>
	<div class="hdr__progress" aria-hidden="true"><i></i></div>
</header>

<div id="mobile-menu" class="menu" class:is-open={menuOpen} inert={!menuOpen}>
	<nav class="menu__nav" aria-label="Mobile">
		{#each content.nav.links as link, i (link.href)}
			<a class="menu__link" href={anchor(link.href)} onclick={closeMenu} style="--i:{i}">
				<span class="menu__index">0{i + 1}</span>
				{link.label}
			</a>
		{/each}
	</nav>
	<div class="menu__foot">
		<button
			type="button"
			class="btn btn--primary btn--lg btn--block"
			onclick={() => {
				closeMenu();
				quote.show('mobile-menu');
			}}
		>
			{content.nav.cta}
		</button>
		<LocaleSwitch {locale} {path} label={content.nav.language} />
	</div>
</div>

<style>
	.hdr {
		position: fixed;
		inset-block-start: 0;
		inset-inline: 0;
		z-index: 60;
		block-size: var(--header-h);
		display: flex;
		align-items: center;
		transition:
			background-color var(--dur) var(--ease),
			border-color var(--dur) var(--ease),
			backdrop-filter var(--dur) var(--ease);
		border-block-end: 1px solid transparent;
	}

	.hdr.is-stuck {
		background: rgba(8, 8, 10, 0.72);
		backdrop-filter: blur(20px) saturate(140%);
		-webkit-backdrop-filter: blur(20px) saturate(140%);
		border-block-end-color: var(--line-soft);
	}

	.hdr__inner {
		inline-size: 100%;
		max-inline-size: var(--maxw);
		margin-inline: auto;
		padding-inline: var(--gutter);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.hdr__nav {
		display: none;
		align-items: center;
		gap: clamp(1.2rem, 2.4vw, 2.6rem);
	}

	.hdr__link {
		position: relative;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-50);
		transition: color var(--dur) var(--ease);
		padding-block: 0.5rem;
	}

	.hdr__link::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		inset-block-end: 0;
		block-size: 1px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: inline-start;
		transition: transform var(--dur) var(--ease);
	}

	.hdr__link:hover {
		color: var(--paper);
	}

	.hdr__link:hover::after {
		transform: scaleX(1);
	}

	.hdr__end {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 1.6vw, 1.5rem);
	}

	.hdr__locale {
		display: none;
	}

	.hdr__cta {
		display: none;
	}

	.hdr__burger {
		inline-size: 44px;
		block-size: 44px;
		display: grid;
		align-content: center;
		justify-items: end;
		gap: 6px;
		margin-inline-end: -10px;
	}

	.hdr__burger-bar {
		display: block;
		block-size: 1.5px;
		inline-size: 22px;
		background: var(--paper);
		transition: transform var(--dur) var(--ease);
	}

	.hdr__burger-bar.is-x:first-child {
		transform: translateY(3.75px) rotate(45deg);
	}

	.hdr__burger-bar.is-x:last-child {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	.hdr__progress {
		position: absolute;
		inset-block-end: -1px;
		inset-inline: 0;
		block-size: 1px;
		overflow: hidden;
		opacity: 0;
		transition: opacity var(--dur) var(--ease);
	}

	.hdr.is-stuck .hdr__progress {
		opacity: 1;
	}

	.hdr__progress i {
		display: block;
		block-size: 100%;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: 0 50%;
	}

	@supports (animation-timeline: scroll()) {
		.hdr__progress i {
			animation: meno-progress linear both;
			animation-timeline: scroll(root block);
		}
	}

	@keyframes meno-progress {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	/* ---- Mobile menu ---- */

	.menu {
		position: fixed;
		inset: 0;
		z-index: 55;
		background: var(--ink-000);
		padding: calc(var(--header-h) + 2.5rem) var(--gutter) calc(2rem + env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-8px);
		transition:
			opacity var(--dur) var(--ease),
			transform var(--dur) var(--ease),
			visibility var(--dur) var(--ease);
	}

	.menu.is-open {
		opacity: 1;
		visibility: visible;
		transform: none;
	}

	.menu__nav {
		display: flex;
		flex-direction: column;
	}

	.menu__link {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 10vw, 3rem);
		font-weight: 600;
		letter-spacing: var(--track-mega);
		text-transform: uppercase;
		line-height: 1.15;
		padding-block: 0.35rem;
		border-block-end: 1px solid var(--line-soft);
	}

	.menu__index {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: 0.1em;
		color: var(--accent);
	}

	.menu__foot {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.hdr__nav,
		.hdr__locale,
		.hdr__cta {
			display: flex;
		}

		.hdr__burger,
		.menu {
			display: none;
		}
	}
</style>
