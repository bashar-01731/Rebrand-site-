import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Stage } from '../scroll/keyframes';
import type { Pointer } from '../hooks/useMousePosition';

interface ParticlesProps {
  count: number;
  stage: Stage;
  pointer: React.MutableRefObject<Pointer>;
}

/**
 * Atmospheric motes suspended around the object. Sizes and depths vary so the
 * field reads as volume rather than a flat starfield, and the whole cloud
 * fades with the timeline.
 */
export default function Particles({ count, stage, pointer }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical shell with jitter: dense near the object, thinning outward.
      const radius = 2 + Math.pow(Math.random(), 0.6) * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      scales[i] = 0.4 + Math.random() * 1.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count]);

  useFrame((clock, delta) => {
    const p = points.current;
    if (!p) return;

    // Slow drift, plus a gentle lean toward the pointer.
    p.rotation.y += delta * 0.02;
    p.rotation.x = Math.sin(clock.clock.elapsedTime * 0.06) * 0.08 + pointer.current.y * 0.05;
    p.position.x += (pointer.current.x * 0.3 - p.position.x) * 0.02;

    if (material.current) {
      const target = stage.particles * 0.75;
      material.current.opacity += (target - material.current.opacity) * 0.06;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        ref={material}
        size={0.035}
        sizeAttenuation
        color="#cfc7d4"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
