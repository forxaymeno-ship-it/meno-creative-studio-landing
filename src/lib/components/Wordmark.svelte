<script lang="ts">
	import { SITE } from '$lib/data/site';

	let { size = '1rem', href }: { size?: string; href?: string } = $props();
</script>

{#snippet mark()}
	<span class="wordmark" style="--wm-size:{size}">
		{SITE.wordmark}<span class="dot" aria-hidden="true">.</span>
	</span>
{/snippet}

{#if href}
	<a class="wordmark-link" {href} aria-label={SITE.name}>{@render mark()}</a>
{:else}
	{@render mark()}
{/if}

<style>
	.wordmark {
		/* The wordmark stays Latin even on the Arabic build. */
		font-family: 'Archivo Variable', 'Archivo', Helvetica, Arial, sans-serif;
		font-size: var(--wm-size);
		font-weight: 700;
		letter-spacing: -0.05em;
		text-transform: uppercase;
		line-height: 1;
		display: inline-block;
		direction: ltr;
		unicode-bidi: isolate;
	}

	.dot {
		color: var(--accent);
	}

	.wordmark-link {
		display: inline-flex;
		transition: opacity var(--dur) var(--ease);
	}

	.wordmark-link:hover {
		opacity: 0.72;
	}
</style>
