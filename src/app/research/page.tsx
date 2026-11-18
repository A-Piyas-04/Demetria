import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/data/company";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, IconChip } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Research & Quality",
  description:
    "How formulation work moves from hypothesis to a documented program, and the quality disciplines behind it.",
};

const workflow = [
  {
    title: "Intelligence intake",
    body: "Literature review and field signals from the production systems the program is meant to serve.",
    detail: "Inputs: published work, field reports, your own performance data",
  },
  {
    title: "Formulation modelling",
    body: "Matrix work against your real ingredient constraints, process temperatures, and inclusion headroom.",
    detail: "Outputs: candidate matrices, inclusion bands, format options",
  },
  {
    title: "Pilot and stability",
    body: "Pilot production with stability monitoring across the storage and handling conditions the product will meet.",
    detail: "Checks: pellet survival, carrier behaviour, shelf stability",
  },
  {
    title: "Producer-scale trial",
    body: "Field protocol with the measurement plan agreed before the first inclusion.",
    detail: "Agreed up front: metrics, duration, who records what",
  },
] as const;

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research & Quality"
        title="Science with manufacturing discipline"
        size="editorial"
        image="https://images.unsplash.com/photo-1581093577421-f561a654a353?w=2000&q=90"
        imageAlt="Analyst working at a laboratory bench"
        lead="How formulation work moves from a hypothesis to a documented program a mill can run and an auditor can review."
      />

      {/* R&D workflow — a timeline with four marked stops. */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>01 / R&amp;D workflow</Eyebrow>
              <h2 className="font-display t-h3 mt-5 text-primary">
                Four stages, in order, every time
              </h2>
              <p className="t-body mt-5 max-w-sm text-muted">
                No stage is skipped to reach a launch date. Each one has to
                produce something the next stage can use.
              </p>
              <div className="mt-9">
                <ButtonLink href="/contact" variant="outline">
                  Review a program with us
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal staggerChildren delay={0.08} className="lg:col-span-8">
            <ol className="relative ml-[7px] border-l border-line pl-7 sm:pl-10">
              {workflow.map((stage, i) => (
                <RevealItem key={stage.title} className="pb-4 last:pb-0">
                  <li className="group relative">
                    <span
                      aria-hidden
                      className="absolute top-8 -left-[calc(1.75rem+8px)] size-[15px] rounded-full border border-brass/60 bg-bg transition-colors duration-200 group-hover:bg-brass sm:-left-[calc(2.5rem+8px)]"
                    />
                    <article className="card card-interactive p-6 sm:p-8">
                      <div className="flex items-baseline gap-5">
                        <span className="numeral">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display t-h4 text-primary">
                          {stage.title}
                        </h3>
                      </div>
                      <p className="t-body mt-4 max-w-xl text-muted">
                        {stage.body}
                      </p>
                      <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs tracking-[0.02em] text-muted/85">
                        <Icon name="arrow" size={15} className="text-brass" />
                        {stage.detail}
                      </p>
                    </article>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Quality systems */}
      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Quality systems"
            title="What quality means on a batch record"
            lead="The disciplines every program is organised around, from supplier approval through release."
          />
        </Reveal>
        <Reveal
          staggerChildren
          delay={0.08}
          className="mt-14 grid gap-4 sm:grid-cols-2"
        >
          {company.qualitySystems.map((system) => (
            <RevealItem key={system.title} className="h-full">
              <article className="card card-interactive flex h-full flex-col p-7 sm:p-8">
                <IconChip name={system.icon} />
                <h3 className="font-display t-h4 mt-6 text-primary">
                  {system.title}
                </h3>
                <p className="t-body mt-3 text-muted">{system.body}</p>
              </article>
            </RevealItem>
          ))}
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-10 max-w-xl text-sm text-muted/85">
            {company.certificationsNote}
          </p>
        </Reveal>
      </Section>

      {/* Technical services */}
      <Section tone="ivory">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="clip" className="lg:col-span-6">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1604313890727-5542ff314405?w=1400&q=85"
                alt="Technician preparing samples for analysis"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Eyebrow>03 / Technical services</Eyebrow>
            <h2 className="font-display t-h3 mt-5 text-primary">
              Support that reaches the mill and the barn
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "On-farm audits across housing, water, and feeding practice",
                "Mill process reviews covering dosing, sequencing, and storage",
                "Nutrition troubleshooting when performance moves unexpectedly",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />
                  <span className="t-body">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ButtonLink href="/contact">Engage technical team</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
