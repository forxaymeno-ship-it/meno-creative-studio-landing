# MENO — AI Creative Studio

Static marketing site for MENO. SvelteKit 2 + Svelte 5 (runes) + TypeScript,
prerendered with `@sveltejs/adapter-static`, deployed on Netlify.
No backend, no API routes, no database. Quote requests go through Netlify Forms.

```sh
npm install
npm run dev      # http://localhost:5173
npm run check    # svelte-check + tsc
npm run build    # -> build/
npm run preview  # serve the production build
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

## Netlify

`netlify.toml` is already configured (`npm run build` → `build/`, plus security
and cache headers).

**Forms.** Netlify discovers forms by parsing the *prerendered* HTML at deploy
time. The quote form is therefore always present in the DOM — the dialog is
rendered closed, not conditionally created — and carries `data-netlify="true"`,
a hidden `form-name` input and a `bot-field` honeypot. Submission is
progressively enhanced: `src/lib/utils/netlifyForm.ts` intercepts the submit and
POSTs URL-encoded data with `fetch`, so the visitor never leaves the page.
Submissions land under **Forms → quote** in the Netlify dashboard.

After the first deploy, verify the form was detected. If it wasn't, check that
`build/index.html` still contains `data-netlify="true"`:

```sh
npm run build && grep -c 'data-netlify="true"' build/index.html
```

**Locales.** The site prerenders `/`, `/fr` and `/ar` (plus legal pages for
each). All three contain the same form named `quote`; Netlify treats them as one
form. Option values are always submitted in English so the inbox reads
consistently regardless of the visitor's language.

---

## Notes

- `_legacy-template/` is the previous project this repo was forked from. It is
  not built, not deployed and not referenced. Delete it when you're ready.
- The site is fully prerendered; there are no `+server.ts` or `+page.server.ts`
  files. `src/hooks.server.ts` runs at build time only, to stamp `lang`/`dir`
  onto `<html>` for each locale.
- Videos pause when they leave the viewport or the tab is hidden, and never
  autoplay under `prefers-reduced-motion`.
