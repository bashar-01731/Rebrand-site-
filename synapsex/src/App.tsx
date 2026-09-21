import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicText from './components/CinematicText';
import Metrics from './components/Metrics';
import Technology from './components/Technology';
import Architecture from './components/Architecture';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SectionCounter from './components/SectionCounter';
import ScrollIndicator from './components/ScrollIndicator';
import { useScrollProgress } from './hooks/useScrollProgress';
import { startSmoothScroll } from './smoothScroll';

/** Delay before the hero content and navbar reveal themselves. */
const ENTRANCE_DELAY = 400;
/** Hero, Cinematic, Metrics, Technology, Architecture, Footer. */
const SECTION_COUNT = 6;

export default function App() {
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const section = useScrollProgress(SECTION_COUNT);

  const handleLoaderDone = useCallback(() => setRevealed(true), []);

  // Hold the curtain until the typefaces have landed, so the hero doesn't
  // reveal in a fallback face and reflow a beat later.
  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      done();
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const timeout = setTimeout(() => setEntranceComplete(true), ENTRANCE_DELAY);
    return () => clearTimeout(timeout);
  }, [revealed]);

  // Runs after the sections below have mounted, so snap can find them.
  useEffect(startSmoothScroll, []);

  return (
    <div
      className="relative w-full bg-black text-white"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <LoadingScreen ready={ready} onDone={handleLoaderDone} />
      <CustomCursor />

      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />

      <SectionCounter index={section} total={SECTION_COUNT} visible={revealed} />
      <ScrollIndicator visible={revealed && section === 0} />
    </div>
  );
}
