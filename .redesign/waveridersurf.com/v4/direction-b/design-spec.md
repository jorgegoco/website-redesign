# Design Spec: SURFIT.IA Redesign — Direction B

**Direction:** Clean Minimal Tech — Structured, trustworthy, modern. The AI coaching platform is the product; the ocean is the backdrop, not the hero. Think Stripe meets Linear with a surf data layer.

---

## Color Palette

| Role | Color | Hex / Value | Tailwind | Usage |
|------|-------|-------------|----------|-------|
| Background | Near Black | `#09090B` | `zinc-950` | Page background, all sections |
| Surface | Dark Zinc | `#18181B` | `zinc-900` | Cards, panels, elevated surfaces |
| Surface Hover | Lighter Zinc | `#27272A` | `zinc-800` | Card hover states, active items |
| Border | Zinc Edge | `#27272A` | `zinc-800` | Card borders, dividers, table lines |
| Border Hover | Light Edge | `#3F3F46` | `zinc-700` | Hover border state |
| Primary | Blue-Violet | `#6366F1` | `indigo-500` | Primary CTAs, active nav, focus rings |
| Primary Hover | Bright Violet | `#818CF8` | `indigo-400` | Button hover, link hover |
| Primary Muted | Faded Violet | `rgba(99,102,241,0.15)` | `indigo-500/15` | Subtle backgrounds, badge fills |
| Text Primary | Off-White | `#F8FAFC` | `slate-50` | Headings, primary body text |
| Text Secondary | Slate | `#94A3B8` | `slate-400` | Descriptions, metadata, labels |
| Text Muted | Dark Slate | `#64748B` | `slate-500` | Captions, disabled text, timestamps |
| Success | Emerald | `#10B981` | `emerald-500` | Positive indicators, ratings, online states |
| Success Muted | Faded Emerald | `rgba(16,185,129,0.15)` | `emerald-500/15` | Success badge backgrounds |
| Warning | Amber | `#F59E0B` | `amber-500` | Rating stars, caution indicators |
| Danger | Red | `#EF4444` | `red-500` | Hazard badges, error states |
| Danger Muted | Faded Red | `rgba(239,68,68,0.15)` | `red-500/15` | Hazard badge backgrounds |

### Gradient Definitions
- **CTA Gradient:** `bg-gradient-to-r from-indigo-500 to-indigo-400` — subtle, not dramatic
- **Glow Effect:** `shadow-[0_0_30px_rgba(99,102,241,0.25)]` on hover for primary buttons
- **Card Border Glow:** `hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]` — barely visible, just enough depth
- **Hero Overlay:** `bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950` — heavier overlay than previous versions (ocean is secondary)
- **Section Fade:** `bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950` — subtle depth between sections
- **Spot Rank Gradient (Top 3):** `bg-gradient-to-br from-indigo-500 to-emerald-500`
- **Spot Rank Gradient (4-10):** `bg-zinc-800 border border-zinc-700`

---

## Typography

### Fonts (Google Fonts)
- **Display/Headings:** Space Grotesk — geometric, precise, modern tech feel. Loaded weights: 500, 600, 700
- **Body/UI:** Inter — clean readability, established baseline. Loaded weights: 400, 500, 600

### Scale (Tailwind)
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Brand "SURFIT.IA" | `text-5xl md:text-7xl lg:text-8xl` | 700 (Bold) | Space Grotesk, uppercase, `tracking-[-0.02em]` |
| Hero Tagline | `text-lg md:text-xl lg:text-2xl` | 400 | Inter, normal case, `text-slate-400`, `max-w-xl` |
| Section Heading (H2) | `text-2xl md:text-3xl lg:text-4xl` | 700 | Space Grotesk, `tracking-[-0.02em]` |
| Section Subtitle | `text-base md:text-lg` | 400 | Inter, `text-slate-400` |
| Card Title (H3) | `text-lg md:text-xl` | 600 | Space Grotesk |
| Body | `text-base` (16px) | 400 | Inter, `text-slate-300`, `leading-relaxed` |
| Label/Overline | `text-xs` | 600 | Inter, uppercase, `tracking-[0.1em]`, `text-indigo-400` |
| Data Label | `text-xs` | 500 | Inter, `text-slate-500` |
| Data Value | `text-sm` | 600 | Inter, `text-slate-200` |
| Small/Caption | `text-xs` | 400 | Inter, `text-slate-500` |
| Nav Link | `text-sm` | 500 | Inter, `text-slate-400`, `hover:text-slate-50` |
| Button Text | `text-sm` | 600 | Inter |

### Key Typography Rules
- Minimum body text: 16px (fixes the 9-10px mobile issue from current site)
- Single H1 per page: the brand name "SURFIT.IA" in the hero
- All headings use Space Grotesk; all body/UI text uses Inter
- No uppercase except: brand name, overline labels, nav section indicators
- Letter spacing: tight (`-0.02em`) on headings, slightly loose (`0.1em`) on overlines only

---

## Layout & Sections

### Global Layout
- **Max width:** `max-w-6xl` (1152px) centered with `mx-auto px-6`
- **Section spacing:** `py-24 md:py-32` between sections
- **Background:** Solid `#09090B` — no background images on section containers (ocean imagery confined to hero only)

### 1. Header / Navigation (Sticky Text Nav)
- **Style:** Fixed top, `h-16`, transparent on hero, gains `bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50` after scrolling past hero
- **Left:** "SURFIT.IA" wordmark — Space Grotesk 700, `text-lg`, `text-slate-50`
- **Center:** Section labels as text links — "AI Coach", "Features", "Spots", "Adventures". Active section gets `text-slate-50` + `border-b-2 border-indigo-500`; inactive gets `text-slate-500 hover:text-slate-300`. Hidden on mobile.
- **Right:** Language toggle (ghost button, `text-sm`) + "Forecast" external link (ghost button with external-link icon)
- **Mobile:** Hamburger icon (right) opens `Sheet` drawer with all section links + language toggle + forecast link
- **Active section tracking:** `IntersectionObserver` on each section, threshold 0.3. Updates active nav label on scroll.
- **Scroll behavior:** Always visible (no hide-on-scroll — the nav is a wayfinding tool, always accessible)

### 2. Hero
- **Style:** Full viewport height (`min-h-screen`), ocean background image with heavy dark overlay
- **Background:** Unsplash ocean photo (existing), `object-cover`, `object-center`. Overlay: `bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950`. No parallax (clean, static — the tech aesthetic doesn't need movement tricks here).
- **Content:** Centered vertically and horizontally, stacked
  - Overline: "AI-POWERED SURF COACHING" — `text-xs`, Inter 600, uppercase, `tracking-[0.15em]`, `text-indigo-400`, `mb-6`
  - Brand: "SURFIT.IA" — H1, Space Grotesk 700, `text-5xl md:text-7xl lg:text-8xl`, `text-slate-50`, `tracking-[-0.02em]`, `mb-4`
  - Tagline: "Master the science of surfing with artificial intelligence" — `text-lg md:text-xl`, Inter 400, `text-slate-400`, `max-w-xl mx-auto`, `mb-8`
  - CTA: "Entrar al Dashboard" — `Button` default variant, `bg-indigo-500 hover:bg-indigo-400`, `text-white`, `px-8 py-3`, `rounded-lg` (not pill — squared-off is more SaaS), `text-sm font-semibold`
  - Secondary link: "Explore Top 10 Spots" — ghost text link below CTA, `text-sm text-slate-500 hover:text-slate-300`, with down-arrow icon
- **Scroll indicator:** None (the secondary link serves this purpose)

### 3. AI Coach / Biomechanical Analysis (Primary Feature)
- **Style:** Dedicated section before the bento grid. Full-width card within `max-w-6xl` container.
- **Layout:** Two-column split on desktop (`grid grid-cols-1 lg:grid-cols-2 gap-0`), stacked on mobile
  - **Left column:** `p-8 md:p-12`, vertically centered content
    - Overline: "CORE FEATURE" — label style, `text-indigo-400`
    - H2: "AI Surf Coach" — Space Grotesk 700, `text-2xl md:text-3xl`
    - Description: "Upload a photo of your surf session. Our AI analyzes your stance, rail work, and gaze — delivering instant biomechanical feedback to improve your technique." — `text-base text-slate-400 leading-relaxed`
    - CTA: "Upload Surf Photo" — primary button, `bg-indigo-500 hover:bg-indigo-400`
    - Below CTA: "Supports JPG, PNG up to 10MB" — `text-xs text-slate-600`
  - **Right column:** Dark surface (`bg-zinc-900`) with a placeholder/mockup illustration of the analysis interface — grid lines, body keypoints overlay, metric readouts. This should feel like a product screenshot, not a lifestyle image.
- **Card style:** `bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden` — no glass effect, solid surface. On hover: `border-zinc-700` transition.

### 4. Features Bento Grid
- **Style:** Asymmetric bento grid within `max-w-6xl` container
- **Layout (desktop):** CSS Grid, `grid-cols-3 gap-4`
  ```
  ┌──────────────┬───────────┐
  │  Media (2x1) │   Shop    │
  ├───────┬──────┴───────────┤
  │Travel │   Spot Gallery   │
  │       │      (2x1)       │
  └───────┴──────────────────┘
  ```
  - Media card: `col-span-2 row-span-1` — tabs for Images/Videos
  - Shop card: `col-span-1 row-span-1`
  - Travel card: `col-span-1 row-span-1`
  - Spot Gallery card: `col-span-2 row-span-1`
- **Layout (tablet):** `grid-cols-2`, all cards `col-span-1` except Media stays `col-span-2`
- **Layout (mobile):** `grid-cols-1`, all cards full-width
- **Card anatomy:** `bg-zinc-900 border border-zinc-800 rounded-xl p-6`
  - Top: Icon (Lucide, `w-10 h-10`, `text-indigo-400`, inside `bg-indigo-500/10 rounded-lg p-2`)
  - H3: Card title — Space Grotesk 600, `text-lg`, `mt-4`
  - Description: Inter 400, `text-sm text-slate-400`, `mt-2`
  - CTA: Bottom of card, `mt-auto` — text link style, `text-sm font-medium text-indigo-400 hover:text-indigo-300` with right-arrow icon
- **Card hover:** `hover:border-zinc-700 transition-colors duration-200`
- **Feature card content:**
  - **Media:** Icon: `Play` + `Image`. Tabs inside card (shadcn `Tabs`): "Surf Images" / "Videos". Each tab shows a brief label + action link ("View Gallery" / "Watch Highlights").
  - **Surf Shop:** Icon: `ShoppingBag`. "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World." CTA: "Open Store List"
  - **Google Travel Surf:** Icon: `Plane`. "Explore the best surf trips and prices to blue destinations worldwide via Google Travel." CTA: "Book Trip"
  - **World Spot Gallery:** Icon: `MapPin`. "Explore panoramic photos and the best locations where surfing happens globally." CTA: "View Spots"

### 5. Top 10 World Surf Spots (Data Dashboard)
- **Section intro:** Overline "CURATED DATA" + H2 "Top 10 World Surf Spots" + Subtitle "Ranked by elite wave hunters. Real conditions, real data." — all left-aligned
- **Style:** This section should feel like a data dashboard, not a travel guide. Clean rows, structured data, monospace-like precision.
- **Layout (desktop):** Single-column list of 10 spot rows, full width within `max-w-6xl`. NOT a 2-column grid — a vertical data table/list for scannability.
- **Spot row anatomy:** Each spot is a horizontal card/row (`bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-6`), structured as:
  ```
  ┌─────────────────────────────────────────────────────────────┐
  │ [#1]  Pipeline                    ★ 5.0    [Ask Coach] [v] │
  │       Oahu, Hawaii                                         │
  │       Hollow Reef Break · Nov-Feb · 🟢 Expert              │
  └─────────────────────────────────────────────────────────────┘
  ```
  - **Left:** Rank badge — `w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold`. Top 3: `bg-gradient-to-br from-indigo-500 to-emerald-500 text-white`. 4-10: `bg-zinc-800 text-slate-400 border border-zinc-700`.
  - **Center block:**
    - Row 1: Spot name (H3, Space Grotesk 600, `text-lg text-slate-50`) + Location (`text-sm text-slate-500 ml-3`)
    - Row 2: Wave type badge (`text-xs bg-zinc-800 text-slate-300 px-2 py-0.5 rounded-md`) + Season badge (same style) + difficulty indicator (if applicable)
  - **Right block:** Rating (`text-amber-500 font-semibold text-sm` + star icon) + "Ask Coach" button (`Button` outline variant, `text-xs`) + expand/collapse chevron
  - **Spacing between rows:** `space-y-3`
- **Expanded state:** Clicking the row or chevron expands to reveal a detail panel below the summary row. Panel has `border-t border-zinc-800 pt-4 mt-4` inside the same card.
  - **Detail grid:** `grid grid-cols-2 md:grid-cols-4 gap-4`
    - Cell 1 — "Local Food": data label + food recommendation text
    - Cell 2 — "Travel Tip": data label + travel tip text
    - Cell 3 — "Hazards": data label + hazard text with `text-red-400` color
    - Cell 4 — "Links": Maps button + Forecast button (small outline buttons with external-link icon)
  - Data labels: `text-xs font-medium text-slate-500 uppercase tracking-wide mb-1`
  - Data values: `text-sm text-slate-300`
- **Layout (mobile):** Same vertical list, but spot row stacks into:
  - Row 1: Rank badge + name + rating
  - Row 2: Location
  - Row 3: Wave type + season badges
  - Actions row: "Ask Coach" + chevron
  - Expanded detail: `grid-cols-1` stacked cells

### 6. Adventure & Advice
- **Style:** Clean section, no background image (unlike previous versions). Content-forward.
- **Section intro:** Overline "BEST TRIPS & VIDEOS" + H2 "Adventure & Advice"
- **Layout:** Horizontal scroll row of video cards (`ScrollArea` horizontal), `gap-4`
- **Video card:** `w-72 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden`
  - Top: Thumbnail placeholder (16:9, `bg-zinc-800`) with centered `Play` circle icon overlay (`w-12 h-12 bg-zinc-950/80 rounded-full border border-zinc-700`)
  - Bottom: `p-4` — video title (`text-sm font-medium text-slate-200`) + "YouTube" label (`text-xs text-slate-500`)
- **CTA below scroll area:** "Watch Best Trips" — text link with right-arrow, `text-sm text-indigo-400 hover:text-indigo-300`
- **Mobile:** Same horizontal scroll, cards `w-64`

### 7. Footer
- **Style:** `bg-zinc-900/50 border-t border-zinc-800`, `py-12 md:py-16`
- **Layout:** `grid grid-cols-1 md:grid-cols-4 gap-8` within `max-w-6xl`
  - **Col 1 (Brand):** "SURFIT.IA" wordmark (Space Grotesk 700, `text-lg`) + "AI-powered surf coaching and wave intelligence." (`text-sm text-slate-500 mt-2`)
  - **Col 2 (Product):** Label "Product" (`text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3`). Links: AI Coach, Surf Shop, Travel, Spot Gallery — `text-sm text-slate-500 hover:text-slate-300`
  - **Col 3 (Explore):** Label "Explore". Links: Top 10 Spots, Adventures, Surf Forecast (external), YouTube (external)
  - **Col 4 (Legal):** Label "Legal". Links: Privacy Policy, Terms of Service
- **Bottom bar:** `border-t border-zinc-800 mt-8 pt-8`, flex between copyright (`text-xs text-slate-600`) and small text "Built with AI" (`text-xs text-slate-600`)
- **Mobile:** Single column, each footer group stacked with `mb-8`

---

## shadcn/ui Components

| Component | Usage | Customization |
|-----------|-------|---------------|
| `Button` | All CTAs | Variants: `default` (indigo-500 fill), `outline` (zinc-800 border, slate-300 text), `ghost` (no border, slate-400 text). All use `rounded-lg` not `rounded-full`. |
| `Card` | Feature cards, spot rows, video cards, AI coach panel | `bg-zinc-900 border-zinc-800 rounded-xl`. No glass/blur effects. |
| `Badge` | Rank badges, wave type, season, difficulty | `bg-zinc-800 text-slate-300 rounded-md` for data. `bg-indigo-500/15 text-indigo-400` for feature labels. `bg-red-500/15 text-red-400` for hazards. |
| `Sheet` | Mobile nav drawer | Opens from right, `bg-zinc-950 border-l border-zinc-800` |
| `Tabs` | Media card (Images/Videos) | `bg-zinc-800` tab list, `text-indigo-400` active, `text-slate-500` inactive |
| `Collapsible` | Spot row expandable details | Smooth height animation, no border change on open |
| `Tooltip` | Maps/Forecast link labels, icon hints | `bg-zinc-800 text-slate-200 text-xs` |
| `Separator` | Footer dividers, section breaks inside cards | `bg-zinc-800` |
| `ScrollArea` | Adventure video horizontal scroll | Horizontal orientation, subtle scrollbar (`bg-zinc-800` thumb) |
| `NavigationMenu` | Sticky header section links | Minimal style, no dropdowns — just flat text links with active underline |

---

## Motion & Interaction

### Scroll Animations (Framer Motion)

All motion is subtle and refined. No bouncing, no spring physics, no dramatic reveals.

- **Fade-up on enter (sections):** `initial={{ opacity: 0, y: 16 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}`. Trigger: `useInView` with `once: true`, `margin: "-80px"`.
- **Stagger children (bento grid):** Parent `staggerChildren: 0.08`. Each child uses the same fade-up. Total grid animation: ~0.5s for 5 cards.
- **Stagger children (spot rows):** Parent `staggerChildren: 0.05`. Faster stagger for list items — the list should populate quickly, not dramatically.
- **Hero text reveal:** Brand name fades in as a whole (no letter-by-letter): `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}`. Overline appears first (delay: 0), brand (delay: 0.2), tagline (delay: 0.4), CTA (delay: 0.6).
- **No parallax.** Static backgrounds. The tech aesthetic relies on structure, not visual tricks.

### Hover Effects

- **Cards (feature, spot):** `transition-colors duration-200 ease-out`. Border: `border-zinc-800` to `border-zinc-700`. No scale. No glow. Just a subtle border shift.
- **Primary buttons:** `transition-all duration-150 ease-out`. Background: `bg-indigo-500` to `bg-indigo-400`. Shadow: `shadow-none` to `shadow-[0_0_20px_rgba(99,102,241,0.2)]`. Scale: `scale-100` to `scale-[1.02]`.
- **Outline buttons:** `transition-colors duration-150`. Border: `border-zinc-700` to `border-zinc-600`. Text: `text-slate-400` to `text-slate-200`.
- **Ghost buttons / text links:** `transition-colors duration-150`. Color shift only (e.g., `text-slate-500` to `text-slate-300`). No underline animation — just color.
- **Nav links:** Active underline is always present on the active item (not animated in). Hover on inactive: `text-slate-500` to `text-slate-300`, `duration-150`.
- **Spot row expand chevron:** `transition-transform duration-200 ease-out`. Rotates `rotate-0` to `rotate-180` on expand.

### Transitions

- **Default duration:** `200ms` for color/border changes
- **Layout changes (expand/collapse):** `300ms` with `ease: [0.25, 0.1, 0.25, 1]` (custom cubic-bezier, smooth deceleration)
- **Spot row expand:** Framer Motion `AnimatePresence` + `motion.div` with `initial={{ height: 0, opacity: 0 }}`, `animate={{ height: "auto", opacity: 1 }}`, `exit={{ height: 0, opacity: 0 }}`, `transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}`
- **Mobile sheet open:** `duration: 0.3`, slides from right with `ease-out`
- **Tab switch:** Content crossfade, `duration: 0.15`

### Focus States
- All interactive elements: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Tab key navigation follows DOM order: header nav -> hero CTA -> AI coach CTA -> bento grid CTAs -> spot rows -> adventure cards -> footer links

---

## Accessibility Fixes

These address every issue flagged in the analysis report:

| Issue | Fix |
|-------|-----|
| Two H1 elements | Single H1: "SURFIT.IA" in hero. All section titles are H2. Spot names are H3. |
| Missing meta description | Add: "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure." |
| Missing OG image | Generate from hero screenshot or create a branded card |
| Missing canonical | Add `<link rel="canonical" href="https://waveridersurf.com/">` |
| No anchor navigation | Sticky text nav with section anchors (see Header section) |
| No real footer | Full 4-column footer with nav links, legal, brand (see Footer section) |
| Missing ARIA labels | `aria-label` on all buttons, `aria-expanded` on collapsible spot rows, `role="navigation"` on header, `aria-current="true"` on active nav link |
| Body text too small | Minimum `text-base` (16px) for all body text. Smallest allowed: `text-xs` (12px) for labels/captions only |
| Mixed EN/ES language | Standardize to English. Keep "Entrar al Dashboard" as the sole Spanish CTA for brand identity. Add `lang="es"` attribute on that specific element. |
| No skip navigation | Add visually-hidden "Skip to main content" link as first focusable element |
| Heading hierarchy | H1 (brand) -> H2 (section titles) -> H3 (card titles, spot names). No skipped levels. |

---

## Dark/Light Mode

- **Default and only mode:** Dark. The near-black zinc palette is the brand identity.
- **No light mode toggle.** The design system is built exclusively for dark.
- **Implementation:** Tailwind `darkMode: 'class'` with `dark` class on `<html>`. All colors specified directly (not using dark: prefix variants).

---

## Content to Preserve

### Hero
- Brand: "SURFIT.IA"
- Tagline: "Master the science of surfing with artificial intelligence" (or Spanish variant: "Domina la ciencia del surf con inteligencia artificial")
- CTA: "Entrar al Dashboard"

### AI Coach
- Title: "AI Surf Coach" / "Biomechanical Analysis"
- Description: Upload photo for AI feedback on stance, rail work, and gaze
- CTA: "Upload Surf Photo"

### Feature Cards
1. **Surf Shop** — "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World." CTA: "Open Store List"
2. **Google Travel Surf** — "Explore the best surf trips and prices to blue destinations worldwide via Google Travel." CTA: "Book Trip"
3. **World Spot Gallery** — "Explore panoramic photos and the best locations where surfing happens globally." CTA: "View Spots"

### Media
- Tabs: "Surf Images" (View Gallery) / "Videos" (Watch Highlights)

### Adventure & Advice
- Label: "BEST TRIPS & VIDEOS"
- CTAs: "Watch Best Trips" / "YouTube Curated List"

### Top 10 World Surf Spots (all data preserved)

| # | Spot | Location | Rating | Wave Type | Best Season | Hazards | Food Tip | Travel Tip |
|---|------|----------|--------|-----------|-------------|---------|----------|------------|
| 1 | Pipeline | Oahu, Hawaii | 5.0 | Hollow Reef Break | Nov-Feb | Shallow reef, strong currents, crowds | Try poke bowls at North Shore food trucks | Fly into Honolulu, rent a car to North Shore |
| 2 | Teahupo'o | Tahiti, French Polynesia | 5.0 | Heavy Slab | May-Aug | Extremely shallow reef, powerful waves | Fresh poisson cru from local market | Fly to Papeete, boat transfer to Teahupo'o |
| 3 | Uluwatu | Bali, Indonesia | 4.9 | Long Left Reef Break | Apr-Oct | Sharp reef, cave entry, strong currents | Nasi goreng at cliffside warungs | Fly to Denpasar, 30min drive to Uluwatu |
| 4 | Jeffreys Bay | Eastern Cape, South Africa | 4.9 | Long Right Point Break | Jun-Aug | Sharks, cold water, rocky entry | Biltong and craft beer in town | Fly to Port Elizabeth, 1hr drive to J-Bay |
| 5 | Cloud 9 | Siargao, Philippines | 4.8 | Hollow Right Reef Break | Sep-Nov | Shallow reef, strong currents, sea urchins | Fresh seafood at beachfront grills | Fly to Siargao via Cebu or Manila |
| 6 | Mavericks | California, USA | 4.8 | Big Wave Reef Break | Nov-Mar | Giant waves, cold water, rocks, sharks | Clam chowder at Half Moon Bay | Fly to SFO, 45min drive south to Half Moon Bay |
| 7 | Nazare | Leiria, Portugal | 4.9 | Giant Beach Break | Oct-Mar | Record-breaking waves, strong currents | Caldeirada de peixe in the harbor | Fly to Lisbon, 1.5hr drive north |
| 8 | Gold Coast | Queensland, Australia | 4.7 | Long Right Point Break | Feb-May | Crowds, bluebottles, sand shifts | Fish and chips at Burleigh Heads | Fly to Gold Coast Airport, Snapper Rocks nearby |
| 9 | Puerto Escondido | Oaxaca, Mexico | 4.8 | Heavy Beach Break | May-Aug | Powerful shorebreak, strong rip currents | Tlayudas and mezcal at Zicatela | Fly to Puerto Escondido, beaches walking distance |
| 10 | Hossegor | Landes, France | 4.7 | Hollow Beach Break | Sep-Nov | Powerful shorebreak, shifting sandbars | Duck confit and local wine in town | Fly to Biarritz, 30min drive north |

- Each spot links: Google Maps (external), Surfline Forecast (external)
- "Ask Coach" button on each spot row

### Images
- Hero ocean: `https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop`
- Wave background (adventure section if needed): `https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop`

### External Links
- Surf Forecast: Windy.com
- Maps: Google Maps (10 spot-specific links)
- Forecast: Surfline.com (10 spot-specific links)

### Meta (fixes)
- **Title:** "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide"
- **Description:** "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure."
- **OG Image:** Generate branded card (zinc-950 bg, "SURFIT.IA" in Space Grotesk, blue-violet accent)
- **Canonical:** `https://waveridersurf.com/`
- **Language:** `lang="en"` on `<html>`, `lang="es"` on the "Entrar al Dashboard" button

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Notes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked cards, hamburger nav, spot rows full-width stacked |
| Tablet | 640-1023px | 2-column bento grid, spot rows full-width, 2-col expanded detail |
| Desktop | 1024px+ | Full 3-col bento grid, single-column spot list, full sticky nav |
| Wide | 1280px+ | `max-w-6xl` (1152px) centered, comfortable spacing |

---

## File/Component Structure

```
components/
├── site-header.tsx      — sticky text nav with IntersectionObserver active tracking
├── hero.tsx             — full-screen hero, minimal content, heavy overlay
├── ai-coach.tsx         — two-column feature section (description + product mockup)
├── features-grid.tsx    — bento grid (media, shop, travel, spot gallery)
├── surf-spots.tsx       — data dashboard section with 10 expandable spot rows
├── spot-row.tsx         — individual spot row with collapsible detail panel
├── adventure.tsx        — horizontal scroll video cards
├── site-footer.tsx      — full 4-column footer
└── ui/                  — shadcn/ui primitives (Button, Card, Badge, Sheet, Tabs, Collapsible, Tooltip, Separator, ScrollArea, NavigationMenu)
```
