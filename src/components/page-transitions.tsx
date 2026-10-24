"use client";

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/** React coordinates snapshots with route readiness and browser history. */
export function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition
      key={pathname}
      name="page-content"
      share="page-change"
      enter="page-change"
      exit="page-change"
      default="none"
    >
      <div className="route-surface">{children}</div>
    </ViewTransition>
  );
}
