import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="relative flex min-h-[400px] w-full flex-col overflow-hidden">
      <div className="flex w-full flex-col justify-between p-10 sm:p-16">
        <div>
          <div className="mb-8 flex items-center gap-2.5">
            <BrandLogo size={18} className="text-white/70" />
            <span className="text-[15px] font-medium tracking-tight text-white/70">RE:BRAND</span>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
            Premium websites for businesses that have outgrown the template they started
            on. Built by hand, shipped fast, yours to keep.
          </p>
        </div>

        <p className="mt-12 text-[12px] text-white/25">
          © 2026 RE:BRAND Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
