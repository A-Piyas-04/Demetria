export type ProductCategory =
  | "Feed additives"
  | "Premixes"
  | "Nutraceuticals"
  | "Mycotoxin binders";

export type Species =
  | "Poultry"
  | "Swine"
  | "Ruminants"
  | "Aquaculture"
  | "Multi-species";

export type SolutionTag =
  | "gut-health"
  | "pathogen-control"
  | "feed-quality"
  | "nutritional-efficiency"
  | "farm-productivity";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  species: Species[];
  solutionTags: SolutionTag[];
  summary: string;
  useCase: string;
  benefits: string[];
  technicalNotes: string;
  image: string;
  imageAlt: string;
  featured: boolean;
};

export const productCategories: ProductCategory[] = [
  "Feed additives",
  "Premixes",
  "Nutraceuticals",
  "Mycotoxin binders",
];

export const speciesOptions: Species[] = [
  "Poultry",
  "Swine",
  "Ruminants",
  "Aquaculture",
  "Multi-species",
];

export const products: Product[] = [
  {
    slug: "gutguard-probiotic",
    name: "GutGuard Probiotic Blend",
    category: "Feed additives",
    species: ["Poultry", "Swine"],
    solutionTags: ["gut-health", "farm-productivity"],
    summary:
      "Multi-strain probiotic concept for stabilizing gut microflora when diets change, birds or pigs move houses, or heat stress hits intake.",
    useCase:
      "Specify during placement, weaning, or ration transitions when a documented gut-support stack has to replace a one-off bag.",
    benefits: [
      "Supports digestive balance during stress events",
      "Compatible with common pelleted feed processes (validate heat profile)",
      "Field trial framework available on request",
    ],
    technicalNotes:
      "Inclusion rate set with your formulator. Store cool and dry; shelf life per certificate of analysis. Full strain list supplied in the technical dossier.",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80",
    imageAlt: "Poultry flock in open housing",
    featured: true,
  },
  {
    slug: "pathoshield-acidifier",
    name: "PathoShield Organic Acidifier",
    category: "Feed additives",
    species: ["Poultry", "Swine", "Multi-species"],
    solutionTags: ["pathogen-control", "gut-health"],
    summary:
      "Buffered organic acid matrix for feed and water-line programs where pathogen pressure and hygiene audits share the same agenda.",
    useCase:
      "Pair with biosecurity SOPs when mills need acidification that formulators can dose and farm teams can apply without corroding equipment.",
    benefits: [
      "Buffered acid profile for feed stability",
      "Suitable for nursery and grower phases",
      "Technical dosing guides for meal and water-line application",
    ],
    technicalNotes:
      "Liquid and dry formats — select per application. Contact technical team for acid blend and water-line compatibility notes.",
    image:
      "https://images.unsplash.com/photo-1604313890727-5542ff314405?w=1200&q=80",
    imageAlt: "Technician preparing feed samples for testing",
    featured: true,
  },
  {
    slug: "mycobind-advanced",
    name: "MycoBind Advanced",
    category: "Mycotoxin binders",
    species: ["Ruminants", "Poultry", "Swine"],
    solutionTags: ["feed-quality", "nutritional-efficiency"],
    summary:
      "Broad-spectrum binder concept for commodity ingredients when seasonal mycotoxin risk forces inclusion decisions under incomplete lab coverage.",
    useCase:
      "Use after ingredient surveys when you need a low-inclusion binder that sits cleanly beside mineral premixes.",
    benefits: [
      "Multi-mycotoxin binding approach (profile TBD with client data)",
      "Low inclusion rate target for formulation headroom",
      "Compatible with mineral premixes — validate locally",
    ],
    technicalNotes:
      "Inclusion rate set against your ingredient survey and regional toxin panels.",
    image:
      "https://images.unsplash.com/photo-1556114846-f753bec8a9f5?w=1200&q=80",
    imageAlt: "Grain storage silos at a feed facility",
    featured: true,
  },
  {
    slug: "effimax-enzyme",
    name: "EffiMax Enzyme Complex",
    category: "Feed additives",
    species: ["Poultry", "Swine"],
    solutionTags: ["nutritional-efficiency", "feed-quality"],
    summary:
      "Enzyme system for corn-soy and alternative ingredient diets when formulators need more nutrient release without rewriting the entire matrix overnight.",
    useCase:
      "Deploy when fibrous fractions or alternative proteins raise FCR risk and pelleting heat is a constraint.",
    benefits: [
      "Supports nutrient release from fibrous fractions",
      "Formulated for thermostable pelleting windows",
      "Diet matrix recommendations available with your NIR data",
    ],
    technicalNotes:
      "Activity units confirmed against your matrix values. Coated granule recommended above 85°C pelleting.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    imageAlt: "Young maize crop, a core feed ingredient",
    featured: true,
  },
  {
    slug: "ruminex-buffer",
    name: "RumiNex Ruminal Buffer",
    category: "Feed additives",
    species: ["Ruminants"],
    solutionTags: ["gut-health", "farm-productivity"],
    summary:
      "Ruminal buffer for lactating dairy and beef finishing when high-energy rations and forage swings threaten rumen pH stability.",
    useCase:
      "Specify with TMR programs after forage analysis shows fiber or starch risk.",
    benefits: [
      "Supports rumen pH stability targets",
      "Mineral-balanced formulation for high-energy rations",
      "Compatible with TMR mixing routines",
    ],
    technicalNotes:
      "Inclusion set per head per day, adjusted to forage analysis and your milk or ADG targets.",
    image:
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=1200&q=80",
    imageAlt: "Dairy cows on pasture",
    featured: false,
  },
  {
    slug: "poultrymax-premix",
    name: "PoultryMax Layer Premix",
    category: "Premixes",
    species: ["Poultry"],
    solutionTags: ["nutritional-efficiency", "farm-productivity"],
    summary:
      "Trace mineral and vitamin premix concept for commercial layers when shell quality and phase feeding need a single, auditable package.",
    useCase:
      "Match to phase-specific macro premixes in cage, barn, or free-range systems.",
    benefits: [
      "Structured for shell quality support programs",
      "Oxide/sulfate mineral options — client selectable",
      "QA release per batch — credentials TBD",
    ],
    technicalNotes:
      "Inclusion matched to the phase-specific macro premix and local vitamin regulations.",
    image:
      "https://images.unsplash.com/photo-1553531009-c4605f302b47?w=1200&q=80",
    imageAlt: "Brown laying hens in a barn doorway",
    featured: false,
  },
  {
    slug: "swinestart-nursery",
    name: "SwineStart Nursery Premix",
    category: "Premixes",
    species: ["Swine"],
    solutionTags: ["gut-health", "farm-productivity"],
    summary:
      "Nursery premix focused on early post-weaning transition when palatability and gut support matter more than max zinc theater.",
    useCase:
      "Pair with client-approved base mixes during the first weeks post-wean.",
    benefits: [
      "Zinc and copper forms selected for regional compliance",
      "Palatability-oriented carrier system",
      "Technical feeding programs available for nursery managers",
    ],
    technicalNotes:
      "Use with client-approved base mix. Medication inclusion per local regulation only.",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80",
    imageAlt: "Young pig in a straw-bedded pen",
    featured: false,
  },
  {
    slug: "aquaflux-growth",
    name: "AquaFlux Growth Support",
    category: "Nutraceuticals",
    species: ["Aquaculture"],
    solutionTags: ["nutritional-efficiency", "farm-productivity"],
    summary:
      "Functional feed concept for warm-water growth phases when water stability and conversion under pond or cage conditions are the real constraints.",
    useCase:
      "Specify with extruded feeds after pellet integrity targets are agreed.",
    benefits: [
      "Marine-origin ingredient options on request",
      "Water stability target for extruded feeds",
      "Pilot farm protocols on request",
    ],
    technicalNotes:
      "Inclusion band agreed per species before commercial rollout.",
    image:
      "https://images.unsplash.com/photo-1766744489655-328ec3d4f417?w=1200&q=80",
    imageAlt: "Aquaculture pens on open water",
    featured: false,
  },
  {
    slug: "immunupolysaccharide",
    name: "ImmunuPolysaccharide",
    category: "Nutraceuticals",
    species: ["Poultry", "Swine", "Multi-species"],
    solutionTags: ["pathogen-control", "gut-health"],
    summary:
      "Yeast-derived fraction concept for immune-support programs sitting inside antibiotic-reduction roadmaps.",
    useCase:
      "Combine with probiotic or acidifier stacks when integrators need a documented functional layer.",
    benefits: [
      "Standardized actives, declared in the technical dossier",
      "Suitable for antibiotic-reduction roadmaps",
      "Combination protocols with probiotics available",
    ],
    technicalNotes:
      "Spray-dried powder; inclusion rate confirmed with your formulator.",
    image:
      "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=1200&q=80",
    imageAlt: "Analyst working at a laboratory bench",
    featured: false,
  },
  {
    slug: "forageguard-silage",
    name: "ForageGuard Silage Inoculant",
    category: "Feed additives",
    species: ["Ruminants"],
    solutionTags: ["feed-quality", "farm-productivity"],
    summary:
      "Forage inoculant concept for alfalfa and corn silage when fermentation quality and aerobic stability decide winter feed costs.",
    useCase:
      "Apply at chop with liquid systems when dry matter targets and bunker management are already dialed.",
    benefits: [
      "Lactobacillus blend with declared strain list",
      "Liquid application equipment compatible",
      "Aerobic stability focus in high-COH diets",
    ],
    technicalNotes:
      "Application rate set in CFU per gram of forage, against your chop dry-matter targets.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    imageAlt: "Farmland and forage production",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category ||
          p.solutionTags.some((t) => product.solutionTags.includes(t))),
    )
    .slice(0, limit);
}
