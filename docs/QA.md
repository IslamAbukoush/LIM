# Prototype verification

Verified 24 October 2026, using Microsoft Edge through Playwright on Windows.

- Production static export builds successfully with Next.js 16.4.3.
- TypeScript strict typecheck passes.
- Eight browser tests pass against the production export.
- All 17 content routes return 200, provide a single H1 and load their images.
- axe WCAG A/AA scans return zero violations across those routes, plus focused mobile scans.
- No horizontal overflow at tested widths: 390, 768 and 1440 pixels.
- All four form journeys complete; required-field errors, mock failure/retry, review and back navigation tested.
- Mobile menu navigation, Escape dismissal and focus restoration tested.
- News filters, native FAQ disclosure, sample PDF retrieval and reduced-motion behavior tested.
- Desktop and mobile screenshots inspected for the homepage, reporting experience and key giving/project layouts.

Tests are reproducible in `tests/prototype.spec.ts`. Screenshots are local, ignored artifacts. Automated scans are not an accessibility certification; screen-reader and broader cross-browser review remain appropriate before production.

All content, imagery, sample reports and forms remain explicitly illustrative. No backend, CMS, Google Workspace integration, live payment processing or real case management is enabled.
