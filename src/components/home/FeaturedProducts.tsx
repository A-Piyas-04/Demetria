import { getFeaturedProducts } from "@/data/products";
import { homeCopy } from "@/data/homeCopy";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

const copy = homeCopy.products;

/** SECTION 05 — featured products on white, split heading, four cards. */
export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <Section tone="white">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{copy.index}</Eyebrow>
          <h2 className="font-display t-h2 mt-5 text-primary">{copy.title}</h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <p className="t-body text-muted">{copy.description}</p>
          <div className="mt-6">
            <ArrowLink href={copy.cta.href}>{copy.cta.label}</ArrowLink>
          </div>
        </Reveal>
      </div>

      <Reveal
        staggerChildren
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {featured.map((product) => (
          <RevealItem key={product.slug} className="h-full">
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
