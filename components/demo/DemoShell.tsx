"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CONCEPTS, type Concept } from "@/lib/concepts";
import { DemoProvider, type DemoView } from "@/components/demo/DemoContext";
import DemoOutro from "@/components/demo/DemoOutro";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/motion";
import { ArrowLeft, ArrowRight, Monitor, Smartphone } from "@/components/icons";

export default function DemoShell({
  concept,
  children,
}: {
  concept: Concept;
  children: ReactNode;
}) {
  const [view, setView] = useState<DemoView>("desktop");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ready = useGsap();

  // Phones get the mobile layout first — it is the honest default there, and
  // the desktop preview stays one tap away.
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setView("mobile");
  }, []);

  const goTo = useCallback((id: string) => {
    const scroller = scrollerRef.current;
    const target = scroller?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!scroller || !target) return;
    const top = target.offsetTop - 8;
    scroller.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /* Entry: the frame settles in from slightly back, so arriving from a concept
     card reads as moving into it rather than as a hard page swap. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!ready || !stage || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { opacity: 0, scale: 0.965, y: 26 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out" },
      );
      gsap.fromTo(
        "[data-demo-bar]",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 },
      );
    }, stage.parentElement ?? stage);
    return () => ctx.revert();
  }, [ready]);

  // Switching viewport returns you to the top of the demo — otherwise you land
  // mid-page in a layout you have not seen the start of.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 });
  }, [view]);

  const index = CONCEPTS.findIndex((c) => c.slug === concept.slug);
  const next = CONCEPTS[(index + 1) % CONCEPTS.length];
  const prev = CONCEPTS[(index - 1 + CONCEPTS.length) % CONCEPTS.length];

  return (
    <DemoProvider value={{ view, scrollerRef, goTo }}>
      <div className="min-h-screen bg-ink pb-28 pt-5 md:pb-14">
        <div className="u-container">
          {/* --- control bar ------------------------------------------- */}
          <div
            data-demo-bar
            className="flex flex-wrap items-center justify-between gap-4 pb-5"
          >
            <Link
              href="/#work"
              className="group inline-flex min-h-11 items-center gap-2.5 text-sm text-dim transition-colors hover:text-bone"
            >
              <ArrowLeft className="text-base transition-transform duration-300 group-hover:-translate-x-1" />
              Back to RE:BRAND
            </Link>

            <div className="hidden items-baseline gap-3 md:flex">
              <span className="t-label text-silver">{concept.num}</span>
              <span className="font-display text-lg tracking-tight text-bone">
                {concept.name}
              </span>
              <span className="t-label text-silver">{concept.industry}</span>
            </div>

            <ViewToggle view={view} onChange={setView} />
          </div>

          {/* --- the frame ---------------------------------------------- */}
          <div ref={stageRef} className="origin-top">
            {view === "desktop" ? (
              <BrowserFrame domain={concept.domain}>
                <Viewport ref={scrollerRef} view={view}>
                  {children}
                  <DemoOutro concept={concept} />
                </Viewport>
              </BrowserFrame>
            ) : (
              <PhoneFrame>
                <Viewport ref={scrollerRef} view={view}>
                  {children}
                  <DemoOutro concept={concept} />
                </Viewport>
              </PhoneFrame>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-dim">
            {view === "desktop"
              ? "This is a live, scrollable concept site running inside the frame."
              : "The mobile view is a different layout, not a shrunken desktop page."}
          </p>

          {/* --- prev / next -------------------------------------------- */}
          <nav
            aria-label="Other concepts"
            className="mt-14 flex items-stretch justify-between gap-4 border-t border-line pt-8"
          >
            <Link
              href={`/concepts/${prev.slug}`}
              className="group flex min-h-11 flex-1 items-center gap-3 text-left"
            >
              <ArrowLeft className="shrink-0 text-lg text-silver transition-transform duration-300 group-hover:-translate-x-1" />
              <span>
                <span className="t-label block text-silver">Previous</span>
                <span className="font-display text-lg text-bone">{prev.name}</span>
              </span>
            </Link>
            <Link
              href={`/concepts/${next.slug}`}
              className="group flex min-h-11 flex-1 items-center justify-end gap-3 text-right"
            >
              <span>
                <span className="t-label block text-silver">Next</span>
                <span className="font-display text-lg text-bone">{next.name}</span>
              </span>
              <ArrowRight className="shrink-0 text-lg text-silver transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </div>
    </DemoProvider>
  );
}

/* ------------------------------------------------------------------ */

function ViewToggle({
  view,
  onChange,
}: {
  view: DemoView;
  onChange: (v: DemoView) => void;
}) {
  const options: { id: DemoView; label: string; Icon: typeof Monitor }[] = [
    { id: "desktop", label: "Desktop", Icon: Monitor },
    { id: "mobile", label: "Mobile", Icon: Smartphone },
  ];

  return (
    <div
      role="group"
      aria-label="Preview size"
      className="flex items-center gap-1 rounded-full border border-line p-1"
    >
      {options.map(({ id, label, Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[13px] transition-colors duration-300 ${
              active ? "bg-bone text-ink" : "text-dim hover:text-bone"
            }`}
          >
            <Icon className="text-base" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** The scrollable stage. `data-view` is what the `mv:`/`dv:` variants key off. */
function Viewport({
  ref,
  view,
  children,
}: {
  ref: React.Ref<HTMLDivElement>;
  view: DemoView;
  children: ReactNode;
}) {
  return (
    <div
      ref={ref}
      data-view={view}
      tabIndex={0}
      role="region"
      aria-label="Concept website preview — scrollable"
      /* The scroller is a size container, so every clamp() inside a demo
         measures the frame rather than the browser window. Without this a
         13vw headline is sized by the visitor's monitor while sitting in a
         1024px frame — or, in mobile view, by a 1440px monitor while sitting
         in a 370px phone. */
      style={{ containerType: "inline-size" }}
      className="u-thin-scrollbar h-full overflow-y-auto overflow-x-hidden overscroll-contain"
    >
      {children}
    </div>
  );
}

function BrowserFrame({
  domain,
  children,
}: {
  domain: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line-strong bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex shrink-0 gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#3d3d3a]" />
          <span className="h-3 w-3 rounded-full bg-[#4a4a46]" />
          <span className="h-3 w-3 rounded-full bg-[#57574f]" />
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center justify-center rounded-full bg-ink px-4 py-1.5">
          <span className="truncate font-sans text-xs text-dim">{domain}</span>
        </div>
        <div className="w-14 shrink-0" aria-hidden="true" />
      </div>
      {/* Below 1024px the desktop layout keeps its real width and scrolls
          sideways inside this frame. The page itself never scrolls
          horizontally — the overflow is the frame's, which is what a desktop
          preview on a small screen honestly is. */}
      <div className="h-[clamp(460px,70vh,760px)] overflow-x-auto">
        <div className="h-full min-w-[1024px]">{children}</div>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center py-2">
      <div className="relative w-full max-w-[390px] rounded-[2.5rem] border-[10px] border-[#161614] bg-[#161614] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        {/* A pill rather than a notch, in near-black at 85%: it has to read
            over a light concept (FORM) and a pure-black one (VOID) alike. */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/85"
        />
        <div className="h-[clamp(520px,72vh,780px)] overflow-hidden rounded-[1.9rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
