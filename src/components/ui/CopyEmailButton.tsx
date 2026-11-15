"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy-to-clipboard button with brief inline feedback.
 * Used next to the email address on the contact page.
 */
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/private mode) — no feedback.
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        title="Copy email"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-foreground/25 hover:text-foreground active:scale-95"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="font-mono text-xs text-muted">
        {copied ? "copied!" : ""}
      </span>
    </span>
  );
}
