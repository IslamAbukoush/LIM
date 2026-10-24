# LIM design system — second design pass

## Direction and identity

A restrained institutional website with the supplied LIM identity. The circular seal was isolated/recreated from the supplied reference with the built-in imagegen tool; it is not claimed to be an exact vector extraction. A Romanian wordmark accompanies it in the header and footer. The emblem also appears in the mission introduction, report covers and browser icon.

The decorative arch, sports-volunteer homepage image, repeated slogan headings, identical homepage news cards and oversized promotional closing panel were removed. News now has a lead story and text-led secondary articles. Participation uses clear action rows. Core headings use Manrope; the mosque feature and Romanian identity retain Cormorant Garamond.

## Tokens and layout

Brand green #375D19, secondary #74A029, gold #D4A434 and cream #FAF3D5 remain. Background #FBFCF9, ink #202C23 and muted #5F6A60 provide quieter contrast. Controls use 4px corners and photography has square corners. Desktop content is 1248px wide, with 48px gutters; tablet 32px, mobile 22px.

Base styles live in globals.css; the second visual direction and interaction rules are isolated in refinement.css. Content remains typed and separate from presentation in src/content/site.ts.

## Motion system

- PageMotion applies staggered 850ms editorial entrances and 1100ms image clipping reveals on every route. Text keeps full opacity and contrast. Each block runs once, with 24px travel (40px for H1) and delays capped at 300ms.
- ImageMotion uses Motion scroll values, a damped spring, 3% vertical travel and restrained scale. The hero additionally reveals its image frame. Animation starts after hydration, keeping server and first-client markup identical.
- Header compacts after 45px of scrolling. Mobile navigation expands over 450ms, with staggered link movement, Escape dismissal, keyboard containment and scroll restoration.
- Buttons and arrows have coherent hover/press transitions; programme rules draw on hover. No cursor gimmicks or scroll interception.
- Form steps transition over 450ms while keeping values in the parent. Success checks draw, errors enter gently, and news filter results transition.
- Native FAQ disclosures animate with progressive CSS enhancement where supported. They remain functional without animation.

Reduced-motion preferences disable scripted reveals, parallax, smooth scrolling and animated transitions. Server content remains visible without JavaScript. No content is gated behind an animation, and browser-native scrolling is preserved. Motion implementation follows the [official Motion scroll documentation](https://motion.dev/docs/react-scroll-animations).

## Integration and content boundaries

Next.js App Router server pages retain small client boundaries for interaction. Local content remains the future CMS boundary; src/lib/submissions.ts remains the mock/API boundary. No live submissions, payments, case storage or Google credentials were introduced.

Programme offerings, articles, reports and project milestones remain illustrative or pending confirmation. The hero remains an explicitly labeled AI illustration. Production will need approved copy, imagery, service information and operational policies.
