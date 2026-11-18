# XVET Germany — Reference Analysis

**URL analyzed:** https://xvetgermany.com/  
**Internal pages visited:** Homepage, `/product`, `/product/health`, `/product/renal-cleaner`, `/contact`, `/our-company`  
**Method:** Live browser (Cursor IDE browser) + content fetch  
**Stack cue (observed):** Astro-served assets (`/_astro/...`)

---

## Limitations (observed)

- Cookie panel dismissed via “I agree”; consent copy still lingered in the accessibility tree afterward.
- Main menu **Products** focus did not always navigate from the overlay; catalog opened via direct URL when needed.
- Viewport often showed hamburger-first chrome.
- **Challenges**, **News**, and **Be Our Distributor** form page were linked but not fully walked.

---

## Observed facts

### Homepage structure

1. Header — logo + tagline; hamburger **Menu**; floating green **BE OUR DISTRIBUTOR**
2. Hero — split visual; H1 “Care today for a better tomorrow”; CTA **FIND SOLUTIONS** → `/product`
3. **Our Product Range** — Health / Feed / Farm category tiles
4. **Our Products** — product card carousel/grid + “See all products”
5. **XVET Science in the Field** — field-results booklet promo
6. Testimonials — named quotes with country; carousel
7. Mission / less-antibiotics narrative
8. Event note (EuroTier)
9. Footer — company blurb, links, Hamburg address, email, social, newsletter

### Navigation model

- Hamburger overlay IA: Home · Products · Company · Challenges · News · Career · Contact
- Persistent global CTA: **BE OUR DISTRIBUTOR**
- Key routes: `/product`, `/product/{group}`, species/solution filters, `/our-company`, `/contact`

### Product catalog / discovery (key pattern)

Three filter axes:

1. **Groups:** Health | Feed | Farm  
2. **Species:** Poultry, Ruminant, Swine, Aquaculture, Bee (icon buttons)  
3. **Solutions:** outcome chips (Gut Health, Kidney Support, Heat Stress, NAGP, etc.)

**Product cards:** image, name, slogan, group chip, species icons.  
**PDP (Renal Cleaner sample):** Features, Benefits, Packaging, testimonials — **no product-specific inquiry CTA** (only global distributor CTA).  
**Contact:** form with intent Subject dropdown (distributor, buy in country, technical info, etc.).

### Visual design (observed)

| Token / element | Observation |
|-----------------|-------------|
| Primary green | `--color-primary` ≈ `rgb(77, 143, 33)` / `#4D8F21` |
| Secondary green | Darker green for depth |
| Category colors | Health sage, Feed orange, Farm blue |
| Typography | Proxima / Arial; heavy H1/H2 weights |
| Imagery | Farm photography + abstract product heroes |
| Layout | Rounded cards, generous padding, white / light-gray section rhythm |

### Strengths to borrow

1. Three-axis catalog (Group × Species × Solution)
2. Rich product card metadata (slogan + group + species)
3. Dual conversion paths (solutions buyers vs distributors)
4. Field proof + attributed testimonials (use placeholders only)
5. Intent-based contact subjects

### Weaknesses to avoid

1. Hamburger-only primary nav on wide layouts
2. PDP without product-level inquiry CTA
3. Dense solutions chip grid without search
4. Heavy cookie intrusion on first paint
5. Footer vs menu IA mismatch

---

## Design recommendations (interpretation)

Use XVET as the **product discovery UX**: multi-axis filters, card anatomy, inquiry CTAs. Do **not** copy product names, slogans, claims, or testimonials as client content. Our build adds a PDP **Request specification** CTA and visible desktop navigation — closing gaps observed on XVET.
