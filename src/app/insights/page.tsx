import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { insights } from "@/data/insights";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technical perspectives on gut health, feed quality, and nutritional efficiency.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Technical perspectives"
        lead="Field notes on gut health, feed quality, and efficiency — written for the people who specify and run the programs."
      />

      <Section tone="ivory">
        <Reveal staggerChildren className="grid gap-10 md:grid-cols-2 md:gap-8">
          {insights.map((article) => (
            <RevealItem key={article.slug}>
              <article>
                <Link href={`/insights/${article.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <p className="t-eyebrow text-brass">{article.category}</p>
                    {article.sample && (
                      <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.1em] text-muted uppercase">
                        Sample
                      </span>
                    )}
                  </div>
                  <h2 className="font-display t-h4 mt-3 text-primary transition-colors duration-200 group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                  <p className="mt-5 text-xs text-muted/75">
                    {article.publishedAt} · {article.readMinutes} min read
                  </p>
                </Link>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
