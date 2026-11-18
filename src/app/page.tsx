import { Hero } from "@/components/home/Hero";
import { PurposeStatement } from "@/components/home/PurposeStatement";
import { NutritionEcosystem } from "@/components/home/NutritionEcosystem";
import { SolutionCategories } from "@/components/home/SolutionCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ScienceStory } from "@/components/home/ScienceStory";
import { BrandStatement } from "@/components/home/BrandStatement";
import { QualityTeaser } from "@/components/home/QualityTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";

/**
 * Homepage composition. Section rhythm alternates deliberately:
 * immersive → quiet → signature → editorial → catalog → layered →
 * cinematic break → structured → conversion.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PurposeStatement />
      <NutritionEcosystem />
      <SolutionCategories />
      <FeaturedProducts />
      <ScienceStory />
      <BrandStatement />
      <QualityTeaser />
      <ContactCTA />
    </>
  );
}
