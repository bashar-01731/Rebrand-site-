# RE:BRAND

A premium interactive portfolio site for a fictional web design studio, with six
complete concept websites nested inside it.

The premise is that the site has to be the product demo. So the six concepts are
not screenshots in a lightbox — they are real, scrollable, working mini-sites
rendered inside a browser frame, each with its own palette, typography and
layout logic, each with a desktop and a genuinely different mobile layout.

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static export of 10 routes
npm run typecheck
```

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 — tokens live in `@theme` in `app/globals.css` |
| 3D | Three.js, hand-written (no React Three Fiber) |
| Motion | GSAP 3 + ScrollTrigger |
| Fonts | Fraunces + Inter globally; Bodoni Moda, Oswald and Space Grotesk load only on concept routes |

## Structure

```
app/
  layout.tsx              fonts, metadata, providers, cursor, grain, intro
  page.tsx                landing: hero → concepts → case studies → pricing → footer
  concepts/[slug]/        one static route per concept (SSG, deep-linkable)
  globals.css             design tokens, custom variants, base styles
components/
  Hero.tsx / HeroScene.tsx    headline + the Three.js scene
  ConceptsGrid.tsx            the six cards
  CaseStudies.tsx  Pricing.tsx  SiteNav.tsx  SiteFooter.tsx
  LeadForm.tsx                context provider + modal, prefillable
  CustomCursor.tsx  MagneticButton.tsx  Reveal.tsx  LoadingScreen.tsx
  demo/
    DemoShell.tsx             browser frame, phone frame, desktop/mobile toggle
    DemoContactForm.tsx       the working form each concept ships with
    DemoOutro.tsx             the "like this design?" conversion block
    sites/                    Noir, Ember, Form, Elan, Arc, Void
lib/
  concepts.ts             concept metadata, pricing tiers, form options
  motion.ts  demo-fonts.ts
```

## The six concepts

| # | Industry | Brand | Direction |
|---|---|---|---|
| 01 | Fashion | NOIR | Monochrome, asymmetric lookbook grid, Fraunces |
| 02 | Restaurant | EMBER | Charcoal + ember glow, menu as a typed list with dot leaders |
| 03 | Coffee | FORM | **Light mode** — cream, espresso, copper; soft radii |
| 04 | Jewelry | ÉLAN | Black + gold, centred single column, Bodoni Moda |
| 05 | Real Estate | ARC | Cool greys, visible grid, listings as comparable data rows, Space Grotesk |
| 06 | Barbershop | VOID | Pure black, one red, huge condensed Oswald price stack |

Each is deliberately a different *structure*, not a different colour scheme on
one template: FORM is the only light concept, ARC is the only tabular one, ÉLAN
is the only centred one, VOID is the only one where the price list *is* the
site. The mobile view of each is a separate layout — ARC's comparison table
becomes stacked spec cards, NOIR's asymmetric grid becomes one full-bleed
column, EMBER's two-column menu becomes one.

## Notable implementation decisions

**Three.js by hand, not React Three Fiber.** The scene is four meshes:
a plane carrying a canvas-drawn browser UI, a metallic shell behind it, a points
cloud, and a radial wash. No models or textures are fetched, the render loop
stops when the tab is hidden or the canvas leaves the viewport, and everything
including the WebGL context is disposed on unmount. R3F plus drei would have
cost more bytes than the entire scene does.

**Concepts are routes, not overlays.** `/concepts/noir` is statically generated,
deep-linkable, shareable, and works with the Back button. The six site
components load through a keyed dynamic import, so visiting one concept
downloads that concept and none of the other five.

**`data-view`, not media queries, drives the demo layouts.** A demo renders
inside a fixed-width frame, so the real viewport tells it nothing useful. Two
Tailwind custom variants — `mv:` and `dv:` — key off a `data-view` attribute on
the frame instead, which is what makes a real mobile layout possible inside a
desktop window.

**Motion resolves to the visible state.** Scroll reveals set their hidden "from"
state at runtime via GSAP and only when motion is allowed. If JavaScript fails
or the visitor prefers reduced motion, the page is simply readable — never a
permanently invisible section, which is the usual failure mode of scroll-reveal
libraries.

**Reduced motion is handled, not merely declared.** `prefers-reduced-motion`
skips the intro curtain entirely, renders the 3D scene as a single static frame
with no animation loop, disables the magnetic hover and the custom cursor, and
turns smooth scrolling off.

## Accessibility

Checked, not assumed:

- Every text colour is at 4.5:1 or better against its ground. The brand's warm
  gray (`#7a7469`, 4.25:1) is annotated in `globals.css` as decorative-only and
  is not used for text anywhere; each concept's accent was picked or adjusted to
  clear the bar in both directions (as text, and as a button ground).
- Skip link is the first tab stop. Focus rings are never removed, and the custom
  cursor never replaces a hover state that has no other signal.
- The modal traps Tab, closes on Escape, restores focus to whatever opened it,
  and locks background scroll without a layout jump.
- Every form field has a real `<label>`; errors appear beside the field that
  failed and are wired up with `aria-describedby` / `aria-invalid`. Validation
  waits for the first submit before correcting anyone mid-answer.
- Interactive controls are ≥44px tall with ≥8px spacing; there are no
  hover-only interactions on touch.
- No horizontal page scroll at 375 / 768 / 1024 / 1440. The desktop preview of a
  concept scrolls sideways *inside its own frame* on narrow screens, which is
  what a desktop preview honestly is.
- Pinch-zoom is not capped. Icons are SVG; no emoji is used as an icon.

## Known scope boundaries

- **No backend.** Both the studio lead form and the six demo contact forms
  validate properly and resolve to a real success state, but nothing is
  transmitted. `onSubmit` in `components/LeadForm.tsx` is the single place to
  add an endpoint.
- **The WhatsApp number, email and Instagram handle in `lib/concepts.ts` are
  placeholders** and need replacing before this goes near production.
- **No photography.** Every tile, product and interior is a generated gradient,
  per the brief's instruction to avoid stock imagery. Supplying real photography
  per concept would be the single biggest visual upgrade available.
- **Case studies cover three concepts, not six**, and quote no metrics. These
  are fictional clients, so any conversion figure would be a fabrication; the
  honest artefact for concept work is the brief and the reasoning.
