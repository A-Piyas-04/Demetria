export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/**
 * Every href below resolves to a real route in `src/app`.
 * Parent items are themselves navigable — dropdowns add shortcuts, they never
 * replace the landing page.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Full catalog",
        href: "/products",
        description: "Browse every formulation with species and category filters.",
      },
      {
        label: "Feed additives",
        href: "/products?category=Feed+additives",
        description: "Probiotics, acidifiers, and enzyme systems.",
      },
      {
        label: "Premixes",
        href: "/products?category=Premixes",
        description: "Species- and phase-specific vitamin and mineral packages.",
      },
      {
        label: "Mycotoxin binders",
        href: "/products?category=Mycotoxin+binders",
        description: "Broad-spectrum tools for commodity risk windows.",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "All pathways",
        href: "/solutions",
        description: "The five outcome tracks producers buy against.",
      },
      { label: "Gut health", href: "/solutions/gut-health" },
      { label: "Pathogen control", href: "/solutions/pathogen-control" },
      { label: "Feed quality", href: "/solutions/feed-quality" },
      {
        label: "Nutritional efficiency",
        href: "/solutions/nutritional-efficiency",
      },
      { label: "Farm productivity", href: "/solutions/farm-productivity" },
    ],
  },
  {
    label: "Research & Quality",
    href: "/research",
    children: [
      {
        label: "Research & quality",
        href: "/research",
        description: "R&D workflow, manufacturing QA, and documentation.",
      },
      {
        label: "Insights",
        href: "/insights",
        description: "Technical articles and field notes.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Research & Quality", href: "/research" },
    { label: "Insights", href: "/insights" },
  ],
  solutions: [
    { label: "Gut health", href: "/solutions/gut-health" },
    { label: "Pathogen control", href: "/solutions/pathogen-control" },
    { label: "Feed quality", href: "/solutions/feed-quality" },
    { label: "Nutritional efficiency", href: "/solutions/nutritional-efficiency" },
    { label: "Farm productivity", href: "/solutions/farm-productivity" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy policy", href: "/contact" },
    { label: "Terms of use", href: "/contact" },
  ],
} as const;
