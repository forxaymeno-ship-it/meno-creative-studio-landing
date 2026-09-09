<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.services);
</script>

<section id="services" class="section services" aria-labelledby="services-title">
	<div class="shell">
		<header class="services__head">
			<div>
				<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
				<h2 id="services-title" class="display services__title" use:reveal={{ delay: 60 }}>
					{#each copy.title as line (line)}
						<span>{line}</span>
					{/each}
				</h2>
			</div>
			<p class="lead services__lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		<ol class="services__list">
			{#each copy.items as item, i (item.index)}
				<li class="row" use:reveal={{ delay: Math.min(i, 3) * 60 }}>
					<span class="row__bar" aria-hidden="true"></span>
					<span class="index row__index">{item.index}</span>
					<h3 class="row__title">{item.title}</h3>
					<div class="row__detail">
						<p class="row__body">{item.body}</p>
						<ul class="row__tags">
							{#each item.tags as tag (tag)}
								<li class="tag">{tag}</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.services {
		border-block-start: 1px solid var(--line);
	}

	.services__head {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		margin-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.services__title {
		display: flex;
		flex-direction: column;
		margin-block-start: 1.1rem;
	}


	.services__list {
		border-block-start: 1px solid var(--line);
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			'index title'
			'detail detail';
		gap: 0.5rem 1.1rem;
		padding-block: clamp(1.6rem, 3.2vw, 2.6rem);
		border-block-end: 1px solid var(--line);
		transition: padding-inline-start var(--dur-slow) var(--ease);
	}

	.row__bar {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		inline-size: 2px;
		background: var(--accent);
		transform: scaleY(0);
		transform-origin: 50% 0;
		transition: transform var(--dur-slow) var(--ease);
	}

	.row__index {
		grid-area: index;
		padding-block-start: 0.45em;
	}

	.row__title {
		grid-area: title;
		font-size: var(--fs-h3);
		font-weight: 600;
		letter-spacing: var(--track-mega);
		text-transform: uppercase;
		line-height: 1.02;
		transition: color var(--dur) var(--ease);
	}

	.row__detail {
		grid-area: detail;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.row__body {
		color: var(--paper-50);
		max-inline-size: 58ch;
		font-size: var(--fs-body);
	}

	.row__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--paper-35);
		border: 1px solid var(--line);
		border-radius: var(--r-pill);
		padding: 0.35rem 0.7rem;
		line-height: 1;
	}

	@media (min-width: 900px) {
		.services__head {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			row-gap: clamp(1.25rem, 2.5vw, 2rem);
		}

		.services__head > div {
			grid-column: 1 / -1;
		}

		.services__lead {
			grid-column: 2;
			align-self: start;
		}

		.row {
			grid-template-columns: 4rem minmax(0, 0.9fr) minmax(0, 1.1fr);
			grid-template-areas: 'index title detail';
			align-items: start;
			gap: clamp(1.5rem, 3vw, 3rem);
		}

		.row:hover {
			padding-inline-start: 1.25rem;
		}

		.row:hover .row__bar {
			transform: scaleY(1);
		}

		.row:hover .row__title {
			color: var(--accent);
		}
	}
</style>
