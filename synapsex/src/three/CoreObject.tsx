import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Stage } from '../scroll/keyframes';
import type { Pointer } from '../hooks/useMousePosition';
import { scrollState } from '../scroll/state';
import { PALETTE } from './palette';

interface CoreObjectProps {
  stage: Stage;
  pointer: React.MutableRefObject<Pointer>;
}

/** Frame-rate independent damping factor. */
const damp = (lambda: number, delta: number) => 1 - Math.exp(-lambda * delta);

/**
 * The hero form: a faceted polyhedron in near-black metal with a wireframe
 * shell just outside it, so the silhouette catches the rim light and reads as
 * a cut solid rather than a smooth ball.
 */
export default function CoreObject({ stage, pointer }: CoreObjectProps) {
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const shell = useMemo(() => new THREE.IcosahedronGeometry(1.28, 1), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const k = damp(4.5, delta);

    // Scroll drives the pose; the pointer only nudges it, so mouse movement
    // can never fight the timeline.
    const tiltX = pointer.current.y * 0.18;
    const tiltY = pointer.current.x * 0.25;

    g.position.x += (stage.objectPosition[0] - g.position.x) * k;
    g.position.y += (stage.objectPosition[1] - g.position.y) * k;
    g.position.z += (stage.objectPosition[2] - g.position.z) * k;

    g.rotation.x += (stage.objectRotation[0] + tiltX - g.rotation.x) * k;
    g.rotation.y += (stage.objectRotation[1] + tiltY - g.rotation.y) * k;
    g.rotation.z += (stage.objectRotation[2] - g.rotation.z) * k;

    // Scroll velocity gives the form a little inertia of its own.
    const target = stage.objectScale * (1 + scrollState.velocity * 0.04);
    const s = g.scale.x + (target - g.scale.x) * k;
    g.scale.setScalar(s);

    if (solid.current) {
      // A slow drift keeps the object alive when the reader stops scrolling.
      solid.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={solid} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={PALETTE.object}
          // No environment map in the scene, so keep metalness moderate:
          // a near-1 metal has nothing to reflect and renders as black.
          metalness={0.45}
          roughness={0.28}
          flatShading
        />
      </mesh>

      <mesh geometry={shell}>
        <meshBasicMaterial
          color={PALETTE.shell}
          wireframe
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
