# TAKKERU Cart — Boba Tea & Japanese-Inspired Street Food

Marketing and ordering site for **TAKKERU Cart** (タッケル カート), a Japanese-inspired
food cart business built around **Boba Tea**. Live at [https://www.takkeru.com/](https://www.takkeru.com/).

## The Menu

| # | Item | Price |
|---|------|-------|
| 01 | **Boba Tea** — brown sugar, chewy tapioca pearls, milk tea over ice | ₹99 |
| 02 | Matcha Boba — matcha, cold milk, tapioca pearls over ice | — |
| 03 | Soda Bubble Drink — ice-cold carbonated soda with popping bubbles | — |
| 04 | Mandu | ₹99 |
| 05 | Signature Ramen | ₹199 |
| 06 | Tteokbokki Bowl | ₹249 |

Boba Tea leads the cart; Matcha Boba and Soda Bubble Drink are showcase drinks
(featured in their own sections and the drinks reel) and are not sold through the cart yet.

## Site Sections

- **Hero** — Boba Tea headline over the cart commercial
- **Boba Tea (01)** — the flagship drink section
- **Matcha Boba (02)** — the green pour, matcha video section
- **Soda Bubble Drink (03)** — the fizzy pour, carbonated soda video section
- **Drinks showcase** (`#drinks`) — three drinks, one cart: boba, matcha and soda pours
- **Food menu** — six numbered cards, four exact prices, add-to-cart
- **Cart business** — investment packages and the franchise pitch
- **FAQ, checkout, order confirmation**

## Tech

- React 19 + Vite 6, Tailwind CSS 4
- framer-motion, GSAP, Lenis smooth scroll, react-intersection-observer
- react-router-dom for `/form`, `/checkout`, `/order-confirmation`, `/product/*`
- Videos and posters in `public/media/` (posters in `public/media/posters/`)

## Commands

```bash
npm install
npm run dev      # local dev server
npm run lint     # eslint
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## SEO

`index.html` carries the title *TAKKERU Cart | Start Your Food Cart Business*, the canonical
`https://www.takkeru.com/`, and JSON-LD `Menu` / `MenuSection` / `FAQPage` structured data
mirroring the six items above.
