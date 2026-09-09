<script lang="ts">
	import { CONTENT } from '$lib/content';
	import { DEFAULT_LOCALE, LOCALE_DIR, localePath, type Locale } from '$lib/i18n';
	import { SITE } from '$lib/data/site';

	let { form } = $props();

	const locale = $derived<Locale>(form?.locale ?? DEFAULT_LOCALE);
	const content = $derived(CONTENT[locale]);
	const copy = $derived(content.quote);
	const sent = $derived(Boolean(form?.success));
</script>

<svelte:head>
	<title>{sent ? copy.success.title : copy.error.title} — {SITE.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="quote-result" dir={LOCALE_DIR[locale]}>
	<p class="eyebrow">{SITE.name} — {content.footer.tagline}</p>
	<h1>{sent ? copy.success.title : copy.error.title}</h1>
	<p class="body">
		{#if sent}
			{copy.success.body}
		{:else if form?.rateLimited}
			{copy.error.tooMany}
		{:else}
			{copy.error.body}
		{/if}
	</p>
	{#if !sent}
		<p class="body"><a href="mailto:{SITE.email}">{SITE.email}</a></p>
	{/if}
	<a class="btn btn--primary" href={localePath(locale)}>{content.legal.back}</a>
</main>

<style>
	.quote-result {
		min-block-size: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1.25rem;
		max-inline-size: 62ch;
		margin-inline: auto;
		padding: clamp(1.5rem, 6vw, 4rem);
	}

	h1 {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 6vw, 3rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-mega);
		line-height: 1;
	}

	.body {
		color: var(--paper-70);
	}

	.body a {
		color: var(--accent);
	}
</style>
