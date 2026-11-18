import { homeCopy } from "@/data/homeCopy";
import { Section } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealRule } from "@/components/motion/Reveal";

const copy = homeCopy.purpose;

/**
 * SECTION 02 — editorial statement.
 *
 * Deliberately quiet: whitespace, no cards, no imagery. One soft reveal and a
 * rule that draws itself in. Asymmetric 35 / 65 split on desktop.
 */
export function PurposeStatement() {
  return (
    <Section tone="ivory">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="t-eyebrow text-accent">{copy.index}</p>
          <p className="font-display t-h4 mt-6 text-primary">{copy.label}</p>
          <div className="mt-8 max-w-[14rem] text-primary">
            <RevealRule />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal delay={0.08}>
            <p className="font-display text-[clamp(1.5rem,1rem+1.7vw,2.4rem)] leading-[1.28] tracking-[-0.018em] text-primary">
              {copy.statement}
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 max-w-2xl space-y-5">
            {copy.body.map((paragraph) => (
              <p key={paragraph} className="t-body text-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.22} className="mt-10">
            <ArrowLink href={copy.cta.href}>{copy.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
