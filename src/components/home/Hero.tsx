"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { homeCopy } from "@/data/homeCopy";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EASE_BRAND } from "@/components/motion/Reveal";

const copy = homeCopy.hero;

/**
 * SECTION 01 — cinematic hero.
 *
 * Load: image fades in and settles from 1.05 → 1.0 while the text block
 * reveals line by line. Scroll: the photograph drifts ~48px slower than the
 * copy and the overlay deepens. Nothing bounces, spins, or travels far.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  const line = {
    hidden: { opacity: 0, y: 26 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: 0.25 + i * 0.1, ease: EASE_BRAND },
    }),
  };

  return (
    /* Pulled up under the sticky navbar so the transparent header sits over the
       photograph; matching top padding keeps the copy optically centred. */
    <section
      ref={ref}
      data-tone="dark"
      className="relative isolate -mt-[4.5rem] flex min-h-[100svh] items-center overflow-hidden bg-primary-deep pt-[4.5rem] lg:-mt-[5rem] lg:pt-[5rem]"
    >
      {/* Photography */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: imageY }}
        initial={reduced ? false : { opacity: 0, scale: 1.05 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: EASE_BRAND }}
      >
        <Image
          src={copy.image}
          alt={copy.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </motion.div>

      {/* Readability gradients — only where the text sits. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/92 via-primary-deep/62 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep/80 via-transparent to-primary-deep/35"
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-primary-deep"
        style={reduced ? { opacity: 0 } : { opacity: veil }}
      />

      <Container className="relative w-full py-14 sm:py-16 lg:py-20">
        <motion.div
          className="max-w-xl text-surface lg:max-w-2xl"
          style={
            reduced ? undefined : { y: contentY, opacity: contentOpacity }
          }
        >
          <motion.p
            custom={0}
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "show"}
            variants={line}
            className="t-eyebrow text-sage"
          >
            {copy.eyebrow}
          </motion.p>

          <h1 className="font-display t-hero-display mt-4 text-surface sm:mt-5">
            {copy.headlineLines.map((text, i) => (
              <motion.span
                key={text}
                custom={i + 1}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "show"}
                variants={line}
                className="block"
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            custom={copy.headlineLines.length + 1}
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "show"}
            variants={line}
            className="t-lead mt-5 max-w-lg text-primary-soft/85 sm:mt-6 lg:max-w-xl"
          >
            {copy.support}
          </motion.p>

          <motion.div
            custom={copy.headlineLines.length + 2}
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "show"}
            variants={line}
            className="mt-7 flex flex-wrap gap-3 sm:mt-9"
          >
            <ButtonLink href={copy.primaryCta.href} variant="onDark" size="lg">
              {copy.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={copy.secondaryCta.href}
              variant="outlineDark"
              size="lg"
            >
              {copy.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
