import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-primary/20 bg-surface p-10 text-center text-muted">
        No products match your filters. Adjust the search or filter selections.
      </p>
    );
  }

  return (
    <Reveal
      key={products.map((p) => p.slug).join("|")}
      staggerChildren
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <RevealItem key={product.slug} className="h-full">
          <ProductCard product={product} />
        </RevealItem>
      ))}
    </Reveal>
  );
}
