<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { quote } from '$lib/state/quote.svelte';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const copy = $derived(content.engagement);
</script>

<section class="section engage" aria-labelledby="engage-title">
	<div class="shell">
		<header class="engage__head">
			<p class="eyebrow" use:reveal>{copy.eyebrow}</p>
			<h2 id="engage-title" class="display engage__title" use:reveal={{ delay: 60 }}>
				{#each copy.title as line (line)}
					<span>{line}</span>
				{/each}
			</h2>
			<p class="lead" use:reveal={{ delay: 120 }}>{copy.lead}</p>
		</header>

		<ul class="tiers">
			{#each copy.tiers as tier, i (tier.id)}
				<li class="tier" class:is-featured={tier.featured} use:reveal={{ delay: i * 80 }}>
					{#if tier.featured}
						<span class="tier__badge">{copy.featuredBadge}</span>
					{/if}
					<h3 class="tier__name">{tier.name}</h3>
					<p class="tier__tagline">{tier.tagline}</p>
					<p class="tier__body">{tier.body}</p>
					<ul class="tier__points">
						{#each tier.points as point (point)}
							<li><span class="tier__tick" aria-hidden="true">—</span>{point}</li>
						{/each}
					</ul>
					<button
						type="button"
						class="btn {tier.featured ? 'btn--primary' : 'btn--ghost'} btn--block tier__cta"
						onclick={() => quote.show(`engagement-${tier.id}`)}
					>
						{copy.cta}
					</button>
				</li>
			{/each}
		</ul>

		<p class="engage__note" use:reveal>{copy.note}</p>
	</div>
</section>

<style>
	.engage {
		border-block-start: 1px solid var(--line);
		background: var(--ink-000);
	}

	.engage__head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		margin-block-end: clamp(2.5rem, 5vw, 4rem);
	}

	.engage__title {
		display: flex;
		flex-direction: column;
	}

	.tiers {
		display: grid;
		gap: clamp(1rem, 1.6vw, 1.25rem);
		align-items: stretch;
	}

	.tier {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid var(--line);
		border-radius: var(--r-md);
		background: var(--ink-050);
		position: relative;
		transition: border-color var(--dur) var(--ease);
	}

	.tier:hover {
		border-color: var(--paper-18);
	}

	.tier.is-featured {
		border-color: var(--accent);
		background:
			radial-gradient(120% 70% at 50% 0%, rgba(217, 164, 65, 0.08), transparent 60%),
			var(--ink-100);
	}

	.tier__badge {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: clamp(1.5rem, 3vw, 2.5rem);
		transform: translateY(-50%);
		background: var(--accent);
		color: var(--on-accent);
		font-family: var(--font-mono);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		padding: 0.35rem 0.75rem;
		border-radius: var(--r-pill);
		line-height: 1;
	}

	.tier__name {
		font-size: var(--fs-h3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-mega);
		line-height: 1;
	}

	.tier__tagline {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--accent);
	}

	.tier__body {
		color: var(--paper-50);
		font-size: var(--fs-small);
	}

	.tier__points {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		padding-block: 0.5rem;
		margin-block-start: auto;
	}

	.tier__points li {
		display: flex;
		gap: 0.7rem;
		font-size: var(--fs-small);
		color: var(--paper-70);
	}

	.tier__tick {
		color: var(--accent);
		flex: none;
	}

	.tier__cta {
		margin-block-start: 0.5rem;
	}

	.engage__note {
		margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		line-height: 1.9;
		max-inline-size: 60ch;
	}

	@media (min-width: 900px) {
		.tiers {
			grid-template-columns: repeat(3, 1fr);
		}

		.tier.is-featured {
			transform: translateY(-14px);
		}
	}
</style>
