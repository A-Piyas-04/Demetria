import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/data/solutions";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-based nutrition pathways for gut health, feed quality, and efficiency.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="From gut health to farm productivity"
        image="https://images.unsplash.com/photo-1504867980221-c62ae681b301?w=2400&q=90"
        imageAlt="Beef cattle feeding along a hay line"
        lead="Five outcome pathways map how mills and producers actually buy nutrition programs — by problem, not by chemistry class alone."
      />

      <Section tone="ivory">
        <ul className="space-y-20 lg:space-y-28">
          {solutions.map((solution, index) => (
            <li key={solution.slug}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal variant="clip" className="lg:col-span-6">
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-sm"
                  >
                    <Image
                      src={solution.image}
                      alt={solution.imageAlt}
                      fill
                      className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </Link>
                </Reveal>

                <Reveal delay={0.08} className="lg:col-span-6">
                  <p className="t-eyebrow text-brass">
                    {String(index + 1).padStart(2, "0")} / Pathway
                  </p>
                  <h2 className="font-display t-h3 mt-5 text-primary">
                    {solution.title}
                  </h2>
                  <p className="t-lead mt-4 text-accent">{solution.headline}</p>
                  <p className="t-body mt-5 max-w-xl text-muted">
                    {solution.summary}
                  </p>
                  <p className="mt-5 max-w-xl border-l border-line pl-5 text-sm leading-relaxed text-muted/85">
                    {solution.audience}
                  </p>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group/arrow mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
                  >
                    <span className="border-b border-current/30 pb-0.5 transition-colors group-hover/arrow:border-current">
                      Open solution detail
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-200 group-hover/arrow:translate-x-1"
                    >
                      <path
                        d="M5 12h13m0 0-5-5m5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Reveal>
              </article>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
