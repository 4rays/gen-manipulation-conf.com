# Hero scene: the Vantage room

Status: **superseded** on 7 November 2026 by [scene.md](scene.md), which [field.md](field.md) in turn superseded. The site owner rejected the execution of this first scene and asked for a page-wide room that unravels with scroll, with real light, atmosphere, better figures and no toggle. This file is kept as the record of revision 1. The construction constants (map, room size, eye height) carry over.

Reference implementation: [`prototype/vantage-room.html`](prototype/vantage-room.html). It is a single file using three.js r170 from a CDN, for design proof only. Production code is the developer's. Port the geometry and poses, not the CDN import or the prototype's page chrome.

Rendered references (also the static fallbacks; see Fallbacks):

| File                                   | View                             | Pixels      |
| -------------------------------------- | -------------------------------- | ----------- |
| `assets/vantage-desk-v.{avif,webp}`    | Vantage point, desktop region    | 1612 × 1656 |
| `assets/vantage-desk-side.{avif,webp}` | Plan view, desktop region        | 1612 × 1656 |
| `assets/vantage-mob-v.{avif,webp}`     | Vantage point, tablet/phone band | 780 × 760   |
| `assets/vantage-mob-side.{avif,webp}`  | Plan view, tablet/phone band     | 780 × 760   |

Provenance: rendered by the designer from the prototype with headless Chrome (SwiftShader WebGL) on 7 November 2026. No generated imagery and no third-party assets. If the geometry changes, re-render them from the same file (`?still=1&view=v|side&w=…&h=…`).

## Idea

An Ames room is built distorted. From one peephole it looks like an ordinary rectangular room, and two people of the same height look like a giant and a child. From anywhere else, the construction shows. Nobody lies to the viewer: the room does the work.

That is the conference's subject in one object: influence that lives in the design of an environment, invisible from the position it was designed for. The visitor first sees the ordinary room. One action, "See the room from the side", moves them out of the designed viewpoint, and the trick becomes a plain drawing.

## Construction (exact)

Camera space, vantage point **V** at the origin, looking down −z.

1. Build an ordinary **apparent room**: width `W = 6`, height `H = 3.4`, eye height `1.55` above the floor, front opening at `z = −2.2`, back wall at `z = −8`. No front wall.
2. Map every vertex `p` of the shell, floor tiles and windows with the projective map
   `p′ = p / (1 + α · p.x)`, with `α = 0.105`.
   This map fixes V and every ray through V, and it maps planes to planes. So from V the room is pixel-identical to the apparent room, but the left back corner is about 1.46× farther away and the right back corner is about 0.76× as far.
3. Place **two identical figures** (capsules, radius 0.2, height 1.45; flat `--ink`) standing at the _mapped_ positions of two points near the back corners (apparent `x = ±1.9`, `z = −7.2`). Both must stay whole inside the desktop region. From V, the left one reads as small and the right one as tall. Their true sizes are equal.
4. **Floor**: 8 × 8 square tiles in the apparent room, alternating `--blue` and `--plaster`. They distort with everything else, so the checker exposes the construction as soon as the camera moves.
5. **Back wall**: two window openings filled with `--sky`.
6. **Edges**: 1px outlines of every face in `--ink` at 42 % opacity (`EdgesGeometry`, threshold 30°). This gives the plate-drawing quality, and it is what remains when the walls dissolve.

### Materials

Flat, unlit (`MeshBasicMaterial`) tones from the palette. This is a drawn plate, not a lit render:

| Surface          | Colour                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| Back wall        | `--plaster-shade`                                                            |
| Left wall        | `#d6e1ec` (plaster-shade, one step darker)                                   |
| Right wall       | `#e9eff5`                                                                    |
| Ceiling          | exactly `--plaster` (`#f1f5f8`), so the scene region's top edge is invisible |
| Scene background | exactly `--plaster` (`#f1f5f8`) so the canvas edge disappears into the page  |

Walls carry a baked vertical falloff (vertex colours, 0.90 at the floor to 1.0 at the ceiling). Figures alone use `MeshLambertMaterial` with a hemisphere light (sky white, ground `#b8c6d6`, intensity 2.1) and one directional light from the upper left (intensity 1.1), so they read as solid bodies.

No textures, no post-processing, no shadows, no fog (fog would reveal the trick from V).

### Vantage marker

Visible only away from V:

- A sphere (radius 0.07) at V in `--signal`.
- 1px `--signal` sight lines from V to both back floor corners and to the top of each figure, at 85 % opacity.

## Two poses and the change between them

| Pose            | Camera position     | Target                                                                             | Up vector    | FOV (vertical)                           |
| --------------- | ------------------- | ---------------------------------------------------------------------------------- | ------------ | ---------------------------------------- |
| **V** (default) | `(0, 0, 0)`         | `(0, −0.3, −8)` (a slight downward pitch; any rotation about V keeps the illusion) | `(0, 1, 0)`  | 46° when aspect ≥ 1, 58° when aspect < 1 |
| **Plan**        | `(−0.4, 13.5, 1.6)` | `(−0.9, −1.6, −5.6)`                                                               | `(0, 0, −1)` | same                                     |

The change between them is the page's one authored motion moment:

- Progress `e` goes from 0 to 1 over **1.6 s**, with ease-in-out cubic.
- Position and target interpolate linearly by `e`, plus an arc so the camera swings out instead of sliding through walls: `x += sin(πe) · 1.2`, `z += sin(πe) · 2.2`.
- Up vector: `normalize(0, 1 − e, −e)`, which rolls the frame so the back wall ends at the top of the plan.
- Walls and windows fade to 12 % opacity by `e = 0.62` (`opacity = 1 − 0.88 · min(1, 1.6e)`). The ceiling fades to 0 by `e = 0.45`. Turn `depthWrite` off once they are transparent. Edges stay at full strength, so the room becomes its drawing.
- The vantage marker appears from `e = 0.15` and its lines reach full strength by `e = 0.65`.
- Reversing runs the same path backwards.

### Pointer drift (V pose only)

On `(pointer: fine)` without reduced motion, the pointer offsets the camera by up to `±0.22` (x) and `±0.12` (y) units, scaled by `(1 − e)`. That is just enough to sense that something about the room is off, never enough to break it. No drift on touch devices and none in the plan pose.

### Scroll

**First release: no scroll-linked camera motion.** The page scrolls normally, and the scene leaves with the hero.

**Phase 2 (later, not part of the first release):** the "walk" the user liked on dappled.com.au. As the hero scrolls out, the camera steps out of V along the arc above, so the visitor discovers the construction by moving down the page. Later sections can add their own waypoints, for example a top-down plate behind the programme. Conditions for phase 2: the content stays plain HTML in normal flow; the scene stays `position: sticky` or fixed behind content and never captures scroll; reduced motion keeps the toggle-only behaviour; and the full page must be built and approved first.

## The control

- `button.vantage-toggle` with `aria-pressed`, label "See the room from the side", lucide `Rotate3d`. Pressed means the plan view. The label does not change; the pressed state carries the meaning.
- The caption `p.vantage-caption`: "An Ames room looks rectangular from one point only. Change the viewpoint and its construction shows."
- Both live outside the `aria-hidden` scene (layout in [components.md](components.md#conference-hero-first-viewport)). The canvas itself has no role, label or focus.
- `aria-controls` points at the scene container's id.
- The button stays `hidden` until the canvas has drawn its first frame or the fallback images have loaded. Without JS it stays hidden, and the caption is not shown either (it would describe a control that does not exist).

## Loading and performance

- **Static first.** The fallback `<picture>` (V pose) is in the HTML and is the LCP-safe first paint. The canvas mounts on top of it and fades in (`opacity` 0 → 1, 240 ms) after its first frame. If it never draws, the picture stays.
- **Lazy import.** Import three.js dynamically after `load`, inside `requestIdleCallback` (fallback: `setTimeout(…, 200)`). Import only the needed modules (`WebGLRenderer`, `Scene`, `PerspectiveCamera`, the geometries, `MeshBasicMaterial`, `MeshLambertMaterial`, `LineBasicMaterial`, `LineSegments`, `EdgesGeometry`, `HemisphereLight`, `DirectionalLight`). Add `three` as a dependency; no other 3D packages.
- **Render on demand.** The scene is static. Render only when the camera changes (transition, pointer, resize). No idle `requestAnimationFrame` loop.
- **DPR cap:** `min(devicePixelRatio, 1.75)` at `lg` and up, `min(devicePixelRatio, 1.5)` below. `antialias: true`. `powerPreference: "low-power"`.
- **Offscreen:** an IntersectionObserver stops pointer listening and rendering when the hero is not visible. On `visibilitychange` to hidden, cancel any pending frame.
- **Context loss:** on `webglcontextlost`, remove the canvas and leave the fallback picture. Keep the toggle working by swapping the picture between the V and plan stills.
- Budget: three.js modules about 150 kB gzipped, loaded after first paint. Scene construction must stay under 30 ms on a mid-range phone (it is about 200 meshes; merge the 64 floor tiles into two geometries, one per colour, if profiling shows otherwise).

## Fallbacks

| Situation                                        | What the visitor sees                                      | Toggle                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Normal                                           | Live scene, pointer drift (fine pointers), animated change | Animated 1.6 s                                                                                                                      |
| `prefers-reduced-motion: reduce`                 | Live scene, no pointer drift                               | Instant cut between poses, with a 200 ms opacity crossfade of the canvas (render the new pose, fade from a snapshot) or a plain cut |
| No WebGL / context lost / three.js fails to load | `<picture>` of the V still                                 | Swaps to the plan still with a 200 ms crossfade (instant under reduced motion)                                                      |
| No JavaScript                                    | `<picture>` of the V still                                 | Hidden, and the caption is hidden too                                                                                               |
| Print                                            | The V still, scene region only, no control                 | —                                                                                                                                   |

The fallback picture markup: `<picture>` with AVIF then WebP sources, `media="(min-width: 64rem)"` choosing the `desk` set, the `mob` set otherwise. `alt=""` (decorative: the scene region is `aria-hidden`). `width`/`height` attributes set to avoid layout shift. `object-fit: cover; object-position: 50% 60%` inside the scene region. `fetchpriority="high"` on the desktop source only if it becomes the LCP element; at desktop the h1 is the likely LCP element, so default priority is fine.

## Framing in the layout

- **Desktop (≥ `lg`)**: scene region from 44 % of the hero width to the right edge, full hero height. The renderer fills the region, and the camera aspect follows the region. The room bleeds off the right, top and bottom edges. **Nothing renders in the left 44 %.** The canvas is confined to the region, so the plan pose cannot drift into the text column.
- **Tablet/phone**: full-width band at the top of the hero (heights in components.md). Same poses. The camera FOV switches to 58° only when the band is taller than wide, which is rare.
- The scene must never sit under text. Text-safe means no overlap, not "readable over".

## What is approved and what is not

- **Approved by the site owner:** the Vantage direction (an Ames-room WebGL scene in the hero; cool plaster and Swedish-blue ink).
- **Designer specification, not separately reviewed:** the construction values, poses, colours, timings, the caption copy, and the phase 2 scroll walk.
- **Open:** whether the site owner wants phase 2 at all, and when.
