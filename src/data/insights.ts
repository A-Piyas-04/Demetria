export type InsightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  body: string[];
  /** Illustrative article written for this build; swap for reviewed content. */
  sample?: boolean;
};

export const insights: InsightArticle[] = [
  {
    slug: "sample-gut-health-poultry",
    title: "Gut health protocols for modern poultry houses",
    excerpt:
      "How nutritionists sequence probiotics, water acidification, and diet changes when placement stress and heat windows collide.",
    category: "Poultry",
    publishedAt: "2025-09-12",
    readMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80",
    imageAlt: "Poultry housing",
    sample: true,
    body: [
      "In commercial poultry, the first seven days after placement often decide whether intake recovers or the cycle carries a mortality tax. Nutrition teams usually arrive at three practical questions: which probiotic format survives the mill, how water acidification is dosed without corroding lines, and when to change diets without stacking stress.",
      "A workable protocol frames interventions as a sequence — baseline water quality, transition window, then recovery — rather than a single product drop. Each step has a measurement attached to it, so the flock's response can be read before the next change is made.",
      "The structure worth keeping: challenge, intervention, measured outcome, and implementation notes written for the mill and farm teams who have to run it.",
    ],
  },
  {
    slug: "sample-mycotoxin-risk-matrix",
    title: "Building a practical mycotoxin risk matrix",
    excerpt:
      "Ingredient sampling frequency, binder selection logic, and when to escalate testing.",
    category: "Feed quality",
    publishedAt: "2025-08-03",
    readMinutes: 9,
    image:
      "https://images.unsplash.com/photo-1556114846-f753bec8a9f5?w=1200&q=80",
    imageAlt: "Grain storage silos",
    sample: true,
    body: [
      "Commodity buyers already know mycotoxin risk is seasonal and geography-dependent. What they need is a matrix: which ingredients to sample how often, which toxin profiles drive binder choice, and which thresholds trigger a formulation change rather than a temporary inclusion bump.",
      "The columns that earn their place are ingredient class, sampling cadence, screening method, and response action. The matrix is only useful once each cell names a lab, a threshold, and the person who acts on it.",
      "Escalation rules matter more than the screening method itself. A result that nobody is required to act on will be filed, not used.",
    ],
  },
  {
    slug: "sample-ruminant-buffering",
    title: "Ruminal buffering in high-energy rations",
    excerpt:
      "Forage variability, TMR mixing, and buffer inclusion — what dairy and beef nutritionists watch when starch climbs.",
    category: "Ruminants",
    publishedAt: "2025-07-18",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1594987057733-1fb3fe5707c9?w=1200&q=80",
    imageAlt: "Dairy herd on pasture",
    sample: true,
    body: [
      "High-energy finishing and lactating rations push rumen pH when forage quality swings. Nutritionists usually balance particle size, effective fibre, and buffer capacity rather than treating buffer as a standalone fix.",
      "Where mineral buffers sit depends on the forage analysis and on how consistently the TMR is actually mixed — two farms running the same ration on paper can present very different rumen conditions.",
      "Monitoring is the cheap part: consistency checks on the mixer, regular forage sampling, and a reading of intake patterns across the group.",
    ],
  },
  {
    slug: "sample-aquaculture-efficiency",
    title: "Nutritional efficiency levers in aquaculture feeds",
    excerpt:
      "Water stability, functional additives, and growth-phase targets for warm-water species.",
    category: "Aquaculture",
    publishedAt: "2025-06-01",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1766744489655-328ec3d4f417?w=1200&q=80",
    imageAlt: "Aquaculture pens on open water",
    sample: true,
    body: [
      "Extruded aqua feeds fail in the water column when binders and oils are poorly specified. Efficiency conversations therefore start with pellet integrity and feed conversion under actual pond or cage conditions, well before protein specifications are debated.",
      "Growth-phase targets decide which levers are available. Early phases reward digestibility and particle handling; later phases reward conversion and water stability under feeding pressure.",
      "The measurements worth agreeing in advance are conversion, uniformity, and the share of feed lost before it is eaten.",
    ],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find((a) => a.slug === slug);
}
