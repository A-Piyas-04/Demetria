"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, select, textarea, [role='button']";
const DARK_TONE = "[data-tone='dark']";

const IDLE_RADIUS = 15;
const HOVER_RADIUS = 27;
const TICK_LENGTH = 4;
const TICK_GAP = 5;

/**
 * Cursor instrument: a fine reticle that eases toward the pointer and squares
 * up over anything interactive. Reads as a measuring instrument rather than
 * decoration, which suits a laboratory brand.
 *
 * Design rules it respects:
 *  - Exactly one cursor effect. Never captures pointer events.
 *  - Desktop and fine pointers only; nothing mounts for touch or reduced
 *    motion.
 *  - The render loop halts once everything has settled and restarts on the
 *    next pointer event, so nothing animates while the page is idle.
 *  - Stroke colour flips against sections marked [data-tone="dark"], so the
 *    reticle stays legible over both ivory and deep forest.
 *  - All state lives in refs on the canvas; React never re-renders on move.
 */
export function CursorInstrument() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Raw pointer position, and the eased reticle that trails it.
    let pointerX = -200;
    let pointerY = -200;
    let ringX = -200;
    let ringY = -200;

    let radius = IDLE_RADIUS;
    let tilt = 0; // degrees: ticks square up to 45° over interactive elements
    let targetRadius = IDLE_RADIUS;
    let targetTilt = 0;
    let presence = 0; // fades the whole reticle in once the pointer appears
    let targetPresence = 0;

    let onDark = false;
    let lastToneSample = 0;
    let raf = 0;
    let running = false;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;

      if (targetPresence === 0) {
        // First sighting: place the reticle rather than flying it in.
        ringX = pointerX;
        ringY = pointerY;
        targetPresence = 1;
      }

      const target = e.target as Element | null;
      const interactive = Boolean(target?.closest?.(INTERACTIVE));
      targetRadius = interactive ? HOVER_RADIUS : IDLE_RADIUS;
      targetTilt = interactive ? 45 : 0;

      start();
    };

    const onLeave = () => {
      targetPresence = 0;
      start();
    };

    const sampleTone = (now: number) => {
      if (now - lastToneSample < 140) return;
      lastToneSample = now;
      const el = document.elementFromPoint(ringX, ringY);
      onDark = Boolean(el?.closest?.(DARK_TONE));
    };

    const frame = (now: number) => {
      if (disposed) return;

      // Ease everything toward its target.
      ringX += (pointerX - ringX) * 0.17;
      ringY += (pointerY - ringY) * 0.17;
      radius += (targetRadius - radius) * 0.16;
      tilt += (targetTilt - tilt) * 0.16;
      presence += (targetPresence - presence) * 0.12;

      sampleTone(now);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (presence > 0.01) {
        const base = onDark ? "228,236,226" : "23,60,50";
        const accent = onDark ? "168,190,164" : "84,125,85";
        // Ticks square up as the reticle locks onto something interactive.
        const lock = Math.min(Math.max((radius - IDLE_RADIUS) / (HOVER_RADIUS - IDLE_RADIUS), 0), 1);
        const stroke = lock > 0.5 ? accent : base;
        const alpha = presence * (0.26 + lock * 0.26);

        ctx.save();
        ctx.translate(ringX, ringY);

        ctx.strokeStyle = `rgba(${stroke}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(radius, 0.01), 0, Math.PI * 2);
        ctx.stroke();

        // Four register ticks just outside the ring.
        ctx.strokeStyle = `rgba(${stroke}, ${alpha * 1.5})`;
        ctx.lineCap = "round";
        ctx.rotate((tilt * Math.PI) / 180);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(radius + TICK_GAP, 0);
          ctx.lineTo(radius + TICK_GAP + TICK_LENGTH, 0);
          ctx.stroke();
          ctx.rotate(Math.PI / 2);
        }

        ctx.restore();
      }

      // Stop once nothing is moving; the next pointer event restarts us.
      const settled =
        Math.abs(pointerX - ringX) < 0.2 &&
        Math.abs(pointerY - ringY) < 0.2 &&
        Math.abs(targetRadius - radius) < 0.2 &&
        Math.abs(targetTilt - tilt) < 0.2 &&
        Math.abs(targetPresence - presence) < 0.01;

      if (settled) {
        running = false;
        return;
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
    />
  );
}
