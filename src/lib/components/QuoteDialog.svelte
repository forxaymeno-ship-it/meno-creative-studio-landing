<script lang="ts">
	import type { SiteContent } from '$lib/content/types';
	import type { Locale } from '$lib/i18n';
	import { SITE } from '$lib/data/site';
	import { QUOTE_BUDGETS, QUOTE_FORM_NAME, QUOTE_NEEDS, QUOTE_VOLUMES } from '$lib/data/quote';
	import { quote } from '$lib/state/quote.svelte';
	import { isValidEmail, submitQuoteForm, type SubmitState } from '$lib/utils/quoteForm';

	let { content, locale }: { content: SiteContent; locale: Locale } = $props();

	const copy = $derived(content.quote);

	const TOTAL_STEPS = 5;

	let dialog = $state<HTMLDialogElement | null>(null);
	let panel = $state<HTMLElement | null>(null);
	let step = $state(0);
	let status = $state<SubmitState>('idle');
	let errors = $state<Record<string, string>>({});
	let rateLimited = $state(false);

	const empty = () => ({
		name: '',
		email: '',
		company: '',
		url: '',
		needs: [] as string[],
		volume: '',
		budget: '',
		brief: '',
		deadline: ''
	});

	let form = $state(empty());

	/** Moves focus into the step that just became visible, and resets the scroll. */
	const focusStep = () => {
		requestAnimationFrame(() => {
			panel?.scrollTo({ top: 0 });
			const active = panel?.querySelector<HTMLElement>('.qd__step:not([hidden])');
			const first = active?.querySelector<HTMLElement>(
				'input:not([type="hidden"]):not([tabindex="-1"]), textarea'
			);
			first?.focus();
		});
	};

	$effect(() => {
		if (!dialog) return;
		if (quote.open && !dialog.open) {
			dialog.showModal();
			focusStep();
		}
		if (!quote.open && dialog.open) dialog.close();
	});

	$effect(() => {
		document.body.classList.toggle('no-scroll', quote.open);
		return () => document.body.classList.remove('no-scroll');
	});

	const close = () => {
		quote.hide();
		if (status === 'success') reset();
	};

	const reset = () => {
		form = empty();
		step = 0;
		status = 'idle';
		errors = {};
		rateLimited = false;
	};

	const toggleNeed = (id: string) => {
		form.needs = form.needs.includes(id)
			? form.needs.filter((n) => n !== id)
			: [...form.needs, id];
		if (form.needs.length) errors = { ...errors, needs: '' };
	};

	const validateStep = (index: number): boolean => {
		const next: Record<string, string> = {};

		if (index === 0) {
			if (!form.name.trim()) next.name = copy.required;
			if (!form.email.trim()) next.email = copy.required;
			else if (!isValidEmail(form.email)) next.email = copy.invalidEmail;
			if (!form.company.trim()) next.company = copy.required;
		}
		if (index === 1 && form.needs.length === 0) next.needs = copy.selectOne;
		if (index === 2 && !form.volume) next.volume = copy.selectOne;
		if (index === 3 && !form.budget) next.budget = copy.selectOne;
		if (index === 4 && !form.brief.trim()) next.brief = copy.required;

		errors = next;
		return Object.keys(next).length === 0;
	};

	const goNext = () => {
		if (!validateStep(step)) return;
		if (step < TOTAL_STEPS - 1) {
			step += 1;
			focusStep();
		}
	};

	const goBack = () => {
		errors = {};
		if (step > 0) {
			step -= 1;
			focusStep();
		}
	};

	/** Server-side validation codes mapped back onto the localised messages. */
	const MESSAGE: Record<string, () => string> = {
		required: () => copy.required,
		invalidEmail: () => copy.invalidEmail,
		selectOne: () => copy.selectOne,
		tooLong: () => copy.required
	};

	const STEP_OF: Record<string, number> = {
		name: 0,
		email: 0,
		company: 0,
		url: 0,
		needs: 1,
		volume: 2,
		budget: 3,
		brief: 4,
		deadline: 4
	};

	const onSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		if (status === 'submitting') return;
		if (!validateStep(4)) return;

		status = 'submitting';
		rateLimited = false;

		const result = await submitQuoteForm(event.currentTarget as HTMLFormElement);

		if (result.ok) {
			status = 'success';
			form = empty();
			return;
		}

		if (result.kind === 'invalid') {
			errors = Object.fromEntries(
				Object.entries(result.errors).map(([field, code]) => [
					field,
					(MESSAGE[code] ?? MESSAGE.required)()
				])
			);
			const first = Math.min(...Object.keys(errors).map((field) => STEP_OF[field] ?? 4));
			status = 'idle';
			step = first;
			focusStep();
			return;
		}

		rateLimited = result.kind === 'rateLimited';
		status = 'error';
	};

</script>

<dialog
	bind:this={dialog}
	class="qd"
	aria-labelledby="qd-title"
	oncancel={(e) => {
		e.preventDefault();
		close();
	}}
	onclose={() => quote.hide()}
	onclick={(e) => {
		if (e.target === dialog) close();
	}}
>
	<div class="qd__panel" bind:this={panel}>
		<header class="qd__head">
			<div>
				<p class="eyebrow">{SITE.name} — {content.footer.tagline}</p>
				<h2 id="qd-title" class="qd__title">
					{status === 'success' ? copy.success.title : copy.title}
				</h2>
				{#if status !== 'success'}
					<p class="qd__sub">{copy.subtitle}</p>
				{/if}
			</div>
			<button type="button" class="qd__close" onclick={close} aria-label={copy.close}>
				<span aria-hidden="true">✕</span>
			</button>
		</header>

		{#if status !== 'success'}
			<div class="qd__progress" aria-hidden="true">
				{#each Array(TOTAL_STEPS) as _, i (i)}
					<span class="qd__seg" class:is-done={i <= step}></span>
				{/each}
			</div>
			<p class="qd__stepcount" aria-live="polite">
				{copy.stepLabel}
				<span class="qd__num">{step + 1}</span>
				{copy.of}
				{TOTAL_STEPS}
			</p>
		{/if}

		<form
			name={QUOTE_FORM_NAME}
			method="POST"
			action="/quote"
			class="qd__form"
			class:is-hidden={status === 'success'}
			onsubmit={onSubmit}
			novalidate
		>
			<input type="hidden" name="source" value={quote.source} />
			<input type="hidden" name="locale" value={locale} />
			<p class="qd__pot">
				<label>
					Do not fill this in
					<input name="bot-field" tabindex="-1" autocomplete="off" />
				</label>
			</p>

			<!-- STEP 1 — brand -->
			<fieldset class="qd__step" hidden={step !== 0}>
				<legend class="qd__legend">{copy.steps.brand.title}</legend>
				<p class="qd__hint">{copy.steps.brand.hint}</p>

				<div class="field">
					<label class="field__label" for="q-name">{copy.fields.name}</label>
					<input
						id="q-name"
						name="name"
						class="field__input"
						class:has-error={errors.name}
						placeholder={copy.fields.namePlaceholder}
						autocomplete="name"
						bind:value={form.name}
						aria-invalid={errors.name ? 'true' : undefined}
						aria-describedby={errors.name ? 'err-name' : undefined}
					/>
					{#if errors.name}<span class="field__err" id="err-name" role="alert">{errors.name}</span>{/if}
				</div>

				<div class="field">
					<label class="field__label" for="q-email">{copy.fields.email}</label>
					<input
						id="q-email"
						name="email"
						type="email"
						class="field__input"
						class:has-error={errors.email}
						placeholder={copy.fields.emailPlaceholder}
						autocomplete="email"
						inputmode="email"
						bind:value={form.email}
						aria-invalid={errors.email ? 'true' : undefined}
						aria-describedby={errors.email ? 'err-email' : undefined}
					/>
					{#if errors.email}<span class="field__err" id="err-email" role="alert">{errors.email}</span
						>{/if}
				</div>

				<div class="field">
					<label class="field__label" for="q-company">{copy.fields.company}</label>
					<input
						id="q-company"
						name="company"
						class="field__input"
						class:has-error={errors.company}
						placeholder={copy.fields.companyPlaceholder}
						autocomplete="organization"
						bind:value={form.company}
						aria-invalid={errors.company ? 'true' : undefined}
						aria-describedby={errors.company ? 'err-company' : undefined}
					/>
					{#if errors.company}<span class="field__err" id="err-company" role="alert"
							>{errors.company}</span
						>{/if}
				</div>

				<div class="field">
					<label class="field__label" for="q-url">{copy.fields.url}</label>
					<input
						id="q-url"
						name="url"
						class="field__input"
						placeholder={copy.fields.urlPlaceholder}
						autocomplete="url"
						bind:value={form.url}
					/>
				</div>
			</fieldset>

			<!-- STEP 2 — needs -->
			<fieldset class="qd__step" hidden={step !== 1}>
				<legend class="qd__legend">{copy.steps.needs.title}</legend>
				<p class="qd__hint">{copy.steps.needs.hint}</p>

				<div class="options options--grid">
					{#each QUOTE_NEEDS as option (option.id)}
						<label class="opt" class:is-on={form.needs.includes(option.id)}>
							<input
								type="checkbox"
								name="needs"
								value={option.label.en}
								checked={form.needs.includes(option.id)}
								onchange={() => toggleNeed(option.id)}
							/>
							<span class="opt__box" aria-hidden="true"></span>
							<span class="opt__label">{option.label[locale]}</span>
						</label>
					{/each}
				</div>
				{#if errors.needs}<span class="field__err" role="alert">{errors.needs}</span>{/if}
			</fieldset>

			<!-- STEP 3 — volume -->
			<fieldset class="qd__step" hidden={step !== 2}>
				<legend class="qd__legend">{copy.steps.volume.title}</legend>
				<p class="qd__hint">{copy.steps.volume.hint}</p>

				<div class="options">
					{#each QUOTE_VOLUMES as option (option.id)}
						<label class="opt" class:is-on={form.volume === option.id}>
							<input
								type="radio"
								name="volume"
								value={option.label.en}
								checked={form.volume === option.id}
								onchange={() => {
									form.volume = option.id;
									errors = { ...errors, volume: '' };
								}}
							/>
							<span class="opt__box opt__box--round" aria-hidden="true"></span>
							<span class="opt__label">{option.label[locale]}</span>
						</label>
					{/each}
				</div>
				{#if errors.volume}<span class="field__err" role="alert">{errors.volume}</span>{/if}
			</fieldset>

			<!-- STEP 4 — budget -->
			<fieldset class="qd__step" hidden={step !== 3}>
				<legend class="qd__legend">{copy.steps.budget.title}</legend>
				<p class="qd__hint">{copy.steps.budget.hint}</p>

				<div class="options">
					{#each QUOTE_BUDGETS as option (option.id)}
						<label class="opt" class:is-on={form.budget === option.id}>
							<input
								type="radio"
								name="budget"
								value={option.label.en}
								checked={form.budget === option.id}
								onchange={() => {
									form.budget = option.id;
									errors = { ...errors, budget: '' };
								}}
							/>
							<span class="opt__box opt__box--round" aria-hidden="true"></span>
							<span class="opt__label">{option.label[locale]}</span>
						</label>
					{/each}
				</div>
				{#if errors.budget}<span class="field__err" role="alert">{errors.budget}</span>{/if}
			</fieldset>

			<!-- STEP 5 — project -->
			<fieldset class="qd__step" hidden={step !== 4}>
				<legend class="qd__legend">{copy.steps.project.title}</legend>
				<p class="qd__hint">{copy.steps.project.hint}</p>

				<div class="field">
					<label class="field__label" for="q-brief">{copy.fields.brief}</label>
					<textarea
						id="q-brief"
						name="brief"
						rows="5"
						class="field__input field__input--area"
						class:has-error={errors.brief}
						placeholder={copy.fields.briefPlaceholder}
						bind:value={form.brief}
						aria-invalid={errors.brief ? 'true' : undefined}
						aria-describedby={errors.brief ? 'err-brief' : undefined}
					></textarea>
					{#if errors.brief}<span class="field__err" id="err-brief" role="alert">{errors.brief}</span
						>{/if}
				</div>

				<div class="field">
					<label class="field__label" for="q-deadline">
						{copy.fields.deadline}
						<span class="field__opt">{copy.fields.deadlineOptional}</span>
					</label>
					<input
						id="q-deadline"
						name="deadline"
						class="field__input"
						bind:value={form.deadline}
					/>
				</div>

				{#if status === 'error'}
					<div class="qd__error" role="alert">
						<strong>{copy.error.title}</strong>
						<span>{rateLimited ? copy.error.tooMany : copy.error.body}</span>
						{#if !rateLimited}
							<a href="mailto:{SITE.email}">{SITE.email}</a>
						{/if}
					</div>
				{/if}
			</fieldset>

			<div class="qd__actions">
				{#if step > 0}
					<button type="button" class="btn btn--ghost" onclick={goBack}>{copy.back}</button>
				{/if}
				{#if step < TOTAL_STEPS - 1}
					<button type="button" class="btn btn--primary qd__next" onclick={goNext}>
						{copy.next}
						<span class="arrow" aria-hidden="true">→</span>
					</button>
				{:else}
					<button
						type="submit"
						class="btn btn--primary qd__next"
						disabled={status === 'submitting'}
					>
						{status === 'submitting' ? copy.submitting : copy.submit}
						{#if status === 'submitting'}<span class="qd__spin" aria-hidden="true"></span>{/if}
					</button>
				{/if}
			</div>
		</form>

		{#if status === 'success'}
			<div class="qd__success" role="status">
				<span class="qd__check" aria-hidden="true">✓</span>
				<p>{copy.success.body}</p>
				<button type="button" class="btn btn--ghost" onclick={close}>{copy.success.action}</button>
			</div>
		{/if}
	</div>
</dialog>

<style>
	.qd {
		margin: auto;
		padding: 0;
		border: 0;
		background: transparent;
		max-inline-size: min(720px, 100vw);
		inline-size: 100%;
		max-block-size: 100dvh;
		color: var(--paper);
		overflow: visible;
		opacity: 0;
		transition:
			opacity var(--dur) var(--ease),
			transform var(--dur) var(--ease),
			overlay var(--dur) var(--ease) allow-discrete,
			display var(--dur) var(--ease) allow-discrete;
		transform: translateY(14px);
	}

	.qd[open] {
		opacity: 1;
		transform: none;
	}

	@starting-style {
		.qd[open] {
			opacity: 0;
			transform: translateY(14px);
		}
	}

	.qd::backdrop {
		background: rgba(4, 4, 6, 0);
		transition:
			background-color var(--dur) var(--ease),
			overlay var(--dur) var(--ease) allow-discrete,
			display var(--dur) var(--ease) allow-discrete;
	}

	.qd[open]::backdrop {
		background: rgba(4, 4, 6, 0.82);
		backdrop-filter: blur(6px);
	}

	@starting-style {
		.qd[open]::backdrop {
			background: rgba(4, 4, 6, 0);
		}
	}

	.qd__panel {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: var(--ink-100);
		border: 1px solid var(--line-strong);
		border-radius: var(--r-lg);
		padding: clamp(1.25rem, 3.5vw, 2.25rem);
		max-block-size: 100dvh;
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.qd__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.qd__title {
		font-size: clamp(1.5rem, 4.5vw, 2.1rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-mega);
		line-height: 1;
		margin-block-start: 0.75rem;
	}

	.qd__sub {
		font-size: var(--fs-small);
		color: var(--paper-35);
		margin-block-start: 0.5rem;
	}

	.qd__close {
		inline-size: 40px;
		block-size: 40px;
		border: 1px solid var(--line);
		border-radius: 50%;
		display: grid;
		place-items: center;
		color: var(--paper-50);
		flex: none;
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}

	.qd__close:hover {
		color: var(--paper);
		border-color: var(--paper-35);
	}

	.qd__progress {
		display: flex;
		gap: 4px;
	}

	.qd__seg {
		flex: 1;
		block-size: 2px;
		background: var(--line-strong);
		transition: background-color var(--dur) var(--ease);
	}

	.qd__seg.is-done {
		background: var(--accent);
	}

	.qd__stepcount {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-35);
		margin-block-start: -0.5rem;
	}

	.qd__num {
		color: var(--accent);
	}

	.qd__form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.qd__form.is-hidden {
		display: none;
	}

	.qd__pot {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.qd__step {
		border: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.qd__step[hidden] {
		display: none;
	}

	.qd__legend {
		font-family: var(--font-display);
		font-size: var(--fs-h4);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--track-tight);
		padding: 0;
	}

	.qd__hint {
		font-size: var(--fs-small);
		color: var(--paper-35);
		margin-block-start: -0.65rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field__label {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: var(--track-label);
		text-transform: uppercase;
		color: var(--paper-50);
		display: flex;
		gap: 0.5rem;
	}

	.field__opt {
		color: var(--paper-18);
	}

	.field__input {
		inline-size: 100%;
		background: var(--ink-050);
		border: 1px solid var(--line);
		border-radius: var(--r-sm);
		padding: 0.85rem 1rem;
		min-block-size: 48px;
		font-size: 1rem;
		color: var(--paper);
		transition:
			border-color var(--dur) var(--ease),
			background-color var(--dur) var(--ease);
	}

	.field__input::placeholder {
		color: var(--paper-18);
	}

	.field__input:focus {
		border-color: var(--accent);
		background: var(--ink-000);
	}

	.field__input--area {
		resize: vertical;
		min-block-size: 118px;
		line-height: 1.55;
	}

	.field__input.has-error {
		border-color: var(--danger);
	}

	.field__err {
		font-size: var(--fs-small);
		color: var(--danger);
	}

	.options {
		display: grid;
		gap: 0.5rem;
	}

	.options--grid {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr));
	}

	.opt {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--r-sm);
		padding: 0.85rem 1rem;
		min-block-size: 52px;
		cursor: pointer;
		background: var(--ink-050);
		transition:
			border-color var(--dur) var(--ease),
			background-color var(--dur) var(--ease);
	}

	.opt:hover {
		border-color: var(--paper-18);
	}

	.opt.is-on {
		border-color: var(--accent);
		background: var(--accent-tint);
	}

	.opt input {
		position: absolute;
		opacity: 0;
		inline-size: 1px;
		block-size: 1px;
	}

	.opt:has(input:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.opt__box {
		inline-size: 16px;
		block-size: 16px;
		border: 1px solid var(--line-strong);
		border-radius: 3px;
		flex: none;
		display: grid;
		place-items: center;
		transition:
			border-color var(--dur) var(--ease),
			background-color var(--dur) var(--ease);
	}

	.opt__box--round {
		border-radius: 50%;
	}

	.opt.is-on .opt__box {
		border-color: var(--accent);
		background: var(--accent);
	}

	.opt.is-on .opt__box::after {
		content: '';
		inline-size: 6px;
		block-size: 6px;
		border-radius: 1px;
		background: var(--on-accent);
	}

	.opt.is-on .opt__box--round::after {
		border-radius: 50%;
	}

	.opt__label {
		font-size: var(--fs-small);
		line-height: 1.3;
	}

	.qd__actions {
		display: flex;
		gap: 0.6rem;
		justify-content: flex-end;
		padding-block-start: 0.5rem;
		border-block-start: 1px solid var(--line);
	}

	.qd__next {
		flex: 1;
	}

	.qd__spin {
		inline-size: 12px;
		block-size: 12px;
		border: 1.5px solid rgba(10, 10, 12, 0.35);
		border-top-color: var(--on-accent);
		border-radius: 50%;
		animation: qd-spin 700ms linear infinite;
	}

	@keyframes qd-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.qd__error {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		border: 1px solid var(--danger);
		border-radius: var(--r-sm);
		padding: 0.9rem 1rem;
		font-size: var(--fs-small);
		color: var(--paper-70);
	}

	.qd__error a {
		color: var(--accent);
	}

	.qd__success {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.1rem;
		padding-block: 1rem 0.5rem;
	}

	.qd__check {
		inline-size: 46px;
		block-size: 46px;
		border-radius: 50%;
		background: var(--accent);
		color: var(--on-accent);
		display: grid;
		place-items: center;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.qd__success p {
		color: var(--paper-70);
		max-inline-size: 48ch;
	}

	@media (min-width: 640px) {
		.qd {
			max-block-size: 92dvh;
		}

		.qd__panel {
			max-block-size: 92dvh;
		}

		.qd__actions {
			justify-content: flex-start;
		}

		.qd__next {
			flex: 0 0 auto;
			min-inline-size: 200px;
		}
	}

	@media (max-width: 639px) {
		.qd {
			max-inline-size: 100vw;
			inline-size: 100vw;
			max-block-size: 100dvh;
			block-size: 100dvh;
			margin: 0;
			transform: translateY(100%);
		}

		.qd[open] {
			transform: none;
		}

		@starting-style {
			.qd[open] {
				transform: translateY(100%);
			}
		}

		.qd__panel {
			block-size: 100dvh;
			max-block-size: 100dvh;
			border-radius: 0;
			border: 0;
			padding-block-end: calc(1.5rem + env(safe-area-inset-bottom));
		}
	}
</style>
