"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLeadForm } from "@/components/LeadForm";
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight, Menu, Close } from "@/components/icons";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteNav() {
  const { open } = useLeadForm();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet owns the viewport while it is open.
  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || menu
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      {/* Skip link — first tab stop on the page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <div
        className={`u-container flex items-center justify-between transition-[padding] duration-500 ${
          scrolled ? "py-3.5" : "py-6"
        }`}
      >
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-bone transition-opacity hover:opacity-70 sm:text-2xl"
        >
          RE<span className="text-silver">:</span>BRAND
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="t-label text-dim transition-colors duration-300 hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton className="hidden md:inline-block">
            <button
              type="button"
              onClick={() => open()}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] tracking-wide text-bone transition-colors duration-300 hover:bg-bone hover:text-ink"
            >
              Start a project
              <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-bone md:hidden"
          >
            {menu ? <Close className="text-2xl" /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menu}
        className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Primary mobile" className="u-container flex flex-col py-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className="flex min-h-14 items-center border-b border-line font-display text-2xl text-bone"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenu(false);
              open();
            }}
            className="mt-5 mb-3 flex min-h-13 items-center justify-center gap-2 bg-bone px-6 py-3.5 text-sm font-medium text-ink"
          >
            Start a project
            <ArrowRight className="text-lg" />
          </button>
        </nav>
      </div>
    </header>
  );
}
