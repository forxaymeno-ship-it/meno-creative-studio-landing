import { browser } from '$app/environment';

interface RevealOptions {
	/** ms */
	delay?: number;
	threshold?: number;
	/** clip-path wipe instead of fade+rise */
	mask?: boolean;
	once?: boolean;
}

/**
 * Adds `.is-in` when the element scrolls into view.
 * The visual behaviour lives in app.css (.reveal / .reveal-mask).
 */
export const reveal = (node: HTMLElement, options: RevealOptions = {}) => {
	if (!browser) return;

	const { delay = 0, threshold = 0.12, mask = false, once = true } = options;

	node.classList.add(mask ? 'reveal-mask' : 'reveal');
	if (delay) node.style.transitionDelay = `${delay}ms`;

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-in');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-in');
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.classList.remove('is-in');
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
};
