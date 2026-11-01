"use client";

import { useEffect, useRef, useState } from "react";

export function toast(message: string) {
  window.dispatchEvent(
    new CustomEvent("signal:toast", { detail: { message } }),
  );
}

export default function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    function onToast(event: Event) {
      const detail = (event as CustomEvent<{ message: string }>).detail;
      if (!detail?.message) return;
      setMessage(detail.message);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), 2600);
    }
    window.addEventListener("signal:toast", onToast);
    return () => {
      window.removeEventListener("signal:toast", onToast);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[120] flex justify-center px-4"
    >
      {message && (
        <div
          className="rounded-full border border-rule-strong bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper shadow-xl"
          style={{ animation: "toast-in 240ms cubic-bezier(0.16,1,0.3,1)" }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
