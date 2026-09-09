<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import type { Locale } from '$lib/i18n';
	import { WORK_ITEMS, type WorkCategory } from '$lib/data/work';
	import { quote } from '$lib/state/quote.svelte';
	import { reveal } from '$lib/utils/reveal';
	import WorkCard from './WorkCard.svelte';

	let { content, locale }: { content: SiteContent; locale: Locale } = $props();

	const copy = $derived(content.work);

	const used = Array.from(new Set(WORK_ITEMS.map((item) => item.category))) as WorkCategory[];

	let active = $state<WorkCategory | 'all'>('all');

	const items = $derived(
		active === 'all' ? WORK_ITEMS : WORK_ITEMS.filter((item) => item.category === active)
	);
</script>

<section id="work" class="section work" aria-labelledby="work-title">
	<div class="shell">
		<header class="work__head">
			<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
			<h2 id="work-title" class="display work__title" use:reveal={{ delay: 60 }}>
				{#each copy.title as line, i (line)}
					<span class:accent-text={i === 1}>{line}</span>
				{/each}
			</h2>
			<p class="lead work__lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		{#if used.length > 1}
			<div class="work__filters" role="group" aria-label={copy.filterLabel}>
				<button
					type="button"
					class="chip"
					class:is-active={active === 'all'}
					aria-pressed={active === 'all'}
					onclick={() => (active = 'all')}
				>
					{copy.filterAll}
				</button>
				{#each used as category (category)}
					<button
						type="button"
						class="chip"
						class:is-active={active === category}
						aria-pressed={active === category}
						onclick={() => (active = category)}
					>
						{copy.categories[category]}
					</button>
				{/each}
			</div>
		{/if}

		<div class="work__grid">
			{#each items as item, i (item.id)}
				<WorkCard {item} {locale} categoryLabel={copy.categories[item.category]} index={i} />
			{/each}
		</div>

		<p class="work__swipe" aria-hidden="true">{copy.swipe}</p>

		<div class="work__foot">
			<p class="work__note">{copy.note}</p>
			<button type="button" class="btn btn--ghost" onclick={() => quote.show('work')}>
				{copy.cta}
				<span class="arrow" aria-hidden="true">→</span>
			</button>
		</div>
	</div>
</section>

<style>
	.work {
		border-block-start: 1px solid var(--line);
	}

	.work__head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		margin-block-end: clamp(2rem, 4vw, 3rem);
	}

	.work__title {
		display: flex;
		flex-direction: column;
	}

	.work__lead {
		max-inline-size: 52ch;
	}

	.work__filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block-end: clamp(2rem, 4vw, 3.5rem);
		padding-block-end: clamp(1.5rem, 3vw, 2rem);
		border-block-end: 1px solid var(--line-soft);
	}

	.chip {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-50);
		border: 1px solid var(--line);
		border-radius: var(--r-pill);
		padding: 0.6rem 1.05rem;
		min-block-size: 38px;
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease),
			background-color var(--dur) var(--ease);
	}

	.chip:hover {
		color: var(--paper);
		border-color: var(--paper-35);
	}

	.chip.is-active {
		color: var(--accent);
		border-color: var(--accent);
		background: var(--accent-tint);
	}

	.work__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.75rem, 2.4vw, 2.5rem) clamp(0.9rem, 1.4vw, 1.5rem);
		align-items: start;
		grid-auto-flow: row dense;
	}

	.work__swipe {
		display: none;
		margin-block-start: 0.9rem;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-18);
	}

	@media (max-width: 559px) {
		.work__swipe {
			display: block;
		}
	}

	.work__foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-block-start: clamp(2.5rem, 5vw, 4rem);
		padding-block-start: clamp(1.5rem, 3vw, 2rem);
		border-block-start: 1px solid var(--line);
	}

	.work__note {
		font-size: var(--fs-small);
		color: var(--paper-35);
		max-inline-size: 58ch;
	}

	/* Phones read the portfolio as a reel tray: full-bleed, snapped, one thumb. */
	@media (max-width: 559px) {
		.work__filters {
			flex-wrap: nowrap;
			overflow-x: auto;
			overscroll-behavior-x: contain;
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			padding-block-end: clamp(1.25rem, 3vw, 1.75rem);
			scrollbar-width: none;
			mask-image: linear-gradient(to right, #000 88%, transparent);
		}

		:global([dir='rtl']) .work__filters {
			mask-image: linear-gradient(to left, #000 88%, transparent);
		}

		.work__filters::-webkit-scrollbar {
			display: none;
		}

		.chip {
			flex: none;
		}

		.work__grid {
			display: flex;
			grid-template-columns: none;
			gap: 0.7rem;
			overflow-x: auto;
			overscroll-behavior-x: contain;
			scroll-snap-type: x mandatory;
			scroll-padding-inline-start: var(--gutter);
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			padding-block-end: 0.25rem;
			scrollbar-width: none;
		}

		.work__grid::-webkit-scrollbar {
			display: none;
		}

		.work__grid :global(.card) {
			flex: 0 0 71%;
			scroll-snap-align: start;
		}

		/* One rhythm in the tray — mixed ratios read as a broken shelf. */
		.work__grid :global(.frame) {
			aspect-ratio: 9 / 16 !important;
		}
	}

	@media (min-width: 560px) {
		.work__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1100px) {
		.work__grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
