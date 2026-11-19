"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Category B motion — section reveals.
 *
 * There are exactly two reveal behaviours on this site: a short upward fade,
 * and a clip-wipe used for imagery. Older call sites pass "blur" or "scale";
 * those map onto the same two behaviours on purpose, so no section invents its
 * own entrance.
 */
type RevealVariant = "fade-up" | "clip" | "blur" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  /** Turns this into a stagger parent for <RevealItem> children. */
  staggerChildren?: boolean;
};

export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.64;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  variant = "fade-up",
  staggerChildren = false,
}: RevealProps) {
  // Devices with "Reduce motion" turned on (macOS / iOS / Android accessibility
  // settings) still get the reveal, as a pure opacity fade with no travel.
  // Previously they got nothing, which made the whole site look static.
  const reduced = useReducedMotion() === true;

  const isClip = variant === "clip";

  const initial = reduced
    ? { opacity: 0 }
    : isClip
      ? { opacity: 0, clipPath: "inset(0 0 14% 0)" }
      : { opacity: 0, y };

  const animate = reduced
    ? { opacity: 1 }
    : isClip
      ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
      : { opacity: 1, y: 0 };

  if (staggerChildren) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
        }}
        viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: REVEAL_DURATION, ease: EASE_BRAND, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.56, ease: EASE_BRAND },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Thin editorial rule that draws itself in from the left. */
export function RevealRule({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        className={`h-px w-full bg-current ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE_BRAND }}
      />
    );
  }

  return (
    <motion.div
      className={`h-px w-full origin-left bg-current opacity-20 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE_BRAND }}
    />
  );
}
