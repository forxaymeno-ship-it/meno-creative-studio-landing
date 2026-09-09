<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { WORK_RATIO, type WorkItem } from '$lib/data/work';
	import { reveal } from '$lib/utils/reveal';
	import MediaFrame from './MediaFrame.svelte';

	let {
		item,
		locale,
		categoryLabel,
		index = 0
	}: { item: WorkItem; locale: Locale; categoryLabel: string; index?: number } = $props();
</script>

<article
	class="card card--{item.size}"
	use:reveal={{ delay: (index % 4) * 70 }}
>
	<div class="card__media">
		<MediaFrame
			src={item.video}
			poster={item.poster}
			ratio={WORK_RATIO[item.size]}
			label={categoryLabel}
			slotName={item.video ? `static${item.video}` : `static/videos/work/${item.id}.mp4`}
		/>
	</div>

	<div class="card__meta">
		<h3 class="card__title">{item.title[locale]}</h3>
		<p class="card__sub">
			<span>{categoryLabel}</span>
			<span class="card__dot" aria-hidden="true">·</span>
			<span class="card__year">{item.year}</span>
		</p>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.card__media {
		position: relative;
		overflow: hidden;
		border-radius: var(--r-sm);
		transition: transform var(--dur-slow) var(--ease);
	}

	.card__media::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid var(--line);
		border-radius: var(--r-sm);
		pointer-events: none;
		z-index: 2;
		transition: border-color var(--dur) var(--ease);
	}

	.card__meta {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.card__title {
		font-size: var(--fs-h4);
		font-weight: 600;
		letter-spacing: var(--track-tight);
		text-transform: uppercase;
		line-height: 1.15;
	}

	.card__sub {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
	}

	.card__year {
		direction: ltr;
	}

	@media (hover: hover) {
		.card:hover .card__media {
			transform: translateY(-6px);
		}

		.card:hover .card__media::after {
			border-color: var(--accent-tint-strong);
		}
	}

	@media (min-width: 760px) {
		.card--small {
			inline-size: 82%;
			margin-block-start: clamp(2rem, 5vw, 4.5rem);
		}

		.card--portrait {
			margin-block-start: clamp(1rem, 3vw, 2.5rem);
		}

		.card--wide {
			grid-column: span 2;
		}
	}
</style>
