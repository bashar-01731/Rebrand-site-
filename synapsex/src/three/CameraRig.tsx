import { useFrame, useThree } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';
import type { Stage } from '../scroll/keyframes';
import type { Pointer } from '../hooks/useMousePosition';

interface CameraRigProps {
  stage: Stage;
  pointer: React.MutableRefObject<Pointer>;
}

const damp = (lambda: number, delta: number) => 1 - Math.exp(-lambda * delta);

/**
 * Moves the camera along the scroll timeline with damping, so it reads as a
 * real camera being flown rather than a value being set. The pointer adds a
 * small parallax offset on top; it never overrides the timeline position.
 */
export default function CameraRig({ stage, pointer }: CameraRigProps) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;

  useFrame((_, delta) => {
    const k = damp(3.2, delta);

    const targetX = stage.cameraPosition[0] + pointer.current.x * 0.45;
    const targetY = stage.cameraPosition[1] - pointer.current.y * 0.3;
    const targetZ = stage.cameraPosition[2];

    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;

    const fov = camera.fov + (stage.cameraFov - camera.fov) * k;
    if (Math.abs(fov - camera.fov) > 0.001) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    camera.lookAt(
      stage.objectPosition[0] * 0.4,
      stage.objectPosition[1] * 0.4,
      stage.objectPosition[2] * 0.4
    );
  });

  return null;
}
