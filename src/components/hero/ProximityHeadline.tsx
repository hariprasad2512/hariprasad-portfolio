"use client";

import { useEffect, useRef } from "react";

type ProximityHeadlineProps = {
  text: string;
  className?: string;
};

/**
 * Splits a line of text into letters and nudges each one away from the
 * cursor. Purely decorative motion: the accessible label keeps the text
 * intact, and it is disabled for touch and reduced motion.
 */
export default function ProximityHeadline({
  text,
  className = "",
}: ProximityHeadlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const letters = Array.from(
      container.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );
    if (!letters.length) return;

    let rects = letters.map((letter) => letter.getBoundingClientRect());
    let pointerX = -9999;
    let pointerY = -9999;
    let frame = 0;
    let needsFrame = false;

    function measure() {
      rects = letters.map((letter) => letter.getBoundingClientRect());
    }

    function render() {
      needsFrame = false;
      letters.forEach((letter, index) => {
        const rect = rects[index];
        if (!rect) return;
        const dx = pointerX - (rect.left + rect.width / 2);
        const dy = pointerY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const falloff = Math.max(0, 1 - distance / 220);
        const push = falloff * falloff;
        const translateY = -push * 16;
        const translateX = -push * Math.sign(dx) * 4;
        const rotate = -push * Math.sign(dx) * 4;
        letter.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${1 + push * 0.035})`;
      });
    }

    function onPointerMove(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!needsFrame) {
        needsFrame = true;
        frame = requestAnimationFrame(render);
      }
    }

    function onLeave() {
      pointerX = -9999;
      pointerY = -9999;
      if (!needsFrame) {
        needsFrame = true;
        frame = requestAnimationFrame(render);
      }
    }

    measure();
    document.fonts?.ready.then(measure).catch(() => undefined);
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onLeave);
      letters.forEach((letter) => {
        letter.style.transform = "";
      });
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block">
          {Array.from(word).map((character, characterIndex) => (
            <span
              key={`${character}-${characterIndex}`}
              data-letter
              aria-hidden="true"
              className="inline-block will-change-transform"
              style={{ transformOrigin: "50% 80%" }}
            >
              {character}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span aria-hidden="true" className="inline-block">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
