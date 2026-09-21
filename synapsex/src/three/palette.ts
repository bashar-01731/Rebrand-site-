/**
 * Scene palette. Both briefs call for a dark ground, so the object is lit
 * rather than silhouetted: it floats above the video sections and has to read
 * against moving footage, not a flat page.
 */
export const PALETTE = {
  ground: '#000000',
  /** No fog colour fights the video underneath; the scene is transparent. */
  fog: '#050506',
  object: '#1B1B22',
  shell: '#8E7F94',
  particle: '#CFC7D4',
  accent: '#8E7F94',
  key: '#ffffff',
  fill: '#6F7590',
} as const;
