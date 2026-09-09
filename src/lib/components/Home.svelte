<script lang="ts">
	import { getContent } from '$lib/content';
	import { localePath, stripLocale, type Locale } from '$lib/i18n';
	import { page } from '$app/state';

	import Seo from './Seo.svelte';
	import Header from './Header.svelte';
	import Hero from './Hero.svelte';
	import WorkShowcase from './WorkShowcase.svelte';
	import BrandStrip from './BrandStrip.svelte';
	import Services from './Services.svelte';
	import ValueProp from './ValueProp.svelte';
	import CraftTimeline from './CraftTimeline.svelte';
	import Process from './Process.svelte';
	import EcommerceSection from './EcommerceSection.svelte';
	import Engagement from './Engagement.svelte';
	import FAQ from './FAQ.svelte';
	import FinalCTA from './FinalCTA.svelte';
	import Footer from './Footer.svelte';
	import MobileCTA from './MobileCTA.svelte';
	import QuoteDialog from './QuoteDialog.svelte';

	let { locale }: { locale: Locale } = $props();

	const content = $derived(getContent(locale));
	const path = $derived(stripLocale(page.url.pathname));
	const home = $derived(localePath(locale));
	const workHref = $derived(`${home}#work`);
</script>

<Seo {content} {locale} path="/"/>

<a class="skip-link" href="#main">{content.nav.skipToContent}</a>
<Header {content} {locale} {path}/>

<main id="main">
	<Hero {content} {workHref}/>
	<BrandStrip {content}/>
	<WorkShowcase {content} {locale}/>
	<Services {content}/>
	<ValueProp {content}/>
	<CraftTimeline {content}/>
	<Process {content}/>
	<EcommerceSection {content}/>
	<Engagement {content}/>
	<FAQ {content}/>
	<FinalCTA {content}/>
</main>

<Footer {content} {locale} {path} />
<MobileCTA label={content.nav.cta} />
<QuoteDialog {content} {locale} />
