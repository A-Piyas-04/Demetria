"use client";

import { useEffect, useRef } from "react";

const DARK_TONE = "[data-tone='dark']";

/* A chain of followers forms the tail. More nodes = a longer, silkier ribbon. */
const NODES = 22;
/* How hard each node is pulled toward the one ahead of it. */
const FOLLOW = 0.42;
/* Peak perpendicular displacement, in px, at full movement energy. */
const WAVE_AMPLITUDE = 11;
/* Crest spacing along the tail (higher = more ripples). */
const WAVE_FREQUENCY = 0.55;
/* Flow speed of the undulation. */
const WAVE_SPEED = 0.22;
/* Movement (px/frame, smoothed) that counts as "fully moving". */
const ENERGY_REF = 13;

/**
 * Cursor wave: a fine, undulating filament that trails the pointer and ripples
 * as it travels. Everything it draws is scaled by movement energy, so the moment
 * the pointer stops the ribbon flattens, fades, and the render loop halts — it
 * is simply absent while the cursor is still, by construction rather than by a
 * timer.
 *
 * Design rules:
 *  - Desktop / fine-pointer only; nothing mounts for touch or reduced motion.
 *  - Never captures pointer events; one canvas, all state in refs (no React
 *    re-renders on move).
 *  - Stroke colour flips against [data-tone="dark"] sections so the line stays
 *    legible over both ivory and deep forest.
 */
export function CursorWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pointerX = -200;
    let pointerY = -200;
    let prevX = -200;
    let prevY = -200;

    // The follower chain. nodes[0] chases the pointer; each node chases the one
    // before it, so the chain collapses to a point the instant the pointer rests.
    const nodes = Array.from({ length: NODES }, () => ({ x: -200, y: -200 }));

    let energy = 0; // smoothed pointer speed
    let presence = 0; // eased 0 → 1 visibility, driven by energy
    let phase = 0; // advances the wave
    let onDark = false;
    let lastTone = 0;

    let raf = 0;
    let running = false;
    let disposed = false;
    let seeded = false;

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

      if (!seeded) {
        // First sighting: drop the whole chain onto the pointer so the tail
        // grows out of the cursor rather than whipping across the page.
        for (const n of nodes) {
          n.x = pointerX;
          n.y = pointerY;
        }
        prevX = pointerX;
        prevY = pointerY;
        seeded = true;
      }

      if (!running) {
        // Restarting after an idle pause — avoid a phantom speed spike.
        prevX = pointerX;
        prevY = pointerY;
      }
      start();
    };

    const onLeave = () => {
      pointerX = prevX;
      pointerY = prevY;
      start();
    };

    const frame = (now: number) => {
      if (disposed) return;

      // Smoothed movement energy drives amplitude and opacity.
      const speed = Math.hypot(pointerX - prevX, pointerY - prevY);
      prevX = pointerX;
      prevY = pointerY;
      energy += (Math.min(speed, ENERGY_REF * 2) - energy) * 0.18;

      const targetPresence = Math.min(energy / (ENERGY_REF * 0.5), 1);
      presence += (targetPresence - presence) * 0.14;
      phase += WAVE_SPEED;

      // Advance the follower chain.
      nodes[0].x += (pointerX - nodes[0].x) * FOLLOW;
      nodes[0].y += (pointerY - nodes[0].y) * FOLLOW;
      for (let i = 1; i < NODES; i++) {
        nodes[i].x += (nodes[i - 1].x - nodes[i].x) * FOLLOW;
        nodes[i].y += (nodes[i - 1].y - nodes[i].y) * FOLLOW;
      }

      if (now - lastTone > 120) {
        lastTone = now;
        const el = document.elementFromPoint(nodes[0].x, nodes[0].y);
        onDark = Boolean(el?.closest?.(DARK_TONE));
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const amplitude = WAVE_AMPLITUDE * Math.min(energy / ENERGY_REF, 1);

      if (presence > 0.01) {
        // Offset each node perpendicular to the local tail direction by a
        // flowing sine wave; taper pins both ends (cursor + tail) to zero.
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i < NODES; i++) {
          const prev = nodes[Math.max(i - 1, 0)];
          const next = nodes[Math.min(i + 1, NODES - 1)];
          let tx = next.x - prev.x;
          let ty = next.y - prev.y;
          const len = Math.hypot(tx, ty) || 1;
          tx /= len;
          ty /= len;

          const taper = Math.sin((Math.PI * i) / (NODES - 1));
          const wave =
            amplitude * taper * Math.sin(phase - i * WAVE_FREQUENCY);

          pts.push({ x: nodes[i].x - ty * wave, y: nodes[i].y + tx * wave });
        }

        const color = onDark ? "228,236,226" : "23,60,50";
        const accent = onDark ? "168,190,164" : "84,125,85";

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw tail → head so the brighter head overlaps the fading tail.
        for (let i = NODES - 1; i > 0; i--) {
          const headward = 1 - i / (NODES - 1); // 0 tail … 1 head
          const a = pts[i];
          const b = pts[i - 1];
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(a.x, a.y, mid.x, mid.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = 0.5 + headward * 1.9;
          ctx.strokeStyle = `rgba(${headward > 0.55 ? accent : color}, ${
            presence * (0.1 + headward * 0.5)
          })`;
          ctx.stroke();
        }

        // A soft spark at the head, also energy-gated.
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${presence * 0.55})`;
        ctx.fill();
      }

      // Settle once the chain has collapsed onto the pointer and faded out.
      const spread = Math.hypot(
        nodes[NODES - 1].x - pointerX,
        nodes[NODES - 1].y - pointerY,
      );
      if (energy < 0.3 && presence < 0.01 && spread < 0.6) {
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
