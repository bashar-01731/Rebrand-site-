import { useEffect, useRef } from 'react';

export interface Pointer {
  /** -1 (left) .. 1 (right) */
  x: number;
  /** -1 (top) .. 1 (bottom) */
  y: number;
}

/**
 * Pointer position in normalised device coordinates, as a ref so consumers can
 * read it inside an animation frame without re-rendering.
 */
export function useMousePosition() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return pointer;
}
