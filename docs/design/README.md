# Design: Generative AI and Algorithmic Manipulation

The designer owns the visual direction. Since revision 2, the designer also implements the scene renderer and all visual CSS; the developer owns structure, data, markup and integration. Start with [`../../DESIGN.md`](../../DESIGN.md) for the system summary.

## Files

| File                                                        | What it is                                                                                                 | Status                                                                          |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [tokens.md](tokens.md)                                      | Palette, contrast, surface scopes, ready-to-paste CSS, type faces and scale, grid, spacing, corners        | Authoritative                                                                   |
| [components.md](components.md)                              | Per-class layout for every hook in `src/components/conference/`, header, footer, 404, copy changes         | Authoritative                                                                   |
| [scene.md](scene.md)                                        | Revision 2: page-wide scene, light, figures, scroll choreography, glass contrast, fallbacks                | Authoritative                                                                   |
| [hero-scene.md](hero-scene.md)                              | Revision 1 hero scene (toggle, flat tones, capsule figures)                                                | Superseded                                                                      |
| [prototype/vantage-room.html](prototype/vantage-room.html)  | Revision 1 three.js reference (CDN import, design proof only)                                              | Superseded                                                                      |
| [mock/hero.html](mock/hero.html)                            | First-viewport mock with real fonts, tokens and the developer's class names (static stills, no live scene) | Reference                                                                       |
| `assets/vantage-{desk,mob}-{v,side}.{avif,webp}`            | Revision 1 stills                                                                                          | Superseded; shipping stills are `public/images/vantage-{desk,mob}-{0,50,100}`   |
| `assets/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | The vantage mark: Ames floor plan in Swedish blue with the red vantage point, on plaster                   | Record only; `public/` now has the Field mark ([field.md](field.md#field-mark)) |
| `assets/social-card-default.jpg`                            | 1200 × 630 Open Graph card: title, date, place, V-view room                                                | Shipped as `public/social-cards/default.jpg`                                    |
| [mock/og.html](mock/og.html)                                | Source of the social card (re-render with headless Chrome at 1200 × 630)                                   | Reference                                                                       |
| `../../.impeccable/mocks/decision/*.html`                   | The direction-round sketches the site owner chose from                                                     | Record                                                                          |

To view the prototype or the mock, serve `docs/design/` over HTTP (for example `python3 -m http.server` in that folder) and open `prototype/vantage-room.html` or `mock/hero.html`. Add `#side` to the mock URL to see the plan view.

## Approval record

| Decision                                                                                                            | Status                                                                                                         | Source                                                              |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Public title, English-only launch, Swedish later, no registration, landing page scope                               | **Confirmed by the site owner** (before design)                                                                | `PRODUCT.md`                                                        |
| Visual direction **Vantage**: an Ames room in the hero; cool plaster and Swedish-blue ink; perception-plate drawing | **Chosen by the site owner** on the decision page, 7 Nov 2026, from five full options and several demoted ones | `.impeccable/questions/direction-payload.json`, choice `model-pick` |
| Code-led build (no image comps)                                                                                     | Default; no image generation was available                                                                     | Decision page                                                       |
| Exact palette values, contrast pairs, surface sequence                                                              | Designer specification                                                                                         | tokens.md                                                           |
| Faces: Hedvig Letters Serif + Familjen Grotesk (both OFL, fontsource)                                               | Designer specification                                                                                         | tokens.md                                                           |
| One light theme, no dark mode, no theme toggle                                                                      | Designer specification                                                                                         | tokens.md                                                           |
| Layout, component anatomy, breakpoints                                                                              | Designer specification, verified in the mock at 390, 820, 1024, 1280, 1440 and 1920 px                         | components.md                                                       |
| Copy changes (section headings = nav labels, new hero lede, vantage caption)                                        | Designer proposal; the site owner may reword                                                                   | components.md                                                       |
| Scene construction, poses, 1.6 s viewpoint change, fallbacks                                                        | Designer specification, verified in the prototype                                                              | hero-scene.md                                                       |
| Favicon mark and social card                                                                                        | Designer specification, delivered as assets                                                                    | assets/                                                             |
| Page-wide scene, glass content, scroll unravels the room, no toggle, light/dust/grain, better figures               | **Requested by the site owner** after rejecting revision 1, 7 Nov 2026                                         | `scene.md`                                                          |
| Scene construction, figures, light, choreography, glass alphas, fallbacks                                           | Designer specification and implementation; rejected by the site owner                                          | scene.md                                                            |
| **Pull Field** background, with fewer and softer trails, no colour changes, no red markers, tangled paths           | **Chosen by the site owner**, 7 Nov 2026, from the effect comparison                                           | field.md, effects/                                                  |
| Programme background night at 95 %                                                                                  | **Set by the site owner**                                                                                      | field.md                                                            |
| No section backgrounds; local wash only where text contrast is very poor                                            | **Requested by the site owner**; the guard was removed at the site owner's request on 11 Nov 2026              | field.md                                                            |

"Designer specification" means: it follows from the approved direction and is binding for implementation, but the site owner has not reviewed it one by one. If the site owner disagrees with any of it, their word wins and the designer updates the spec.

## Open items (not design decisions)

These come from the research and need the organiser, not the designer:

- The Day 2 end time (15:30 in the programme, 16:00 in the event metadata). The design shows no end time outside the programme.
- Speaker avatars are round, beside the name (13 November 2026, at the site owner's request). Speakers without a photo, such as the organisers, keep the text-only row.

## Asset provenance

All rasters in `assets/` were made by the designer on 7 November 2026, with no generated imagery and no third-party images:

- `vantage-*`: rendered from `prototype/vantage-room.html` (`?still=1&view=v|side`) in headless Chrome with SwiftShader WebGL. Desktop at 806 × 828 with device scale 2; tablet/phone at 780 × 760.
- `social-card-default.jpg`: revision 3 card, identical to `public/social-cards/default.jpg`. `mock/og.html` renders it at 1200 × 630 over `field-desk.webp` (the live field's still) with the OFL fonts in `mock/fonts/`. `vantage-desk-0.webp` is kept as the record of the revision 2 card.
- `favicon.ico`, `apple-touch-icon.png` (vantage mark, record only): rasterized from `favicon.svg` with ImageMagick. The Field mark in `public/` is drawn by `scripts/generate-mark.ts`.

Fonts in `mock/fonts/` are unmodified fontsource files (SIL OFL 1.1), included only so the mock renders offline.
