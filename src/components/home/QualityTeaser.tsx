import { homeCopy } from "@/data/homeCopy";
import { company } from "@/data/company";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

const copy = homeCopy.quality;

/**
 * SECTION 08 — quality, trust & commitment.
 *
 * Thin-line blocks instead of heavy cards. No awards, seals, or numbers are
 * invented here; the certification note stays explicit about that.
 */
export function QualityTeaser() {
  return (
    <Section tone="ivory">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{copy.index}</Eyebrow>
          <h2 className="font-display t-h2 mt-5 text-primary">{copy.title}</h2>
          <p className="t-body mt-6 max-w-md text-muted">{copy.description}</p>
          <div className="mt-9">
            <ArrowLink href={copy.cta.href}>{copy.cta.label}</ArrowLink>
          </div>
          <p className="mt-10 max-w-sm text-xs leading-relaxed text-muted/80">
            {company.certificationsNote}
          </p>
        </Reveal>

        <Reveal staggerChildren delay={0.08} className="lg:col-span-7">
          <ul className="border-t border-line">
            {copy.blocks.map((block, i) => (
              <RevealItem key={block.title}>
                <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[4rem_1fr] sm:gap-8">
                  <span className="t-eyebrow pt-1.5 text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display t-h4 text-primary">
                      {block.title}
                    </h3>
                    <p className="t-body mt-3 max-w-xl text-muted">
                      {block.body}
                    </p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
