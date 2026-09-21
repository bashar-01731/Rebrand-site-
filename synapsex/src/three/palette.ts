/**
 * Scene palette, kept in one place so the WebGL layer and the CSS ground stay
 * in agreement. Light theme: a near-white bone ground with a dark sculptural
 * object, rather than a naive inversion of the dark scheme.
 */
export const PALETTE = {
  /** Page ground; the fog matches it so the object dissolves into the page. */
  ground: '#F2F1F4',
  fog: '#EEEDF1',
  /** The solid form: dark graphite, reads as a cut object against the bone. */
  object: '#25232C',
  /** Wireframe shell — ink rather than light, or it vanishes on a pale ground. */
  shell: '#3A3543',
  /** Motes. Dark and normally blended: additive blending is invisible on white. */
  particle: '#4A4552',
  accent: '#8E7F94',
  key: '#ffffff',
  fill: '#C9C6D2',
} as const;
