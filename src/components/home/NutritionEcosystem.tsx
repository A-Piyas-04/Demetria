"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { homeCopy } from "@/data/homeCopy";
import { Container } from "@/components/ui/Container";

const copy = homeCopy.ecosystem;
const NODES = copy.nodes;
const COUNT = NODES.length;
const STEP = 360 / COUNT; // 72° between focus positions

/** Geometry of the orbital stage. */
const RADIUS = 42; // % of the square stage
const TILT = 50; // degrees the disc is tipped away from the camera
const BASE_ANGLE = 70; // focus position: front-lower-right, nearest the camera

/**
 * One restrained line mark per discipline, drawn in the register of a
 * scientific publication. These replace index numerals on the orbital nodes —
 * a numbered ring reads like a list, a marked ring reads like a system.
 */
const NODE_ICONS: Record<string, React.ReactNode> = {
  // Wheat ear — formulation and raw material
  nutrition: (
    <>
      <path d="M12 21.6V5.4" />
      {[10, 14, 18].map((y) => (
        <g key={y}>
          <path d={`M12 ${y}c0-2.5 1.8-4.3 4-4.6.2 2.6-1.6 4.4-4 4.6Z`} />
          <path d={`M12 ${y}c0-2.5-1.8-4.3-4-4.6-.2 2.6 1.6 4.4 4 4.6Z`} />
          <g opacity=".5">
            <path d={`M12 ${y}c1.3-1 2.5-2.1 3.6-3.3`} />
            <path d={`M12 ${y}c-1.3-1-2.5-2.1-3.6-3.3`} />
          </g>
        </g>
      ))}
    </>
  ),

  // Coiled tract — gut health. A true inward spiral: every arc turns the same
  // way, so the sweep flag stays constant.
  "gut-health": (
    <path d="M19 12A7 7 0 0 0 5 12A5.4 5.4 0 0 0 15.8 12A3.8 3.8 0 0 0 8.2 12A2.2 2.2 0 0 0 12.6 12" />
  ),

  // Screening mesh with retained grain — feed quality
  "feed-quality": (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <g opacity=".55">
        <path d="M12 3.4v17.2" />
        <path d="M3.4 12h17.2" />
        <path d="M7.8 4.6v14.8" />
        <path d="M16.2 4.6v14.8" />
        <path d="M4.6 7.8h14.8" />
        <path d="M4.6 16.2h14.8" />
      </g>
      <g fill="currentColor" stroke="none">
        <circle cx="9.9" cy="9.9" r=".95" />
        <circle cx="14.1" cy="14.1" r=".75" />
      </g>
    </>
  ),

  // Shielded leaf — resilience and welfare
  wellbeing: (
    <>
      <path d="M12 2.4 4.6 5.3v6.1c0 4.7 3 8.3 7.4 10.2 4.4-1.9 7.4-5.5 7.4-10.2V5.3Z" />
      <path d="M15.8 8.4c0 3.7-2.6 6.2-6.3 6.2 0-3.7 2.6-6.2 6.3-6.2Z" />
      <path d="M9.5 14.6c1.4-1.7 3.1-3.1 5.1-4.2" opacity=".55" />
    </>
  ),

  // Measured performance — rising curve over output bars
  productivity: (
    <>
      <path d="M3.4 20.6h17.2" />
      <g opacity=".45" strokeWidth="2.2">
        <path d="M7 20.6v-3.8" />
        <path d="M11.5 20.6v-6.6" />
        <path d="M16 20.6v-9.4" />
      </g>
      <path d="M4.6 17.6c3.5-.4 5.5-2.7 7.3-5.5s3.7-5.1 6.7-5.3" />
      <path d="M15.7 6.7h2.9v2.9" />
    </>
  ),
};

function NodeIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {NODE_ICONS[id]}
    </svg>
  );
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const pointAt = (deg: number) => ({
  x: 50 + RADIUS * Math.cos(rad(deg)),
  y: 50 + RADIUS * Math.sin(rad(deg)),
});

/**
 * SECTION 03 — the homepage's signature interaction.
 *
 * A circular nutrition ecosystem rendered as a genuine CSS 3D scene: the
 * orbital disc is tipped 56° away from the camera inside a perspective
 * container, so nodes at the back sit further away and shrink by real
 * projection rather than by a hand-tuned scale. The disc spins clockwise
 * through predetermined 72° positions driven only by scroll progress; nodes
 * counter-rotate on two axes so their labels stay square to the viewer.
 *
 * No WebGL, no models, no free-running animation — the scene is static unless
 * the scroll position moves.
 *
 * Every device gets this same pinned, scroll-driven scene — phones and tablets
 * included. Scrolling down turns the disc forward, scrolling up turns it back.
 * Below `lg` the layout stacks (intro above, stage over the active entry)
 * so the identical animation fits a portrait screen.
 */
export function NutritionEcosystem() {
  return <PinnedEcosystem />;
}

/* ------------------------------------------------------------------ */
/* Pinned, scroll-driven, 3D — all screen sizes                         */
/* ------------------------------------------------------------------ */

/** Scroll distance allotted to each step, and the easing of a single step. */
const SEGMENT_VH = 72;
const STEP_DURATION = 620;
const GESTURE_COOLDOWN = 470;

/**
 * Turns the pinned range into a stepper: one wheel or trackpad gesture moves
 * exactly one position, however hard it is pushed, and the section hands
 * control back to the page the moment you try to step past either end.
 *
 * It also re-aligns after any scroll that leaves the disc resting between two
 * positions — entering on momentum, dragging the scrollbar, paging with the
 * keyboard — so the wheel is never stranded at an arbitrary angle.
 */
function useStepScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animating = false;
    let lastAccept = 0;
    let raf = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const metrics = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(el.offsetHeight - window.innerHeight, 1);
      return { top, segment: travel / (COUNT - 1), end: top + travel };
    };

    const tweenTo = (target: number) => {
      const html = document.documentElement;
      // Our easing owns this move; CSS smooth scrolling would fight it.
      html.style.scrollBehavior = "auto";
      const from = window.scrollY;
      const distance = target - from;
      const started = performance.now();
      animating = true;

      const frame = (now: number) => {
        const t = Math.min((now - started) / STEP_DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        window.scrollTo(0, from + distance * eased);
        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          animating = false;
          html.style.scrollBehavior = "";
        }
      };
      raf = requestAnimationFrame(frame);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch-zoom belongs to the browser
      const { top, segment, end } = metrics();
      const y = window.scrollY;
      if (y < top - 1 || y > end + 1) return; // not pinned yet

      const direction = event.deltaY > 0 ? 1 : -1;
      const exact = (y - top) / segment;

      // Stepping past either end releases the section immediately.
      if (direction > 0 && exact >= COUNT - 1 - 0.02) return;
      if (direction < 0 && exact <= 0.02) return;

      event.preventDefault();
      const now = performance.now();
      if (animating || now - lastAccept < GESTURE_COOLDOWN) return;
      lastAccept = now;

      const next =
        direction > 0
          ? Math.floor(exact + 0.002) + 1
          : Math.ceil(exact - 0.002) - 1;
      tweenTo(top + Math.min(COUNT - 1, Math.max(0, next)) * segment);
    };

    const onScroll = () => {
      if (animating) return;
      if (settle) clearTimeout(settle);
      settle = setTimeout(() => {
        if (animating) return;
        const { top, segment, end } = metrics();
        const y = window.scrollY;
        // Leave the ends alone so the section can never trap anyone.
        if (y <= top + 1 || y >= end - 1) return;
        const exact = (y - top) / segment;
        const nearest = Math.round(exact);
        if (Math.abs(exact - nearest) > 0.015) {
          tweenTo(top + nearest * segment);
        }
      }, 110);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (settle) clearTimeout(settle);
      cancelAnimationFrame(raf);
      document.documentElement.style.scrollBehavior = "";
    };
  }, [ref]);
}

function PinnedEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useStepScroll(ref);

  // Progress across the pinned range drives the disc.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Separate timeline for the entrance, so the stage is fully revealed by the
  // time the section pins rather than part-way through the first step.
  const { scrollYProgress: entryProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  /**
   * Rotation tracks scroll continuously rather than snapping on a rounded
   * index: because a gesture now scrolls exactly one segment, the disc starts
   * and lands with the scroll tween instead of lagging a spring behind it.
   */
  const targetRotation = useMotionValue(0);
  const rotation = useSpring(targetRotation, {
    stiffness: 150,
    damping: 28,
    mass: 0.5,
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const position = Math.min(1, Math.max(0, p)) * (COUNT - 1);
    setActive(Math.round(position));
    targetRotation.set(position * STEP);
  });

  const entryScale = useTransform(entryProgress, [0, 1], [0.92, 1]);
  const entryOpacity = useTransform(entryProgress, [0, 0.65], [0.3, 1]);

  // Counter-rotation that keeps every node label square to the camera.
  const uprightRotation = useTransform(rotation, (r) => -r);
  // The core drifts on its own axis, a fraction of the disc's travel.
  const coreSpin = useTransform(rotation, (r) => r * 0.45);

  const node = NODES[active];

  return (
    <section
      data-tone="dark"
      className="relative bg-primary text-primary-soft"
      aria-labelledby="ecosystem-heading"
    >
      {/* Phones / tablets: the intro reads first, in normal flow, so the
          pinned screen below only has to hold the wheel and the active entry. */}
      <Container className="pt-20 pb-4 sm:pt-24 lg:hidden">
        <div aria-hidden>
        <p className="t-eyebrow text-sage">{copy.index}</p>
        <p className="font-display t-h2 mt-5 max-w-xl text-surface">
          {copy.title}
        </p>
        <p className="t-body mt-5 max-w-xl text-primary-soft/70">
          {copy.description}
        </p>
        </div>
      </Container>

      <div
        ref={ref}
        // svh = the viewport with browser toolbars showing, so iPad / mobile
        // Safari never hides the bottom of the pinned stage behind its UI.
        style={{ height: `${100 + (COUNT - 1) * SEGMENT_VH}svh` }}
        className="relative"
      >
        {/* Top padding below lg clears the sticky site header. */}
        <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-[4.5rem] lg:pt-0">
          {/* Atmosphere behind the whole stage */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_72%_50%,rgba(168,190,164,0.10),transparent_70%)]"
          />

          <Container width="wide" className="relative w-full">
            <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-12 xl:gap-10">
              {/* Fixed editorial column (below the wheel on phones/tablets) */}
              <div className="order-2 mx-auto w-full max-w-xl lg:order-1 lg:col-span-4 lg:mx-0 lg:max-w-none">
                {/* Laptop intro. On smaller screens it is visually replaced by
                    the in-flow intro above, but stays the section's heading. */}
                <div className="sr-only lg:not-sr-only">
                  <p className="t-eyebrow text-sage">{copy.index}</p>
                  <h2
                    id="ecosystem-heading"
                    className="font-display mt-5 text-[clamp(1.75rem,0.9rem+1.9vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-surface"
                  >
                    {copy.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-primary-soft/65">
                    {copy.description}
                  </p>
                </div>

                <div className="relative min-h-[7.5rem] pl-5 sm:pl-6 lg:mt-9 lg:min-h-[8.5rem] [@media(max-height:560px)]:min-h-[3rem]">
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-sage/70 via-sage/25 to-transparent"
                  />
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-display text-[1.25rem] leading-tight text-surface sm:text-[1.5rem]">
                      {node.title}
                    </p>
                    <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-primary-soft/65 sm:mt-3 sm:text-[0.9rem] [@media(max-height:560px)]:hidden">
                      {node.description}
                    </p>
                  </motion.div>
                </div>

                {/* Editorial counter + progress rule */}
                <div className="mt-4 flex items-end gap-5 sm:mt-6 lg:mt-9" aria-hidden>
                  <p className="font-display flex items-baseline leading-none text-surface">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[1.9rem] tracking-[-0.03em] sm:text-[2.2rem] lg:text-[2.6rem]"
                    >
                      {active + 1}
                    </motion.span>
                    <span className="ml-1 text-[1.1rem] text-sage/45">
                      ⁄{COUNT}
                    </span>
                  </p>

                  <ol className="mb-2 flex flex-1 items-center gap-1.5">
                    {NODES.map((item, i) => (
                      <li
                        key={item.id}
                        className={`h-px flex-1 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          i === active
                            ? "bg-sage"
                            : i < active
                              ? "bg-sage/40"
                              : "bg-surface/12"
                        }`}
                      />
                    ))}
                  </ol>
                </div>
              </div>

              {/* 3D stage */}
              <div className="order-1 lg:order-2 lg:col-span-8">
                <motion.div
                  className="relative mx-auto aspect-square w-full max-w-[min(100%,48svh)] sm:max-w-[min(100%,54svh)] lg:max-w-[min(48rem,92svh)]"
                  style={{
                    scale: entryScale,
                    opacity: entryOpacity,
                    perspective: 1500,
                    perspectiveOrigin: "50% 42%",
                  }}
                >
                  {/* Core glow, behind the disc */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(168,190,164,0.18),rgba(168,190,164,0.04)_45%,transparent_70%)] blur-[6px]"
                  />

                  {/* Tipped orbital plane */}
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `rotateX(${TILT}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <OrbitalTracks />

                    {/* Spinning disc: lattice, spokes, progress arc, nodes */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        rotate: rotation,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <DiscGraphics active={active} />

                      {NODES.map((item, i) => {
                        const p = pointAt(BASE_ANGLE - i * STEP);
                        return (
                          <motion.div
                            key={item.id}
                            className="absolute"
                            style={{
                              left: `${p.x}%`,
                              top: `${p.y}%`,
                              // translate lands the node's centre on the
                              // orbital point; the two rotations then undo the
                              // disc's tilt and spin about that same centre.
                              translateX: "-50%",
                              translateY: "-50%",
                              rotate: uprightRotation,
                              rotateX: -TILT,
                              transformStyle: "preserve-3d",
                            }}
                          >
                            <EcosystemNode
                              id={item.id}
                              label={item.title}
                              active={i === active}
                            />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Core sits upright in the middle of the tipped disc */}
                  <AtomCore spin={coreSpin} active={active} />
                </motion.div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stage parts                                                          */
/* ------------------------------------------------------------------ */

/** Static orbital tracks on the tipped plane. */
function OrbitalTracks() {
  return (
    <>
      {[
        { inset: `${50 - RADIUS}%`, cls: "border-sage/22" },
        { inset: `${50 - RADIUS - 7}%`, cls: "border-sage/8" },
        { inset: `${50 - RADIUS + 10}%`, cls: "border-sage/12 border-dashed" },
      ].map((ring) => (
        <div
          key={ring.inset}
          aria-hidden
          className={`absolute rounded-full border ${ring.cls}`}
          style={{ inset: ring.inset }}
        />
      ))}
      {/* Soft shadow pooled on the plane under the core */}
      <div
        aria-hidden
        className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(16,42,35,0.55),transparent_65%)] blur-md"
      />
    </>
  );
}

/** Lattice, spokes and progress arc — all spin with the nodes. */
function DiscGraphics({ active }: { active: number }) {
  const points = NODES.map((_, i) => pointAt(BASE_ANGLE - i * STEP));
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  const sweep = active * STEP;
  const from = points[0];
  const to = points[active];
  const arc =
    active === 0
      ? null
      : `M ${from.x} ${from.y} A ${RADIUS} ${RADIUS} 0 ${
          sweep > 180 ? 1 : 0
        } 0 ${to.x} ${to.y}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden
    >
      {/* Network lattice between every node */}
      <polygon
        points={polygon}
        fill="rgba(168,190,164,0.035)"
        stroke="rgba(168,190,164,0.14)"
        strokeWidth="0.2"
      />
      {/* Spokes to the core */}
      {points.map((p, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={p.x}
          y2={p.y}
          stroke={
            i === active ? "rgba(168,190,164,0.55)" : "rgba(168,190,164,0.1)"
          }
          strokeWidth={i === active ? 0.35 : 0.18}
          strokeDasharray={i === active ? undefined : "1 2"}
        />
      ))}
      {/* Progress arc travelled so far */}
      {arc && (
        <path
          d={arc}
          fill="none"
          stroke="rgba(168,190,164,0.5)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function EcosystemNode({
  id,
  label,
  active,
}: {
  id: string;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex w-[6.5rem] flex-col items-center text-center sm:w-[9rem] lg:w-[12rem] transition-[opacity,transform,filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active ? "scale-100 opacity-100" : "scale-[0.8] opacity-40 blur-[0.4px]"
      }`}
    >
      <span className="relative flex h-11 w-11 items-center justify-center sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem]">
        {/* Halo on the active node */}
        <span
          aria-hidden
          className={`absolute inset-[-14px] rounded-full bg-[radial-gradient(circle,rgba(168,190,164,0.3),transparent_68%)] transition-opacity duration-[600ms] ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hairline orbit ring around the active mark */}
        <span
          aria-hidden
          className={`absolute inset-[-7px] rounded-full border border-sage/35 transition-opacity duration-[600ms] ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`relative flex h-11 w-11 items-center justify-center rounded-full border sm:h-14 sm:w-14 lg:h-[4.25rem] lg:w-[4.25rem] transition-colors duration-[600ms] ${
            active
              ? "border-sage/70 bg-gradient-to-b from-[#cddcc9] to-[#92ad8f] text-primary shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)]"
              : "border-sage/22 bg-primary-deep/70 text-sage/55"
          }`}
        >
          <NodeIcon id={id} className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9" />
        </span>
      </span>
      <span
        className={`mt-2 text-[0.68rem] leading-snug font-semibold sm:mt-3 sm:text-[0.8rem] lg:mt-4 lg:text-[0.9rem] tracking-[-0.005em] transition-colors duration-[600ms] ${
          active ? "text-surface" : "text-primary-soft/50"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * The centre: a genuine 3D atom. Three orbital rings are real rotated planes
 * inside a preserve-3d container, so the nucleus passes in front of some and
 * behind others as the scene turns.
 *
 * Kept deliberately small (30% of the stage) because the core and the orbital
 * disc are separate 3D contexts and cannot depth-sort against each other — at
 * this size no node ever overlaps it, so the seam never shows.
 */
function AtomCore({
  spin,
  active,
}: {
  spin?: MotionValue<number>;
  active: number;
}) {
  const orbitals = [
    { ry: 0, rx: 74 },
    { ry: 62, rx: 74 },
    { ry: 124, rx: 74 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ perspective: 900 }}
    >
      <motion.div
        className="relative h-[34%] w-[34%]"
        style={{
          transformStyle: "preserve-3d",
          rotateY: spin,
          rotateX: -8,
        }}
      >
        {orbitals.map((o, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-full border ${
              i === active % 3 ? "border-sage/55" : "border-sage/28"
            } transition-colors duration-[600ms]`}
            style={{
              transform: `rotateY(${o.ry}deg) rotateX(${o.rx}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Electron riding the ring */}
            <span
              className={`absolute top-1/2 left-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-[600ms] ${
                i === active % 3 ? "bg-sage" : "bg-sage/45"
              }`}
            />
          </div>
        ))}

        {/* Nucleus */}
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_34%_30%,#dfe8dc,#9db89a_42%,#4d6b4f_100%)] shadow-[0_0_28px_-4px_rgba(168,190,164,0.55),inset_-3px_-4px_10px_rgba(16,42,35,0.5)]" />
        <div className="absolute inset-[28%] rounded-full border border-sage/20" />
      </motion.div>
    </div>
  );
}
