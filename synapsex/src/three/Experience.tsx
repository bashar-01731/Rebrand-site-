import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Scene from './Scene';
import { useMousePosition } from '../hooks/useMousePosition';
import { createStage, sampleStage } from '../scroll/keyframes';
import { scrollState } from '../scroll/state';

interface ExperienceProps {
  onReady: () => void;
}

/** Coarse pointer or a narrow screen: cut the particle budget and the shadows. */
function useDeviceProfile() {
  return useMemo(() => {
    if (typeof window === 'undefined') return { particleCount: 1400, shadows: true };
    const small =
      window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    return small
      ? { particleCount: 450, shadows: false }
      : { particleCount: 1400, shadows: true };
  }, []);
}

/**
 * The fixed, full-viewport WebGL layer that sits behind the whole page. It
 * never scrolls itself — the scroll timeline moves the camera instead.
 */
export default function Experience({ onReady }: ExperienceProps) {
  const pointer = useMousePosition();
  const layer = useRef<HTMLDivElement>(null);
  const { particleCount, shadows } = useDeviceProfile();
  const [failed, setFailed] = useState(false);

  // If WebGL is unavailable the page must still work: fall back to the plain
  // gradient background rather than showing a dead canvas.
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported =
        !!window.WebGLRenderingContext &&
        !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
      if (!supported) {
        setFailed(true);
        onReady();
      }
    } catch {
      setFailed(true);
      onReady();
    }
  }, [onReady]);

  // The scene's prominence is part of the scroll timeline: dark type on a pale
  // ground needs the object to step back under dense copy. Driven straight from
  // scroll state in a frame loop, so it never re-renders the tree.
  useEffect(() => {
    if (failed) return;
    const stage = createStage();
    let current = 1;
    let frame = requestAnimationFrame(function loop() {
      sampleStage(scrollState.progress, stage);
      current += (stage.sceneOpacity - current) * 0.08;
      if (layer.current) layer.current.style.opacity = current.toFixed(3);
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [failed]);

  if (failed) return null;

  return (
    <div ref={layer} className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        // Cap the pixel ratio: retina at 3x costs far more than it shows.
        dpr={[1, 1.75]}
        shadows={shadows}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 6], fov: 46, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          onReady();
        }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} particleCount={particleCount} shadows={shadows} />
        </Suspense>
      </Canvas>
    </div>
  );
}
