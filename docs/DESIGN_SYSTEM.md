# LIM design system

## Direction

An editorial civic institution: generous but purposeful space, warm paper, forest green and human photography. A single architectural line mark is a proposed identity, not an official logo. Photography is illustrative, never evidence of LIM activity.

## Architecture

Next.js App Router with server-rendered editorial pages and small client boundaries for navigation, Motion reveals, filters and forms. Seven primary routes, structured programme/news/report details, plus report-a-case and privacy. Local typed records in `src/content` are the future CMS boundary. `src/lib/submissions.ts` is the future API boundary. No credentials, personal-data persistence, payment handling or production integrations.

## Tokens and typography

Deep green #375D19; accent green #74A029; gold #D4A434; cream #FAF3D5. Ink #243128, muted #657064, paper #FAFAF6, white surfaces, warm borders. Gold is decorative, never small text on white. Manrope provides body/navigation; Cormorant Garamond provides selected display headings. Both are self-hosted by next/font. Text sizes use clamp, body 16–18px, labels 14px, readable measure 65 characters. Two radii: 6px controls and 0px editorial images.

## Layout and page hierarchy

Desktop uses a 1248px content width and 48px gutters; tablet 32px and mobile 22px. Hero is an asymmetric text/photo composition. Mission uses a large editorial statement; programmes use numbered rows; advocacy uses a quiet green panel; the mosque story uses a full-width architectural image. News uses magazine columns. Mobile prioritizes content and actions, with a full-width navigation disclosure and single-column forms.

## Motion

Shared 500ms ease-out translation reveals, at most 18px travel; images receive subtle 600ms hover scale. No scroll hijacking or delayed controls. Reduced motion removes translation, scaling and smooth scrolling. Page entrances use a short 4px translation. Native details elements keep FAQ interactions keyboard accessible.

## Forms and accessibility

Persistent labels, required indicators, inline errors linked through aria-describedby, error summaries, focus on step changes, loading and success states. Multi-step reporting never stores or uploads sensitive information. Mock failure can be exercised via the labeled demo control. Donation review never requests card details. All interactions work without hover; focus rings are visible. Navigation uses aria-current, Escape dismissal and focus restoration. Text contrast and responsive behavior are checked with automated browser tests.

## Content approval

All programme offerings, news dates, publication documents and project milestones are examples or pending confirmation. Official copy, logo, authorized imagery, contacts, policies, service availability and project facts must replace placeholders before production.
