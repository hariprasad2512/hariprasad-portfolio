"use client";

import { useEffect, useRef } from "react";

/**
 * A topographic "signal field": drifting contour lines that bend toward
 * the cursor. Drawn on a DPR-capped canvas, paused when off-screen,
 * and rendered as a single static frame under reduced motion.
 */
export default function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const contextNode = canvasNode.getContext("2d");
    if (!contextNode) return;
    const canvas: HTMLCanvasElement = canvasNode;
    const context: CanvasRenderingContext2D = contextNode;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let running = false;
    let visible = true;
    let ink = "#17130e";
    let accent = "#ff4a1c";

    const pointer = { x: -2000, y: -2000, tx: -2000, ty: -2000 };
    let hasPointer = false;

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      ink = styles.getPropertyValue("--ink").trim() || ink;
      accent = styles.getPropertyValue("--accent").trim() || accent;
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(true);
    }

    function draw(staticFrame = false) {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);

      const lineCount = width < 640 ? 22 : 38;
      const step = width < 640 ? 7 : 6;
      const amplitude = height < 620 ? 9 : 14;

      for (let line = 0; line < lineCount; line += 1) {
        const baseY = ((line + 0.5) / lineCount) * height;
        const isAccent = line % 9 === 3;
        context.beginPath();

        for (let x = 0; x <= width + step; x += step) {
          const nx = x / width;
          const envelope = Math.pow(Math.sin(Math.PI * nx), 1.35);
          const drift =
            Math.sin(nx * 7.2 + time * 0.9 + line * 0.44) * amplitude +
            Math.sin(nx * 15.4 - time * 0.62 + line * 0.18) * amplitude * 0.42;

          let pull = 0;
          if (hasPointer) {
            const dx = x - pointer.x;
            const dy = baseY + drift - pointer.y;
            const distanceSquared = dx * dx + dy * dy;
            pull =
              32 * Math.exp(-distanceSquared / (2 * 150 * 150)) *
              Math.sign(dy || 1);
          }

          const y = baseY + (drift + pull) * envelope;
          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = isAccent ? accent : ink;
        context.lineWidth = isAccent ? 1.15 : 1;
        context.globalAlpha = isAccent ? 0.16 : 0.09;
        context.stroke();
      }
      context.globalAlpha = 1;

      if (staticFrame) return;
    }

    function tick() {
      if (!running) return;
      time += 0.008;
      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running || !visible || document.hidden || reduced.matches) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      if (!hasPointer) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        hasPointer = true;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 },
    );

    const themeObserver = new MutationObserver(() => {
      readColors();
      draw(true);
    });

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReducedChange = () => {
      stop();
      draw(true);
      if (!reduced.matches) start();
    };

    readColors();
    resize();
    draw(true);
    observer.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReducedChange);

    if (!reduced.matches) start();

    return () => {
      stop();
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:radial-gradient(ellipse_75%_70%_at_55%_45%,black_25%,transparent_82%)]"
    />
  );
}
