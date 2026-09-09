<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.faq);

	let open = $state<number | null>(0);

	const toggle = (i: number) => (open = open === i ? null : i);
</script>

<section id="faq" class="section faq" aria-labelledby="faq-title">
	<div class="shell faq__grid">
		<header class="faq__head">
			<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
			<h2 id="faq-title" class="title faq__title" use:reveal={{ delay: 60 }}>
				{#each copy.title as line (line)}
					<span>{line}</span>
				{/each}
			</h2>
		</header>

		<ul class="faq__list">
			{#each copy.items as item, i (item.q)}
				<li class="qa" class:is-open={open === i}>
					<h3>
						<button
							type="button"
							class="qa__q"
							aria-expanded={open === i}
							aria-controls="faq-panel-{i}"
							id="faq-button-{i}"
							onclick={() => toggle(i)}
						>
							<span class="qa__text">{item.q}</span>
							<span class="qa__sign" aria-hidden="true"></span>
						</button>
					</h3>
					<div
						class="qa__panel"
						id="faq-panel-{i}"
						role="region"
						aria-labelledby="faq-button-{i}"
						hidden={open !== i}
					>
						<p>{item.a}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.faq {
		border-block-start: 1px solid var(--line);
	}

	.faq__grid {
		display: grid;
		gap: clamp(2rem, 4vw, 4rem);
	}

	.faq__head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.faq__title {
		display: flex;
		flex-direction: column;
	}

	.faq__list {
		border-block-start: 1px solid var(--line);
	}

	.qa {
		border-block-end: 1px solid var(--line);
	}

	.qa__q {
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		text-align: start;
		padding-block: clamp(1.1rem, 2.2vw, 1.5rem);
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		font-weight: 500;
		letter-spacing: var(--track-tight);
		line-height: 1.3;
		color: var(--paper-70);
		transition: color var(--dur) var(--ease);
		min-block-size: 56px;
	}

	.qa__q:hover,
	.qa.is-open .qa__q {
		color: var(--paper);
	}

	.qa__sign {
		position: relative;
		inline-size: 12px;
		block-size: 12px;
		flex: none;
	}

	.qa__sign::before,
	.qa__sign::after {
		content: '';
		position: absolute;
		inset-block-start: 50%;
		inset-inline-start: 0;
		inline-size: 12px;
		block-size: 1.5px;
		background: var(--accent);
		transition: transform var(--dur) var(--ease);
	}

	.qa__sign::after {
		transform: rotate(90deg);
	}

	.qa.is-open .qa__sign::after {
		transform: rotate(0deg);
	}

	.qa__panel {
		padding-block-end: clamp(1.1rem, 2.2vw, 1.6rem);
		max-inline-size: 68ch;
	}

	.qa__panel p {
		color: var(--paper-50);
		font-size: var(--fs-small);
		line-height: 1.65;
	}

	@media (min-width: 1000px) {
		.faq__grid {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.35fr);
			align-items: start;
		}

		.faq__head {
			position: sticky;
			inset-block-start: calc(var(--header-h) + 2rem);
		}
	}
</style>
