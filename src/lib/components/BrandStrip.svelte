<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import { CLIENT_LOGOS } from '$lib/data/work';
	import { reveal } from '$lib/utils/reveal';

	let { content }: { content: SiteContent } = $props();

	const hasLogos = CLIENT_LOGOS.length > 0;
	const slots = Array.from({ length: 6 }, (_, i) => i);
</script>
<section class="section section--tight strip" aria-label={content.brands.title}>
	<div class="shell strip__inner">
		<p class="eyebrow eyebrow--plain strip__title" use:reveal>{content.brands.title}</p>

		{#if hasLogos}
			<div class="strip__marquee">
				<div class="strip__track">
					{#each [0, 1] as pass (pass)}
						<ul class="strip__set" aria-hidden={pass === 1 ? 'true' : undefined}>
							{#each CLIENT_LOGOS as logo (logo.name)}
								<li class="strip__logo">
									<img src={logo.src} alt={logo.name} loading="lazy" decoding="async" />
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			</div>
		{:else}
			<ul class="strip__slots">
				{#each slots as slot (slot)}
					<li class="strip__slot" aria-hidden="true"></li>
				{/each}
			</ul>
			<p class="strip__note">{content.brands.note}</p>
		{/if}
	</div>
</section>

<style>
	.strip {
		border-block-start: 1px solid var(--line);
		background: var(--ink-000);
	}

	.strip__inner {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 3vw, 2.25rem);
	}

	.strip__title {
		color: var(--paper-35);
	}

	.strip__marquee {
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
	}

	.strip__track {
		display: flex;
		inline-size: max-content;
		animation: strip-scroll 32s linear infinite;
	}

	:global([dir='rtl']) .strip__track {
		animation-direction: reverse;
	}

	.strip__set {
		display: flex;
		align-items: center;
		gap: clamp(2.5rem, 6vw, 5rem);
		padding-inline-end: clamp(2.5rem, 6vw, 5rem);
	}

	.strip__logo img {
		block-size: clamp(18px, 2.2vw, 26px);
		inline-size: auto;
		filter: grayscale(1) brightness(1.8);
		opacity: 0.55;
		transition: opacity var(--dur) var(--ease);
	}

	.strip__logo img:hover {
		opacity: 1;
	}

	@keyframes strip-scroll {
		to {
			transform: translateX(-50%);
		}
	}

	.strip__slots {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--line-soft);
		border: 1px solid var(--line-soft);
	}

	.strip__slot {
		block-size: clamp(56px, 8vw, 82px);
		background: var(--ink-050);
		position: relative;
	}

	.strip__slot::after {
		content: '';
		position: absolute;
		inset-block-start: 50%;
		inset-inline-start: 50%;
		transform: translate(-50%, -50%);
		inline-size: clamp(46px, 6vw, 74px);
		block-size: 8px;
		border-radius: var(--r-pill);
		background: var(--paper-18);
		opacity: 0.5;
	}

	.strip__note {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-18);
	}

	@media (min-width: 620px) {
		.strip__slots {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1000px) {
		.strip__slots {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.strip__track {
			animation: none;
		}
	}
</style>
