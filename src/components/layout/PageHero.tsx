import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  /** `compact` for catalog pages, `editorial` for narrative pages. */
  size?: "compact" | "editorial";
  children?: ReactNode;
};

/**
 * Internal-page header. Calmer than the homepage hero by design: no parallax,
 * no pinned sequence — just a photographic band and a clear title block.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  size = "compact",
  children,
}: PageHeroProps) {
  const heights =
    size === "editorial"
      ? "pt-20 pb-20 sm:pt-28 sm:pb-28"
      : "pt-16 pb-16 sm:pt-20 sm:pb-20";

  return (
    <section
      data-tone="dark"
      className={`relative isolate overflow-hidden bg-primary text-primary-soft ${heights}`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/94 via-primary-deep/78 to-primary-deep/55"
          />
        </>
      )}

      <Container>
        <p className="t-eyebrow text-sage">{eyebrow}</p>
        <h1
          className={`font-display mt-5 max-w-4xl text-surface ${
            size === "editorial" ? "t-hero" : "t-h2"
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p className="t-lead mt-7 max-w-2xl text-primary-soft/75">{lead}</p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
