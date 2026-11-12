# Pull Field: the page background

Date: 7 November 2026. This file is authoritative for the page background and the section surfaces. It supersedes [scene.md](scene.md) (the scroll-driven Ames room) and [hero-scene.md](hero-scene.md).

## Decision

The site owner rejected the Ames room in both executions. From the original impeccable directions they compared Blue Hour on the Ice and Pull Field, on the current site with only the background changed, and chose **Pull Field** with these changes:

1. Fewer particles.
2. Lower particle contrast, so the field is calm behind text.
3. No colour changes with scroll. The programme keeps a translucent blue background (the site owner set it to 95 %, then asked for a brighter, more saturated blue: `--programme-blue`, `oklch(0.34 0.14 255)`).
4. No section backgrounds elsewhere. A wash only where text contrast is very poor (the contrast guard; removed on 11 November 2026, see below).
5. Chaotic, tangled paths, not trails that collapse into the attractors.
6. No red markers: the bending paths show the attractors.

The sketches and the comparison harness are in [effects/](effects/).

## Concept

Rain falls as fine trails. Hidden attractors bend the paths: they loop through, fly back out and tangle. The visitor never sees what pulls them, only the effect. That is the conference subject: influence you see only in its effects.

## Files

| File                                         | Role                                                            |
| -------------------------------------------- | --------------------------------------------------------------- |
| `src/scripts/field/field.ts`                 | The field: simulation and drawing                               |
| `src/scripts/page-scene.ts`                  | Entry: motion, reduced motion, Save-Data, visibility, fallbacks |
| `src/components/conference/HeroScene.astro`  | Scene root inside `.page-scene`, with the rendered still        |
| `src/styles/hero.css`                        | Scene layer, still, hero layout                                 |
| `src/styles.css`                             | Immersive surface rules under `html[data-immersive]`            |
| `public/images/field-{desk,mob}.{avif,webp}` | Rendered stills: first paint and no-JavaScript fallback         |

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

Removed on 11 November 2026 at the site owner's request. The guard sampled the field behind each text block every 400 ms and showed a blurred local wash where contrast fell below 3.5:1 (small text) or 2.5:1 (large text). It was designed for the light field of revision 3. On the inverted field (plaster text on field blue, trails at 16–26 % opacity) it never switched on in 210 samples over the whole page at 390px and 1280px. Its wash also reached 1em past large text, beyond the phone gutter, which let the page scroll sideways. Text now sits on the field with no backing; keep the trails faint enough that it stays readable.

## Fallbacks

| Condition                        | Behaviour                                                          |
| -------------------------------- | ------------------------------------------------------------------ |
| First paint                      | The rendered still; the canvas covers it on the first script frame |
| `prefers-reduced-motion: reduce` | One settled, still frame (160 simulation steps), no animation      |
| Save-Data                        | Same as reduced motion                                             |
| No canvas or a script error      | The still stays; `data-renderer="still"`                           |
| No JavaScript                    | The still stays; all content is plain HTML                         |
| Hidden tab                       | Animation stops; it resumes on return                              |
| Print                            | Scene hidden                                                       |

The scene layer is `aria-hidden`, `pointer-events: none` and `user-select: none`, and it holds no information.

## Performance

- No library: the scene script is 8 KB minified (the Three.js room was about 124 KB gzipped).
- Canvas pixel ratio at most 1.25. Two strokes and one fill per frame.
- Measured on an Apple M4 (headless Chrome, production build): median and 95th-percentile frame interval 16.7 ms while scrolling the whole page, at 1440 × 900 @2 and at 390 × 844 @3 (mobile emulation). Real phones are not yet measured.

## Asset provenance

`public/images/field-desk.*` (1920 × 1200) and `field-mob.*` (780 × 1688) were rendered by the designer on 7 November 2026 from the live field on the production preview, in headless Chrome with page content hidden, and encoded with ImageMagick (WebP q82, AVIF q60). The social card `public/social-cards/default.jpg` is `docs/design/mock/og.html` rendered at 1200 × 630 over `docs/design/assets/field-desk.webp`. All procedural; no generated or third-party imagery.

## Field mark

The logo is three strands wound into one spiral around a point that is never drawn, the capture that the field's wells make. The site owner chose it on 11 November 2026 ("Orbit", the "No entry" variant), replacing "Drift" (10 November). `scripts/generate-mark.ts` draws each strand as a logarithmic spiral, 120° apart, from radius 44 to radius 6 in one and a half turns (100-unit box). Small sizes (40px and below, the 32px favicon) use 1.1 turns ending at radius 9; the 16px favicon uses 0.8 turns ending at 14. Plaster strands, with no ring and no clip.

`FieldMark.astro` draws it in the text colour of its surface, with the stroke width set by `--mark-stroke` (100-unit box). It appears in three places: beside the header wordmark (small, stroke 3.8, 36px, 28px on phones, hidden below 390px so the wordmark keeps two lines), to the right of the programme heading in field blue on beige (large, stroke 2.4, 72–144px), and above the footer title in plaster (large, stroke 2.4, 64px). The favicons and the home-screen icon put the spiral, scaled to 80 %, on a field-blue disc. The script draws `favicon.ico` and `apple-touch-icon.png` itself, because ImageMagick's built-in SVG renderer drops unfilled strokes.

## Known limits

- `three` and `@types/three` remain in `package.json` but are no longer imported.
