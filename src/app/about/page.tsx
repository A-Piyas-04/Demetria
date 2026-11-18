import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/data/company";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, IconChip } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} — mission, values, and where our technical work concentrates.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built for producers who measure outcomes"
        size="editorial"
        image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=3000&q=90&auto=format&fit=crop"
        imageAlt="Wide arable field at sunrise beneath an open sky"
        lead={company.description}
      />

      {/* Narrative */}
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>01 / Mission</Eyebrow>
            <p className="font-display t-h4 mt-6 text-primary">
              What we are here to do
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <p className="font-display text-[clamp(1.35rem,1rem+1.3vw,2rem)] leading-[1.32] tracking-[-0.016em] text-primary">
                {company.mission}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-10 border-t border-line pt-10">
              <Eyebrow>02 / Vision</Eyebrow>
              <p className="t-lead mt-5 max-w-2xl text-muted">
                {company.vision}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Values"
            title="Principles that survive contact with a mill floor"
            lead="Three commitments that decide how technical and commercial questions get answered."
          />
        </Reveal>
        <Reveal
          staggerChildren
          delay={0.08}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {company.values.map((value, i) => (
            <RevealItem key={value.title} className="h-full">
              <article className="card card-interactive group relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <IconChip name={value.icon} />
                  <span className="numeral opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display t-h4 mt-7 text-primary">
                  {value.title}
                </h3>
                <p className="t-body mt-3 text-muted">{value.description}</p>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* Expertise */}
      <Section tone="ivory">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="clip" className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1581093577421-f561a654a353?w=1400&q=85"
                alt="Analyst reviewing results at a laboratory bench"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Eyebrow>04 / Expertise</Eyebrow>
            <h2 className="font-display t-h3 mt-5 text-primary">
              Where our technical work concentrates
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {company.expertiseAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 py-4 text-sm text-ink"
                >
                  <Icon name="check" size={17} className="shrink-0 text-accent" />
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Founded {company.founded} · Headquarters {company.headquarters}
            </p>
            <div className="mt-9">
              <ButtonLink href="/research">Research &amp; quality</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Buyer outcomes */}
      <Section tone="forest">
        <Reveal>
          <Eyebrow tone="dark">05 / Outcomes</Eyebrow>
          <h2 className="font-display t-h2 mt-6 max-w-2xl text-surface">
            What clients ask us to move
          </h2>
        </Reveal>
        <Reveal
          staggerChildren
          delay={0.08}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {company.buyerOutcomes.map((outcome, i) => (
            <RevealItem key={outcome} className="h-full">
              <div className="card-dark card-interactive flex h-full items-start gap-5 p-7">
                <span className="numeral text-sage/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="t-body text-primary-soft/85">{outcome}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* How an engagement runs */}
      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow="06 / Working together"
            title="How an engagement starts"
            lead="Three steps from first message to a program running in your mill."
          />
        </Reveal>
        <Reveal
          staggerChildren
          delay={0.08}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {company.engagement.map((step, i) => (
            <RevealItem key={step.title} className="h-full">
              <article className="card card-interactive flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <IconChip name={step.icon} />
                  <span className="t-eyebrow text-brass">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display t-h4 mt-7 text-primary">
                  {step.title}
                </h3>
                <p className="t-body mt-3 text-muted">{step.body}</p>
              </article>
            </RevealItem>
          ))}
        </Reveal>
        <Reveal delay={0.16} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Talk to our technical team</ButtonLink>
          <ButtonLink href="/solutions" variant="outline">
            Explore solution pathways
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
