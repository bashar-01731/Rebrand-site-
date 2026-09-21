import Lenis from 'lenis';
import Snap from 'lenis/snap';

let lenis: Lenis | null = null;

/**
 * Scroll to an absolute Y position, routed through Lenis so the move is
 * smoothed and the snap engine stays in sync. Falls back to native smooth
 * scrolling when Lenis is off (reduced motion, or before mount).
 */
export function scrollToY(y: number) {
  if (lenis) {
    lenis.scrollTo(y);
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Start Lenis smooth scrolling with per-section snapping.
 *
 * Snap type is `proximity`, not `mandatory`: the Architecture section grows
 * past the viewport on short screens and the footer is only 400px tall, so
 * mandatory snapping would strand content that can never reach the top of the
 * viewport. Every other section is exactly 100vh, so an ordinary scroll still
 * lands on a section boundary and reads as full-page.
 *
 * Returns a teardown function.
 */
export function startSmoothScroll(): () => void {
  // Honour a reader who has asked the OS for less motion: no smoothing, no snap.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  lenis = new Lenis({
    // Well under the 1.2 default: the wheel still eases, but the page stops
    // close to where the reader let go rather than gliding on.
    duration: 0.8,
    smoothWheel: true,
  });

  const snap = new Snap(lenis, {
    type: 'proximity',
    // Snap when the rest point lands within a third of a screen of a section.
    distanceThreshold: '33%',
    duration: 0.6,
    debounce: 150,
  });
  snap.addElements(Array.from(document.querySelectorAll('section')), {
    align: ['start'],
  });

  let frame = requestAnimationFrame(function loop(time: number) {
    lenis?.raf(time);
    frame = requestAnimationFrame(loop);
  });

  return () => {
    cancelAnimationFrame(frame);
    snap.destroy();
    lenis?.destroy();
    lenis = null;
  };
}
