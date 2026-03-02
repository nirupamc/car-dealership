# LUXE VELOCE (Apex Velocity) - DESIGN.md

## 1. Project Overview
**Stitch Project ID:** `12009620010010985542`
**Project Name:** LUXE VELOCE - Home
**Project Type:** TEXT_TO_UI_PRO  

This document serves as the main design specification for the "LUXE VELOCE (Apex Velocity)" project. It acts as the source of truth for frontend implementation ensuring a pixel-perfect, premium, and fully responsive multi-page web application.

---

## 2. Global Design Theme

The website embodies an ultra-premium, modern, and sleek aesthetic appropriate for high-end pre-owned vehicles and velocity-focused branding.

- **Color Mode:** `DARK` (Primary UI) 
  - *Background:* `#0f0f11` (Deep black/grey)
  - *Surfaces:* `#1a1a1d` (Elevated dark surfaces)
  - *Custom/Brand Accent Color:* `#d4af77` (Muted luxury gold/champagne)
  - *Saturation Level:* 2 (Subtle, desaturated base tones to let the accent color and high-quality photography pop)
- **Typography:** `Inter` (Google Fonts)
  - Clean, highly legible sans-serif. Use varying font weights (300 for body, 500/600 for buttons, 700/800 for headers).
- **Border Radius Setup:** `ROUND_EIGHT` 
  - All cards, inputs, buttons, and elevated containers must utilize closely bounded `8px` (`0.5rem` / `rounded-lg` in Tailwind) border radii for a sharp yet polished structural feel.

---

## 3. Responsive Web Design System (Crucial)

To ensure the **entire website is fully responsive** across all devices, the following layout breakpoint strategies strictly apply. The desktop-first generated screens (ranging from 1280px to 2560px) must be fluidly mapped to smaller viewports.

### Breakpoints (Tailwind-like approach)
- **Mobile (Base - 0px):** 100% width, single column, larger touch targets.
- **Tablet (`md` - 768px):** 2-column grids for cards, adjusted padding.
- **Desktop (`lg` - 1024px+):** 3-4 column grids, dynamic sidebars, hover animations.
- **Ultrawide (`2xl` - 1536px+):** Max-width constraints (`max-w-screen-2xl`) centrally aligned to maintain readability.

### Responsive Directives per Element:
1. **Navigation Bar:** 
   - *Desktop:* Standard horizontal layout with links (Inventory, Finance, Sourcing, About).
   - *Mobile:* Hamburger menu collapsing into a smooth slide-out sidebar or full-screen overlay.
2. **Hero Sections (Home & Showroom):**
   - *Desktop:* Large, immersive background imagery with left-aligned typography and CTA buttons.
   - *Mobile:* Stack text vertically below or center-over the image using darker gradients (`bg-gradient-to-t`) to preserve contrast.
3. **Vehicle Grids (Featured Arrivals / Showroom):**
   - *Desktop:* 3 or 4-column structured grid (`grid-cols-3` or `grid-cols-4`).
   - *Tablet:* 2-column grid (`grid-cols-2`).
   - *Mobile:* 1-column stack (`grid-cols-1`) with horizontal swipe carousels (optional) to save vertical space.
4. **Typography Scaling (Fluid):**
   - `H1`: `text-4xl` (Mobile) → `text-6xl` (Desktop)
   - `H2`: `text-3xl` (Mobile) → `text-5xl` (Desktop)
   - Utilize `clamp()` for fluid font sizing where appropriate to prevent abrupt jumps.

---

## 4. Screen-by-Screen Breakdown

### A. Home (Updated) - Screen ID: `7006828d25944e75837ab82f8fb0badc`
- **Purpose:** Primary landing page showcasing "The Art of Pre-Owned Excellence."
- **Layout:** Long-scrolling page (9096px height on desktop).
- **Responsive Needs:** Collapse heavy feature rows (e.g. Certified 151-Point Check, Global Sourcing) into a vertical accordion or swipeable list on mobile.

### B. Showroom - Screen ID: `99bdf569f1524fb29bb4aedd4b2516b0`
- **Purpose:** Browsing inventory gallery.
- **Layout:** Grid-based filtering interface. 
- **Responsive Needs:** Sidebar filters must move to a "Filter Options" toggle modal or off-canvas drawer on mobile to save screen real estate.

### C. Sell Your Car - Screen ID: `5bdb5c1f37304842ac6ec3d8dfd2137e`
- **Purpose:** Data ingestion funnel for user vehicle sales.
- **Layout:** Multi-step form or long-form layout.
- **Responsive Needs:** Inputs must be full width (`w-full`). Text sizes optimized to 16px to prevent iOS auto-zoom issues on form focusing. Buttons must span the full bottom width for easy thumb reach.

### D. Vehicle Detail - Screen ID: `822f2965793c4bf4a7452db8a8c55671`
- **Purpose:** Deep dive into individual car specifications and imagery.
- **Layout:** Split layout (Gallery left, Spec/Price right).
- **Responsive Needs:** Stack vertically on mobile: Image Gallery top, Price/Specs directly beneath it.

### E. Admin Dashboard - Screen ID: `dd23a0b42b744e188c17b7ab2ff54a3a`
- **Purpose:** KPI metrics, inventory management.
- **Layout:** Sidebar navigation + Data tables.
- **Responsive Needs:** Tables must use `overflow-x-auto` to allow horizontal scrolling on mobile without breaking the overall page layout. Sidemenu collapses into a top-bar burger menu.

---

## 5. Interaction & Micro-animations
- **Aesthetic standard:** The user should be "wowed".
- **Hover effects:** Cards should elevate subtly (e.g. `hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`).
- **Accent Glow:** Utilize the luxury gold (`#d4af77`) for subtle box-shadow glows on primary CTA buttons.
- **Page Transitions:** Implement smooth fade-ins and scale-ups on scroll (using Framer Motion or Intersection Observer) for all image assets to increase the premium feel.
