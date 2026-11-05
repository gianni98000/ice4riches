# Ice4Riches — continuous clear-ice scene

Status: release candidate validated locally, 5 November 2026. Deployment receipt is recorded in the external production project.

The homepage now follows one clear-ice block from suspension to service, then leads directly into the working glass selector. The cinematic image is separate from the HTML interface: the bartender can use Ice Lab immediately, without waiting for playback.

## Design and behavior

- A centered product scene replaces the supporting vertical macro film. The title stays readable above it; liquid-logo gives only the word “glace” an optical finish.
- Ice Lab follows the opening directly. Existing dimensions, conservative fit rules, uncertain-glass handling and product-specific order links remain intact.
- Playback is silent and runs once. Visitors can pause or replay. It pauses outside the viewport and in a hidden tab; a manual pause survives scrolling away and back.
- Reduced motion and data saving keep the poster until the visitor explicitly requests playback. A missing film falls back to the existing media. If both fail, the selector still works and the film control reports its unavailable state.
- Desktop and mobile retain the complete cube and glass. The mobile stage has an explicit flex basis and height; its playback control sits in the empty upper corner.

## Media and provenance

The new scene is produced through StoryzProd using Massed Compute. The initial scene image uses FLUX.1-dev BF16 with CLIP-L, T5 FP16 and AE, at 2048×1152. Its selected take is initial-r4; earlier frames were rejected for a misplaced cube, unsuitable glass proportions or frosted material. H3 produces the motion from selected actual frame anchors.

Selected master and all three source takes: native 2048×1152, 24 fps, verified against generation graphs and decoded media. Final duration: 12.041667 seconds, 289 frames. Web H264: 2,582,778 bytes; WebP poster: 71,174 bytes. The master is preserved as FFV1 on external storage. H3 uses the configured 20-step quality preset, with speedup and face inpainting disabled. The optional LoRA stack is disabled with all strengths zero.

Product reference: existing Ice4Riches cube photography. The public CAFÉ OS reel by polanaeem.tech informed the relation between an object scene and a real interface; no third-party footage, graphics, robot arm or interface is included. Paper Design liquid-logo attribution and its full license remain linked in the footer. No model weights are distributed with the website. FLUX model provenance and terms: https://huggingface.co/Comfy-Org/Flux-1-Dev and https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md.

All renders, image references, exports, site assets, build caches and evidence screenshots are stored on the user's external storage. Browser test profiles use temporary RAM, not the almost-full internal disk.

## Validation

Production build, TypeScript/ESLint and source design lint pass (0 failures, 0 warnings for the changed sources). Final browser inspection at 1440, 768 and 390 pixels passes with two documented design warnings: distinct type sizes for the operational selector and large wordmark, and intentional empty space at the closing action. All ten inspector images and nine phase/reduced-motion screenshots were actually inspected. No horizontal overflow or console error was found in final movie checks.

The exact new 2K source loads, chapter labels follow its cuts, the ended control offers replay, reduced motion requires explicit play, and data saving avoids loading the source. Ice Lab interaction results are recorded separately in the external work/interaction-review directory. Automated Chromium tests are not physical-device tests.

Video QA includes complete technical decoding, sampled frames throughout the film, and consecutive frames around both cuts and the final dissolve. No continuous human viewing or listening is claimed; the film is silent. S01 received a cold grade. S03 received background cleanup, removal of a late off-glass streak using another actual frame, and a short dissolve into an editorial hold of its actual final image. Foam remains in that held image; this is not evidence of naturally settled fluid. The raw takes and edit manifests are preserved.

External evidence: work/site-final-review/report.json, work/final-film-review/results.json, work/motion-proof.json, evidence/assembly-v1.json and evidence/s03-finished-qa.json under /mnt/storage/projects/ice4riches-web-cinematic-2k.
