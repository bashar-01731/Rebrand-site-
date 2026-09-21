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
    // 1 INTRO - object centred, slow rotation, minimal typography.
    at: 0,
    objectPosition: [0, 0, 0],
    objectRotation: [0, 0, 0],
    objectScale: 1,
    cameraPosition: [0, 0, 6.4],
    cameraFov: 46,
    keyLight: 1,
    rimLight: 0.6,
    particles: 0.3,
    sceneOpacity: 1,
  },
  {
    // 2 DISCOVER - object moves right, camera closes, ~45deg, text on the left.
    at: 0.1667,
    objectPosition: [1.35, -0.05, 0.3],
    objectRotation: [0.2, 0.785, 0.05],
    objectScale: 1.02,
    cameraPosition: [0, 0.2, 5.6],
    cameraFov: 43,
    keyLight: 1.2,
    rimLight: 0.9,
    particles: 0.5,
    sceneOpacity: 0.9,
  },
  {
    // 3 DETAIL - camera pushes in, lighting turns dramatic, particles arrive.
    at: 0.3333,
    objectPosition: [-1.2, 0.1, 0.9],
    objectRotation: [0.6, 1.7, 0.15],
    objectScale: 1.1,
    cameraPosition: [0.6, -0.15, 4.5],
    cameraFov: 37,
    keyLight: 0.55,
    rimLight: 1.9,
    particles: 0.9,
    sceneOpacity: 0.78,
  },
  {
    // 4 TRANSFORMATION - heavy rotation, camera orbits, ground shifts.
    at: 0.5,
    objectPosition: [0.9, -0.2, 1.1],
    objectRotation: [1.3, 3.4, 0.5],
    objectScale: 1.15,
    cameraPosition: [-1.5, 0.8, 3.9],
    cameraFov: 34,
    keyLight: 1.45,
    rimLight: 1.3,
    particles: 0.75,
    sceneOpacity: 0.72,
  },
  {
    // 5 CLOSE-UP - very close, facets fill the frame, atmosphere at full.
    at: 0.6667,
    objectPosition: [0.1, 0, 1.9],
    objectRotation: [1.75, 4.6, 0.6],
    objectScale: 1.3,
    cameraPosition: [0, 0.1, 2.6],
    cameraFov: 28,
    keyLight: 0.8,
    rimLight: 2.2,
    particles: 1,
    sceneOpacity: 0.9,
  },
  {
    // 6 REVEAL - camera pulls back, object returns to centre, light lifts.
    at: 0.8333,
    objectPosition: [-0.5, 0.15, 0.4],
    objectRotation: [1.1, 5.4, 0.2],
    objectScale: 1,
    cameraPosition: [0, 0.3, 5.4],
    cameraFov: 44,
    keyLight: 1.8,
    rimLight: 0.7,
    particles: 0.55,
    sceneOpacity: 0.85,
  },
  {
    // 7 FINAL - resting position, large typography, CTA.
    at: 1,
    objectPosition: [0, -0.1, -0.3],
    objectRotation: [0.9, 6.28, 0],
    objectScale: 1.05,
    cameraPosition: [0, 0, 6.2],
    cameraFov: 47,
    keyLight: 1.3,
    rimLight: 1,
    particles: 0.35,
    sceneOpacity: 0.62,
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
