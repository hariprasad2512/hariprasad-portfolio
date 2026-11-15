"use client";

import { useEffect, useRef } from "react";

/**
 * The copyright year is written after hydration so prerendering stays
 * deterministic and the value is always current on each visit.
 */
export default function FooterYear() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return <span ref={ref}>2026</span>;
}
