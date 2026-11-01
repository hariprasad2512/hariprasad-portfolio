"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const root = document.documentElement;
    const dotNode = dotRef.current;
    const ringNode = ringRef.current;
    const labelNode = labelRef.current;
    if (!dotNode || !ringNode || !labelNode) return;
    const dot = dotNode;
    const ring = ringNode;
    const label = labelNode;

    root.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    function draw() {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      label.style.transform = `translate3d(${targetX + 22}px, ${targetY + 20}px, 0)`;
      frame = requestAnimationFrame(draw);
    }

    function handleMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const target = event.target as Element | null;
      const interactive = target?.closest(
        "a, button, [data-cursor], input, textarea, [role='button']",
      );
      ring.dataset.hover = interactive ? "true" : "false";
      const text =
        interactive?.getAttribute("data-cursor-label") ??
        (interactive instanceof HTMLAnchorElement ? "Open" : "");
      if (text) {
        label.textContent = text;
        label.dataset.visible = "true";
      } else {
        label.dataset.visible = "false";
      }
    }

    function handleLeave() {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      label.dataset.visible = "false";
    }

    function handleDown() {
      ring.style.scale = "0.82";
    }
    function handleUp() {
      ring.style.scale = "1";
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("pointerleave", handleLeave);
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
      <div ref={labelRef} className="cursor-label" />
    </div>
  );
}
