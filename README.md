# Islamic League of Moldova — frontend prototype

A complete Next.js App Router / React / TypeScript design prototype. Editorial layouts, responsive navigation, Motion for React, local assets and self-hosted fonts. CSS design tokens are used instead of a utility framework.

## Run locally

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Run commands from this `lim` directory.

```sh
npm run typecheck
npm run build
```

The production build exports to `out/`. Serve this directory using any static host with directory index support. `next start` is not used for a static export. Static export follows the [Next.js App Router guide](https://nextjs.org/docs/app/guides/static-exports). To add server endpoints later, remove `output: 'export'`, deploy with a supported Next.js server and replace the submission adapter.

`npm start` serves the existing static export at http://127.0.0.1:3001. It is a local preview server. Set `TEST_BASE_URL=http://127.0.0.1:3001` when running tests against that export.

## Pages

Every content page is also available under `/ro/` (Romanian) and `/ru/` (Russian). The language switcher preserves the current page and section. See [internationalization notes](docs/INTERNATIONALIZATION.md) for translations, localized branding and the English sample PDF boundary.

- `/` — mission, work, advocacy, mosque project, stories and involvement
- `/about/` — proposed mission and values
- `/programmes/` and `/programmes/[slug]/` — three illustrative programme areas
- `/news/` and `/news/[slug]/` — featured story, filters and article templates
- `/advocacy/` and `/reports/[slug]/` — sample publications and downloadable PDFs
- `/mosque-project/` — concept narrative, unconfirmed project details and FAQ
- `/get-involved/` — volunteer, giving and contact flows with anchor navigation
- `/report-discrimination/` — three-step form with review
- `/privacy/` — accurate prototype privacy explanation
- Custom 404

## Content and integration boundaries

`src/content/site.ts` holds typed programmes, stories, reports, image metadata and navigation. Replace these records with CMS queries in server pages. Dynamic detail routes use `generateStaticParams`; add CMS slugs to that function when retaining static hosting.

`src/lib/submissions.ts` is the single mock submission adapter. It accepts typed submission kinds and payloads, simulates loading and an optional failure, and returns a demo receipt. **No form entries are sent, logged or saved. No payments or real reports are created.** State exists only in the mounted form. Every workflow explains this in its confirmation. The expandable “Prototype testing options” control exercises failure and retry without a backend.

Before production, implement server-side validation, consent/version recording, spam controls, appropriate retention/access policies and approved Google Workspace/API integration. Keep credentials on the server. Payment details should be handled by the selected payment provider. Replace sample content, approve policies and confirm organisational facts before enabling live submissions.

## Browser checks

With the dev server running:

```sh
npm test
```

Playwright uses the installed Microsoft Edge browser (`channel: 'msedge'`). On a machine without Edge, install a Playwright Chromium browser and remove that channel setting. Tests cover routing, image loading, horizontal overflow at 390/768/1440px, mobile menu/Escape, all four forms, failure/retry, review/back behavior, news filters, FAQ, PDF downloads, reduced motion and axe WCAG A/AA scans. Screenshots are written to ignored `artifacts/`. Automated scans do not constitute full accessibility certification.

## Design and assets

See [design system](docs/DESIGN_SYSTEM.md) and [asset sources / generation prompt](docs/ASSETS.md). The brand mark follows the user-supplied LIM reference, isolated/recreated as a transparent raster asset. The hero image is AI-generated and labeled. All other photography is illustrative, not evidence of LIM activities. Mosque imagery depicts the Alhambra in Spain and is explicitly not a project rendering. News dates and reports are samples; no achievements, land, budget, approvals or construction dates are invented.

Sample PDFs are committed in `public/reports/`. Regenerate with `node scripts/create-sample-reports.mjs`.

## Deployment

`.openai/hosting.json` identifies the owner-private Sites preview and the static output directory. Keep its existing project ID when deploying updates. Source and build artifacts are synchronized using the Sites workflow.

The site intentionally emits `noindex, nofollow` metadata while in prototype mode. No analytics are included. Fonts are fetched at build time through `next/font` and served locally at runtime. Images are pre-compressed WebP; `next/image` reserves layout space and lazy-loads lower content, with static-host optimization disabled.
