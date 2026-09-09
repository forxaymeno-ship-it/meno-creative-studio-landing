<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.process);
</script>

<section id="process" class="section process" aria-labelledby="process-title">
	<div class="shell">
		<header class="process__head">
			<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
			<h2 id="process-title" class="display process__title" use:reveal={{ delay: 60 }}>
				{#each copy.title as line (line)}
					<span>{line}</span>
				{/each}
			</h2>
		</header>

		<ol class="steps">
			{#each copy.steps as step, i (step.index)}
				<li class="step" use:reveal={{ delay: i * 80 }}>
					<div class="step__top">
						<span class="index">{step.index}</span>
						<span class="step__line" aria-hidden="true"></span>
					</div>
					<h3 class="step__title">{step.title}</h3>
					<p class="step__body">{step.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.process {
		border-block-start: 1px solid var(--line);
		background: var(--ink-000);
	}

	.process__head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		margin-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.process__title {
		display: flex;
		flex-direction: column;
	}

	.steps {
		display: grid;
		gap: clamp(2rem, 3vw, 2.5rem);
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.step__top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding-block-end: 1rem;
	}

	.step__line {
		flex: 1;
		block-size: 1px;
		background: var(--line);
		position: relative;
		overflow: hidden;
	}

	.step__line::after {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: inline-start;
		transition: transform 900ms var(--ease) 200ms;
	}

	:global(.step.is-in) .step__line::after {
		transform: scaleX(1);
	}

	.step__title {
		font-size: var(--fs-h3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-mega);
		line-height: 1;
	}

	.step__body {
		color: var(--paper-50);
		font-size: var(--fs-small);
		max-inline-size: 34ch;
	}

	@media (min-width: 700px) {
		.steps {
			grid-template-columns: repeat(2, 1fr);
			gap: clamp(2.5rem, 4vw, 3.5rem);
		}
	}

	@media (min-width: 1100px) {
		.steps {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
