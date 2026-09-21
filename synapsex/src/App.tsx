import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicText from './components/CinematicText';
import Metrics from './components/Metrics';
import Technology from './components/Technology';
import Services from './components/Services';
import Architecture from './components/Architecture';
import Footer from './components/Footer';
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
/** Hero, Cinematic, Metrics, Technology, Services, Architecture, Footer. */
const SECTION_COUNT = 7;

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const section = useScrollProgress(SECTION_COUNT);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleLoaderDone = useCallback(() => setRevealed(true), []);

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
        <CinematicText />
        <Metrics />
        <Technology />
        <Services />
        <Architecture />
        <Footer />
      </div>

      <SectionCounter index={section} total={SECTION_COUNT} visible={revealed} />
      <ScrollIndicator visible={revealed && section === 0} />
    </div>
  );
}
