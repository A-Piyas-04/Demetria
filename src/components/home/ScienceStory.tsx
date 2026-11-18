"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { homeCopy } from "@/data/homeCopy";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

const copy = homeCopy.science;

/**
 * SECTION 06 — science & innovation.
 *
 * Layered depth rather than a pinned sequence: the photograph drifts ~40px
 * against the page, a technical annotation card drifts at a different rate,
 * and the editorial column stays still. Different character from the
 * ecosystem on purpose.
 */
export function ScienceStory() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const annotationY = useTransform(scrollYProgress, [0, 1], [34, -34]);

  return (
    <section ref={ref} className="section-pad overflow-hidden bg-bg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Imagery + technical annotation */}
          <div className="relative lg:col-span-6">
            <Reveal variant="clip">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-primary-soft">
                <motion.div
                  className="absolute inset-x-0 -top-[6%] h-[112%]"
                  style={reduced ? undefined : { y: imageY }}
                >
                  <Image
                    src={copy.image}
                    alt={copy.imageAlt}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <MolecularAnnotation />
              </div>
            </Reveal>

            <motion.div
              style={reduced ? undefined : { y: annotationY }}
              className="pointer-events-none absolute -right-2 bottom-8 hidden w-[15rem] rounded-sm border border-line bg-surface/95 p-5 shadow-[0_20px_50px_-34px_rgba(23,60,50,0.6)] backdrop-blur-sm lg:block"
            >
              <p className="t-eyebrow text-brass">Fig. 01</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Formulation is validated against process conditions — pelleting
                temperature, water-line chemistry, and storage — before any
                field protocol begins.
              </p>
            </motion.div>
          </div>

          {/* Editorial column */}
          <div className="lg:col-span-6 lg:pl-4">
            <Reveal>
              <Eyebrow>{copy.index}</Eyebrow>
              <h2 className="font-display t-h2 mt-5 text-primary">
                {copy.title}
              </h2>
              <p className="t-lead mt-6 max-w-xl text-muted">
                {copy.description}
              </p>
            </Reveal>

            <Reveal staggerChildren delay={0.1} className="mt-12">
              <ul className="divide-y divide-line border-y border-line">
                {copy.capabilities.map((item, i) => (
                  <RevealItem key={item.title}>
                    <li className="flex gap-6 py-6">
                      <span className="t-eyebrow w-8 shrink-0 pt-1 text-brass">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  </RevealItem>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18} className="mt-9">
              <ArrowLink href="/research">
                Inside our research &amp; quality process
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** A restrained publication-style grid and molecular diagram over the image. */
function MolecularAnnotation() {
  return (
    <svg
      viewBox="0 0 100 125"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.25">
        <line x1="0" y1="31.25" x2="100" y2="31.25" />
        <line x1="0" y1="93.75" x2="100" y2="93.75" />
        <line x1="25" y1="0" x2="25" y2="125" />
        <line x1="75" y1="0" x2="75" y2="125" />
      </g>
      <g
        transform="translate(72 22)"
        stroke="rgba(183,164,120,0.85)"
        strokeWidth="0.45"
        fill="none"
      >
        <path d="M0 0 L8 -4.5 L16 0 L16 9 L8 13.5 L0 9 Z" />
        <path d="M16 0 L24 -4.5" />
        <path d="M8 13.5 L8 20" />
        <circle cx="24" cy="-4.5" r="1.3" fill="rgba(183,164,120,0.9)" stroke="none" />
        <circle cx="8" cy="20" r="1.3" fill="rgba(183,164,120,0.9)" stroke="none" />
      </g>
    </svg>
  );
}
