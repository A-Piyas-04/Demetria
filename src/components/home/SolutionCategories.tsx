import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/data/solutions";
import { homeCopy } from "@/data/homeCopy";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

const copy = homeCopy.solutions;

/**
 * SECTION 04 — solutions as an editorial image grid.
 *
 * One large feature tile, two stacked tiles beside it, and a wide lower tile —
 * not a row of identical cards. Hover is a quick, small gesture: image scales
 * to 1.04, the overlay deepens, the arrow nudges.
 */
export function SolutionCategories() {
  const [feature, second, third, fourth, fifth] = solutions;

  return (
    <Section tone="ivory">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow={copy.index}
            title={copy.title}
            lead={copy.description}
          />
        </Reveal>
        <Reveal delay={0.1} className="pb-2">
          <ArrowLink href={copy.cta.href}>{copy.cta.label}</ArrowLink>
        </Reveal>
      </div>

      <Reveal staggerChildren className="mt-14 grid gap-4 lg:grid-cols-12">
        <RevealItem className="lg:col-span-7">
          <SolutionTile solution={feature} size="feature" index={0} />
        </RevealItem>

        <div className="grid gap-4 lg:col-span-5">
          <RevealItem>
            <SolutionTile solution={second} size="small" index={1} />
          </RevealItem>
          <RevealItem>
            <SolutionTile solution={third} size="small" index={2} />
          </RevealItem>
        </div>

        <RevealItem className="lg:col-span-5">
          <SolutionTile solution={fourth} size="small" index={3} />
        </RevealItem>
        <RevealItem className="lg:col-span-7">
          <SolutionTile solution={fifth} size="wide" index={4} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function SolutionTile({
  solution,
  size,
  index,
}: {
  solution: (typeof solutions)[number];
  size: "feature" | "small" | "wide";
  index: number;
}) {
  const heights = {
    feature: "h-[22rem] lg:h-[34rem]",
    small: "h-[15rem] lg:h-[16.5rem]",
    wide: "h-[15rem] lg:h-[16.5rem]",
  } as const;

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className={`group relative block w-full overflow-hidden rounded-sm ${heights[size]}`}
    >
      <Image
        src={solution.image}
        alt={solution.imageAlt}
        fill
        sizes="(max-width:1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/25 to-transparent transition-opacity duration-300 group-hover:from-primary-deep/92"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 lg:p-7">
        <div className="min-w-0">
          <span className="t-eyebrow text-sage/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`font-display mt-2 text-surface transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${
              size === "feature" ? "t-h3" : "t-h4"
            }`}
          >
            {solution.title}
          </h3>
          <p
            className={`mt-2 max-w-sm text-sm leading-relaxed text-primary-soft/70 transition-colors duration-300 group-hover:text-primary-soft/95 ${
              size === "small" ? "hidden lg:block" : ""
            }`}
          >
            {solution.headline}
          </p>
        </div>

        <span
          aria-hidden
          className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface/30 text-surface transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:border-surface/70 group-hover:bg-surface/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h13m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
