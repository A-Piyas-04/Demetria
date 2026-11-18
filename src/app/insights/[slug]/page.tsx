import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInsightBySlug, insights } from "@/data/insights";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  return (
    <article className="bg-bg pb-24">
      <Container width="narrow" className="pt-16 sm:pt-20">
        <div className="flex items-center gap-3">
          <p className="t-eyebrow text-brass">{article.category}</p>
          {article.sample && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.1em] text-muted uppercase">
              Sample
            </span>
          )}
        </div>
        <h1 className="font-display t-h2 mt-5 text-primary">{article.title}</h1>
        <p className="mt-6 text-xs tracking-[0.1em] text-muted uppercase">
          {article.publishedAt} · {article.readMinutes} min read
        </p>
      </Container>

      <Container width="default" className="mt-12">
        <Reveal variant="clip">
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 1024px"
            />
          </div>
        </Reveal>
      </Container>

      <Container width="narrow" className="mt-14">
        <div className="space-y-7">
          {article.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[1.0625rem] leading-[1.78] text-ink/85"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <ButtonLink href="/insights" variant="outline">
            Back to insights
          </ButtonLink>
        </div>
      </Container>
    </article>
  );
}
