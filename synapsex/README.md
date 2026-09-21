# RE:BRAND

Single-page cinematic site combining two briefs: five full-viewport video
sections in black and white Space Mono, with one continuous WebGL scene
floating above them that the reader flies through by scrolling.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Three.js · React Three Fiber ·
GSAP ScrollTrigger · Framer Motion · Lenis

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## How the scroll timeline works

Scroll position is the single source of truth for the whole 3D experience:

1. `hooks/useScrollProgress.ts` runs a scrubbed GSAP ScrollTrigger over the
   document and writes `progress` and `velocity` into `scroll/state.ts`.
2. `scroll/state.ts` is a plain mutable object, not React state — the scene
   reads it every frame, so routing it through React would re-render the tree
   60 times a second for nothing.
3. `scroll/keyframes.ts` holds the timeline as a list of `STAGES`: object pose,
   camera position and FOV, light intensities and particle opacity at seven
   progress values. `sampleStage()` blends between the two surrounding keys
   with a smoothstep ease.
4. `three/Scene.tsx` samples that once per frame and hands the blended stage to
   the camera, lights, object and particles — so everything moves from one
   value and scrolling up reverses the motion exactly.

Lenis drives the actual scrolling, and notifies ScrollTrigger through
`onLenisScroll` so the timeline stays in sync with the smoothed position.

## Structure

```
src/
  App.tsx                     composition, loader gate, entrance
  index.css                   fonts, Tailwind, reset, atmospheric ground
  smoothScroll.ts             Lenis + per-section snap, scroll subscription
  scroll/
    state.ts                  mutable scroll progress read by the frame loop
    keyframes.ts              the timeline: stages + blended sampler
  hooks/
    useScrollProgress.ts      scrubbed ScrollTrigger -> scroll state
    useMousePosition.ts       pointer as a ref, no re-renders
  three/
    Experience.tsx            fixed full-viewport canvas, device profile
    Scene.tsx                 samples the timeline, feeds the scene
    CameraRig.tsx             damped cinematic camera + pointer parallax
    CoreObject.tsx            faceted solid with a wireframe shell
    Particles.tsx             atmospheric motes, fade by stage
    Lighting.tsx              key / fill / rim / accent, animated
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

- Layering: the video sections are z-0, the WebGL canvas z-5, section copy
  z-20. The object therefore floats over the footage without hiding it, and
  the scene stays continuous across the whole page. Architecture is spec'd as
  "pure black, no video" — it carries no fill rather than an opaque one, since
  the page ground is already black and an opaque panel would blank the scene.
- The hero video is never autoplayed, so the
  3D scene is continuous from the hero through the footer. Giving a section an
  opaque background breaks that.
- The hero parallaxes on the pointer: each line has its own travel distance,
  so moving the mouse separates the sentence by depth.
- The page is eight stages — Intro, Discover, Detail, Transformation,
  Close-up, Reveal, Final — and `STAGES` in `scroll/keyframes.ts` carries one
  keyframe per stage, evenly spaced, so each section's pass owns one leg of
  the timeline.
- Section copy animates from its own scroll progress (opacity, lift, blur,
  scale), not from a viewport trigger, so it resolves as the section takes the
  viewport and reverses on the way back up.
- Sections alternate which side the copy sits on, opposite where the object
  travels at that progress, so the type always has clean ground under it.
- The scene's opacity is part of the scroll timeline (`sceneOpacity`). Dark type
  on a pale ground is unreadable over a dark object filling the frame, so the
  WebGL layer steps back under dense copy and comes forward where the object is
  the subject. Measured: every text section holds at least 10.9:1 against the
  ink, versus the 4.5:1 AA threshold.
- Colours live in `three/palette.ts` and the `ink` / `bone` tokens in
  `tailwind.config.js`.
- The object's material keeps `metalness` moderate on purpose. There is no
  environment map in the scene, and a near-1 metal has nothing to reflect, so
  it renders black.
- Mobile and coarse-pointer devices get a third of the particles and no
  shadows; the 3D experience itself is never hidden.
- Under `prefers-reduced-motion`, Lenis and the snap engine are skipped and the
  page falls back to native scrolling.
- If WebGL is unavailable the canvas is not mounted at all and the page renders
  on the CSS gradient ground.
- Fonts (Space Mono, Anton SC) load from Google Fonts at runtime.
