import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from '../scroll/state';
import { onLenisScroll } from '../smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives `scrollState` from the document's scroll position with a scrubbed
 * ScrollTrigger, and returns the active section index for the UI counter.
 *
 * The 3D scene reads `scrollState` directly each frame; only the section index
 * goes through React state, so scrolling doesn't re-render the tree.
 */
export function useScrollProgress(sectionCount: number) {
  const [section, setSection] = useState(0);

  useEffect(() => {
    // Lenis moves the page itself, so ScrollTrigger has to be told to
    // recompute on Lenis's frames rather than only on native scroll events.
    const detach = onLenisScroll(() => ScrollTrigger.update());

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      // Scrub with a short lag: the timeline trails the scroll just enough to
      // feel cinematic without lagging behind the reader.
      scrub: 0.6,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        scrollState.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 2500);
        const index = Math.min(
          sectionCount - 1,
          Math.floor(self.progress * sectionCount + 0.001)
        );
        setSection((current) => (current === index ? current : index));
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      detach();
      trigger.kill();
    };
  }, [sectionCount]);

  return section;
}
