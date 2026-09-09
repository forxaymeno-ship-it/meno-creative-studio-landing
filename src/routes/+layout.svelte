<script lang="ts">
	import '@fontsource-variable/archivo';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/cairo';
	import '../app.css';

	let { children } = $props();
</script>

<span id="top"></span>
{@render children()}
<div class="grain" aria-hidden="true"></div>

<style>
	#top {
		position: absolute;
		inset-block-start: 0;
	}
</style>
