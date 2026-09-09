<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.craft);

	/** Deterministic clip offsets so the stack reads like an edit timeline. */
	const bar = (i: number) => {
		const start = (i * 7) % 34;
		const length = 44 + ((i * 17) % 46);
		return { start, length: Math.min(length, 100 - start) };
	};

	let activeIndex = $state(-1);
</script>

<section id="about" class="section craft" aria-labelledby="craft-title">
	<div class="shell">
		<header class="craft__head">
			<div>
				<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
				<h2 id="craft-title" class="display craft__title" use:reveal={{ delay: 60 }}>
					{#each copy.title as line, i (line)}
						<span class:accent-text={i === copy.title.length - 1}>{line}</span>
					{/each}
				</h2>
			</div>
			<p class="lead craft__lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		<div class="timeline" use:reveal>
			<div class="timeline__ruler" aria-hidden="true">
				<span class="timeline__label">{copy.trackLabel}</span>
				<div class="timeline__ticks">
					{#each Array(12) as _, t (t)}
						<i></i>
					{/each}
				</div>
			</div>

			<ol class="tracks">
				{#each copy.layers as layer, i (layer.index)}
					{@const geo = bar(i)}
					<li
						class="track"
						class:is-active={activeIndex === i}
						style="--start:{geo.start}%; --len:{geo.length}%; --d:{i * 55}ms"
						onmouseenter={() => (activeIndex = i)}
						onmouseleave={() => (activeIndex = -1)}
						onfocusin={() => (activeIndex = i)}
						onfocusout={() => (activeIndex = -1)}
					>
						<span class="track__index">{layer.index}</span>
						<button type="button" class="track__label" aria-describedby="detail-{layer.index}">
							{layer.label}
						</button>
						<span class="track__lane" aria-hidden="true">
							<span class="track__clip"></span>
						</span>
						<span class="track__detail" id="detail-{layer.index}">{layer.detail}</span>
					</li>
				{/each}
			</ol>

			<span class="timeline__playhead" aria-hidden="true"></span>
		</div>

		<p class="craft__note" use:reveal>{copy.note}</p>
	</div>
</section>

<style>
	.craft {
		border-block-start: 1px solid var(--line);
	}

	.craft__head {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		margin-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.craft__title {
		display: flex;
		flex-direction: column;
		margin-block-start: 1.1rem;
	}


	.timeline {
		position: relative;
		border: 1px solid var(--line);
		background: var(--ink-000);
		border-radius: var(--r-sm);
		overflow: hidden;
	}

	.timeline__ruler {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem clamp(0.9rem, 2vw, 1.5rem);
		border-block-end: 1px solid var(--line);
		background: var(--ink-100);
	}

	.timeline__label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		white-space: nowrap;
	}

	.timeline__ticks {
		display: none;
		flex: 1;
		justify-content: space-between;
		max-inline-size: 60%;
	}

	.timeline__ticks i {
		inline-size: 1px;
		block-size: 8px;
		background: var(--paper-18);
	}

	.track {
		display: grid;
		grid-template-columns: 2.4rem 1fr;
		grid-template-areas:
			'index label'
			'. detail';
		gap: 0.2rem 0.75rem;
		align-items: center;
		padding: 0.85rem clamp(0.9rem, 2vw, 1.5rem);
		border-block-end: 1px solid var(--line-soft);
		transition: background-color var(--dur) var(--ease);
	}

	.track:last-child {
		border-block-end: 0;
	}

	.track.is-active {
		background: rgba(217, 164, 65, 0.04);
	}

	.track__index {
		grid-area: index;
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.1em;
		color: var(--paper-18);
		transition: color var(--dur) var(--ease);
	}

	.track.is-active .track__index {
		color: var(--accent);
	}

	.track__label {
		grid-area: label;
		text-align: start;
		font-family: var(--font-display);
		font-size: clamp(0.98rem, 1.5vw, 1.15rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		line-height: 1.2;
		color: var(--paper);
	}

	.track__lane {
		display: none;
		grid-area: lane;
		position: relative;
		block-size: 10px;
		background: linear-gradient(
			90deg,
			var(--line-soft) 0 1px,
			transparent 1px 100%
		);
		background-size: 8.333% 100%;
	}

	.track__clip {
		position: absolute;
		inset-block: 0;
		inset-inline-start: var(--start);
		inline-size: var(--len);
		background: var(--paper-18);
		border-radius: 2px;
		transform: scaleX(0);
		transform-origin: inline-start;
		transition:
			transform 700ms var(--ease),
			background-color var(--dur) var(--ease);
		transition-delay: var(--d), 0ms;
	}

	:global(.timeline.is-in) .track__clip {
		transform: scaleX(1);
	}

	.track.is-active .track__clip {
		background: var(--accent);
	}

	.track__detail {
		grid-area: detail;
		font-size: var(--fs-small);
		color: var(--paper-35);
		line-height: 1.5;
	}

	.timeline__playhead {
		display: none;
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		inline-size: 1px;
		background: var(--accent);
		opacity: 0.45;
	}

	.craft__note {
		margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
	}

	@media (min-width: 900px) {
		.craft__head {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			row-gap: clamp(1.25rem, 2.5vw, 2rem);
		}

		.craft__head > div {
			grid-column: 1 / -1;
		}

		.craft__lead {
			grid-column: 2;
			align-self: start;
		}

		.timeline__ticks {
			display: flex;
		}

		.track {
			grid-template-columns: 2.4rem minmax(9rem, 0.9fr) minmax(0, 1.6fr) minmax(0, 1.4fr);
			grid-template-areas: 'index label lane detail';
			gap: clamp(1rem, 2vw, 2rem);
			padding-block: 0.7rem;
		}

		.track__lane {
			display: block;
		}

		.timeline__playhead {
			display: block;
		}

		@supports (animation-timeline: view()) {
			.timeline__playhead {
				animation: playhead linear both;
				animation-timeline: view();
				animation-range: cover 15% cover 85%;
			}
		}
	}

	@keyframes playhead {
		from {
			inset-inline-start: 0%;
		}
		to {
			inset-inline-start: calc(100% - 1px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track__clip {
			transform: scaleX(1);
		}
	}
</style>
