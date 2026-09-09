import { browser } from '$app/environment';

interface PlayInViewOptions {
	/** Attached only once the element is close to the viewport. */
	src: string;
	/** Skip autoplay entirely (used for reduced motion / no asset). */
	disabled?: boolean;
}

const prefersReducedMotion = () =>
	browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lazily attaches a video source and plays it only while it is on screen.
 * Nothing is downloaded until the tile approaches the viewport, and every
 * off-screen video is paused so a page full of reels stays cheap.
 */
export const playInView = (node: HTMLVideoElement, options: PlayInViewOptions) => {
	if (!browser) return;

	let current = options;
	let attached = false;

	const attach = () => {
		if (attached || !current.src) return;
		node.src = current.src;
		attached = true;
	};

	const play = () => {
		if (current.disabled || prefersReducedMotion() || !current.src) return;
		attach();
		const attempt = node.play();
		if (attempt) attempt.catch(() => {});
	};

	if (typeof IntersectionObserver === 'undefined') {
		attach();
		return;
	}

	const loader = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) if (entry.isIntersecting) attach();
		},
		{ rootMargin: '400px 0px' }
	);

	const player = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) play();
				else if (!node.paused) node.pause();
			}
		},
		{ threshold: 0.35 }
	);

	loader.observe(node);
	player.observe(node);

	const onVisibility = () => {
		if (document.hidden && !node.paused) node.pause();
	};
	document.addEventListener('visibilitychange', onVisibility);

	return {
		update(next: PlayInViewOptions) {
			current = next;
			if (next.disabled && !node.paused) node.pause();
		},
		destroy() {
			loader.disconnect();
			player.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
		}
	};
};
