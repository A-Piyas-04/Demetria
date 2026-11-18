# Combination Strategy — Unified Brand Site

## Brand placeholder

**Working name:** Demetria Nutrition  
*(Clearly marked as placeholder — replace via `src/data/company.ts`)*

**Positioning:** Premium B2B animal nutrition, feed additives, and animal health solutions.

## Design DNA (unified, not cloned)

### From Kemin — Visual foundation

- Full-bleed photographic hero
- Spacious corporate section rhythm
- Science-led storytelling blocks
- Metric strip *structure* (placeholder figures labeled as sample)
- Polished button hierarchy

### From Eurofeed — Content architecture

- Outcome categories: gut health, pathogen control, feed quality, nutritional efficiency, farm productivity
- Dedicated Research & Quality page
- Certifications as *placeholder slots* (“Client credentials to be supplied”)
- Technical services framing

### From XVET — Product discovery UX

- Product cards with group tags
- Client-side search + filters (category, species, solution)
- Product detail → related products → inquiry CTA
- Distributor / business inquiry messaging
- Sample testimonials clearly labeled as placeholders

## Visual system (original)

Avoid competitor brand colors (Kemin red, XVET mid-green clones, Eurofeed logo red leaf).

| Role | Token | Hex |
|------|-------|-----|
| Primary | Botanical deep | `#12352C` |
| Primary soft | Mist sage | `#DCE8E2` |
| Accent | Harvest amber | `#C48A2A` |
| Background | Cool paper | `#F4F7F5` |
| Surface | White | `#FFFFFF` |
| Text | Ink | `#121A17` |
| Muted | Slate green | `#5A6B63` |

**Typography**

- Display: **Fraunces** (organic, agricultural character)
- Body / UI: **Manrope** (modern technical clarity)

**Motion**

- CSS for hovers; Motion (`motion`) for hero + scroll reveals
- Respect `prefers-reduced-motion`
- No scroll hijacking; subtle parallax only on hero imagery

## Architecture rules

1. One brand, one design system, one voice
2. All copy/products centralized under `src/data/`
3. Static export compatible (no server APIs)
4. No fabricated certifications or real customer quotes presented as genuine
