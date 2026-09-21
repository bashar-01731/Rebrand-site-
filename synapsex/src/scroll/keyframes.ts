/**
 * A tiny keyframe sampler: the scroll timeline is described as a list of
 * states at given progress values, and every frame we read a blended state
 * between the two surrounding keys. This is what keeps the experience one
 * continuous motion rather than a pile of separate animations.
 */

export type Vec3 = readonly [number, number, number];

export interface Stage {
  /** Progress at which this state is reached, 0..1. Must ascend. */
  at: number;
  objectPosition: Vec3;
  objectRotation: Vec3;
  objectScale: number;
  cameraPosition: Vec3;
  cameraFov: number;
  /** Multiplier on the key light. */
  keyLight: number;
  /** Multiplier on the rim light. */
  rimLight: number;
  /** Particle opacity, 0..1. */
  particles: number;
  /**
   * Opacity of the whole WebGL layer, 0..1. Dark type sits on a pale ground,
   * so the scene steps back wherever dense copy needs to be read and comes
   * forward where the object is the subject.
   */
  sceneOpacity: number;
}

/** Smoothstep, so movement eases in and out of every key instead of sliding linearly. */
const smooth = (t: number) => t * t * (3 - 2 * t);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpVec3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/**
 * The scroll timeline. Each entry is a visually distinct state; the sampler
 * blends between them so scrolling up reverses the motion exactly.
 */
export const STAGES: Stage[] = [
  {
    at: 0,
    objectPosition: [0, 0, 0],
    objectRotation: [0, 0, 0],
    objectScale: 1,
    cameraPosition: [0, 0, 6.4],
    cameraFov: 46,
    keyLight: 1,
    rimLight: 0.6,
    particles: 0.35,
    sceneOpacity: 1,
  },
  {
    at: 0.15,
    objectPosition: [1.15, -0.05, 0.1],
    objectRotation: [0.25, 0.8, 0.05],
    objectScale: 1,
    cameraPosition: [0, 0.25, 6],
    cameraFov: 44,
    keyLight: 1.15,
    rimLight: 0.9,
    particles: 0.55,
    sceneOpacity: 0.85,
  },
  {
    at: 0.3,
    objectPosition: [-1.25, 0.1, 0.3],
    objectRotation: [0.55, 1.9, 0.12],
    objectScale: 0.95,
    cameraPosition: [0.5, -0.1, 5.6],
    cameraFov: 42,
    keyLight: 0.75,
    rimLight: 1.6,
    particles: 0.85,
    // Metrics: three centred columns span the width, so step well back.
    sceneOpacity: 0.32,
  },
  {
    at: 0.47,
    objectPosition: [1.1, -0.25, 0.4],
    objectRotation: [1.1, 3.1, 0.35],
    objectScale: 1,
    cameraPosition: [-0.8, 0.5, 5.2],
    cameraFov: 40,
    keyLight: 1.3,
    rimLight: 1.2,
    particles: 0.7,
    sceneOpacity: 0.4,
  },
  {
    at: 0.63,
    objectPosition: [0.15, 0, 0.7],
    objectRotation: [1.5, 4.3, 0.45],
    objectScale: 1.05,
    cameraPosition: [0, 0.1, 4.4],
    cameraFov: 36,
    keyLight: 0.9,
    rimLight: 2,
    particles: 1,
    sceneOpacity: 0.26,
  },
  {
    at: 0.82,
    objectPosition: [-1.05, 0.2, 0.1],
    objectRotation: [1.2, 5.3, 0.2],
    objectScale: 0.95,
    cameraPosition: [0, 0.35, 5.6],
    cameraFov: 43,
    keyLight: 1.6,
    rimLight: 0.8,
    particles: 0.5,
    sceneOpacity: 0.3,
  },
  {
    at: 1,
    objectPosition: [0, -0.05, 0],
    objectRotation: [0.9, 6.28, 0],
    objectScale: 1,
    cameraPosition: [0, 0, 6],
    cameraFov: 46,
    keyLight: 1.25,
    rimLight: 1,
    particles: 0.3,
    sceneOpacity: 0.85,
  },
];

/** A mutable bucket the sampler writes into, so sampling allocates nothing per frame. */
export const createStage = (): Stage => ({ ...STAGES[0] });

/** Blend the timeline at `progress` into `out`. */
export function sampleStage(progress: number, out: Stage): Stage {
  const p = Math.min(Math.max(progress, 0), 1);

  let next = 1;
  while (next < STAGES.length - 1 && STAGES[next].at < p) next++;

  const a = STAGES[next - 1];
  const b = STAGES[next];
  const span = b.at - a.at;
  const t = smooth(span <= 0 ? 0 : (p - a.at) / span);

  out.at = p;
  out.objectPosition = lerpVec3(a.objectPosition, b.objectPosition, t);
  out.objectRotation = lerpVec3(a.objectRotation, b.objectRotation, t);
  out.objectScale = lerp(a.objectScale, b.objectScale, t);
  out.cameraPosition = lerpVec3(a.cameraPosition, b.cameraPosition, t);
  out.cameraFov = lerp(a.cameraFov, b.cameraFov, t);
  out.keyLight = lerp(a.keyLight, b.keyLight, t);
  out.rimLight = lerp(a.rimLight, b.rimLight, t);
  out.particles = lerp(a.particles, b.particles, t);
  out.sceneOpacity = lerp(a.sceneOpacity, b.sceneOpacity, t);
  return out;
}
