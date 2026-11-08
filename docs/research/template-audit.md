# Template and metadata inventory

Inspected 7 November 2026. The repo is an untouched Indigo Static template. No site build or app screenshot has been run in this research pass.

## Stack and constraints

- Astro 7, TypeScript, Tailwind CSS 4, static prerendered output.
- pnpm only; package manifest pins pnpm 11.22.0 and requires Node >= 22.13.0.
- CI runs formatting, Astro/TypeScript checks, and production build.
- No backend, adapter, SSR, middleware, API routes, or registration system.
- The template has no Three.js or animation dependency.
- Self-hosted fonts via Astro's local fonts API; currently Inter.
- Semantic color tokens live in `src/styles.css`.
- `SetTheme.astro` must remain in `BaseLayout.astro` under repository guidance.
- User confirmed English-only launch, with Swedish (`sv`) support ready for later. Retain extensible translation/routing helpers, remove Japanese from the public site, and do not emit Swedish routes until translated content exists.
- PRODUCT.md now records confirmed product decisions. No DESIGN.md exists yet. Impeccable context was loaded; direction selection comes before UI implementation.

## Metadata and identity replacement locations

- `astro.config.mjs`: `site` is still `https://example.com`; replace with the confirmed production origin.
- `public/robots.txt`: sitemap points at example.com.
- `src/consts.ts`: Indigo site title, description, author.
- `src/translations/en.json`, `src/translations/ja.json`: duplicated site identity, template homepage copy, navigation, footer credit.
- `src/layouts/BaseLayout.astro`: title suffix, description, canonical, Open Graph, Twitter metadata, favicon, RSS link.
  - Canonical uses the configured origin, but Open Graph/Twitter URL currently uses Astro.url; use the canonical origin consistently.
  - Default social image points to `/social-cards/default.jpg`, which is missing.
  - Consider event structured data after title, organizer and end time are confirmed.
- `public/favicon.svg`: Indigo glyph; replace with the new identity.
- `src/components/Footer.astro`: author credit and template attribution.
- `package.json`, `pnpm-lock.yaml`, `README.md`, `AGENTS.md`: package and project descriptions still describe the template. Preserve useful engineering guidance while documenting the real project.

Do not infer copyright ownership, a sponsor relationship, or the formal organizing body from the event being hosted at KTH.

## Current public routes

- `/` and `/ja/`: sample feature-card homepage.
- `/about` and `/ja/about`: template instructions.
- `/blog`: sample post list.
- `/blog/welcome`, `/blog/theming`: starter content.
- `/feed.xml`: starter-content feed.
- `/404.html`: generic not-found page with shared template chrome.
- Sitemap output is generated automatically.

Cleanup candidate: an English conference landing page with section navigation, a branded 404, and no sample blog, feed, about page or Japanese routes. No new multipage information architecture is required by the brief. Registration remains out of scope.

## Component replacement scope

- `src/pages/[...lang]/index.astro`: replace sample marketing content.
- `src/components/Header.astro`: current navigation is Home/Blog/About; desktop nav disappears on small screens without a replacement menu.
- `src/components/Footer.astro`: replace generic attribution with verified contact and conference details.
- `src/layouts/PageLayout.astro`: narrow content shell (`max-w-4xl`) and generic padding constrain the whole page; unsuitable as-is for an immersive full-width landing page.
- `src/components/Card.astro`: sample feature tile, not a required visual pattern.
- `src/components/LanguagePicker.astro`, `src/scripts/language-detection.js`, `src/i18n/*`: reconsider after actual languages are confirmed. Avoid redirecting conference visitors to a template Japanese page.
- `src/styles.css`: template palette and type tokens are not conference branding.
- `src/layouts/BaseLayout.astro`: retain the SEO/accessibility shell while replacing identity.

Potential new components, to be decided after content and design approval: hero scene, event facts, conference introduction, speaker profiles, two-day programme, talk abstracts, venue and contact.

## Verification for the implementation pass

Run `pnpm check`, `pnpm build`, and `pnpm format:check`. Inspect generated URLs, metadata, social-image resolution, removed demo routes and sitemap. Verify desktop/mobile screenshots, keyboard navigation, contrast, reduced motion, no-JavaScript content, and no-WebGL fallback. These checks have not been performed yet.
