"use client";

import { CONTACT } from "@/lib/concepts";
import { WhatsApp, ArrowRight } from "@/components/icons";
import { useLeadForm } from "@/components/LeadForm";

/**
 * Persistent contact affordance.
 *
 * Desktop: a floating circular button, bottom-right.
 * Mobile: a fixed two-action bar — thumb-reachable, 56px tall, and split so the
 * primary conversion (start a project) is not buried behind a chat app.
 * `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iOS home indicator.
 */
export default function WhatsAppButton() {
  const { open } = useLeadForm();

  return (
    <>
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message RE:BRAND on WhatsApp"
        data-cursor="CHAT"
        className="fixed bottom-7 right-7 z-50 hidden h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-ink-2/90 text-2xl text-bone backdrop-blur transition-all duration-300 hover:scale-105 hover:border-bone md:flex"
      >
        <WhatsApp />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-ink-2/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-1 items-center justify-center gap-2 border-r border-line text-sm text-bone"
        >
          <WhatsApp className="text-lg" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => open()}
          className="flex min-h-14 flex-1 items-center justify-center gap-2 bg-bone text-sm font-medium text-ink"
        >
          Start a project
          <ArrowRight className="text-lg" />
        </button>
      </div>
    </>
  );
}
