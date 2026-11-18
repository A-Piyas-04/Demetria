import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { products } from "@/data/products";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: "Solution not found" };
  return { title: solution.title, description: solution.summary };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const linkedProducts = products.filter((p) =>
    p.solutionTags.includes(solution.slug),
  );

  return (
    <>
      <PageHero
        eyebrow="Solution pathway"
        title={solution.title}
        size="editorial"
        image={solution.image}
        imageAlt={solution.imageAlt}
        lead={solution.headline}
      >
        <p className="max-w-2xl text-primary-soft/70">{solution.summary}</p>
        <p className="mt-5 max-w-2xl border-l border-sage/30 pl-5 text-sm leading-relaxed text-primary-soft/60">
          {solution.audience}
        </p>
      </PageHero>

      {/* Outcomes — heading holds the left rail, cards fill the measure. */}
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>01 / Intended outcomes</Eyebrow>
              <h2 className="font-display t-h3 mt-5 text-primary">
                What this pathway is built to move
              </h2>
              <p className="t-body mt-5 max-w-sm text-muted">
                Targets we agree on before any product is specified, so the
                program can be judged against them later.
              </p>
            </div>
          </Reveal>

          <Reveal
            staggerChildren
            delay={0.08}
            className="flex flex-col gap-4 lg:col-span-8"
          >
            {solution.outcomes.map((outcome, i) => (
              <RevealItem key={outcome}>
                <article className="card card-interactive group relative overflow-hidden p-6 sm:p-7">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <div className="flex items-start gap-5 sm:gap-7">
                    <span className="numeral pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="t-body flex-1 text-ink">{outcome}</p>
                    <Icon
                      name="check"
                      className="mt-1 shrink-0 text-sage transition-colors duration-200 group-hover:text-accent"
                    />
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Approach — a spine with four marked stops. */}
      <Section tone="forest">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow tone="dark">02 / Technical approach</Eyebrow>
              <h2 className="font-display t-h3 mt-5 text-surface">
                How a program gets built
              </h2>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="onDark">
                  Discuss this pathway
                </ButtonLink>
                <ButtonLink href="/products" variant="outlineDark">
                  Browse products
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal staggerChildren delay={0.08} className="lg:col-span-8">
            <ol className="relative ml-[7px] border-l border-sage/25 pl-7 sm:pl-10">
              {solution.approach.map((step, i) => (
                <RevealItem key={step} className="pb-4 last:pb-0">
                  <li className="relative">
                    <span
                      aria-hidden
                      className="absolute top-7 -left-[calc(1.75rem+8px)] size-[15px] rounded-full border border-sage/50 bg-primary sm:-left-[calc(2.5rem+8px)]"
                    />
                    <div className="card-dark card-interactive p-6 sm:p-7">
                      <span className="t-eyebrow text-sage/70">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="t-body mt-3 max-w-xl text-primary-soft/85">
                        {step}
                      </p>
                    </div>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Linked products */}
      <Section tone="white">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>03 / Linked products</Eyebrow>
            <h2 className="font-display t-h3 mt-5 max-w-xl text-primary">
              Formulations that serve this pathway
            </h2>
          </div>
          <ArrowLink href="/products">View the full range</ArrowLink>
        </Reveal>
        {linkedProducts.length === 0 ? (
          <p className="mt-10 text-muted">
            Products for this pathway are specified case by case —{" "}
            <a href="/contact" className="text-primary underline underline-offset-4">
              tell us the constraint
            </a>{" "}
            and we will send the shortlist.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {linkedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
