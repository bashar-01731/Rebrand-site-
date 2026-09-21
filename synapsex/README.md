# RE:BRAND

Single-page cinematic site: five full-viewport video sections in black and
white Space Mono, with smooth snap scrolling and scroll-driven motion.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lenis

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## How the scroll works

Lenis drives the page with per-section snapping (`smoothScroll.ts`). Section
motion is scroll-linked through Framer Motion: the cinematic paragraph in
section two reads `useScroll` on its own section, piped through a heavy
spring, so its 3D rotation tracks scroll position rather than firing on
entry. The section counter reads scroll position directly and only that
index goes through React state.

## Structure

```
src/
  App.tsx                     composition, loader gate, entrance
  index.css                   fonts, Tailwind, reset, atmospheric ground
  smoothScroll.ts             Lenis + per-section snap, scroll subscription
  hooks/
    useScrollProgress.ts      scrubbed ScrollTrigger -> scroll state
    useMousePosition.ts       pointer as a ref, no re-renders
  components/
    LoadingScreen.tsx         percentage counter, never blocks indefinitely
    CustomCursor.tsx          dot + trailing ring, pointer-fine only
    SectionCounter.tsx        01 / 06
    ScrollIndicator.tsx
    ScrollExperience.tsx      the stages, in order
    Concepts.tsx              trade picker + live concept preview
    Section.tsx               one stage; copy animates off scroll progress
    Navbar.tsx  Hero.tsx
    ScrambleIn.tsx  ScrambleText.tsx  BrandLogo.tsx  SquashHamburger.tsx
```

## Notes

- The hero video is never autoplayed, so the
  3D scene is continuous from the hero through the footer. Giving a section an
  opaque background breaks that.
- Colours live in `three/palette.ts` and the `ink` / `bone` tokens in
  `tailwind.config.js`.
- Under `prefers-reduced-motion`, Lenis and the snap engine are skipped and the
  page falls back to native scrolling.
- Fonts (Space Mono, Anton SC) load from Google Fonts at runtime.
