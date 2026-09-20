# SynapseX

Single-page landing site for SynapseX, a futuristic neural-AI interface product.
Black canvas, white Space Mono type, full-viewport video backgrounds.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  App.tsx                     page composition + 800ms entrance gate
  index.css                   fonts, Tailwind, reset, Lenis utilities
  videos.ts                   CloudFront background video URLs
  components/
    Navbar.tsx                fixed pill nav, expanding menu capsule
    Hero.tsx                  mouse-scrubbed hero video + watermark
    CinematicText.tsx         scroll-driven 3D paragraph
    Metrics.tsx               performance figures
    Technology.tsx            adaptive intelligence + capability grid
    Architecture.tsx          three-layer breakdown (no video)
    Footer.tsx                video split + colophon
    ScrambleIn.tsx            entrance reveal animation
    ScrambleText.tsx          hover scramble
    SynapseXLogo.tsx          4-fold symmetric mark
    SquashHamburger.tsx       animated menu icon
```

## Notes

- The hero video never autoplays. It sits paused at time 0 and is scrubbed by
  horizontal mouse movement; seeks chain off the `seeked` event so the decoder
  only ever has one request outstanding and frames don't drop.
- Every other video autoplays muted and loops as a background layer.
- Section heights use `h-screen h-[100dvh]` so mobile browser chrome doesn't
  clip the viewport.
- Fonts (Space Mono, Anton SC) and Bootstrap Icons load from CDNs at runtime,
  so the site needs network access to render as designed.
