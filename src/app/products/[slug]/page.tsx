import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { solutions } from "@/data/solutions";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.summary };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const pathways = solutions.filter((s) =>
    product.solutionTags.includes(s.slug),
  );

  return (
    <>
      {/* Product header */}
      <section className="border-b border-line bg-surface pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 text-xs text-muted">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal variant="clip" className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-primary-soft">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                {product.species.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <h1 className="font-display t-h2 mt-6 text-primary">
                {product.name}
              </h1>
              <p className="t-lead mt-5 text-muted">{product.summary}</p>

              <div className="mt-8 border-l-2 border-brass/60 bg-bg py-5 pr-5 pl-6">
                <p className="t-eyebrow text-brass">When to specify</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {product.useCase}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Request specification
                </ButtonLink>
                <ButtonLink href="/products" variant="outline" size="lg">
                  Back to catalog
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Benefits + technical notes */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Benefits</Eyebrow>
            <ul className="mt-7 border-t border-line">
              {product.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="border-b border-line py-5 text-sm leading-relaxed text-ink"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <Eyebrow>Technical notes</Eyebrow>
            <p className="t-body mt-7 text-muted">{product.technicalNotes}</p>

            {pathways.length > 0 && (
              <>
                <p className="t-eyebrow mt-10 text-muted">Applies to</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pathways.map((pathway) => (
                    <li key={pathway.slug}>
                      <Link
                        href={`/solutions/${pathway.slug}`}
                        className="inline-flex rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:border-primary/35 hover:bg-primary/[0.04]"
                      >
                        {pathway.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <Reveal>
            <Eyebrow>Related products</Eyebrow>
            <h2 className="font-display t-h3 mt-5 text-primary">
              Often specified alongside
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
