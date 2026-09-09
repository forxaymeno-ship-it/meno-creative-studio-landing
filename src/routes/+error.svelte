<script lang="ts">
	import { page } from '$app/state';
	import { getContent } from '$lib/content';
	import { localeFromPathname, localePath } from '$lib/i18n';
	import Wordmark from '$lib/components/Wordmark.svelte';

	const locale = $derived(localeFromPathname(page.url.pathname));
	const content = $derived(getContent(locale));
</script>

<svelte:head>
	<title>{page.status} — {content.notFound.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="err">
	<div class="shell err__inner">
		<Wordmark href={localePath(locale)} size="1.05rem" />
		<p class="index">{page.status}</p>
		<h1 class="display err__title">{content.notFound.title}</h1>
		<p class="lead">{content.notFound.body}</p>
		<a class="btn btn--primary" href={localePath(locale)}>
			{content.notFound.cta}
			<span class="arrow" aria-hidden="true">→</span>
		</a>
	</div>
</main>

<style>
	.err {
		min-block-size: 100svh;
		display: grid;
		place-items: center;
		padding-block: 4rem;
	}

	.err__inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.1rem;
	}

	.err__title {
		margin-block-start: 0.5rem;
	}
</style>
