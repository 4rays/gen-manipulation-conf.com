# Generative AI and Algorithmic Manipulation

Conference website for 28–29 January 2027 at KTH, Stockholm.

Built with Astro, TypeScript and Tailwind CSS 4. Static HTML output; no server. Registration posts from the browser to the organisers' Ungapped survey at KTH.

## Development

Use Node >= 22.13.0 and the pinned pnpm version.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The dev server runs at `http://localhost:4321`.

```sh
pnpm check         # Astro / TypeScript diagnostics
pnpm build         # Production output in dist/
pnpm preview       # Build and preview production output
pnpm format:check  # Prettier verification
pnpm check:registration  # Read-only check of the live Ungapped survey
```

## Deployment

The site runs on Cloudflare as a static-assets Worker (`wrangler.jsonc`) at https://gen-manipulation-conf.com and `www`. Workers Builds deploys every merge to `main`. A manual deploy is `pnpm build && npx wrangler deploy`.

## Project context

- `PRODUCT.md`: confirmed scope, title, languages and product facts.
- `docs/research/`: conference content summary, factual conflicts and template audit.
- `DESIGN.md` and `docs/design/`: designer-owned direction and implementation specifications as they become available.

The site uses the **Pull Field** background: sparse, soft trails bent by hidden attractors behind the whole page, on a plaster ground, with Swedish-blue and night accents, Hedvig Letters Serif and Familjen Grotesk. The earlier Ames-room concept (commit `740eacb` and its uncommitted rebuild) was rejected by the site owner on 7 November 2026.

Content sits directly on the field. A contrast guard adds a soft local wash only where the field makes text hard to read. See `docs/design/field.md` for the effect, its budget and its fallbacks.

## Source structure

- `src/data/conference/`: typed English conference content, programme, biographies and abstracts.
- `src/components/conference/`: page-wide decorative scene, hero copy, facts, introduction, speakers, programme, abstracts, venue and registration.
- `src/data/conference/registration.json`, `src/scripts/registration/`: the Ungapped survey the registration form expects, the request it sends and its fallbacks.
- `scripts/check-registration.ts`: read-only survey check, run daily by the `Registration` workflow.
- `src/layouts/PageLayout.astro`: optional immersive scene layer behind normal HTML content; the 404 remains non-immersive.
- `src/components/Header.astro`: progressively enhanced mobile disclosure navigation.
- `src/layouts/BaseLayout.astro`: canonical URL and social metadata.
- `src/pages/[...lang]/index.astro`: localized landing-page composition.
- `src/translations/en.json`: interface labels.
- `src/i18n/`: published locales and localization helpers.
- `src/styles.css`: semantic colour and surface tokens.
- `src/styles/`: typography, responsive layouts and hero styles.
- `src/scripts/page-scene.ts`, `src/scripts/field/`: the Pull Field (Canvas 2D) and its contrast guard.
- `public/images/`: rendered stills of the field (first paint and no-JavaScript fallback).
- `public/licenses/`: OFL font licences.

Public routes are the English homepage and a branded-shell 404. Demo blog, feed, about pages and Japanese routes have been removed.

## Adding Swedish later

Publish Swedish only when translated copy is ready:

1. Add `src/translations/sv.json` with the same label structure as English.
2. Add a Swedish conference dataset with the same speaker, session and abstract identifiers in `src/data/conference/`.
3. Add `sv` to `locales`, `translations` and `localeNames` in `src/i18n/constants.ts`.
4. Register the dataset in `src/data/conference/index.ts`.
5. The existing static-path helper generates `/sv/` and the header exposes the locale picker when multiple locales are published.
6. Verify locale-aware links, translated metadata, canonical URLs and alternate-language links before release.

Do not publish placeholder Swedish pages or a language switch pointing to untranslated content.

## Content rules

- Use the speaker biography's attribution for Aimen Taimur; keep the conflicting agenda affiliation documented in editorial notes, not rendered to visitors.
- Programme rows show speaker names, not affiliations.
- Use date-only conference metadata until the conflicting final end time and timezone are confirmed.
- Unannounced sessions remain honestly labelled.
- Speaker portraits are optional round avatars. Add one only with a photo the organisers supplied.
- Do not infer the formal organizer or copyright owner, or invent sponsors, testimonials, fees or attendance figures.
- Do not reuse the old site's hero imagery or visual identity.

## License

The code is available under the [MIT License](LICENSE). The licence does not cover the conference content: programme, abstracts, speaker names and biographies in `src/data/conference/`, and the related copy. The fonts in `public/licenses/` keep their own OFL licences.
