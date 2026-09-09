<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { HERO_REELS } from '$lib/data/work';
	import { quote } from '$lib/state/quote.svelte';
	import MediaFrame from './MediaFrame.svelte';

	let { content, workHref }: { content: SiteContent; workHref: string } = $props();

	const hero = $derived(content.hero);
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="hero__grid shell">
		<div class="hero__type">
			<p class="eyebrow hero__eyebrow">{hero.eyebrow}</p>

			<h1 id="hero-title" class="display display--mega hero__headline">
				{#each hero.headline as line, i (line)}
					<span class="hero__line" style="--d:{i * 90}ms">{line}</span>
				{/each}
			</h1>

			<p class="hero__kicker">{hero.kicker}</p>

			<p class="lead hero__lead">{hero.lead}</p>

			<div class="hero__actions">
				<button
					type="button"
					class="btn btn--primary btn--lg"
					onclick={() => quote.show('hero')}
				>
					{hero.ctaPrimary}
					<span class="arrow" aria-hidden="true">→</span>
				</button>
				<a class="btn btn--ghost btn--lg" href={workHref}>{hero.ctaSecondary}</a>
			</div>
		</div>

		<div class="hero__media" aria-hidden="true">
			<div class="hero__reel hero__reel--main">
				<MediaFrame
					src={HERO_REELS[0].video}
					poster={HERO_REELS[0].poster}
					label={hero.reelLabel}
					slotName="static/videos/hero/hero-01.mp4"
				/>
			</div>
			<div class="hero__reel hero__reel--sub">
				<MediaFrame
					src={HERO_REELS[1].video}
					poster={HERO_REELS[1].poster}
					label={hero.reelLabel}
					slotName="static/videos/hero/hero-02.mp4"
				/>
			</div>
		</div>
	</div>

	<div class="hero__bar">
		<div class="marquee" aria-hidden="true">
			<div class="marquee__track">
				{#each [0, 1] as pass (pass)}
					<ul class="marquee__set">
						{#each hero.specialities as item (item)}
							<li class="marquee__item">
								<span class="marquee__star">✦</span>
								{item}
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
		<ul class="sr-only">
			{#each hero.specialities as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
		<span class="hero__scroll">{hero.scroll}</span>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-block-size: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-block-start: calc(var(--header-h) + 1rem);
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		inset-block-start: -20%;
		inset-inline-start: -10%;
		inline-size: 70vmax;
		block-size: 70vmax;
		background: radial-gradient(circle, rgba(217, 164, 65, 0.07), transparent 62%);
		pointer-events: none;
	}

	.hero__grid {
		position: relative;
		flex: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3rem);
		align-content: center;
		padding-block: clamp(2rem, 5vh, 4rem);
	}

	.hero__eyebrow {
		margin-block-end: clamp(1.25rem, 3vw, 2rem);
	}

	.hero__headline {
		display: flex;
		flex-direction: column;
	}

	.hero__line {
		display: block;
		text-wrap: nowrap;
		animation: hero-rise 1.1s var(--ease) both;
		animation-delay: var(--d);
	}

	.hero__line:last-child {
		color: transparent;
		-webkit-text-stroke: 1.4px var(--paper);
	}

	@supports not (-webkit-text-stroke: 1px black) {
		.hero__line:last-child {
			color: var(--paper);
		}
	}

	:global([lang='ar']) .hero__line:last-child {
		color: var(--paper);
		-webkit-text-stroke: 0;
	}

	@keyframes hero-rise {
		from {
			opacity: 0;
			transform: translateY(0.32em);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.hero__kicker {
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 2.1vw, 1.75rem);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		color: var(--accent);
		margin-block-start: clamp(0.9rem, 2vw, 1.4rem);
		animation: hero-rise 1.1s var(--ease) both;
		animation-delay: 280ms;
	}

	.hero__lead {
		margin-block-start: clamp(1.1rem, 2.4vw, 1.6rem);
		max-inline-size: 46ch;
		animation: hero-rise 1.1s var(--ease) both;
		animation-delay: 360ms;
	}

	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-block-start: clamp(1.5rem, 2.8vw, 2.1rem);
		animation: hero-rise 1.1s var(--ease) both;
		animation-delay: 440ms;
	}

	/* Mobile / tablet: the two reels sit as an editorial pair under the CTAs. */
	.hero__media {
		position: relative;
		display: flex;
		align-items: flex-end;
		gap: 0.7rem;
		margin-block-start: clamp(1.5rem, 4vw, 2.5rem);
	}

	.hero__reel--main {
		inline-size: 38%;
		max-inline-size: 190px;
		animation: hero-mask 1.2s var(--ease) both;
		animation-delay: 200ms;
	}

	.hero__reel--sub {
		inline-size: 28%;
		max-inline-size: 140px;
		border-radius: var(--r-sm);
		animation: hero-mask 1.2s var(--ease) both;
		animation-delay: 420ms;
	}

	@keyframes hero-mask {
		from {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		to {
			opacity: 1;
			clip-path: inset(0 0 0 0);
		}
	}

	.hero__bar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		border-block-start: 1px solid var(--line);
		padding-inline: var(--gutter);
		block-size: 56px;
		max-inline-size: var(--maxw);
		margin-inline: auto;
		inline-size: 100%;
	}

	.marquee {
		flex: 1;
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
	}

	.marquee__track {
		display: flex;
		inline-size: max-content;
		animation: marquee 26s linear infinite;
	}

	.marquee:hover .marquee__track {
		animation-play-state: paused;
	}

	:global([dir='rtl']) .marquee__track {
		animation-direction: reverse;
	}

	.marquee__set {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		padding-inline-end: 2.5rem;
	}

	.marquee__item {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-50);
		white-space: nowrap;
	}

	.marquee__star {
		color: var(--accent);
		font-size: 0.6rem;
	}

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}

	.hero__scroll {
		display: none;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
	}

	.hero__scroll::after {
		content: '↓';
		display: inline-block;
		margin-inline-start: 0.5rem;
		animation: nudge 2.4s var(--ease-inout) infinite;
	}

	@keyframes nudge {
		0%,
		60%,
		100% {
			transform: none;
		}
		30% {
			transform: translateY(4px);
		}
	}

	@media (min-width: 620px) and (max-width: 1023px) {
		.hero__media {
			justify-content: flex-end;
		}
	}

	@media (min-width: 760px) {
		.hero__scroll {
			display: block;
		}
	}

	@media (min-width: 1024px) {
		.hero__grid {
			grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.5fr);
			align-items: center;
			gap: clamp(2rem, 5vw, 5rem);
		}

		.hero__media {
			display: block;
			margin-block-start: 0;
		}

		.hero__reel--main {
			inline-size: 100%;
			max-inline-size: 312px;
			margin-inline-start: auto;
		}

		.hero__reel--sub {
			position: absolute;
			inset-block-end: -12%;
			inset-inline-start: 0;
			inline-size: 46%;
			max-inline-size: 172px;
			box-shadow: 0 0 0 10px var(--ink-050);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__line,
		.hero__kicker,
		.hero__lead,
		.hero__actions,
		.hero__reel--main,
		.hero__reel--sub {
			animation: none;
			opacity: 1;
			clip-path: none;
		}

		.marquee__track {
			animation: none;
		}
	}
</style>
