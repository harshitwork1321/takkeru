# Phase 2: Product Catalog & Menu Expansion — PLAN

> Execution plan for expanding the TAKKERU product catalog with rich boba tea, mandu, and ramen data.

---

## Goal

Expand the 18-product catalog with complete, rich product data including descriptions, images, categories, and customization options. Ensure all products are properly categorized and have consistent data structures.

---

## Success Criteria

1. All 18+ products have complete data (name, Japanese name, description, long description, price, category, image, rating, review count)
2. Boba tea products include flavor profiles and customization options
3. Mandu products include filling descriptions and cooking methods
4. Ramen products include broth type and topping lists
5. Combo meals bundle items with discounted pricing

---

## Design Contract

**UI-SPEC:** `.planning/phases/02-UI-SPEC.md` (approved)
**Key tokens:**
- Background: #0B0B0B
- Surface: #111111
- Accent: #FFD84D
- Font: Bebas Neue (headings), Inter (body)
- Spacing: 8px grid (4, 8, 12, 16, 24, 32, 48, 64)
- Border radius: 24px (cards), 999px (buttons)

---

## Tasks

### Task 1: Expand Product Data Structure
**Files:** `src/data/products.js`

Add new fields to all 18 products:
- `longDescription` — 2-3 sentence rich description
- `ingredients` — array of ingredient strings
- `allergens` — array of allergen strings
- `spiceLevel` — 0-5 scale (for ramen)
- `prepTime` — estimated prep time string
- `isVegetarian` — boolean
- `sizes` — array of size options with price modifiers (for boba)
- `customizations` — sugar level, ice level options (for boba)
- `brothType` — for ramen products
- `noodleFirmness` — for ramen products
- `toppings` — array of toppings (for ramen)
- `fillingDescription` — for mandu products
- `cookingMethod` — for mandu products
- `comboItems` — array of product IDs (for combos)
- `originalPrice` — before discount (for combos)

**Acceptance:**
- [ ] All 18 products have longDescription (2+ sentences)
- [ ] All food products have ingredients array
- [ ] Boba products have sizes and customizations
- [ ] Ramen products have brothType, noodleFirmness, toppings
- [ ] Mandu products have fillingDescription, cookingMethod
- [ ] Combo products have comboItems and originalPrice

---

### Task 2: Add Boba Tea Product Images
**Files:** `src/data/products.js`, `public/images/`

For boba tea products without real images:
- Create placeholder images or use `/images/soon.jpg` consistently
- Ensure all boba products have `image` field pointing to valid path
- Add `gallery` array for products with multiple angles

**Acceptance:**
- [ ] All boba tea products have valid image paths
- [ ] Image aspect ratios are consistent (4:5 or 1:1)
- [ ] No broken image references

---

### Task 3: Add Mandu & Ramen Product Images
**Files:** `src/data/products.js`, `public/images/`

Same as Task 2 but for mandu and ramen products:
- Consistent placeholder approach
- Gallery arrays where applicable

**Acceptance:**
- [ ] All mandu products have valid image paths
- [ ] All ramen products have valid image paths
- [ ] No broken image references

---

### Task 4: Combo Meal Configuration
**Files:** `src/data/products.js`

Define combo meals with:
- Bundled product IDs
- Original price (sum of individual items)
- Combo discount price
- Description of what's included
- Size options for drinks in combo

**Acceptance:**
- [ ] At least 2 combo meals defined
- [ ] comboItems array references valid product IDs
- [ ] Original price > combo price (discount visible)
- [ ] Combo description explains what's included

---

### Task 5: Product Category Filtering
**Files:** `src/components/Menu.jsx`, `src/components/FoodSection.jsx`

Add category filtering to existing components:
- Menu carousel: filter by category (All, Boba, Mandu, Ramen, Combos, Merch)
- FoodSection: show category labels on cards
- ProductShowcase: filter merch vs food

**Acceptance:**
- [ ] Category filter buttons work in Menu
- [ ] Active category highlighted with accent color
- [ ] Filter transitions are smooth (framer-motion)
- [ ] All products accessible via filtering

---

### Task 6: Product Detail Page Enhancements
**Files:** `src/pages/ProductDetailPage.jsx`

Enhance existing product detail pages with new data:
- Display longDescription instead of short description
- Show ingredients list with bullet points
- Show allergens with warning styling
- Display spice level indicator (for ramen)
- Show prep time
- Show vegetarian badge
- Display size options with price modifiers
- Show customization options (sugar/ice for boba)
- Show ramen-specific info (broth, noodles, toppings)
- Show mandu-specific info (filling, cooking method)

**Acceptance:**
- [ ] Long description displays properly
- [ ] Ingredients list renders with bullet points
- [ ] Allergens shown with warning styling
- [ ] Spice level shown as visual indicator
- [ ] Prep time displayed
- [ ] Vegetarian badge shows when applicable
- [ ] Size options selectable with price update
- [ ] Customization options work
- [ ] Ramen/mandu specific info displays

---

### Task 7: Add to Cart from Detail Page
**Files:** `src/pages/ProductDetailPage.jsx`

Ensure add-to-cart works from detail page:
- Quantity selector
- Size selection (if applicable)
- Customization selection (if applicable)
- Price updates based on selections
- Toast notification on add

**Acceptance:**
- [ ] Quantity selector works
- [ ] Size selection updates price
- [ ] Customization selection works
- [ ] Add to cart button triggers toast
- [ ] Cart badge updates

---

### Task 8: SEO & Meta Tags
**Files:** `src/pages/ProductDetailPage.jsx`, `index.html`

Add SEO improvements:
- Dynamic title per product page
- Meta description from longDescription
- Open Graph tags for social sharing
- JSON-LD structured data for products
- Canonical URLs

**Acceptance:**
- [ ] Page title includes product name
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] JSON-LD valid and complete
- [ ] No SEO errors in Lighthouse

---

### Task 9: Responsive Product Grid
**Files:** `src/components/ProductShowcase.jsx`, `src/components/FoodSection.jsx`

Ensure product grids are responsive:
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Consistent card sizing
- Proper spacing between cards

**Acceptance:**
- [ ] Grid layout works at all breakpoints
- [ ] Cards maintain aspect ratio
- [ ] Spacing follows UI-SPEC (24px gaps)
- [ ] No horizontal overflow on mobile

---

### Task 10: Build Verification
**Files:** N/A

Final verification:
- `npm run build` passes with zero errors
- `npm run lint` passes with zero errors
- All products render correctly
- No console errors
- Responsive design works

**Acceptance:**
- [ ] Build passes
- [ ] Lint passes
- [ ] No console errors
- [ ] All routes work
- [ ] Responsive design verified

---

## Verification

After execution, run:
```bash
npm run build
npm run lint
```

Manual verification:
- [ ] All 18 products display with complete data
- [ ] Category filtering works
- [ ] Product detail pages show rich content
- [ ] Add to cart works from all entry points
- [ ] Responsive design at all breakpoints
- [ ] No visual regressions
