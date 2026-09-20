import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicText from './components/CinematicText';
import Metrics from './components/Metrics';
import Technology from './components/Technology';
import Architecture from './components/Architecture';
import Footer from './components/Footer';

/** Delay before the hero content and navbar reveal themselves. */
const ENTRANCE_DELAY = 800;

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), ENTRANCE_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative w-full bg-black text-white"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  );
}
