<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { quote } from '$lib/state/quote.svelte';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.ecom);
</script>

<section class="section ecom" aria-labelledby="ecom-title">
	<div class="shell">
		<header class="ecom__head">
			<div>
				<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
				<h2 id="ecom-title" class="display ecom__title" use:reveal={{ delay: 60 }}>
					{#each copy.title as line, i (line)}
						<span class:accent-text={i === 1}>{line}</span>
					{/each}
				</h2>
			</div>
			<p class="lead ecom__lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		<div class="fan">
			<div class="fan__source" use:reveal>
				<span class="fan__pip" aria-hidden="true"></span>
				<span class="fan__source-label">{copy.productLabel}</span>
			</div>

			<ul class="fan__list">
				{#each copy.formats as format, i (format.name)}
					<li class="format" use:reveal={{ delay: (i % 3) * 70 }}>
						<span class="format__num">{String(i + 1).padStart(2, '0')}</span>
						<span class="format__name">{format.name}</span>
						<span class="format__note">{format.note}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div class="ecom__foot">
			<p class="ecom__note">{copy.footnote}</p>
			<button type="button" class="btn btn--primary" onclick={() => quote.show('ecommerce')}>
				{copy.cta}
				<span class="arrow" aria-hidden="true">→</span>
			</button>
		</div>
	</div>
</section>

<style>
	.ecom {
		border-block-start: 1px solid var(--line);
	}

	.ecom__head {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		margin-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.ecom__title {
		display: flex;
		flex-direction: column;
		margin-block-start: 1.1rem;
	}


	.fan__source {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		border: 1px solid var(--accent);
		background: var(--accent-tint);
		border-radius: var(--r-pill);
		padding: 0.6rem 1.1rem;
		margin-block-end: clamp(1.5rem, 3vw, 2.25rem);
	}

	.fan__pip {
		inline-size: 6px;
		block-size: 6px;
		border-radius: 50%;
		background: var(--accent);
	}

	.fan__source-label {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--accent);
	}

	.fan__list {
		display: grid;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}

	.format {
		background: var(--ink-050);
		padding: clamp(1.1rem, 2.4vw, 1.9rem);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-block-size: clamp(120px, 15vw, 172px);
		position: relative;
		transition: background-color var(--dur) var(--ease);
	}

	.format::after {
		content: '';
		position: absolute;
		inset-block-start: 0;
		inset-inline: 0;
		block-size: 2px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: inline-start;
		transition: transform var(--dur-slow) var(--ease);
	}

	.format__num {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.1em;
		color: var(--paper-18);
		transition: color var(--dur) var(--ease);
	}

	.format__name {
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 1.9vw, 1.45rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		line-height: 1.1;
		margin-block-start: auto;
	}

	.format__note {
		font-size: var(--fs-small);
		color: var(--paper-35);
	}

	@media (hover: hover) {
		.format:hover {
			background: var(--ink-200);
		}

		.format:hover::after {
			transform: scaleX(1);
		}

		.format:hover .format__num {
			color: var(--accent);
		}
	}

	.ecom__foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-block-start: clamp(2rem, 4vw, 3rem);
	}

	.ecom__note {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		max-inline-size: 52ch;
		line-height: 1.9;
	}

	@media (min-width: 620px) {
		.fan__list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 900px) {
		.ecom__head {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			row-gap: clamp(1.25rem, 2.5vw, 2rem);
		}

		.ecom__head > div {
			grid-column: 1 / -1;
		}

		.ecom__lead {
			grid-column: 2;
			align-self: start;
		}

		.fan__list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
