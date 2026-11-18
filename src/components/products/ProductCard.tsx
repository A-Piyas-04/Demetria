import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

/**
 * Clean geometry, no commerce signals, no 3D tilt. Hover is three small
 * things: the image scales, the hairline darkens, the arrow nudges.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="h-full">
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/25 hover:shadow-[0_18px_44px_-30px_rgba(23,60,50,0.55)]"
      >
        <div className="relative aspect-[5/4] overflow-hidden bg-primary-soft">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="t-eyebrow text-accent">{product.category}</p>
          <h3 className="font-display t-h4 mt-3 text-primary">
            {product.name}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {product.summary}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-primary">
            <span>View details</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              <path
                d="M5 12h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
