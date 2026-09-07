"use client";

import Link from "next/link";
import { CONTACT, CONCEPTS } from "@/lib/concepts";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { useLeadForm } from "@/components/LeadForm";
import { ArrowRight, Instagram, WhatsApp, Mail } from "@/components/icons";

export default function SiteFooter() {
  const { open } = useLeadForm();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      /* pb clears the fixed mobile action bar so nothing is trapped under it. */
      className="scroll-mt-24 border-t border-line pb-28 pt-section md:pb-16"
    >
      <div className="u-container">
        <Reveal className="max-w-4xl">
          <p className="t-label text-silver">Start a project</p>
          <h2 className="t-h2 mt-6">
            Your business deserves a better website.
          </h2>
          <p className="mt-6 max-w-xl text-dim">
            RE:BRAND designs premium websites — built to make businesses look
            established, modern, and worth trusting. Tell us what you do and
            we&apos;ll show you what it could look like.
          </p>

          <MagneticButton className="mt-10 block sm:inline-block">
            <button
              type="button"
              onClick={() => open()}
              className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-bone px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-opacity hover:opacity-88 sm:w-auto"
            >
              Start a project
              <ArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </MagneticButton>
        </Reveal>

        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-14 sm:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-tight">
              RE<span className="text-silver">:</span>BRAND
            </Link>
            <p className="t-label mt-4 text-silver">Creative Digital Studio</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="t-label text-silver">Studio</h2>
            <ul className="mt-5 space-y-3.5">
              {[
                { href: "/#work", label: "Work" },
                { href: "/#case-studies", label: "Case Studies" },
                { href: "/#pricing", label: "Pricing" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-9 items-center text-sm text-dim transition-colors hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Concepts">
            <h2 className="t-label text-silver">Concepts</h2>
            <ul className="mt-5 space-y-3.5">
              {CONCEPTS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/concepts/${c.slug}`}
                    className="inline-flex min-h-9 items-center text-sm text-dim transition-colors hover:text-bone"
                  >
                    {c.name}
                    <span className="sr-only"> — {c.industry} concept</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="t-label text-silver">Contact</h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-9 items-center gap-2.5 text-sm text-dim transition-colors hover:text-bone"
                >
                  <Mail className="text-base" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2.5 text-sm text-dim transition-colors hover:text-bone"
                >
                  <WhatsApp className="text-base" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2.5 text-sm text-dim transition-colors hover:text-bone"
                >
                  <Instagram className="text-base" />
                  {CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} RE:BRAND. All rights reserved.</p>
          <p>
            All six concepts are fictional brands, designed and built in-house as
            demonstrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
