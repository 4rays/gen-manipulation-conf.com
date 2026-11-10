# Pull Field: the page background

Date: 7 November 2026. This file is authoritative for the page background, the section surfaces and the contrast guard. It supersedes [scene.md](scene.md) (the scroll-driven Ames room) and [hero-scene.md](hero-scene.md).

## Decision

The site owner rejected the Ames room in both executions. From the original impeccable directions they compared Blue Hour on the Ice and Pull Field, on the current site with only the background changed, and chose **Pull Field** with these changes:

1. Fewer particles.
2. Lower particle contrast, so the field is calm behind text.
3. No colour changes with scroll. The programme keeps a translucent blue background (the site owner set it to 95 %, then asked for a brighter, more saturated blue: `--programme-blue`, `oklch(0.34 0.14 255)`).
4. No section backgrounds elsewhere. A wash only where text contrast is very poor.
5. Chaotic, tangled paths, not trails that collapse into the attractors.
6. No red markers: the bending paths show the attractors.

The sketches and the comparison harness are in [effects/](effects/).

## Concept

Rain falls as fine trails. Hidden attractors bend the paths: they loop through, fly back out and tangle. The visitor never sees what pulls them, only the effect. That is the conference subject: influence you see only in its effects.

## Files

| File                                         | Role                                                                |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `src/scripts/field/field.ts`                 | The field: simulation, drawing, sampling for the guard              |
| `src/scripts/field/guard.ts`                 | Contrast guard: samples the field behind text, toggles local washes |
| `src/scripts/page-scene.ts`                  | Entry: motion, reduced motion, Save-Data, visibility, fallbacks     |
| `src/components/conference/HeroScene.astro`  | Scene root inside `.page-scene`, with the rendered still            |
| `src/styles/hero.css`                        | Scene layer, still, guard wash, hero layout                         |
| `src/styles.css`                             | Immersive surface rules under `html[data-immersive]`                |
| `public/images/field-{desk,mob}.{avif,webp}` | Rendered stills: first paint and no-JavaScript fallback             |

## The field

- Ground: plaster `#f1f5f8`, constant. Each frame fades the previous one by 7 %, which leaves short trails.
- Trails: 1px lines. 80 % are Swedish blue at 20 % alpha, 20 % a deeper blue at 28 %. All trails are batched into two `Path2D` strokes per frame.
- Count: about one trail per 1700 px² of viewport, 900 at most (about 760 at 1440 × 900, about 190 at 390 × 844).
- Motion: each trail falls with a small random sideways speed, in a slow meandering current. Three attractors (masses 1, 0.7, 0.55) pull with a softened inverse-square force (pull 0.078, core softening 0.01 of the viewport's short side squared). Friction is 0.1 % per frame and speed is capped at 6.5 px per frame, so bound paths keep wide loops. A trail lives 250–700 frames, and ages five times faster within 5 % of a core, so no knot builds up.
- Attractors: never drawn. They drift slowly (±4.5 % across, ±4 % down). Positions avoid the hero and footer text: (0.72, 0.36), (0.9, 0.6), (0.5, 0.68) on landscape screens; (0.72, 0.28), (0.9, 0.5), (0.32, 0.44) on portrait screens.
- Scroll does not change the field. It is the same everywhere on the page.

## Surfaces

Under `html[data-immersive]`:

| Surface                          | Treatment                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Header                           | Plaster glass, 78 %, `blur(18px) saturate(1.25)`                                                          |
| Hero, about, speakers, abstracts | No background; ink text; muted text uses Ink Muted Glass `oklch(0.405 0.06 256)`; links Deep Swedish Blue |
| Facts strip, venue               | No background; read as light sections (ink text, Swedish-blue primary action)                             |
| Programme                        | Programme Blue `oklch(0.34 0.14 255)`, 95 %; rules `oklch(0.5 0.12 252)`                                  |
| Footer                           | No background; reads as a light section                                                                   |

## Contrast guard

Text sits directly on the field. Every 400 ms, and never during a scroll gesture, the guard samples a point-sampled copy of the field (one pixel per 6 CSS px) behind each text block. It composites any painted section background over it, and compares the result with the block's text colour. A block gets a soft wash (plaster behind dark text, night behind light text, 80 % opacity, blurred 18px, 0.6em × 1em outset) when:

- the 10th-percentile contrast is below 3.5:1 for text under 24px, or below 2.5:1 for larger text, or
- in any tile about two lines high and 160px wide behind small text, more than 20 % of the field is within 3:1 of the text colour (a busy patch).

The wash goes again when the 10th percentile is 1.0 above the threshold and no tile is busy. In the checks below, washes were rare: the field is light and sparse enough that most text never needs one.

## Fallbacks

| Condition                        | Behaviour                                                          |
| -------------------------------- | ------------------------------------------------------------------ |
| First paint                      | The rendered still; the canvas covers it on the first script frame |
| `prefers-reduced-motion: reduce` | One settled, still frame (160 simulation steps), no animation      |
| Save-Data                        | Same as reduced motion                                             |
| No canvas or a script error      | The still stays; `data-renderer="still"`                           |
| No JavaScript                    | The still stays; all content is plain HTML                         |
| Hidden tab                       | Animation stops; it resumes on return                              |
| Print                            | Scene and washes hidden                                            |

The scene layer is `aria-hidden`, `pointer-events: none` and `user-select: none`, and it holds no information.

## Performance

- No library: the scene script is 8 KB minified (the Three.js room was about 124 KB gzipped).
- Canvas pixel ratio at most 1.25. Two strokes and one fill per frame.
- Measured on an Apple M4 (headless Chrome, production build): median and 95th-percentile frame interval 16.7 ms while scrolling the whole page, at 1440 × 900 @2 and at 390 × 844 @3 (mobile emulation). Real phones are not yet measured.

## Asset provenance

`public/images/field-desk.*` (1920 × 1200) and `field-mob.*` (780 × 1688) were rendered by the designer on 7 November 2026 from the live field on the production preview, in headless Chrome with page content hidden, and encoded with ImageMagick (WebP q82, AVIF q60). The social card `public/social-cards/default.jpg` is `docs/design/mock/og.html` rendered at 1200 × 630 over `docs/design/assets/field-desk.webp`. All procedural; no generated or third-party imagery.

## Field mark

The logo is a round window onto the field, chosen by the site owner on 10 November 2026 ("Drift"). `scripts/generate-mark.ts` runs the forces above with no randomness and no current: evenly spaced drops fall, one well at (0.6, 0.45) that is never drawn combs them together, and a strand in its core ages 40 times faster, so it tangles once or twice and ends. The strands are clipped to the circle. Seven strands for large sizes, five at 40px and below (header, favicons). Plaster on field blue, with a ring at 35 %.

`FieldMark.astro` draws it in the text colour of its surface, with the stroke width set by `--mark-stroke` (100-unit box). It appears in three places: beside the header wordmark (five strands, 36px, 28px on phones, hidden below 390px so the wordmark keeps two lines), to the right of the programme heading in field blue on beige (seven strands, 72–144px), and above the footer title in plaster (seven strands, 64px). The script draws `favicon.ico` and `apple-touch-icon.png` itself, because ImageMagick's built-in SVG renderer drops unfilled strokes.

## Known limits

- The guard reads canvas pixels back every 400 ms. It is cheap at this sample size, but it is still a read-back on the main thread.
- `three` and `@types/three` remain in `package.json` but are no longer imported.
