import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollExperience from './components/ScrollExperience';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SectionCounter from './components/SectionCounter';
import ScrollIndicator from './components/ScrollIndicator';
import { useScrollProgress } from './hooks/useScrollProgress';
import { startSmoothScroll } from './smoothScroll';

// Three.js and R3F are by far the heaviest dependency; keep them out of the
// initial chunk so the shell and loading screen paint immediately.
const Experience = lazy(() => import('./three/Experience'));

/** Delay before the hero content and navbar reveal themselves. */
const ENTRANCE_DELAY = 400;
/** Intro, Discover, Detail, Transformation, Close-up, Reveal, Trade, Final. */
const SECTION_COUNT = 8;

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const section = useScrollProgress(SECTION_COUNT);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleLoaderDone = useCallback(() => setRevealed(true), []);

  const scrollToFinal = useCallback(() => {
    document.getElementById('final')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // The entrance only starts once the loader has cleared, so the scramble
  // isn't playing behind a curtain.
  useEffect(() => {
    if (!revealed) return;
    const timeout = setTimeout(() => setEntranceComplete(true), ENTRANCE_DELAY);
    return () => clearTimeout(timeout);
  }, [revealed]);

  // Runs after the sections below have mounted, so snap can find them.
  useEffect(startSmoothScroll, []);

  return (
    <div
      className="relative w-full text-ink"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <LoadingScreen ready={sceneReady} onDone={handleLoaderDone} />
      <CustomCursor />

      <Suspense fallback={null}>
        <Experience onReady={handleSceneReady} />
      </Suspense>

      <div className="relative z-10">
        <Navbar entranceComplete={entranceComplete} />
        <Hero entranceComplete={entranceComplete} />
        <ScrollExperience onStart={scrollToFinal} />
      </div>

      <SectionCounter index={section} total={SECTION_COUNT} visible={revealed} />
      <ScrollIndicator visible={revealed && section === 0} />
    </div>
  );
}
