import SynapseXLogo from './SynapseXLogo';
import { VIDEOS } from '../videos';

export default function Footer() {
  return (
    <footer className="relative flex min-h-[400px] w-full flex-col overflow-hidden bg-black md:flex-row">
      <div className="h-[300px] w-full md:h-auto md:w-1/2">
        <video
          src={VIDEOS.footer}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
        <div>
          <div className="mb-8 flex items-center gap-2.5">
            <SynapseXLogo size={18} className="text-white/70" />
            <span className="text-[15px] font-medium tracking-tight text-white/70">SynapseX</span>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
            The next evolution of human-machine interaction. Built for those who refuse to be
            limited by biology alone.
          </p>
        </div>

        <p className="mt-12 text-[12px] text-white/25">
          © 2026 SynapseX Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
