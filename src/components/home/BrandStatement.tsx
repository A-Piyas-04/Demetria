import Image from "next/image";
import { homeCopy } from "@/data/homeCopy";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealRule } from "@/components/motion/Reveal";

const copy = homeCopy.statement;

/**
 * SECTION 07 — cinematic break.
 * Almost no content by design. One photograph, one line, one rule.
 */
export function BrandStatement() {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-[62vh] items-center overflow-hidden bg-primary-deep py-24 sm:py-32">
      <Image
        src={copy.image}
        alt={copy.imageAlt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-primary-deep/78"
      />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display t-h2 mx-auto max-w-4xl text-surface">
            {copy.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-[7rem] text-sage">
          <RevealRule />
        </Reveal>
        <Reveal delay={0.16}>
          <p className="t-lead mx-auto mt-10 max-w-xl text-primary-soft/80">
            {copy.support}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
