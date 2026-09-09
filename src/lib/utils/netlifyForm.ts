export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export interface NetlifySubmitOptions {
	/** Netlify form name — must match the form's `name` attribute. */
	formName: string;
	/** Field values. Arrays are joined so multi-selects arrive readable. */
	values: Record<string, string | string[] | undefined>;
	/** Path the POST is sent to. Any prerendered path works on Netlify. */
	action?: string;
	/** Honeypot field name, must match `data-netlify-honeypot`. */
	honeypotField?: string;
	honeypotValue?: string;
}

export const encodeFormData = (data: Record<string, string>): string =>
	Object.entries(data)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

/**
 * Progressive-enhancement submit for Netlify Forms on a static site.
 * Keeps the visitor on the page: no navigation, no thank-you redirect.
 */
export const submitToNetlify = async ({
	formName,
	values,
	action = '/',
	honeypotField = 'bot-field',
	honeypotValue = ''
}: NetlifySubmitOptions): Promise<void> => {
	const payload: Record<string, string> = {
		'form-name': formName,
		[honeypotField]: honeypotValue
	};

	for (const [key, value] of Object.entries(values)) {
		if (value === undefined) continue;
		payload[key] = Array.isArray(value) ? value.join(', ') : value;
	}

	const response = await fetch(action, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: encodeFormData(payload)
	});

	if (!response.ok) {
		throw new Error(`Form submission failed with status ${response.status}`);
	}
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: string): boolean => EMAIL_RE.test(value.trim());
