<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.value);
</script>

<section class="section value" aria-labelledby="value-title">
	<div class="shell">
		<header class="value__head">
			<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
			<h2 id="value-title" class="display value__title" use:reveal={{ delay: 60 }}>
				{#each copy.title as line (line)}
					<span>{line}</span>
				{/each}
			</h2>
			<p class="lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		<div class="compare">
			<div class="compare__col compare__col--old" use:reveal>
				<p class="compare__label">{copy.oldLabel}</p>
				<ul class="compare__list">
					{#each copy.oldItems as item, i (item)}
						<li class="old" style="--d:{i * 55}ms">{item}</li>
					{/each}
				</ul>
			</div>

			<div class="compare__col compare__col--new" use:reveal={{ delay: 120 }}>
				<p class="compare__label compare__label--accent">{copy.newLabel}</p>
				<ol class="compare__list">
					{#each copy.newItems as item, i (item)}
						<li class="new">
							<span class="new__num">{String(i + 1).padStart(2, '0')}</span>
							{item}
						</li>
					{/each}
				</ol>
			</div>
		</div>

		<ul class="unlocks">
			{#each copy.unlocks as unlock, i (unlock.title)}
				<li class="unlock" use:reveal={{ delay: (i % 2) * 80 }}>
					<h3 class="unlock__title">{unlock.title}</h3>
					<p class="unlock__body">{unlock.body}</p>
				</li>
			{/each}
		</ul>

		<p class="value__foot" use:reveal>{copy.footnote}</p>
	</div>
</section>

<style>
	.value {
		border-block-start: 1px solid var(--line);
		background:
			radial-gradient(120% 80% at 100% 0%, rgba(217, 164, 65, 0.05), transparent 55%),
			var(--ink-000);
	}

	.value__head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		margin-block-end: clamp(2.5rem, 5vw, 4.5rem);
	}

	.value__title {
		display: flex;
		flex-direction: column;
		max-inline-size: 16ch;
	}

	.compare {
		display: grid;
		gap: 1px;
		border: 1px solid var(--line);
		background: var(--line);
	}

	.compare__col {
		background: var(--ink-050);
		padding: clamp(1.5rem, 3vw, 2.75rem);
	}

	.compare__label {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		margin-block-end: clamp(1.25rem, 2.5vw, 2rem);
	}

	.compare__label--accent {
		color: var(--accent);
	}

	.compare__list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.old {
		position: relative;
		display: inline-block;
		inline-size: fit-content;
		color: var(--paper-35);
		font-size: var(--fs-body);
	}

	.old::after {
		content: '';
		position: absolute;
		inset-block-start: 50%;
		inset-inline: 0;
		block-size: 1px;
		background: var(--paper-18);
		transform: scaleX(0);
		transform-origin: inline-start;
		transition: transform 500ms var(--ease);
		transition-delay: var(--d);
	}

	:global(.compare__col--old.is-in) .old::after {
		transform: scaleX(1);
	}

	.new {
		display: flex;
		align-items: baseline;
		gap: 0.85rem;
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 2.4vw, 1.7rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		line-height: 1.15;
	}

	.new__num {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.1em;
		color: var(--accent);
	}

	.unlocks {
		display: grid;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		border-block-start: 0;
	}

	.unlock {
		background: var(--ink-050);
		padding: clamp(1.5rem, 3vw, 2.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.unlock__title {
		font-size: var(--fs-h4);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		line-height: 1.15;
	}

	.unlock__body {
		color: var(--paper-50);
		font-size: var(--fs-small);
	}

	.value__foot {
		margin-block-start: clamp(2rem, 4vw, 3rem);
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		max-inline-size: 70ch;
		line-height: 1.9;
	}

	@media (min-width: 760px) {
		.compare {
			grid-template-columns: 1fr 1fr;
		}

		.unlocks {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
