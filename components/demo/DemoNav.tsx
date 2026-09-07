"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useDemo } from "@/components/demo/DemoContext";

/**
 * In-demo navigation.
 *
 * These are real buttons, not anchors. A demo site's "Shop" link has no page to
 * go to, and an `href="#"` that silently does nothing is a worse lie than a
 * control that actually moves you to the relevant section of the demo — which
 * this does, scrolling the browser frame rather than the host page.
 */
export function DemoNavLink({
  to,
  children,
  ...rest
}: {
  to: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">) {
  const { goTo } = useDemo();
  return (
    <button type="button" onClick={() => goTo(to)} {...rest}>
      {children}
    </button>
  );
}
