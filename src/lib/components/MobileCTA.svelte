<script lang="ts">
	import { quote } from '$lib/state/quote.svelte';

	let { label }: { label: string } = $props();

	let visible = $state(false);

	const onScroll = () => {
		visible = window.scrollY > window.innerHeight * 0.9;
	};
</script>

<svelte:window onscroll={onScroll} />

<div class="dock" class:is-visible={visible && !quote.open} aria-hidden={!visible}>
	<button
		type="button"
		class="btn btn--primary dock__btn"
		tabindex={visible ? 0 : -1}
		onclick={() => quote.show('mobile-dock')}
	>
		{label}
		<span class="arrow" aria-hidden="true">→</span>
	</button>
</div>

<style>
	.dock {
		position: fixed;
		inset-block-end: calc(0.9rem + env(safe-area-inset-bottom));
		inset-inline: var(--gutter);
		z-index: 50;
		display: flex;
		justify-content: center;
		opacity: 0;
		transform: translateY(120%);
		visibility: hidden;
		transition:
			opacity var(--dur) var(--ease),
			transform var(--dur) var(--ease),
			visibility var(--dur) var(--ease);
		pointer-events: none;
	}

	.dock.is-visible {
		opacity: 1;
		transform: none;
		visibility: visible;
		pointer-events: auto;
	}

	.dock__btn {
		inline-size: 100%;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
	}

	@media (min-width: 900px) {
		.dock {
			display: none;
		}
	}
</style>
