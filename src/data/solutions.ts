import type { SolutionTag } from "./products";

export type Solution = {
  slug: SolutionTag;
  title: string;
  headline: string;
  summary: string;
  audience: string;
  outcomes: string[];
  approach: string[];
  image: string;
  imageAlt: string;
};

export const solutions: Solution[] = [
  {
    slug: "gut-health",
    title: "Gut Health",
    headline: "Keep intake steady when diets and stress change",
    summary:
      "Programs for microflora balance, villi support, and transition resilience—built for poultry and swine houses where the first week after a diet change decides the cycle.",
    audience: "Nutritionists and farm managers managing weaning, placement, or heat-stress windows.",
    outcomes: [
      "Support consistent intake through stress windows",
      "Align additive stacks with antibiotic-reduction goals",
      "Field protocols matched to housing and water systems",
    ],
    approach: [
      "Baseline gut-risk review using your housing and diet data",
      "Stackable probiotic, prebiotic, and acidifier concepts",
      "Mill and farm onboarding so dosing survives the night shift",
    ],
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1400&q=80",
    imageAlt: "Healthy poultry flock",
  },
  {
    slug: "pathogen-control",
    title: "Pathogen Control",
    headline: "Cut pressure across feed and water lines",
    summary:
      "Feed hygiene, acidification, and functional nutrition sequenced for mills that need tools fitting inside existing biosecurity SOPs.",
    audience: "Technical managers and quality leads under pathogen or audit pressure.",
    outcomes: [
      "Support biosecurity programs with feed-side tools",
      "Flexible meal and water-line application options",
      "Documentation packaged for audit readiness",
    ],
    approach: [
      "Risk-mapping workshop across ingredients and water",
      "Integrated binder and acidifier sequencing",
      "Monitoring checklists your team can run weekly",
    ],
    image:
      "https://images.unsplash.com/photo-1604313890727-5542ff314405?w=1400&q=80",
    imageAlt: "Technician running a feed hygiene check",
  },
  {
    slug: "feed-quality",
    title: "Feed Quality",
    headline: "Protect what arrives in the bin",
    summary:
      "Mycotoxin mitigation, forage preservation, and milling hygiene programs for commodity volatility—when the question is which binder and how often to sample, not whether risk exists.",
    audience: "Procurement and quality teams owning ingredient surveys.",
    outcomes: [
      "Ingredient survey and inclusion guidance",
      "Binder selection by contaminant profile",
      "Silage and commodity storage practices you can train to",
    ],
    approach: [
      "On-site sampling protocol templates",
      "Rapid-testing partners for ingredient panels",
      "Quarterly quality review cadence with account teams",
    ],
    image:
      "https://images.unsplash.com/photo-1556114846-f753bec8a9f5?w=1400&q=80",
    imageAlt: "Grain storage silos at a feed facility",
  },
  {
    slug: "nutritional-efficiency",
    title: "Nutritional Efficiency",
    headline: "Pull more value from every ration",
    summary:
      "Enzyme, mineral, and premix strategies for corn-soy and alternative ingredient diets—aimed at nutrient capture, pellet survival, and cost-per-gain conversations.",
    audience: "Formulators optimizing matrices under margin pressure.",
    outcomes: [
      "Diet matrix optimization support",
      "Alternative ingredient onboarding without guesswork",
      "Cost-per-unit modelling you can check against your own figures",
    ],
    approach: [
      "Collaboration with your NIR and formulation systems",
      "Pellet stability and enzyme heat-tolerance review",
      "Phased rollout with KPI tracking your team already uses",
    ],
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1400&q=80",
    imageAlt: "Young maize crop, a core feed ingredient",
  },
  {
    slug: "farm-productivity",
    title: "Farm Productivity",
    headline: "Turn nutrition specs into barn KPIs",
    summary:
      "End-to-end programs linking additives, premixes, and technical service to the metrics producers report to ownership—mortality, FCR, egg mass, milk components.",
    audience: "Integrators and producer groups aligning mill and farm incentives.",
    outcomes: [
      "Species-specific performance benchmarks",
      "Producer training and SOP templates",
      "Quarterly business reviews with account teams",
    ],
    approach: [
      "Baseline farm audit with agreed scope",
      "Intervention sequencing and withdrawal planning",
      "ROI reporting framework tied to your KPIs",
    ],
    image:
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=1400&q=80",
    imageAlt: "Dairy cows on pasture",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
