<script lang="ts">
	import { LOCALES, LOCALE_LABEL, LOCALE_NAME, localePath, type Locale } from '$lib/i18n';

	let {
		locale,
		path = '/',
		label
	}: { locale: Locale; path?: string; label: string } = $props();
</script>

<nav class="locales" aria-label={label}>
	{#each LOCALES as code, i (code)}
		{#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
		<a
			href={localePath(code, path)}
			class="locale"
			class:is-active={code === locale}
			hreflang={code}
			lang={code}
			aria-current={code === locale ? 'true' : undefined}
			data-sveltekit-reload
		>
			<span class="sr-only">{LOCALE_NAME[code]}</span>
			<span aria-hidden="true">{LOCALE_LABEL[code]}</span>
		</a>
	{/each}
</nav>

<style>
	.locales {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		direction: ltr;
	}

	.locale {
		color: var(--paper-35);
		transition: color var(--dur) var(--ease);
		padding: 0.25rem 0.1rem;
	}

	.locale:hover {
		color: var(--paper);
	}

	.locale.is-active {
		color: var(--accent);
	}

	.sep {
		color: var(--paper-18);
	}
</style>
