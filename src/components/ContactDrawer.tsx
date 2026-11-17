"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, X } from "lucide-react";
import CopyEmailButton from "./ui/CopyEmailButton";
import SocialRows from "./ui/SocialRows";
import { profile } from "@/data/profile";

/**
 * "Get in touch" contact drawer. The trigger replaces the old mailto
 * link: clicking it slides a panel in from the left over a dimmed
 * backdrop, showing the email (copy + write) and every social profile.
 * Esc or a backdrop click closes it; focus is trapped inside while
 * open and returned to the trigger on close.
 */
export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      // Minimal focus trap: wrap Tab at the panel's edges.
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden"; // lock page scroll while open
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus(); // return focus to the trigger
    };
  }, [open]);

  const slide = prefersReducedMotion ? { opacity: 0 } : { x: "-100%" };
  const slideIn = prefersReducedMotion ? { opacity: 1 } : { x: 0 };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Get in touch
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-[45] bg-black/40"
            />

            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Contact options"
              tabIndex={-1}
              initial={slide}
              animate={slideIn}
              exit={slide}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-r border-border bg-card shadow-xl outline-none"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border p-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border ring-1 ring-accent/20">
                  <Image
                    src="/profile.jpg"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold tracking-tight">
                    {profile.name}
                  </p>
                  <p className="truncate font-mono text-xs text-muted">
                    {profile.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact panel"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Email */}
              <div className="p-5 pb-0">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  email
                </p>
                <p className="mt-2 truncate font-medium tracking-tight">
                  {profile.email}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Write me
                  </a>
                  <CopyEmailButton email={profile.email} />
                </div>
              </div>

              {/* Socials */}
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  elsewhere
                </p>
                <SocialRows className="mt-3" />
              </div>

              <p className="mt-auto border-t border-border p-5 font-mono text-xs text-muted">
                {profile.location} · {profile.availability}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
