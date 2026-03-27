# Design Spec: SURFIT.IA Redesign

**Direction:** C — Bold Energetic Sport. Dynamic, vibrant, high-energy — like a surf competition broadcast meets Nike sport branding. Color-forward with solid tinted card backgrounds replacing glassmorphism. Teal replaces navy, coral and yellow inject warmth and urgency the original site entirely lacks.

---

## Color Palette

| Role | Color | Hex / Value | Tailwind | Usage |
|------|-------|-------------|----------|-------|
| Background | Dark Teal | `#042F2E` | `teal-950` | Page background |
| Surface Dark | Deep Teal | `#0F3D3C` | — | Card backgrounds (primary tint) |
| Surface Cyan | Cyan Tint | `#083344` | `cyan-950` | Card backgrounds (cyan variant) |
| Surface Coral | Coral Tint | `#4C0519` | `rose-950` | Card backgrounds (coral variant) |
| Surface Yellow | Yellow Tint | `#422006` | `yellow-950` | Card backgrounds (yellow variant) |
| Border | Teal Edge | `rgba(34,211,238,0.15)` | `cyan-400/15` | Card borders, dividers |
| Border Hover | Bright Cyan Edge | `rgba(34,211,238,0.35)` | `cyan-400/35` | Hover border state |
| Primary | Vivid Cyan | `#22D3EE` | `cyan-400` | Primary CTAs, active nav, highlights |
| Secondary | Hot Coral | `#F43F5E` | `rose-500` | Secondary CTAs, danger, emphasis |
| Accent | Electric Yellow | `#FACC15` | `yellow-400` | Ranking badges, urgency, rating stars |
| Gradient CTA | Cyan→Coral | `#22D3EE → #F43F5E` | — | Primary CTA buttons |
| Text Primary | White | `#FFFFFF` | `white` | Headings, body text |
| Text Secondary | Teal Gray | `#99F6E4` | `teal-200` | Descriptions, metadata |
| Text Muted | Dim Teal | `#5EEAD4` | `teal-300` | Labels, captions |
| Danger | Hot Coral | `#F43F5E` | `rose-500` | Hazard badges, warnings |
| Warning | Yellow | `#FACC15` | `yellow-400` | Rating highlights |
| Success | Reef Green | `#22C55E` | `green-500` | Positive indicators |

### Gradient Definitions
- **CTA Gradient:** `bg-gradient-to-r from-cyan-400 to-rose-500`
- **CTA Glow:** `shadow-[0_0_40px_rgba(34,211,238,0.4)]` on hover
- **Hero Gradient:** `bg-gradient-to-br from-teal-950 via-cyan-950 to-teal-950`
- **Hero Overlay:** `bg-gradient-to-b from-teal-950/70 via-teal-950/30 to-teal-950`
- **Leaderboard Gradient (Top 3):** `bg-gradient-to-r from-yellow-400/20 via-yellow-400/5 to-transparent`
- **Card Accent Border:** `border-l-4 border-cyan-400` or `border-l-4 border-rose-500` per card type
- **Section Divider:** `bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent` (1px height)

---

## Typography

### Fonts (Google Fonts)
- **Brand/Display:** Outfit (variable weight 100-900) — condensed sport feel, tighter than Inter, more versatile than Bebas Neue. Use weight 800-900 and `font-stretch: condensed` for the brand mark, weight 700 for section headings.
- **Body:** DM Sans — clean readability with slightly more character than Inter. Rounder, warmer.

### Scale (Tailwind)
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Brand "SURFIT.IA" | `text-7xl md:text-8xl lg:text-9xl` | 900 (Black) | Outfit, uppercase, tracking-tighter, `font-stretch: condensed` |
| Hero Tagline | `text-2xl md:text-3xl lg:text-4xl` | 500 | DM Sans, normal case, text-teal-200 |
| Section Heading (H2) | `text-3xl md:text-4xl lg:text-5xl` | 700 | Outfit, uppercase, tracking-tight |
| Section Subtitle | `text-lg md:text-xl` | 400 | DM Sans, text-teal-200 |
| Card Title (H3) | `text-xl md:text-2xl` | 700 | Outfit, uppercase |
| Body | `text-base md:text-lg` | 400 | DM Sans (fixes the 9-10px mobile issue) |
| Label/Overline | `text-xs md:text-sm` | 700 | Outfit, uppercase, tracking-[0.2em], text-cyan-400 |
| Ranking Number | `text-4xl md:text-5xl` | 900 | Outfit, text-yellow-400 |
| Small/Caption | `text-sm` | 400 | DM Sans, text-teal-300 |

---

## Layout & Sections

### 1. Header / Navigation

- **Style:** Fixed/sticky, `bg-teal-950/90 backdrop-blur-lg` always visible (no transparent-to-opaque transition — bold direction means always present)
- **Left:** "SURFIT.IA" wordmark in Outfit weight 900, text-cyan-400, tracking-tighter
- **Center:** Anchor nav pills — AI Coach, Spots, Shop, Adventures — `bg-cyan-400/10 rounded-full px-4 py-1.5` with active state `bg-cyan-400 text-teal-950`. Hidden on mobile.
- **Right:** Language toggle (ghost button) + "Surf Forecast" external link (coral accent icon)
- **Mobile:** Hamburger icon → Sheet/drawer with full-screen teal-950 background, large Outfit nav links stacked vertically
- **Active section indicator:** Active pill fills with cyan-400, smooth 200ms transition
- **Height:** `h-16` (64px)
- **Component:** shadcn `Button` (ghost variant for links, default for active), `Sheet` for mobile

### 2. Hero

- **Style:** Full viewport height (`h-screen`), typography-led — the text IS the hero, not a photo overlay
- **Background:** Dark teal with subtle animated gradient mesh (CSS `@keyframes` shifting between teal-950, cyan-950, rose-950 blobs). Ocean photo as a low-opacity texture (`opacity-10`) rather than the primary visual.
- **Content:** Left-aligned on desktop (60% width), centered on mobile
  - Overline: "AI-POWERED SURF COACHING" — Outfit weight 700, text-cyan-400, tracking-[0.3em], `text-sm`
  - Brand: "SURFIT.IA" — Outfit weight 900, 96-128px, text-white, with a text-gradient sweep `bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent` animated on load (shimmer effect)
  - Tagline: "Master the science of surfing with artificial intelligence" — DM Sans, text-2xl to text-4xl, text-teal-200
  - CTA: "Entrar al Dashboard" — `bg-gradient-to-r from-cyan-400 to-rose-500 text-teal-950 font-bold rounded-full px-8 py-4 text-lg` with glow on hover
  - Secondary CTA: "Explore Spots" — ghost button, `border-2 border-cyan-400 text-cyan-400 rounded-full`
- **Right side (desktop only):** Floating stat badges — animated in from right — "10 World Spots", "AI Coach", "Live Forecast" in small colored cards (cyan-950 bg, coral border, yellow text)
- **Scroll indicator:** Animated down-chevron, cyan-400, bouncing
- **Component:** shadcn `Button` (two variants)

### 3. AI Coach / Biomechanical Analysis (HERO FEATURE)

- **Style:** Full-width section, `bg-cyan-950` background with `border-l-4 border-cyan-400`
- **Layout:** Split two-column on desktop. Left column (55%): content. Right column (45%): visual mockup area.
- **Left content:**
  - Overline: "HERO FEATURE" — yellow-400
  - H2: "AI Surf Coach" — Outfit 700, white
  - H3: "Biomechanical Analysis" — Outfit 600, cyan-400
  - Description: "Upload your surf photo and get instant AI feedback on stance, rail work, and gaze direction. Powered by computer vision trained on professional surfers." — DM Sans, text-teal-200
  - CTA: "Upload Surf Photo" — gradient button (cyan→coral), large
- **Right visual:** Placeholder mockup area with dashed border `border-2 border-dashed border-cyan-400/30` and centered icon. In production, show analysis overlay mockup.
- **Card style:** NO glass — solid `bg-cyan-950` with left accent border
- **Component:** shadcn `Card`, `Button`

### 4. Features Bento Grid

- **Style:** Asymmetric bento grid with SOLID colored backgrounds — this is the key visual departure from Direction A's glassmorphism
- **Layout:**
  ```
  ┌──────────────────────┬────────────┐
  │  Media Tabs (2x)     │   Shop     │
  │  bg-cyan-950         │  bg-rose-  │
  │                      │   950      │
  ├───────────┬──────────┼────────────┤
  │  Travel   │  Spots Gallery        │
  │ bg-yellow-│  bg-teal-900          │
  │   950     │                       │
  └───────────┴───────────────────────┘
  ```
- **Cards:** Solid tinted backgrounds, `rounded-2xl`, `border border-white/5`, `p-8`
  - **Media (2-col span, cyan-950 bg):** Tabs component with "Surf Images" / "Videos" — `border-l-4 border-cyan-400`
  - **Surf Shop (rose-950 bg):** Shopping bag icon (Lucide `ShoppingBag`), title, description, "OPEN STORE LIST" CTA — `border-l-4 border-rose-500`
  - **Google Travel Surf (yellow-950 bg):** Globe icon (Lucide `Globe`), title, description, "BOOK TRIP" CTA — `border-l-4 border-yellow-400`
  - **World Spot Gallery (teal-900 bg):** MapPin icon (Lucide `MapPin`), title, description, "VIEW SPOTS" CTA — `border-l-4 border-cyan-400`
- **Card hover:** `scale-[1.03]` + border-left color brightens + colored glow matching the card's accent
- **Mobile:** Single column, all cards full-width, stacked with `gap-4`
- **Component:** shadcn `Card`, `Tabs`, `Button`

### 5. Adventure & Advice

- **Style:** Full-width section, wave background image with heavy dark overlay (`bg-teal-950/85`). A coral gradient bar runs across the top of the section as a divider.
- **Content:**
  - Overline: "BEST TRIPS & VIDEOS" — cyan-400, Outfit
  - H2: "Adventure & Advice" — Outfit 700, white
  - Horizontal scroll row of video cards
- **Video cards:** `bg-cyan-950 rounded-2xl overflow-hidden`
  - Thumbnail area (16:9 aspect) with play icon overlay (coral circle with white triangle)
  - Title below thumbnail — Outfit 600
  - Each card is ~300px wide on desktop, ~260px on mobile
- **CTAs:**
  - "Watch Best Trips" — gradient button
  - "YouTube Curated List" — ghost button, coral accent
- **Component:** shadcn `Card`, `Button`, `ScrollArea` (horizontal)

### 6. Top 10 World Surf Spots (LEADERBOARD)

- **Style:** Competition leaderboard aesthetic — numbered rankings, stat-heavy, bold color coding. Section background `bg-teal-950` with subtle diagonal stripe pattern (`repeating-linear-gradient` at 2% opacity).
- **Header:**
  - Overline: "CURATED BY ELITE WAVE HUNTERS" — yellow-400
  - H2: "Top 10 World Surf Spots" — Outfit 700, white
  - Subtitle: "The definitive ranking for serious surfers" — DM Sans, teal-200

- **Layout:** Single column, full-width cards stacked vertically — leaderboard style, not grid. Each card is a wide horizontal row on desktop.

- **Card anatomy (leaderboard row):**
  - **Left:** Ranking number — Outfit weight 900, `text-5xl`, yellow-400 for #1-3, cyan-400 for #4-7, teal-300 for #8-10
  - **Center-left:** Spot name (Outfit 700, text-xl, white) + Location (DM Sans, text-teal-200) stacked
  - **Center:** Rating (yellow-400 stars + numeric) + Wave Type badge (pill, `bg-cyan-400/10 text-cyan-400 rounded-full`)
  - **Center-right:** Best Season + quick tips (food, travel) — DM Sans, text-sm, teal-300
  - **Right:** "Ask Coach" pill button (`bg-rose-500 text-white rounded-full hover:bg-rose-400`)
  - **Expand trigger:** Click row or chevron icon to expand

- **Expanded detail panel:**
  - Slides down with clip-path animation (see Motion section)
  - `bg-teal-900 rounded-b-2xl p-6`
  - Grid: Wave Type | Best Season | Local Hazards — three columns
  - Bottom row: Maps link (cyan-400 text + external icon) | Forecast link (cyan-400)
  - Hazards displayed with `bg-rose-500/10 text-rose-400 rounded-full` pill badges

- **Top 3 spotlight:** Cards #1-3 get `border-l-4 border-yellow-400` + subtle yellow gradient background `bg-gradient-to-r from-yellow-400/10 to-transparent`
- **Cards #4-7:** `border-l-4 border-cyan-400` + `bg-cyan-950`
- **Cards #8-10:** `border-l-4 border-teal-600` + `bg-teal-900`

- **Mobile:** Cards stack vertically. Ranking number moves to top-left corner of card. Content stacks below. Same expand behavior.

- **Component:** shadcn `Card`, `Badge`, `Collapsible`, `Button`, `Tooltip` (for Maps/Forecast icons)

### 7. Footer

- **Style:** `bg-teal-950` with top border `border-t border-cyan-400/20`. Bold, present — not an afterthought.
- **Layout:** 4-column grid on desktop, 2-column on tablet, stacked on mobile
  - **Column 1 — Brand:** "SURFIT.IA" (Outfit 900, cyan-400) + "AI-powered surf coaching and wave guide" (DM Sans, teal-300) + social icons row (if applicable)
  - **Column 2 — Features:** AI Coach, Surf Shop, Travel, Media — anchor links
  - **Column 3 — Surf Spots:** Top 3 spot names as links (Pipeline, Teahupo'o, Uluwatu) + "View All 10" link
  - **Column 4 — External:** Surf Forecast (Windy.com), YouTube Channel, Google Maps — all with external link icons
- **Bottom bar:** `border-t border-cyan-400/10 py-4`
  - Left: "2026 SURFIT.IA" — DM Sans, text-teal-300
  - Center: Privacy | Terms (placeholder links)
  - Right: "Built with AI" subtle badge — `text-xs text-teal-500`
- **Component:** shadcn `Separator`, `Button` (ghost for links)

---

## shadcn/ui Components

| Component | Usage |
|-----------|-------|
| `Button` | All CTAs — variants: default (gradient cyan→coral), outline (cyan border), ghost (text-only), destructive (coral solid for "Ask Coach") |
| `Card` | Feature bento cards (solid bg), spot leaderboard rows, adventure video cards |
| `Badge` | Ranking numbers (#1-#10), wave type pills, hazard pills, season tags |
| `Sheet` | Mobile navigation drawer (full-screen teal-950) |
| `Tabs` | Media section — Surf Images / Videos toggle. Tab triggers styled as `bg-cyan-400/10 data-[state=active]:bg-cyan-400 data-[state=active]:text-teal-950 rounded-full` |
| `Collapsible` | Spot card expandable details (clip-path reveal animation) |
| `Tooltip` | Maps/Forecast icon button hints |
| `Separator` | Section dividers (gradient cyan line), footer dividers |
| `ScrollArea` | Adventure section horizontal video scroll |
| `NavigationMenu` | Header anchor nav with active pill states |

---

## Motion & Interaction

### Hero Animations (on load)
- **Text scramble reveal:** Brand "SURFIT.IA" letters scramble through random characters before resolving — Framer Motion custom animation, 800ms duration, staggered per character (50ms delay each). Characters cycle through `A-Z, 0-9` before landing on final letter.
- **Gradient shimmer:** After text resolves, a `bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent` mask sweeps left-to-right across the brand text — CSS `@keyframes shimmer` or Framer Motion `x` transform on a pseudo-element, 1200ms, ease-in-out.
- **Tagline slide-up:** `y: 40 → 0, opacity: 0 → 1`, 500ms delay after brand resolves, ease-out.
- **CTA scale-in:** `scale: 0.8 → 1, opacity: 0 → 1`, 700ms delay, spring physics (`stiffness: 200, damping: 15`).
- **Stat badges (desktop):** Fly in from right, staggered 100ms, spring physics.

### Scroll Animations (Framer Motion)
- **Section headings:** `y: 50 → 0, opacity: 0 → 1, scale: 0.95 → 1` — 400ms, ease-out, triggered at 20% viewport intersection.
- **Bento cards:** Staggered entrance — each card uses `clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)"` reveal (wipe-up), 500ms per card, 150ms stagger delay. Framer Motion `variants` with `staggerChildren`.
- **Leaderboard rows:** Slide in from left — `x: -100 → 0, opacity: 0 → 1`, 300ms per row, 80ms stagger. Top 3 get additional `scale: 0.9 → 1` for extra impact.
- **Adventure video cards:** Horizontal scroll cards fade in as they enter viewport — `opacity: 0 → 1, x: 30 → 0`, continuous as user scrolls horizontally.
- **Parallax:** Hero background texture at 0.3x scroll speed. Wave background in Adventure section at 0.5x.

### Hover Effects
- **Bento cards:** `scale-[1.03]` + left border color brightens to full opacity + colored glow shadow matching card accent — `transition-all duration-300`
- **Leaderboard rows:** `bg-white/5` overlay + ranking number scales up `scale-110` + left border widens from 4px to 6px — `transition-all duration-200`
- **CTA buttons:** `scale-105` + glow intensifies (`shadow-[0_0_50px_rgba(34,211,238,0.5)]`) + slight `translateY: -2px` — `transition-all duration-200`
- **Ghost buttons:** Border brightens + text color shifts from cyan-400 to white — `transition-colors duration-200`
- **Ask Coach buttons:** `bg-rose-400` + `scale-105` + `shadow-[0_0_20px_rgba(244,63,94,0.4)]`
- **Footer links:** `text-teal-300 → text-cyan-400` color shift, no underline

### Expand/Collapse (Spot Details)
- **Open:** `clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)"` wipe-down reveal, 400ms, ease-out. Content inside fades in with 200ms delay.
- **Close:** Reverse clip-path, 300ms, ease-in. Content fades out first (100ms), then container clips.
- **Layout shift:** Framer Motion `layout` prop on the card container for smooth height animation.

### Transitions
- **Default duration:** 200ms for hovers, 400ms for scroll entrances, 600ms for hero animations
- **Easing:** `[0.25, 0.46, 0.45, 0.94]` (custom ease-out) for entrances, `ease-in-out` for hovers
- **Spring physics:** Used for hero CTAs and stat badges — `stiffness: 200, damping: 15, mass: 1`

---

## Dark/Light Mode

- **Default:** Dark mode only — the teal-950 competition aesthetic IS the brand
- **No light mode toggle** — this direction's identity depends entirely on the dark teal palette
- **Implementation:** Tailwind `darkMode: 'class'`, all styles are dark-only

---

## Accessibility Fixes (from Redesign Signals)

- **Single H1:** Only "SURFIT.IA" in the hero. All section titles are H2. Card titles are H3. No duplicate headings.
- **Skip nav link:** Hidden skip link at top of page — "Skip to main content" — visible on focus, jumps to `<main>`
- **ARIA labels:** All interactive buttons get `aria-label`. Collapsible spot cards get `aria-expanded`. Tab panels get `role="tabpanel"`.
- **Focus management:** Visible focus rings — `focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950` on all interactive elements.
- **Language:** `lang="en"` on `<html>`. Spanish CTA "Entrar al Dashboard" wrapped in `<span lang="es">` for screen readers.
- **Body text minimum:** 16px (`text-base`) minimum on all breakpoints — fixes the 9-10px mobile issue.
- **Color contrast:** White (#FFF) on teal-950 (#042F2E) = 15.2:1 ratio (AAA). Cyan-400 (#22D3EE) on teal-950 = 8.1:1 (AAA). Yellow-400 (#FACC15) on teal-950 = 11.4:1 (AAA). All pass WCAG AA.
- **External links:** All external links (Maps, Forecast, YouTube) get `target="_blank" rel="noopener noreferrer"` + visual external-link icon.

---

## SEO Fixes (from Redesign Signals)

- **Title:** `<title>SURFIT.IA — AI-Powered Surf Coaching & Wave Guide</title>`
- **Meta description:** `<meta name="description" content="Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure.">`
- **Canonical:** `<link rel="canonical" href="https://waveridersurf.com/">`
- **OG tags:** `og:title`, `og:description`, `og:image` (hero screenshot or generated), `og:url`, `og:type="website"`
- **Twitter card:** `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`
- **Single H1:** Enforced in heading hierarchy
- **Structured data:** Add `WebSite` and `Organization` JSON-LD schema

---

## Content to Preserve

### Hero
- Brand: "SURFIT.IA"
- Subtitle: "IA Wave Rider" / "Biomechanical Analysis"
- Sub-description: AI surf posture check & correction
- CTA: "Entrar al Dashboard"

### AI Coach Section
- H2: "Biomechanical Analysis"
- Description: upload photo for AI feedback on stance, rail work, and gaze
- CTA: "Upload Surf Photo"

### Media Section
- Tab 1: "Surf Images" — View Gallery
- Tab 2: "Videos" — Watch Highlights

### Feature Cards
1. **Surf Shop** — "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World." CTA: "OPEN STORE LIST"
2. **Google Travel Surf** — "Explore the best surf trips and prices to blue destinations worldwide via Google Travel." CTA: "BOOK TRIP"
3. **World Spot Gallery** — "Explore panoramic photos and the best locations where surfing happens globally." CTA: "VIEW SPOTS"

### Adventure & Advice
- Label: "BEST TRIPS & VIDEOS"
- CTAs: "Watch Best Trips" / "YouTube Curated List"

### Top 10 World Surf Spots (all data)

| # | Spot | Location | Rating | Wave Type | Best Season | Food Tip | Travel Tip | Hazards | Maps | Forecast |
|---|------|----------|--------|-----------|-------------|----------|------------|---------|------|----------|
| 1 | Pipeline | Oahu, Hawaii | 5.0 | Hollow Reef Break | Nov-Feb | Giovanni Pastrami sandwich | Rent car at HNL | Shallow reef, strong currents | Google Maps | Surfline |
| 2 | Teahupo'o | Tahiti, French Polynesia | 5.0 | Heavy Slab | May-Aug | Poisson cru at local roulotte | Fly PPT, boat to spot | Extremely heavy wave, sharp reef | Google Maps | Surfline |
| 3 | Uluwatu | Bali, Indonesia | 4.9 | Long Left Reef Break | Apr-Oct | Nasi goreng at Single Fin | Fly DPS, scooter rental | Sea urchins, cave entry | Google Maps | Surfline |
| 4 | Jeffreys Bay | Eastern Cape, South Africa | 4.9 | Long Right Point Break | Jun-Aug | Biltong at InFood | Fly PLZ, 1hr drive | Sharks, localism | Google Maps | Surfline |
| 5 | Cloud 9 | Siargao, Philippines | 4.8 | Hollow Right Reef Break | Sep-Nov | Kinilaw at Bravo | Fly IAO, tricycle ride | Sharp reef, strong currents | Google Maps | Surfline |
| 6 | Mavericks | California, USA | 4.8 | Big Wave Reef Break | Nov-Mar | Clam chowder at Sam's | Fly SFO, 45min drive south | Giant waves, cold water, rocks | Google Maps | Surfline |
| 7 | Nazare | Leiria, Portugal | 4.8 | Giant Beach Break | Oct-Mar | Caldeirada at Celeste | Fly LIS, 1.5hr drive north | Largest waves on earth, currents | Google Maps | Surfline |
| 8 | Gold Coast | Queensland, Australia | 4.7 | Long Right Point Break | Feb-May | Fish & chips at Peter's | Fly OOL, bus to Snapper | Strong currents, bluebottles | Google Maps | Surfline |
| 9 | Puerto Escondido | Oaxaca, Mexico | 4.7 | Heavy Beach Break | May-Aug | Tlayuda at Zandunga | Fly PXM, taxi to Zicatela | Mexican Pipeline, powerful shorebreak | Google Maps | Surfline |
| 10 | Hossegor | Landes, France | 4.7 | Hollow Beach Break | Sep-Nov | Duck confit at Jean des Sables | Fly BIQ, 20min drive | Strong rip currents, shifting banks | Google Maps | Surfline |

- "Ask Coach" button per spot
- Maps link per spot (Google Maps)
- Forecast link per spot (Surfline)

### Images
- Hero ocean: `https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop`
- Wave background: `https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop`

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Notes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked cards, hamburger nav, centered hero text, leaderboard cards stack vertically |
| Tablet | 640-1023px | 2-column bento grid, leaderboard rows compress (tips hidden), 2-col footer |
| Desktop | 1024px+ | Full bento grid (3-col), full leaderboard rows, floating pill nav, 4-col footer |
| Wide | 1280px+ | Max-width container (1280px), centered, generous `px-8` padding |

---

## File/Component Structure (Preview)

```
components/
├── site-header.tsx      — sticky nav with anchor pills and active section tracking
├── hero.tsx             — typography-led hero with text scramble animation
├── ai-coach.tsx         — split layout hero feature with upload CTA
├── features-grid.tsx    — bento grid with solid colored card backgrounds
├── adventure.tsx        — video section with horizontal scroll
├── surf-spots.tsx       — leaderboard-style Top 10 with expandable rows
├── spot-card.tsx        — individual leaderboard row with collapsible detail
├── site-footer.tsx      — 4-column footer with brand, links, spots, external
└── ui/                  — shadcn/ui primitives (Button, Card, Badge, Sheet, Tabs, Collapsible, Tooltip, Separator, ScrollArea, NavigationMenu)
```
