# Eurofeed Technologies — Reference Analysis

**URL analyzed:** https://www.eurofeed.tech/  
**Internal pages visited:** Home, Products, Research and Development, Background, Certifications, Gastrointestinal Health  
**Method:** Live browser + content fetch  
**Stack (observed):** WordPress + Elementor (`elementor-kit-6`, `?page_id=` URLs)  
**Cookie banner:** None present on load.

---

## Observed facts

### Navigation model

Top utility bar (address, email, phone) + logo bar + **hamburger-only** menu:

- Home  
- Service  
- Who we are → Background, Mission  
- Research and Development  
- Products → Gastrointestinal Health, Control of pathogens, Improvements to feeds, Functional Support, Aquaculture, Pet food department, Cleaning & Disinfection  
- Certifications  
- News  
- Contacts via sticky/gold CTA (`?page_id=907`) — not a primary menu item

### Homepage structure

1. Contact utility bar (green `#006529` range)
2. Logo + language + hamburger
3. Hero carousel (surreal / anthropomorphic slides observed; Amatic SC headlines)
4. Solutions icon grid (7 categories)
5. Corporate video band
6. “What we treat” additive taxonomy band
7. Latest news / events
8. Footer + sticky right contact rail (gold Contacts CTA)

### Key internal pages

| Page | Role |
|------|------|
| Products hub | Icon category grid; little body copy |
| R&D | Innovation narrative + process quality pillars |
| Background | Heritage timeline (1996–2022) |
| Certifications | GMP+ / ISO explainers |
| GI Health | Educational intro + SKUs as text blocks (no dedicated PDP links observed) |

### Dual content taxonomies

**A. Solution / application:** gut health, pathogens, feed improvement, functional, aqua, pet, cleaning  
**B. Additive class (“What we treat”):** technological / nutritional / sensory additives, complementary feedstuffs, livestock, pet

### Visual design (observed)

| Token | Hex / note | Use |
|-------|------------|-----|
| Primary | `#006529` | Top bar, green bands |
| Accent | `#F5BA4B` | Buttons, nav hover, Contacts CTA |
| Secondary | `#FF0000` | Logo accent |
| Text | `#1A1A18` | Body / nav |
| Display type | Amatic SC | Section titles (playful) |
| Body | Roboto | UI / copy |

### Strengths to borrow

1. Trust-first chrome (address, phone, email, GMP+ mention)
2. Sticky / always-reachable contact
3. Solution-led browse by animal-health problem
4. Quality + R&D as peer navigation destinations
5. Certification explainers + company timeline structure
6. Clear brand token discipline (green + gold)

### Weaknesses to avoid

1. Hamburger-only desktop nav
2. Whimsical anthropomorphic heroes vs scientific seriousness
3. Playful display font overuse for premium B2B
4. Products hub = icons only; SKUs as plain paragraphs without cards/CTAs
5. Dual taxonomies without a clear bridge
6. Thin footer IA; `?page_id=` URLs

---

## Design recommendations (interpretation)

Borrow **content architecture**: technical product categories, R&D/quality narrative, certification presentation *as placeholder slots* (never fake credentials). Modernize UI entirely — visible desktop nav, photographic seriousness, card-based catalog, in-page inquiry CTAs.
