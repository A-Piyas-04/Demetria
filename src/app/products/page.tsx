import type { Metadata } from "next";
import { company } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { ProductFilters } from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse the ${company.name} range by category, species, and solution pathway.`,
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalog"
        title="Formulations for every production system"
        lead="Search and filter by category, species, or the outcome pathway the program is built around."
      />

      <Section tone="ivory" density="tight">
        <ProductFilters />
      </Section>
    </>
  );
}
