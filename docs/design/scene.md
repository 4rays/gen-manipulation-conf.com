# The Vantage Room, revision 2: page-wide scene

> **Superseded on 7 November 2026** by [field.md](field.md). The site owner rejected this scene and chose the Pull Field. This file is the record of revision 2.

Date: 7 November 2026. This file is authoritative for the scene, the glass surfaces, the scroll choreography and the fallbacks. It supersedes [hero-scene.md](hero-scene.md) and the hero, toggle and caption rules in [components.md](components.md).

## Concept

The room is the page. A fixed WebGL scene sits behind all content. At the top of the page the camera is at the vantage point V, where the Ames illusion is exact: two identical figures look small and tall. Normal scroll moves the camera off V, out through the open front of the room, and above it. At the bottom of the page the room is a lit model in a night-blue space. The true trapezoid, the perceived rectangular room (blue lines) and the red sight lines from V show how the trick works. The scroll unravels the manipulation.

## Files

| File                                                      | Role                                                                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/scripts/hero/ames.ts`                                | Construction constants, window and figure stations, the map and its inverse                              |
| `src/scripts/hero/figure.ts`                              | Procedural figure: lofted superellipse sections, cloth and skin groups                                   |
| `src/scripts/hero/shaders.ts`                             | Shared GLSL (inverse map, window-beam test, noise); surface, sky, volume, dust, bloom, composite shaders |
| `src/scripts/hero/choreography.ts`                        | Camera keys and the spline through them                                                                  |
| `src/scripts/hero/room.ts`                                | Scene, lights, render passes, frame loop, quality tiers, disposal                                        |
| `src/scripts/hero-scene.ts`                               | Scroll progress, lazy load, still fallback, visibility, reduced motion, hooks                            |
| `src/components/conference/HeroScene.astro`               | Scene root and the three still pictures                                                                  |
| `src/styles/hero.css`                                     | Scene layer, still dissolves, hero layout and wash, footer coda                                          |
| `src/styles.css`                                          | Glass surfaces under `html[data-immersive]`                                                              |
| `public/images/vantage-{desk,mob}-{0,50,100}.{avif,webp}` | Rendered poses for first paint and fallback                                                              |

## Construction

- The map `p′ = p / (1 + 0.105 x)` fixes V at the origin. Planes stay planes and rays through V are preserved. True room: 6 m wide, 3.4 m high, eye 1.55 m, front opening at z = −2.2, back wall at z = −8.
- All parts are true-space boxes mapped vertex by vertex: floor slab, side walls, back wall (extruded with two window holes), ceiling slab, window mullions and transoms. Walls are 0.16 m thick.
- Surfaces use `MeshStandardMaterial` with an injected shader. Each fragment maps itself back to true space and selects its finish: plaster walls with low-frequency noise, a blue-deep skirting and a faint dado line; a plaster ceiling; a filtered 8 × 8 checker floor of plaster and Swedish-blue tiles with grout and a small per-tile tone change; model board outside; poché (ink) on the wall tops, and a lighter poché on the front cuts.
- Ambient occlusion is analytic: distance to each room plane in true space, plus a contact shadow under each figure.

## Figures

- One geometry, used twice. A person in a knee-length coat and a soft-brimmed hat, 1.78 m tall: legs, shoes, coat with waist and shoulders, collar, arms, hands, neck, head with nose and ears. Each part is a Catmull-Rom loft of superellipse sections (40 segments per ring).
- Cloth: ink `#13284a`, roughness 0.78. Skin: muted `#a89c94`, roughness 0.62. Both cast and receive shadows.
- Stations (true): x = ±1.82, z = −7.15, in front of the outer wall areas, so the window beams fall between them. Each turns 0.3 rad toward the centre line.

## Light and atmosphere

- Sun: directional, `#fff3e2`, intensity 7.5, from straight behind the back wall at about 34° elevation. PCF soft shadows (2048² desktop, 1024² mobile). The walls block it, so light enters only through the windows: mullion and figure shadows land on the floor.
- Fill: hemisphere sky `#e4eef8` / ground `#b4c3d3`; a weak front fill; a warm point bounce from the sunlit floor.
- Sky: an HDR plane behind the back wall, masked in its shader to rays that pass through the back-wall opening, so it never shows around the outside of the room.
- Beams: a ray-marched pass at half resolution (one third on mobile). Each pixel walks its view ray through the room's bounding box up to the depth buffer, and gathers light where the analytic window test passes, modulated by slow 3D noise. Interleaved-gradient jitter and the grain hide the steps.
- Dust: 1500 motes (650 on mobile) inside the room, drifting slowly. They use the same window test, so they glow only inside the beams.
- Composite: scene, beams and a quarter-resolution bloom are added in linear light, then the ACES filmic curve, a vignette of 0.22, and luminance-weighted grain (0.034). Fog (exp²) and the clear colour move from plaster haze `#dfe8f0` to night `#081835`.

## Scroll choreography

Progress = `scrollY / (scrollHeight − innerHeight)`, clamped to 0…1, recalculated on scroll, resize and body size changes. The renderer follows it with a damped step (time constant 110 ms) and snaps to the goal, so the bottom of the page is exactly 1. There is no scroll hijacking and no added scroll length.

| Progress  | Camera position → target (actual space)  | What changes                                                                          |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| 0         | V (0, 0, 0) → (0, −0.12, −8)             | Exact illusion. Room shifted right of the hero text (off-axis projection, not a turn) |
| 0.16      | (0.42, −0.06, 0.35) → (0.02, −0.2, −8)   | A step off V: the back wall begins to slant                                           |
| 0.2–0.46  | through (3.2, 1.6, 3.6)                  | Out through the open front; the ceiling lifts away (0.26–0.44 dissolve); sky fades    |
| 0.4–0.7   | (2.4, 5.4, 7.4) → (−0.7, −1.0, −7.0)     | Perceived room appears as blue lines; the red V appears                               |
| 0.45–0.94 | up and over to the front-left            | Void and fog darken to night; red sight lines from V to back corners and heads        |
| 1         | (−2.8, 11.6, 13.2) → (−0.45, −1.1, −6.6) | Final construction view, framed above the footer                                      |

The path is a Hermite spline with finite-difference tangents and zero velocity at both ends. Narrow screens use a taller field of view (up to 70°) so both figures stay in frame at V, and a vertical shift that places the room in the band between the hero title and lede, and above the footer at the end.

## Glass surfaces

Under `html[data-immersive]`, section surfaces keep their semantic classes but paint tinted glass: `background-color` at the alpha below and `backdrop-filter: blur(18px) saturate(1.25)`. The hero has no surface. The footer is clear with a night scrim at its bottom.

Worst-case contrast with no credit for blur. White, plaster, Swedish blue, night and ink were tested behind each glass, and the table gives the lowest result. For dark text on light glass the worst backdrop is the darkest one (ink or night); for light text on dark glass it is white.

| Glass                              | Alpha | Text tokens and worst contrast                                                     |
| ---------------------------------- | ----- | ---------------------------------------------------------------------------------- |
| Plaster (header, about, abstracts) | 78 %  | ink 9.0, muted (Ink Muted Glass `oklch(0.405 0.06 256)`) 5.2, link (blue-deep) 5.7 |
| Shade (speakers)                   | 82 %  | ink 9.1, muted 5.2                                                                 |
| Blue-deep (facts, venue)           | 86 %  | plaster 6.3, on-blue muted 4.8                                                     |
| Night (programme)                  | 80 %  | plaster ≥ 8.0, on-night muted ≥ 4.7, sky ≥ 4.8                                     |

The hero wash (plaster 86 → 34 % from the left at 1024 and up; top and bottom bands below 1024) and the footer scrim (night 78–92 %) cover the hero and footer text.

## Performance

- Lazy import after `load` and idle; Three.js stays out of the initial bundle.
- Quality tiers. Desktop (≥ 1024 px and a fine pointer): pixel ratio ≤ 1.5 and ≤ 3.2 MP, MSAA 4, shadow 2048, 28 beam steps, 1500 motes. Other screens: pixel ratio ≤ 1.35 and ≤ 1.1 MP, MSAA 2, shadow 1024, 18 steps, 650 motes.
- Frame loop: every frame while the camera moves. While still, it animates dust, beams and grain only when the scene is in clear view (hero bottom below 35 % of the viewport, or footer top above 70 %), at 30 fps (24 on smaller screens). Behind the glass sections, it renders nothing until the next scroll.
- Adaptive: if frames cost more than 22 ms while moving, the resolution steps down by 15 % (to 62 % at least).
- Hidden tab: the loop stops. `pagehide`: all geometry, materials, targets and the context are disposed.
- Measured on an Apple M4 (headless Chrome, GPU): 60 fps median and 95th percentile while scrolling the whole page at 1440 × 900 @2 (canvas 2160 × 1350) and at 390 × 844 @3 (canvas 527 × 1139). Real low-end phones are not yet measured.

## Fallbacks and accessibility

| Condition                                       | Behaviour                                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| First paint, before the live scene              | Still at pose 0 (`fetchpriority="high"`); the canvas fades in over 600 ms                                                             |
| `prefers-reduced-motion: reduce`                | No WebGL and no idle loop. Stills dissolve by opacity only: pose 0.5 over progress 0.30–0.45, pose 1 over 0.78–0.93. No camera travel |
| Save-Data, no WebGL, import error, lost context | Same still path; `data-renderer="still"`                                                                                              |
| No JavaScript                                   | The same dissolves on a CSS scroll timeline where supported; otherwise pose 0. Nothing interactive is shown                           |
| Print                                           | Scene hidden                                                                                                                          |

The scene layer is `aria-hidden`, `pointer-events: none` and `user-select: none`. It holds no information that the HTML does not hold.

Verification hooks on `[data-hero-scene]`: `data-renderer="webgl|still"` and `data-progress` (4 decimals: the progress actually rendered by WebGL, or the scroll progress in still mode).

## Asset provenance

The stills were rendered by the designer on 7 November 2026 from the live renderer on the dev server, in headless Chrome with GPU, with page content hidden. Desktop: 1920 × 1200 @1. Mobile: 390 × 844 @2 (780 × 1688). Poses 0, 0.5 and 1. They were encoded with ImageMagick (WebP q80, AVIF q58). There is no generated imagery and no third-party asset. All geometry, materials and shaders are procedural and authored for this project. Three.js is MIT-licensed and bundled locally.

## Known limits

- Frame rate is measured on one fast machine. The adaptive step and the mobile tier are the safety net for weaker GPUs.
- Backdrop blur over a live canvas has a GPU cost on every frame the canvas changes. Behind the glass, the canvas only changes while scrolling.
- The stills are one aspect each (16:10, about 9:19.5). Other viewports crop them by `object-fit: cover`, so the fallback composition is close to the live one, but not exact.
- The figures are sculpted, not portraits. Faces have a nose and ears, but no eyes or mouth, by intent at this scale.
