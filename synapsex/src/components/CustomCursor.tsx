import { useEffect, useRef, useState } from 'react';

/**
 * A dot that tracks the pointer exactly and a ring that trails it. Hovering
 * anything interactive swells the ring. Pointer-only: touch devices never see
 * it, and it is inert to hit-testing.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let hovering = false;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = event.target as HTMLElement | null;
      hovering = !!el?.closest('a, button, [role="button"]');
    };

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        const scale = hovering ? 1.9 : 1;
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.current.style.borderColor = hovering
          ? 'rgba(22,21,26,0.75)'
          : 'rgba(22,21,26,0.3)';
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden sm:block" aria-hidden="true">
      <div ref={dot} className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ink" />
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-ink/30 transition-[border-color] duration-200"
      />
    </div>
  );
}
