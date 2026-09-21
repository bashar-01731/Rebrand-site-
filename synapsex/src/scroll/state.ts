/**
 * Scroll state shared between the DOM timeline and the WebGL frame loop.
 *
 * This is a plain mutable object on purpose: the 3D scene reads it every frame
 * inside `useFrame`, so routing it through React state would re-render the tree
 * 60 times a second for no benefit.
 */
export const scrollState = {
  /** Whole-page scroll progress, 0 at the top and 1 at the bottom. */
  progress: 0,
  /** Signed scroll velocity, normalised roughly to -1..1. */
  velocity: 0,
};
