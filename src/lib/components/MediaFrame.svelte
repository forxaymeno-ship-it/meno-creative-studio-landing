<script lang="ts">
	import { playInView } from '$lib/utils/playInView';

	let {
		src = '',
		poster = '',
		ratio = '9 / 16',
		label = '',
		slotName = ''
	}: {
		src?: string;
		poster?: string;
		ratio?: string;
		/** Visible caption on the placeholder tile */
		label?: string;
		/** Path hint shown while the asset is missing */
		slotName?: string;
	} = $props();

	let failed = $state(false);
	const showVideo = $derived(Boolean(src) && !failed);
</script>

<div class="frame" style="--ratio:{ratio}">
	<div class="ph" aria-hidden={showVideo ? 'true' : undefined}>
		{#if !showVideo}
			<span class="ph__label">
				{label || 'Media slot'}
				{#if slotName}<br /><span class="ph__path">{slotName}</span>{/if}
			</span>
		{/if}
	</div>

	{#if showVideo}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			class="frame__video"
			muted
			loop
			playsinline
			preload="none"
			tabindex="-1"
			aria-hidden="true"
			disablepictureinpicture
			poster={poster || undefined}
			onerror={() => (failed = true)}
			use:playInView={{ src }}
		></video>
	{/if}
</div>

<style>
	.frame {
		position: relative;
		inline-size: 100%;
		aspect-ratio: var(--ratio);
		overflow: hidden;
		background: var(--ink-100);
		border-radius: var(--r-sm);
		isolation: isolate;
		box-shadow: inset 0 0 0 1px var(--line-soft);
	}

	.frame :global(.ph) {
		position: absolute;
		inset: 0;
	}

	.ph__path {
		display: inline-block;
		margin-block-start: 0.5rem;
		color: var(--paper-18);
		font-size: 0.5625rem;
		letter-spacing: 0.02em;
		text-transform: none;
		direction: ltr;
		overflow-wrap: anywhere;
		max-inline-size: 100%;
	}

	.frame__video {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		z-index: 1;
	}
</style>
