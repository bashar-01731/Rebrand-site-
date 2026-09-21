import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CoreObject from './CoreObject';
import Particles from './Particles';
import Lighting from './Lighting';
import CameraRig from './CameraRig';
import { createStage, sampleStage } from '../scroll/keyframes';
import { scrollState } from '../scroll/state';
import type { Pointer } from '../hooks/useMousePosition';

interface SceneProps {
  pointer: React.MutableRefObject<Pointer>;
  particleCount: number;
  shadows: boolean;
}

/**
 * Samples the scroll timeline once per frame and hands the blended stage to
 * everything in the scene, so the object, camera, lights and particles all
 * move from a single source of truth.
 */
export default function Scene({ pointer, particleCount, shadows }: SceneProps) {
  // One mutable stage object, reused every frame — no per-frame allocation.
  const stage = useRef(createStage());
  const scene = useThree((s) => s.scene);

  // Deliberately no fog: the canvas sits over the video sections, and fog
  // would paint a flat colour across footage that is meant to show through.
  scene.fog = null;

  useFrame(() => {
    sampleStage(scrollState.progress, stage.current);
  });

  return (
    <>
      <CameraRig stage={stage.current} pointer={pointer} />
      <Lighting stage={stage.current} shadows={shadows} />
      <CoreObject stage={stage.current} pointer={pointer} />
      <Particles count={particleCount} stage={stage.current} pointer={pointer} />
    </>
  );
}
