import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Stage } from '../scroll/keyframes';

interface LightingProps {
  stage: Stage;
  /** Shadows are the most expensive part of the scene; off on small devices. */
  shadows: boolean;
}

/**
 * A four-point rig — key, fill, rim and a travelling accent — whose intensities
 * and positions are driven by the scroll timeline, so each stage is lit
 * differently while the transitions stay continuous.
 */
export default function Lighting({ stage, shadows }: LightingProps) {
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const accent = useRef<THREE.PointLight>(null);

  useFrame((clock) => {
    const t = clock.clock.elapsedTime;

    if (key.current) {
      key.current.intensity += (stage.keyLight * 2.4 - key.current.intensity) * 0.06;
    }
    if (rim.current) {
      rim.current.intensity += (stage.rimLight * 6 - rim.current.intensity) * 0.06;
      // The rim orbits slowly, so highlights travel across the facets.
      rim.current.position.x = Math.sin(t * 0.18) * 4;
      rim.current.position.z = Math.cos(t * 0.18) * 4 - 1;
    }
    if (accent.current) {
      accent.current.intensity += (stage.rimLight * 3 - accent.current.intensity) * 0.05;
      accent.current.position.y = Math.sin(t * 0.25) * 2.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#9aa0b5" />

      <directionalLight
        ref={key}
        position={[4, 5, 4]}
        intensity={2.4}
        color="#ffffff"
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
      />

      {/* Fill: keeps the shadow side readable without flattening the form. */}
      <directionalLight position={[-5, -1, 2]} intensity={0.5} color="#6f7590" />

      <pointLight ref={rim} position={[0, 1.5, -4]} intensity={6} color="#8E7F94" distance={18} />
      <pointLight ref={accent} position={[-3, 0, 3]} intensity={3} color="#ffffff" distance={14} />
    </>
  );
}
