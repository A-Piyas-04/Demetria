/**
 * Brand record. Bracketed fields are the ones a client must supply before
 * launch (legal entity, founding year, address, real contact details) — they
 * are deliberately visible so nothing ships as an invented fact.
 */
export const company = {
  name: "Demetria Nutrition",
  tagline: "Nutrition programs built for measurable farm performance",
  legalName: "[Client legal entity]",
  founded: "[Year]",
  headquarters: "[City, Country]",
  description:
    "Demetria Nutrition partners with feed mills, integrators, and producers on additives, premixes, and nutraceutical programs built around gut health, feed quality, and species-specific performance goals.",
  mission:
    "Help technical teams specify, implement, and measure nutrition interventions that hold up from the mill floor to the barn.",
  vision:
    "Become the supplier nutritionists recommend when diet transitions, mycotoxin risk, or efficiency targets need a documented program.",
  values: [
    {
      title: "Science you can specify",
      description:
        "Formulations written for the inclusion rates, formats, and process constraints a formulator works inside.",
      icon: "flask",
    },
    {
      title: "Partnership on the ground",
      description:
        "Technical onboarding for mill and farm teams, so a program survives its first stressful week in production.",
      icon: "layers",
    },
    {
      title: "Quality with receipts",
      description:
        "Batch discipline, certificate-of-analysis release, and documentation an auditor can follow end to end.",
      icon: "shield",
    },
  ],
  qualitySystems: [
    {
      title: "Supplier qualification",
      body: "Raw materials come from approved sources with specifications on file and incoming checks against them.",
      icon: "shield",
    },
    {
      title: "Batch traceability",
      body: "Every batch carries its own record, so a finished bag can be traced back to the materials that made it.",
      icon: "layers",
    },
    {
      title: "Certificate-of-analysis release",
      body: "Product is released against agreed criteria, with the analysis available to your quality team.",
      icon: "document",
    },
    {
      title: "Audit-ready documentation",
      body: "Specifications, inclusion guidance, and release records are packaged the way an audit asks for them.",
      icon: "check",
    },
  ],
  buyerOutcomes: [
    "Stabilize intake and gut integrity through diet transitions",
    "Reduce mycotoxin and pathogen pressure with sequenced tools",
    "Improve nutrient capture from corn-soy and alternative diets",
    "Document antibiotic-reduction and quality programs for audits",
  ],
  expertiseAreas: [
    "Feed additives and acidifiers",
    "Mycotoxin risk mitigation",
    "Species premixes (poultry, swine, ruminants, aqua)",
    "Technical service and program design",
  ],
  engagement: [
    {
      title: "Send the brief",
      body: "Species, production stage, and the constraint you are trying to move.",
      icon: "chat",
    },
    {
      title: "Program design",
      body: "Formats, inclusion rates, and documentation reviewed against your mill's constraints.",
      icon: "flask",
    },
    {
      title: "Field support",
      body: "Onboarding for mill and farm teams, then review against the metrics agreed at the start.",
      icon: "target",
    },
  ],
  contact: {
    email: "inquiries@demetria-nutrition.placeholder",
    phone: "+1 (555) 010-2400",
    phoneTel: "+15550102400",
    whatsapp: "+15550102400",
    address: "[Street address]\n[City, Region, Postal code]",
  },
  social: {
    linkedin: "#",
    youtube: "#",
  },
  certificationsNote:
    "Third-party certification and accreditation credentials are listed here once they are issued.",
  copyrightYear: 2026,
} as const;

export type Company = typeof company;
