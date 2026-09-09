# MENO — AI Creative Studio

Marketing site for MENO. SvelteKit 2 + Svelte 5 (runes) + TypeScript, deployed
to Cloudflare Workers with `@sveltejs/adapter-cloudflare`. Every page is
prerendered and served as a static asset; the only server route is `/quote`,
which writes quote requests to MongoDB.

```sh
npm install
npm run db:setup                 # one-off: create the collection indexes
npm run dev                      # http://localhost:5173
npm run check                    # svelte-check + tsc
npm run build                    # -> .svelte-kit/cloudflare/
npm run preview                  # wrangler dev, with real bindings
npm run deploy                   # build + wrangler deploy
```

---

## Where to put your assets

Nothing here ships with fake work. Every media slot renders a designed
placeholder tile until you drop a real file in, so the layout never breaks
while the portfolio is still being filled.

| What | Where | Notes |
| --- | --- | --- |
| Logo / wordmark files | `static/brand/` | `favicon.svg` and `meno-mark.svg` are already there. |
| Hero reels | `static/videos/hero/` | `hero-01.mp4`, `hero-02.mp4`, `hero-03.mp4` — 9:16, H.264 MP4, no audio track needed. |
| Portfolio reels | `static/videos/work/` | `work-01.mp4` … `work-09.mp4`. File names are configured in `src/lib/data/work.ts`. |
| Poster frames | `static/images/work/` | `work-01.jpg` … `work-09.jpg`, plus `hero-01.jpg` … `hero-03.jpg`. First frame of each video, ~1080px wide, compressed. **Strongly recommended** — the poster is what a visitor sees before the video streams. |
| Social share image | `static/images/og/og-cover.png` | 1200×630. One is already generated; replace it whenever the headline changes. |
| Client logos | `static/brand/clients/` | Only once a partnership is real. Register them in `CLIENT_LOGOS` in `src/lib/data/work.ts`; while that array is empty the brand strip renders neutral slots instead. |

**Video encoding:** H.264 MP4, `faststart` enabled, no audio track, ~2–4 Mbps for
9:16. Nothing autoplays with sound and nothing downloads until the tile is
within 400px of the viewport.

```sh
ffmpeg -i input.mov -an -vf "scale=1080:-2" -c:v libx264 -crf 23 -preset slow \
       -movflags +faststart static/videos/work/work-01.mp4
ffmpeg -i static/videos/work/work-01.mp4 -frames:v 1 -q:v 4 \
       static/images/work/work-01.jpg
```

---

## Where to change content

You should never need to open a `.svelte` file to change a word.

| File | Holds |
| --- | --- |
| `src/lib/data/site.ts` | Studio name, domain, email, Instagram, founding year, OG image path. **Everything marked PLACEHOLDER must be replaced before launch.** |
| `src/lib/data/work.ts` | Portfolio items (title, category, year, grid size, video + poster paths), hero reels, client logos. |
| `src/lib/data/quote.ts` | Quote form options: what the client needs, content volume, **budget bands**. Edit the bands and currency here and nowhere else. |
| `src/lib/content/en.ts` | All English copy — nav, hero, services, FAQ, legal, form labels. |
| `src/lib/content/fr.ts` · `ar.ts` | French and Arabic translations of the same shape. |
| `src/lib/content/types.ts` | The contract all three locale files must satisfy. `npm run check` fails if one drifts. |

Changing the domain in `site.ts` also means updating `static/robots.txt` and
`static/sitemap.xml` — those two are plain static files.

### Design tokens

The entire visual identity is CSS custom properties at the top of
`src/app.css`: surfaces, type colours, the single warm accent, the type scale,
spacing rhythm, radii and motion timings. Change `--accent` and the whole site
changes with it.

---

## Deployment — Cloudflare Workers

`wrangler.jsonc` holds the whole deployment config: the built worker at
`.svelte-kit/cloudflare/_worker.js`, the static assets binding, `nodejs_compat`
(the MongoDB driver needs `node:net` and `node:tls`), and the rate limiter.

```sh
npx wrangler secret put MONGODB_URI
npx wrangler secret put MONGODB_DB     # optional, defaults to "meno"
npm run deploy
```

Security and cache headers live in `_headers` at the project root (the adapter
copies it into the build), which Cloudflare applies to the served assets.

**Atlas network access.** Workers have no stable egress IP, so the Atlas
project must allow `0.0.0.0/0`. Protect the cluster with a strong,
least-privilege database user instead — the app only needs `insert` and
`find` on `meno.quotes`.

---

## Quote requests → MongoDB

The dialog posts to a SvelteKit form action at `/quote`
(`src/routes/quote/+page.server.ts`), the one route that is not prerendered.

| File | Role |
| --- | --- |
| `src/lib/server/mongo.ts` | Connection helper and the `QuoteDocument` shape. |
| `src/lib/server/quote.ts` | Server-side validation, honeypot, rate limiting, insert. |
| `src/lib/utils/quoteForm.ts` | Client-side enhancement — posts without navigating. |
| `src/routes/quote/+page.svelte` | The no-JS result page. |
| `scripts/init-db.mjs` | Creates the collection indexes. |

**Connections are per request.** Cloudflare binds each socket to the request
that opened it, so a cached `MongoClient` throws *"Cannot perform I/O on behalf
of a different request"* on the second submission. `withDb()` therefore opens
and closes a client inside the request. At a handful of leads a day the extra
connect is not worth engineering around; if volume ever justifies it, move the
client into a Durable Object.

**Nothing from the browser is trusted.** Every field is re-validated and
length-capped server-side, and the multi-select values are matched back against
`src/lib/data/quote.ts`, so the collection only ever holds configured labels.
Option labels are stored in English regardless of the visitor's locale, with
the locale itself kept on the document.

**Rate limiting** uses Cloudflare's `QUOTE_LIMITER` binding — 5 submissions per
IP per minute. That binding does not exist under `vite dev`, so a second gate
counts recent documents for the same IP and applies the same ceiling.

**Failure is quiet.** The honeypot returns success so bots learn nothing; real
errors log to the Worker and the visitor sees the studio email address.

### Reading submissions

```js
db.quotes.find({ status: 'new' }).sort({ createdAt: -1 })
```

Documents carry `name`, `email`, `company`, `url`, `needs[]`, `volume`,
`budget`, `brief`, `deadline`, `source`, `locale`, `status`, `createdAt` and a
`meta` object (`ip`, `userAgent`, `referer`, `country`).

---

## Notes

- Everything except `/quote` is prerendered. `src/hooks.server.ts` stamps
  `lang`/`dir` onto `<html>` — at build time for the prerendered pages, at
  request time for `/quote`.
- `/quote` is `noindex` and disallowed in `robots.txt`; a GET redirects home.
- Videos pause when they leave the viewport or the tab is hidden, and never
  autoplay under `prefers-reduced-motion`.
