# Design Spec: SURFIT.IA Redesign

**Direction:** Premium dark surf-tech — Apple product pages meet a surf brand, with AI as the hero differentiator.

---

## Color Palette

| Role | Color | Hex / Value | Tailwind | Usage |
|------|-------|-------------|----------|-------|
| Background | Deep Navy | `#020617` | `slate-950` | Page background |
| Surface | Frosted Glass | `rgba(255,255,255,0.05)` | `white/5` | Cards, panels |
| Surface Hover | Glass Hover | `rgba(255,255,255,0.10)` | `white/10` | Card hover states |
| Border | Subtle Edge | `rgba(255,255,255,0.10)` | `white/10` | Card borders, dividers |
| Border Hover | Bright Edge | `rgba(255,255,255,0.20)` | `white/20` | Hover border state |
| Primary | Ocean Blue | `#2563EB` | `blue-600` | Primary CTAs, active states |
| Primary Light | Sky Blue | `#3B82F6` | `blue-500` | Links, secondary buttons |
| Accent | Cyan | `#06B6D4` | `cyan-500` | Gradient end, highlights |
| Gradient CTA | Blue→Cyan | `#2563EB → #06B6D4` | — | Primary CTA buttons, glows |
| Text Primary | White | `#FFFFFF` | `white` | Headings, body text |
| Text Secondary | Cool Gray | `#9CA3AF` | `gray-400` | Descriptions, metadata |
| Text Muted | Dim Gray | `#6B7280` | `gray-500` | Labels, captions |
| Danger | Coral Red | `#F87171` | `red-400` | Hazard badges, warnings |
| Warning | Sunset Orange | `#FB923C` | `orange-400` | Rating highlights |
| Success | Reef Green | `#22C55E` | `green-500` | Positive indicators |

### Gradient Definitions
- **CTA Gradient:** `bg-gradient-to-r from-blue-600 to-cyan-500`
- **Glow Effect:** `shadow-[0_0_40px_rgba(6,182,212,0.3)]` on hover
- **Card Glow:** `hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]`
- **Hero Overlay:** `bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950`

---

## Typography

### Fonts (Google Fonts)
- **Brand/Display:** Space Grotesk — bold, geometric, modern tech feel
- **Body:** Inter — clean readability, already established

### Scale (Tailwind)
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Brand "SURFIT.IA" | `text-7xl md:text-8xl lg:text-9xl` | 700 (Bold) | Space Grotesk, uppercase, tracking-tight |
| Subtitle | `text-xl md:text-2xl` | 400 | Inter, normal case |
| Section Heading (H2) | `text-3xl md:text-4xl lg:text-5xl` | 700 | Space Grotesk, tracking-tight |
| Card Title (H3) | `text-xl md:text-2xl` | 600 | Space Grotesk |
| Body | `text-sm md:text-base` | 400 | Inter |
| Label/Overline | `text-xs` | 700 | Inter, uppercase, tracking-[0.2em] |
| Small/Caption | `text-xs` | 400 | Inter, text-gray-500 |

---

## Layout & Sections

### 1. Header / Navigation
- **Style:** Fixed/sticky, transparent background that gains `backdrop-blur-xl bg-slate-950/80` on scroll
- **Left:** "SURFIT.IA" wordmark in Space Grotesk bold
- **Center:** Section anchors (AI Coach, Spots, Shop, Adventures) — hidden on mobile
- **Right:** Language toggle + Surf Forecast external link
- **Mobile:** Hamburger → Sheet/drawer with section links
- **Scroll behavior:** Hides on scroll down, reveals on scroll up

### 2. Hero
- **Style:** Full viewport height (`h-screen`), cinematic ocean background image with gradient overlay
- **Background:** Unsplash ocean photo (existing), fixed/parallax subtle effect
- **Content:** Centered, stacked vertically
  - Overline: "AI-POWERED SURF COACHING" (label style, text-cyan-500)
  - Brand: "SURFIT.IA" (display font, massive)
  - Tagline: "Domina la ciencia del surf con inteligencia artificial" (or English variant)
  - CTA: "Entrar al Dashboard" — gradient button (blue→cyan) with glow on hover
- **Scroll indicator:** Subtle animated down-chevron at bottom

### 3. AI Coach / Biomechanical Analysis (HERO FEATURE)
- **Style:** Bento grid — this feature gets the LARGEST card (2-column span)
- **Layout:** Split — left side has description + upload CTA, right side shows a mockup/illustration of the analysis
- **Content:**
  - H2: "AI Surf Coach"
  - Description: AI feedback on stance, rail work, and gaze
  - CTA: "Upload Surf Photo" — gradient button
  - Supporting visual: wave analysis mockup or icon illustration
- **Card style:** Glass card with blue gradient border glow, larger padding

### 4. Features Bento Grid
- **Style:** Asymmetric bento grid (3 columns, mixed sizes)
- **Layout:**
  ```
  ┌────────────────┬─────────┐
  │  AI Coach (2x) │ Upload  │
  ├────────┬───────┼─────────┤
  │  Shop  │Travel │  Spots  │
  └────────┴───────┴─────────┘
  ```
- **Cards:** Glass card with icon, title, description, CTA button
  - Surf Shop → shopping bag icon
  - Google Travel Surf → plane/globe icon
  - World Spot Gallery → map-pin/camera icon
  - Media (Images/Videos) → play/image icon
- **Mobile:** Single column, all cards full-width

### 5. Adventure & Advice
- **Style:** Full-width section with background wave image (subtle, dark overlay)
- **Content:** Section heading + curated YouTube video links as horizontal scroll cards
- **Cards:** Thumbnail + title + play icon overlay
- **CTA:** "Watch Best Trips" → YouTube curated list

### 6. Top 10 World Surf Spots
- **Style:** Section with grid of spot cards
- **Layout:** 2-column grid on desktop (5 rows), single column on mobile
- **Card anatomy:**
  - Ranking badge (top-left, gradient circle: #1, #2...)
  - Rating (stars or numeric, orange accent)
  - Spot name (H3, Space Grotesk)
  - Location (text-gray-400)
  - Quick tip (food recommendation + travel tip as subtle text)
  - "Ask Coach" pill button (bottom-right)
  - Click/tap → expand to show: Wave Type, Best Season, Local Hazards, Maps, Forecast
- **Card style:** Glass card with hover glow, smooth expand animation
- **Top 3 spotlight:** First 3 cards could be slightly larger or have a highlighted border

### 7. Footer
- **Style:** Dark, minimal but complete
- **Layout:** 3-4 columns
  - Brand: "SURFIT.IA" + one-line description
  - Links: Features, Spots, Shop, Adventures
  - External: Surf Forecast, YouTube
  - Legal: Privacy, Terms, Copyright
- **Bottom:** Copyright line + "Built with AI" subtle badge

---

## shadcn/ui Components

| Component | Usage |
|-----------|-------|
| `Button` | All CTAs — variants: default (gradient), outline (glass), ghost |
| `Card` | Feature cards, spot cards, adventure cards |
| `Badge` | Ranking badges (#1-#10), difficulty levels, ratings |
| `Sheet` | Mobile navigation drawer |
| `Tabs` | Media section (Images / Videos) |
| `Collapsible` | Spot card expandable details |
| `Tooltip` | Map/Forecast icon hints |
| `Separator` | Section dividers |
| `ScrollArea` | Adventure horizontal scroll |

---

## Motion & Interaction

### Scroll Animations (Framer Motion)
- **Fade-up on enter:** All section headings and cards — `y: 30 → 0, opacity: 0 → 1` on viewport enter
- **Stagger children:** Cards in grid appear one-by-one with 100ms delay
- **Hero text reveal:** Brand name letters or words animate in sequence
- **Parallax:** Hero background image moves at 0.5x scroll speed

### Hover Effects
- **Cards:** `scale-[1.02]` + border brightens + subtle blue glow shadow
- **Buttons:** `scale-105` + glow intensifies
- **Links:** Underline slides in from left

### Transitions
- **Duration:** 300ms default, 500ms for layout changes
- **Easing:** `ease-out` for enters, `ease-in-out` for hovers
- **Card expand:** Height auto-animate with `layout` prop (Framer Motion)

---

## Dark/Light Mode

- **Default:** Dark mode (mandatory — defines the brand)
- **Toggle:** No light mode for v1 — the dark ocean aesthetic is core to the brand identity
- **Implementation:** Tailwind `darkMode: 'class'`, but keep everything dark-only for now

---

## Content to Preserve

### All original text content:
- Hero: brand name, tagline, CTA text
- AI Coach: description, upload prompt
- Feature cards: all 3 titles + descriptions + CTAs
- Adventure section: heading, CTA
- Top 10 spots: all spot data (name, location, rating, food tip, travel tip, wave type, best season, hazards)
- Maps and Forecast links per spot

### Images:
- Hero ocean: `https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop`
- Wave background: `https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop`

### Meta (FIX these gaps):
- **Title:** "SURFIT.IA — AI-Powered Surf Coaching & Wave Guide"
- **Description:** "Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure."
- **OG Image:** Generate or use hero screenshot
- **Language:** `en` (standardize to English, keep "Entrar al Dashboard" as the one Spanish CTA for brand flavor, or localize fully)

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Notes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked cards, hamburger nav |
| Tablet | 640-1023px | 2-column grids, reduced spacing |
| Desktop | 1024px+ | Full bento grid, 2-col spots, floating nav |
| Wide | 1280px+ | Max-width container (1200px), centered |

---

## File/Component Structure (Preview)

```
components/
├── site-header.tsx      — sticky nav with scroll behavior
├── hero.tsx             — full-screen hero with parallax
├── ai-coach.tsx         — bento hero feature card
├── features-grid.tsx    — bento grid (shop, travel, spots, media)
├── adventure.tsx        — video/trip section with horizontal scroll
├── surf-spots.tsx       — top 10 grid with expandable cards
├── spot-card.tsx        — individual spot card component
├── site-footer.tsx      — full footer
└── ui/                  — shadcn/ui primitives
```
