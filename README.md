# Demetria Nutrition (placeholder brand)

Premium B2B animal nutrition corporate site built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **TypeScript**. All marketing copy, products, and contact details are centralized under `src/data/` for easy replacement.

## Scripts

```bash
npm install
npm run dev      # local development at http://localhost:3000
npm run build    # production build → static files in out/
npx serve out    # preview the static export locally
npm run lint
```

## Replace placeholder content

| File | Purpose |
|------|---------|
| `src/data/company.ts` | Brand name, tagline, mission, contact channels |
| `src/data/products.ts` | Product catalog, slugs, filters, imagery URLs |
| `src/data/solutions.ts` | Solution pathways and narratives |
| `src/data/insights.ts` | Articles (currently labeled samples) |
| `src/data/testimonials.ts` | PLACEHOLDER quotes — approve before publish |
| `src/data/navigation.ts` | Header/footer links |

Unsplash image URLs are used for demo photography. Swap for licensed client assets in product/solution records.

## Design tokens

Colors and fonts live in `src/app/globals.css` (`@theme` + CSS variables). Display type: **Fraunces**. Body/UI: **Manrope** (configured in `src/app/layout.tsx`).

## Static deployment

`next.config.ts` sets `output: "export"` for fully static hosting (S3, Netlify, GitHub Pages with `out/`, etc.).

```bash
npm run build
```

The export is written to the `out/` directory. Because this project uses external Unsplash images, `images.unoptimized` is enabled for static compatibility.

If you need server features later (draft mode, dynamic APIs), remove `output: "export"` from `next.config.ts` and deploy with `next build` + `next start` or a Node-compatible host.

**Note:** Partial Prefetching / `cacheComponents` are disabled while `output: "export"` is enabled (Next.js 16 does not support PPR with static export).

## Project structure

- `src/app/` — App Router pages (metadata + `generateStaticParams` on dynamic routes)
- `src/components/` — Layout, UI, home, product, motion, and contact components
- `src/data/` — Single source of truth for content

## Motion & depth

- Desktop cursor wave (velocity-gated ripples; not a follower blob)
- Homepage horizontal Solutions showcase (vertical scroll → sideways track)
- 3D tilt cards, layered parallax, advanced scroll reveals
- `prefers-reduced-motion` and mobile fallbacks disable heavy effects

Marketing context: `.agents/product-marketing.md`  
Research notes: `docs/reference-analysis/customer-research-synthesis.md`

## Notes

- Sample metrics, insights, and testimonials are explicitly labeled and must not ship as factual claims.
- Contact form uses a **mailto** handoff (frontend only).