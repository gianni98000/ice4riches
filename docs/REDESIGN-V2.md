# Ice4Riches — cinematic redesign v2

Implements the user's request to change all three aspects of v1: art direction, cinematic opening and playful glass/ice selection, plus their explicit request to use liquid-logo.

| Before | After | Why |
| --- | --- | --- |
| Serif/gold, small labels and ornamental rules | Switzer, graphite and ice-white fields, orange action | Clearer hierarchy and a distinct visual identity |
| Supporting film with a text-heavy opening | Oversized H3 macro shot and direct glass selector entry | Give the product the first impression |
| Tall, separated controls | Glass and controls grouped, actual format thumbnails, folded measurements, pour/view controls | Reduce the effort to compare glass sizes and ice formats |
| Static wordmark | Paper Design liquid-logo shader in cold tones | Give the material a recognizable optical effect |

## Sources
- Shader: https://github.com/paper-design/liquid-logo, commit 689bb38a1e0d5a6a8baf2d34847635eefde19994. PolyForm Shield 1.0.0; complete terms served at /licenses/liquid-logo.txt and linked in footer. Adaptations: cold palette, high precision, stable denominator, short animation budget and lifecycle, lightweight text distance-field mask. No editor or dependency upgrade added.
- Switzer: https://www.fontshare.com/fonts/switzer, self-hosted 400/500/600 WOFF2.
- Product photos, client marks and H3 film: pre-existing Ice4Riches assets; film provenance in CINEMATIC-ICE-LAB.md. No new H3 generation or external paid job.

## Verification
- Boundary tests: tests/ice-fit.test.mjs (10 cases).
- React integration harness checks presets, custom measures, incompatible results, order links and contextual WhatsApp text.
- Browser checks cover real UI controls, WebGL readiness/error codes, reduced motion and horizontal overflow.
- Visual audit: 1440, 768 and 390 px; full-page contact sheets and first viewports under .taste-skill. Individual Ice Lab and reduced-motion captures under .impeccable/review.
- Taste source lint: no banned patterns. Impeccable detector: no findings.

## Audit interpretation
The motion detector does not observe WebGL pixel changes or reliably count one-shot Web Animations API reveals; the opening video, bounded shader and control feedback provide the intended motion. The icon-card finding refers to product selection buttons inside the data-ui workspace, not marketing cards. These two findings are explicit false positives, not reasons to add ornamental motion or remove useful controls. The larger closing action field deliberately leaves breathing room; it is followed by the full-width wordmark. Logo scale is distinct from body typography.

## Final review evidence

Build and TypeScript/ESLint passed. The 10 geometry boundary cases passed. Browser integration passed with no exceptions; both WebGL contexts returned error code 0 on desktop, tablet, mobile and mobile with reduced motion. The visual measurement pass reports 0 failures and 2 advisory warnings, with the two false-positive allowances described above. Before-redesign measurement findings: 15 failures and 7 warnings.

A fresh Impeccable reviewer requested one visible correction (remove shader moire) and one documentation correction (persist the explicit direction contract). The shader fix separates material coordinates from texture aspect ratio, clamps optical bulge and adds derivative-aware band smoothing. Recaptures of hero and footer at 1440, 768 and 390 pixels, including reduced motion, resolved the visible finding. The review makes no claim of fidelity to an approved image comp.
