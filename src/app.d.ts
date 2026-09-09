/** Cloudflare's rate limiting binding — see wrangler.jsonc `ratelimits`. */
interface RateLimitBinding {
	limit(options: { key: string }): Promise<{ success: boolean }>;
}

declare global {
	namespace App {
		interface Platform {
			env?: {
				/** Absent under `vite dev`; present under `wrangler dev` and in production. */
				QUOTE_LIMITER?: RateLimitBinding;
			};
		}
	}
}

export {};
