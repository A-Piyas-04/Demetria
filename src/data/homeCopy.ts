/**
 * Homepage copy — one entry per section of the homepage composition.

 * No awards, certifications, or numerical claims are invented here.
 */
export const homeCopy = {
  /** 01 — Cinematic hero */
  hero: {
    eyebrow: "Advancing Animal Nutrition",
    headlineLines: [
      "Better Nutrition.",
      "Healthier Animals.",
      "Stronger Futures.",
    ],
    support:
      "We partner with feed mills, integrators, and producers on nutrition programs that hold up from the mill floor to the barn — specified, implemented, and measured.",
    primaryCta: { label: "Explore Our Solutions", href: "/solutions" },
    secondaryCta: { label: "Discover Our Products", href: "/products" },
    image:
      "https://images.unsplash.com/photo-1504867980221-c62ae681b301?w=2400&q=90",
    imageAlt: "Beef cattle feeding along a hay line on a winter morning",
  },

  /** 02 — Editorial statement */
  purpose: {
    index: "01 / Our Purpose",
    label: "Science-led. Nature-inspired.",
    statement:
      "We believe better animal nutrition begins with a deeper understanding of nature, science, and the challenges facing modern agriculture.",
    body: [
      "Demetria Nutrition designs additive, premix, and nutraceutical programs around the constraint that actually limits a production system — transition stress, mycotoxin pressure, nutrient capture, or the documentation an audit will ask for.",
      "Every recommendation is written for inclusion rates, formats, and process limits a formulator can specify and a mill team can run without improvising.",
    ],
    cta: { label: "Discover Our Story", href: "/about" },
  },

  /** 03 — Signature interaction: the nutrition ecosystem */
  ecosystem: {
    index: "02 / Our Ecosystem",
    title: "One Connected Approach to Animal Health.",
    description:
      "From nutrition and gut health to feed performance and farm productivity, every element contributes to better outcomes.",
    nodes: [
      {
        id: "nutrition",
        title: "Animal Nutrition",
        description:
          "Diet design that matches species, production stage, and the ingredients actually available to the mill.",
      },
      {
        id: "gut-health",
        title: "Gut Health",
        description:
          "Microflora balance and intestinal integrity held steady through placement, weaning, and diet transitions.",
      },
      {
        id: "feed-quality",
        title: "Feed Quality",
        description:
          "Ingredient screening, mycotoxin risk mapping, and feed hygiene written into the specification from the start.",
      },
      {
        id: "wellbeing",
        title: "Animal Wellbeing",
        description:
          "Nutrition that supports resilience under heat, density, and antibiotic-reduction targets.",
      },
      {
        id: "productivity",
        title: "Farm Productivity",
        description:
          "Programs measured where it counts — intake, conversion, uniformity, and the cost of a finished unit.",
      },
    ],
  },

  /** 04 — Solutions grid */
  solutions: {
    index: "03 / Our Solutions",
    title: "Specialized Solutions for Every Need.",
    description:
      "Explore tailored nutrition and health approaches across modern animal agriculture.",
    cta: { label: "View all pathways", href: "/solutions" },
  },

  /** 05 — Featured products */
  products: {
    index: "04 / Featured Products",
    title: "Solutions Built for Performance.",
    description:
      "Representative formulations across additives, premixes, and binders, each written so a formulator can specify it directly.",
    cta: { label: "View All Products", href: "/products" },
  },

  /** 06 — Science & innovation parallax story */
  science: {
    index: "05 / Science & Innovation",
    title: "Where Scientific Insight Meets Real-World Impact.",
    description:
      "Formulation work only matters once it survives the pellet mill, the water line, and the night shift. Our technical process is built around that gap.",
    capabilities: [
      {
        title: "Research-driven formulation",
        body: "Hypothesis, pilot, then field protocol — with the measurement plan defined before the first inclusion.",
      },
      {
        title: "Technical expertise",
        body: "Onboarding for mill and farm teams so dosing, storage, and sequencing survive a stressful week.",
      },
      {
        title: "Responsible innovation",
        body: "Claims kept inside what the data supports, with documentation ready for the audit that follows.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=1600&q=85",
    imageAlt: "Analyst working at a laboratory bench",
  },

  /** 07 — Brand statement */
  statement: {
    headline: "Progress Begins with Better Care.",
    support:
      "Supporting healthier animals and more sustainable agricultural futures.",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=2000&q=85",
    imageAlt: "Open farmland under a wide sky",
  },

  /** 08 — Quality, trust & commitment */
  quality: {
    index: "06 / Quality & Commitment",
    title: "Quality Is Built Into Every Decision.",
    description:
      "Quality is a sequence of decisions — which supplier, which specification, which release criteria — not a seal applied at the end. These are the disciplines our programs are organised around.",
    blocks: [
      {
        title: "Quality-focused processes",
        body: "Batch traceability, certificate-of-analysis release, and supplier qualification steps documented for review.",
      },
      {
        title: "Technical support",
        body: "Direct access to the people who wrote the program, from specification through the first production cycles.",
      },
      {
        title: "Responsible development",
        body: "Formulation and claims developed against evidence, with regulatory constraints treated as design inputs.",
      },
    ],
    cta: { label: "Research & Quality", href: "/research" },
  },

  /** 09 — Conversion */
  cta: {
    index: "07 / Get in Touch",
    title: "Let's Build Better Outcomes Together.",
    description:
      "Connect with our team to explore the right solutions for your business. Tell us the species, production stage, and the constraint that matters most.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Explore Products", href: "/products" },
  },
} as const;
