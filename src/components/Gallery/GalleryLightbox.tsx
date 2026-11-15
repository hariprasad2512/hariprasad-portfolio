"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery";

type GalleryLightboxProps = {
  photos: GalleryPhoto[];
  /** Index of the open photo within `photos`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const SWIPE_THRESHOLD = 60;

/**
 * Full-screen lightbox: full-size image, caption/event details,
 * previous/next navigation, close button, Escape + arrow-key support,
 * swipe on touch devices, scroll lock, and basic focus management.
 */
export default function GalleryLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Keyboard navigation.
  useEffect(() => {
    if (!open || index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onNavigate((index + 1) % photos.length);
      } else if (event.key === "ArrowLeft") {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, photos.length, onClose, onNavigate]);

  // Move focus into the dialog on open, restore it on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, [open]);

  const goPrev = () => index !== null && onNavigate((index - 1 + photos.length) % photos.length);
  const goNext = () => index !== null && onNavigate((index + 1) % photos.length);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <AnimatePresence initial={false}>
      {photo ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${photo.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="font-mono text-xs text-muted">
              {index! + 1} / {photos.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground/25 hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-14">
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex max-h-full items-center justify-center"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                sizes="100vw"
                priority
                className="h-auto max-h-[76vh] w-auto max-w-full rounded-lg border border-border bg-card object-contain"
              />
            </motion.div>

            {/* Side navigation (also tap-friendly) */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted transition-colors hover:border-foreground/25 hover:text-foreground sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted transition-colors hover:border-foreground/25 hover:text-foreground sm:right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Caption / details */}
          <div className="px-6 pb-6 pt-4 text-center">
            <p className="text-sm font-medium tracking-tight">{photo.title}</p>
            {photo.caption ? (
              <p className="mt-1 text-sm text-muted">{photo.caption}</p>
            ) : null}
            <p className="mt-2 font-mono text-[11px] text-muted/80">
              {[
                photo.event,
                photo.date,
                photo.location,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
