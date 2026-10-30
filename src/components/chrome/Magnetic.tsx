"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.32,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
