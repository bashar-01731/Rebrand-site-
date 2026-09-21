import { useState } from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';
import { scrollToY } from '../smoothScroll';

const PILL_SPRING = { type: 'spring' as const, stiffness: 350, damping: 28 };

const scrollToSection = (id: string) => () =>
  document.getElementById(id)?.offsetTop ?? window.innerHeight;

const NAV_LINKS = [
  { label: 'Process', target: scrollToSection('discover') },
  { label: 'Contact', target: scrollToSection('final') },
];

interface NavbarProps {
  entranceComplete: boolean;
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollTo = (y: number) => {
    scrollToY(y);
    setMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 h-20 w-full bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <nav className="hidden h-full w-full items-center justify-between px-4 sm:flex sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => scrollTo(0)}
            className={`${
              menuOpen ? 'hidden md:flex' : 'flex'
            } h-12 items-center gap-2.5 rounded-[14px] bg-ink/[0.07] px-5 backdrop-blur-md`}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(22,21,26,0.20)' }}
            whileTap={{ scale: 0.98 }}
          >
            <BrandLogo size={18} className="text-ink" />
            <span className="text-[16px] font-medium tracking-tight text-ink">RE:BRAND</span>
          </motion.button>

          <motion.div
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-ink/[0.07] backdrop-blur-md"
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={PILL_SPRING}
          >
            <motion.button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className={`flex shrink-0 items-center justify-center ${
                menuOpen
                  ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-ink/10 hover:bg-ink/20'
                  : 'h-12 w-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger isOpen={menuOpen} />
            </motion.button>

            <motion.div
              className="flex items-center gap-6 pl-5"
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 15 }}
              transition={{ duration: 0.25, delay: menuOpen ? 0.1 : 0 }}
            >
              {NAV_LINKS.map(({ label, target }) => (
                <button
                  key={label}
                  type="button"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => scrollTo(target())}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  className="whitespace-nowrap text-[16px] font-normal text-ink/85 transition-colors hover:text-ink"
                >
                  <ScrambleText text={label} isHovered={hovered === label} />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          className="flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-bone"
          onMouseEnter={() => setHovered('Start a project')}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.03, backgroundColor: '#2E2C36' }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-arrow-right text-[17px] leading-none" aria-hidden="true" />
          <ScrambleText
            text="Start a project"
            isHovered={hovered === 'Start a project'}
            className="text-[15px] font-normal"
          />
        </motion.button>
      </nav>

      {/* Mobile */}
      <nav className="flex h-full w-full items-center gap-2 px-4 sm:hidden">
        <motion.button
          type="button"
          onClick={() => scrollTo(0)}
          className="flex h-9 shrink-0 items-center gap-2 overflow-hidden rounded-[10px] bg-ink/[0.07] backdrop-blur-md"
          animate={{ width: menuOpen ? 0 : 'auto', paddingLeft: menuOpen ? 0 : 12, paddingRight: menuOpen ? 0 : 12 }}
          transition={PILL_SPRING}
        >
          <BrandLogo size={15} className="shrink-0 text-ink" />
          <span className="whitespace-nowrap text-[13px] font-medium tracking-tight text-ink">
            RE:BRAND
          </span>
        </motion.button>

        <motion.div
          className="flex h-9 items-center overflow-hidden rounded-[10px] bg-ink/[0.07] backdrop-blur-md"
          animate={{ width: menuOpen ? '100%' : 36 }}
          transition={PILL_SPRING}
        >
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`flex shrink-0 items-center justify-center ${
              menuOpen ? 'ml-1 h-7 w-7 rounded-[8px] bg-ink/10' : 'h-9 w-9 rounded-[10px]'
            }`}
          >
            <SquashHamburger isOpen={menuOpen} compact />
          </button>

          <motion.div
            className="flex items-center gap-4 pl-4"
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 15 }}
            transition={{ duration: 0.25, delay: menuOpen ? 0.1 : 0 }}
          >
            {NAV_LINKS.map(({ label, target }) => (
              <button
                key={label}
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => scrollTo(target())}
                className="whitespace-nowrap text-[13px] font-normal text-ink/85"
              >
                {label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 text-bone"
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-arrow-right text-[14px] leading-none" aria-hidden="true" />
          <span className="text-[13px] font-normal">Start</span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
