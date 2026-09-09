<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { quote } from '$lib/state/quote.svelte';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.finalCta);
</script>

<section class="final" aria-labelledby="final-title">
	<div class="shell final__inner">
		<h2 id="final-title" class="display display--mega final__title" use:reveal={{ mask: true }}>
			{#each copy.title as line, i (line)}
				<span class:outline-word={i === copy.title.length - 1}>{line}</span>
			{/each}
		</h2>

		<div class="final__foot" use:reveal={{ delay: 120 }}>
			<p class="lead final__lead">{copy.lead}</p>
			<div class="final__action">
				<button
					type="button"
					class="btn btn--primary btn--lg"
					onclick={() => quote.show('final-cta')}
				>
					{copy.cta}
					<span class="arrow" aria-hidden="true">→</span>
				</button>
				<span class="final__note">{copy.note}</span>
			</div>
		</div>
	</div>
</section>

<style>
	.final {
		position: relative;
		border-block-start: 1px solid var(--line);
		padding-block: clamp(4.5rem, 12vw, 10rem);
		overflow: hidden;
		background:
			radial-gradient(90% 120% at 50% 120%, rgba(217, 164, 65, 0.12), transparent 62%),
			var(--ink-000);
	}

	.final__inner {
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 5vw, 3.5rem);
	}

	.final__title {
		display: flex;
		flex-direction: column;
	}

	.final__foot {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block-start: clamp(1.5rem, 3vw, 2.25rem);
		border-block-start: 1px solid var(--line);
	}

	.final__lead {
		max-inline-size: 40ch;
	}

	.final__action {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
	}

	.final__note {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
	}

	@media (min-width: 860px) {
		.final__foot {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			gap: 3rem;
		}

		.final__action {
			align-items: flex-end;
		}
	}
</style>
