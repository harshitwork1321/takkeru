# TAKKERU CART — Project Overview

## 1. Project Identity

**Project Name:** TAKKERU CART
**Brand:** TAKKERU
**Category:** Food Cart / Boba Tea Business Opportunity
**Primary Market:** India
**Primary Audience:** Gen-Z, students, young entrepreneurs, boba lovers, event customers, mobile food-business operators

**Core Message:**
> BOBA DOESN'T HAVE TO STAY IN ONE PLACE. TAKE THE BUSINESS WITH YOU.

**Brand Tagline:** SMASH • SLURP • SIP

**Positioning:**
> Bold boba experiences for a modern, mobile-first generation.

---

## 2. What This Is

TAKKERU CART is a premium digital experience for the TAKKERU Boba Cart business opportunity. The website introduces a mobile boba tea, mandu, and ramen cart concept — showing visitors how to start their own mobile boba business.

**Primary Goal:** Convert visitors into TAKKERU CART leads.

**CTAs:**
- Primary: `START YOUR CART`
- Secondary: `SEE HOW IT WORKS`
- Contact: `TALK TO US`

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (JSX, not TypeScript) |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12, GSAP 3.15 + ScrollTrigger |
| Smooth Scroll | Lenis 1.3 |
| Routing | React Router DOM v7 |
| Icons | lucide-react |
| Utilities | clsx + tailwind-merge, react-intersection-observer |

---

## 4. Design Direction

- **Primary Mode:** Dark (#0B0B0B / #111111)
- **Accent:** #FFD84D (warm yellow)
- **Cream:** #FFF4D6
- **Typography:** Bebas Neue (headings), Inter (body), Noto Sans JP (Japanese text)
- **Vibe:** Bold • Street • Modern • Playful • Premium • Mobile-first
- **Inspiration:** Boba culture + Korean/Japanese street culture + Indian urban energy + Gen-Z aesthetic

---

## 5. Website Message Hierarchy

```
WHAT IS IT? → YOUR BOBA BUSINESS. ON WHEELS.
WHY DOES IT MATTER? → DON'T WAIT FOR CUSTOMERS. GO WHERE THEY ARE.
HOW DOES IT WORK? → CART → LOCATION → CUSTOMERS → SERVE
WHAT CAN I SELL? → BOBA TEA • MANDU • RAMEN
WHERE CAN I OPERATE? → COLLEGES • EVENTS • MARKETS • POP-UPS
WHAT DOES TAKKERU PROVIDE? → CART • MENU • BRAND • GUIDANCE
WHY TAKKERU? → MOBILE • FLEXIBLE • GEN-Z BRAND
HOW DO I START? → START YOUR CART
```

---

## 6. Website Sections

1. Navigation
2. Hero
3. Trust/benefit strip
4. Business problem
5. Mobile-business transition
6. TAKKERU CART introduction
7. How It Works
8. Location strategy
9. Boba menu
10. Product showcase
11. Business model
12. What You Get
13. Why TAKKERU
14. Gallery / Street experience
15. FAQ
16. Final CTA
17. Footer

---

## 7. What Exists (Validated)

### Homepage Sections
- ✓ Hero with parallax video and GSAP text entrance
- ✓ Story section with reveal animations
- ✓ FoodSection with 3D TiltCards (boba, mandu, ramen)
- ✓ FoodExperience editorial section
- ✓ WinnerAnnouncement with reveal animation
- ✓ ProductShowcase merch grid
- ✓ Menu carousel with steam animation
- ✓ Campaigns section
- ✓ FanClub membership section
- ✓ InfoSection with marquee text
- ✓ Gallery with GSAP ScrollTrigger pinning
- ✓ CustomerReviews marquee
- ✓ ContactSection
- ✓ Footer

### Cart System (Phase 1 — Complete)
- ✓ Centralized product catalog (18 products)
- ✓ CartContext with localStorage persistence
- ✓ CartDrawer (slide-in, responsive)
- ✓ QuantityControl, CartItem, CartEmpty, CartSummary
- ✓ Toast notifications
- ✓ CheckoutPage with form validation
- ✓ OrderConfirmation with TKR-XXXXXX order IDs
- ✓ ProductDetailPage with SEO, ingredients, related items
- ✓ Add to Cart buttons on Menu, FoodSection, ProductShowcase

### Components
- ✓ Navbar with scroll detection, mobile menu, cart button
- ✓ LoadingScreen with GSAP timeline
- ✓ Grain overlay effect (opacity: 0.03, pointer-events: none)
- ✓ Lenis smooth scroll integration

---

## 8. Animation System

### Key Principles
- Motion adds energy, not distraction
- Use GSAP + ScrollTrigger for orchestrated sequences
- Use CSS for simple hovers and transitions
- Respect `prefers-reduced-motion`
- Mobile animations must be lighter

### Animation Tokens
```js
duration: { fast: 0.18, normal: 0.3, reveal: 0.7, slow: 1 }
ease: { standard: "power2.out", smooth: "power3.out", premium: "power4.out" }
distance: { small: 8, medium: 24, large: 40 }
stagger: { small: 0.05, medium: 0.1 }
```

### Priority Hierarchy
1. Navigation
2. CTA feedback
3. Hero
4. Cart visual
5. Product interaction
6. Scroll reveals
7. Supporting decoration

---

## 9. Brand Personality

**TAKKERU CART should feel:**
Bold, Young, Energetic, Playful, Modern, Street-inspired, Premium, Confident, Social, Approachable

**Should NOT feel:**
Corporate, Boring, Overly formal, Generic, Cheap, Like a franchise brochure

---

## 10. Content Principles

- Short, direct, confident, conversational, modern
- Indian-market relevant
- Never invent information — use placeholders or "Contact TAKKERU"
- Never claim guaranteed income, customers, ROI, or franchise success
- All photography should look realistic (Delhi streets, college areas, urban markets)

---

## 11. Requirements

### Validated
- ✓ React 19 + Vite 6 + Tailwind CSS 4 setup
- ✓ Dark theme with brand colors
- ✓ Responsive design (mobile-first)
- ✓ Smooth scroll with Lenis
- ✓ GSAP ScrollTrigger for Gallery
- ✓ Framer Motion for scroll reveals
- ✓ Cart system with localStorage
- ✓ Checkout flow
- ✓ Product detail pages
- ✓ 18-product catalog

### Active
- [ ] Rich product data for all 18+ items
- [ ] Boba tea with flavor profiles and customization
- [ ] Mandu with filling descriptions and cooking methods
- [ ] Ramen with broth type and topping lists
- [ ] Combo meal configurations
- [ ] Category filtering across components
- [ ] Product detail page enhancements
- [ ] SEO & meta tags optimization
- [ ] Responsive product grid
- [ ] Animation tokens and reduced-motion support

### Out of Scope
- Backend/API integration — static frontend only
- Payment processing — order confirmation only
- User authentication — no accounts
- Real-time inventory — mock data
- Native mobile app — web only

---

## 12. Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| JSX over TypeScript | Speed of iteration, existing codebase | ✓ Locked |
| Framer Motion + GSAP | FM for React integration, GSAP for complex timelines | ✓ Locked |
| localStorage cart | No backend, simple persistence | ✓ Locked |
| Dark theme default | Brand identity, Gen-Z aesthetic | ✓ Locked |
| Placeholder images for new products | Real images not yet available | ✓ Temporary |
| Flat ₹40 delivery fee | Simple pricing model | ✓ Locked |
| Free delivery above ₹500 | Incentivize larger orders | ✓ Locked |
| START YOUR CART as primary CTA | Lead generation focus | ✓ Locked |
| SMASH • SLURP • SIP tagline | Brand identity | ✓ Locked |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-09-06 with full project overview*
