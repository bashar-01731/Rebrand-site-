import { useEffect, useState } from 'react';
import { onLenisScroll } from '../smoothScroll';

/**
 * Which section the reader is currently in, for the counter.
 *
 * Reads the document's scroll position directly — Lenis moves the page itself,
 * so we update on its frames as well as on native scroll events. Only the
 * section index goes through React state, so scrolling doesn't thrash the tree.
 */
export function useScrollProgress(sectionCount: number) {
  const [section, setSection] = useState(0);

  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const index = Math.min(sectionCount - 1, Math.floor(progress * sectionCount + 0.001));
      setSection((current) => (current === index ? current : index));
    };

    const detach = onLenisScroll(read);
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    read();

    return () => {
      detach();
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [sectionCount]);

  return section;
}
