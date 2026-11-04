# Ice4Riches — cinematic storefront and Ice Lab

Date: 4 November 2026. Worktree: `/home/gianni/ice4riches-cinematic`.
Base: `f0027defe08ea78b6582a4017dacdb52915975e9` (published production commit at start).

## Scope

Homepage redesign on the existing Next.js / Netlify site, retaining the order flow,
founder profile, custom engraving quotation, accessories and regional SEO pages.
An interactive Ice Lab uses the four actual catalogue formats. The selected SKU
is carried into `/order?product=...#Ice` and identified without adding anything to
the cart. Contact links only prepare a WhatsApp message; they do not send it.

## Compatibility model

All calculations use interior millimetres. A square prism is checked using its
horizontal diagonal, not its edge, with 4 mm diametral allowance. All formats need
5 mm headroom. Both the opening and base must accommodate that footprint. This
is intentionally conservative for circular straight or regularly tapered glasses.
Curves, necks, faceted interiors, and narrow bases require physical verification.
A sphere resting above a tapered base is not simulated. Liquid level is illustrative;
there is no buoyancy, displacement or melting simulation. Presets are examples,
not manufacturer-certified glass specifications. Cocktail suggestions are separate
from physical fit, and stock is read from the existing catalogue.

## Assets and provenance

- `public/cinematic/{cube,old-fashioned,collins,sphere}.jpg`: existing original
  Ice4Riches product photos, copied from the verified product reference pack at
  `/home/gianni/histoires /ice4riches-clear-ice-story-10s/references/products`.
- `public/cinematic/clear-ice-h3.mp4`: existing approved MiniMax H3 shot, job
  `1b32347a-f149-4cd6-a3fa-c72b4829300b-e1`. Source:
  `/home/gianni/histoires /ice4riches-clear-ice-story-10s/rushes/p01-r1.mp4`.
  Trimmed from 1.2 s for 6.4 s, silent H.264, CRF 24, faststart, 467624 bytes.
  No new generation or RunPod resource changes for this redesign.
- `clear-ice-poster.webp`: frame at 3 s from the same source.
- `cocktail.jpg`: existing homepage photograph, cached locally from
  `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=85`.
- `bar.jpg`: existing ambience photograph, locally cached from
  `https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1600&q=85`.
  Available as an alternate; currently unused in the page.
- Existing client marks are retained, with no new client claims.

Motion is optional: reduced-motion or save-data starts with the poster and no video
request. The visitor can explicitly start/pause. Offscreen video pauses. The existing
client carousel is made manually scrollable on the homepage to avoid continuous
uncontrolled animation.

## Verification

- `npm run build`: passes compilation, Next ESLint and TypeScript; 19 pages generated.
- `node --test tests/ice-fit.test.mjs`: 10 passing geometric / link boundary tests.
- DOM interaction checks (JSDOM, temporary harness in `/tmp/ice4riches-qa`): presets,
  sliders, fitting and non-fitting results, top/side view, order link, irregular
  checkbox, and contextual contact message all pass. No external message sent.
- Local production HTTP checks: homepage, order, founder, guide, regional pages and
  all used product/video assets return 200; JSON-LD parses.
- Browser visual QA unavailable: `cua.getBrowser` reports no browser available.
  Responsive CSS is implemented, but actual desktop/mobile layout is not visually
  certified in this session. Do not describe these tests as screenshots/browser QA.
