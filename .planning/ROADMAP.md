# TAKKERU Roadmap

**Milestone:** v1.0 — Cart Boba Tea, Mandu, Ramen Website
**Phases:** 4
**Requirements:** 25 total (8 validated, 17 active)

---

### Phase 1: Cart System Foundation
**Goal:** Complete shopping cart, checkout, and product detail pages
**Mode:** mvp
**Success Criteria:**
1. User can add items to cart from any product card or carousel
2. Cart persists across browser sessions
3. User can complete checkout with form validation
4. Order confirmation displays unique order ID
5. Product detail pages show full product information

**Requirements:** CART-01 through CART-07, DETAIL-01 through DETAIL-05
**Status:** ✓ Complete

---

### Phase 2: Product Catalog & Menu Expansion
**Goal:** Rich product data for all boba tea, mandu, ramen items with proper categorization
**Mode:** mvp
**Success Criteria:**
1. All 18+ products have complete data (name, description, price, image, category)
2. Boba tea products include flavor profiles and customization options
3. Mandu products include filling descriptions and cooking methods
4. Ramen products include broth type and topping lists
5. Combo meals bundle items with discounted pricing

**Requirements:** CATALOG-01 through CATALOG-06
**Status:** ◆ In Progress

---

### Phase 3: UI/UX Polish & Animation System
**Goal:** Production-quality animations, reduced-motion support, and design system tokens
**Mode:** mvp
**Success Criteria:**
1. Dark theme with consistent #0B0B0B background and #FFD84D accent
2. All scroll reveals use standardized animation tokens
3. Reduced-motion support works across all components
4. Loading screen syncs progress bar with GSAP timeline
5. Cart drawer, toasts, and micro-interactions feel polished

**Requirements:** UI-01 through UI-08
**Status:** ○ Pending

---

### Phase 4: Performance & Production Readiness
**Goal:** Lighthouse 90+ scores, SEO optimization, and production deployment
**Mode:** standard
**Success Criteria:**
1. All images lazy-loaded with no layout shifts
2. Will-change hints on animated elements
3. SEO meta tags on all pages
4. JSON-LD structured data for products
5. Build passes with zero errors

**Requirements:** PERF-01 through PERF-04
**Status:** ○ Pending

---

## Phase Dependencies

```
Phase 1 (Cart) ──→ Phase 2 (Catalog) ──→ Phase 3 (UI/UX) ──→ Phase 4 (Performance)
```

## Success Criteria Summary

| Phase | Requirements | Criteria | Status |
|-------|-------------|----------|--------|
| 1 | 12 | 5 | ✓ Complete |
| 2 | 6 | 5 | ○ Pending |
| 3 | 8 | 5 | ○ Pending |
| 4 | 4 | 5 | ○ Pending |
| **Total** | **25** | **20** | |
