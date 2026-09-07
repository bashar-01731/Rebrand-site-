"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";

export type DemoView = "desktop" | "mobile";

interface DemoContextValue {
  view: DemoView;
  /** The element the demo scrolls inside — the browser frame's viewport. */
  scrollerRef: RefObject<HTMLDivElement | null>;
  /** Scroll to a section id *within* the frame, not the host page. */
  goTo: (id: string) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({
  value,
  children,
}: {
  value: DemoContextValue;
  children: ReactNode;
}) {
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside a concept demo");
  return ctx;
}
