# Design Spec: SURFIT.IA Redesign — Direction A

**Direction:** Cinematic Dark Immersive
**Vibe:** Premium, moody, editorial — like a surf film meets an Apple product page. Let the ocean do the talking.
**References:** Apple Vision Pro page, O'Neill, Patagonia Surf

---

## Color Palette

| Role | Color | Hex / Value | Tailwind | Usage |
|------|-------|-------------|----------|-------|
| Background | Deep Navy | `#0A0F1C` | custom `navy-950` | Page background, sections |
| Surface | Frosted Glass | `rgba(255,255,255,0.05)` | `white/5` | Cards, panels, nav backdrop |
| Surface Hover | Glass Hover | `rgba(255,255,255,0.08)` | `white/[0.08]` | Card hover states |
| Surface Elevated | Bright Glass | `rgba(255,255,255,0.10)` | `white/10` | Active cards, modals |
| Border | Subtle Edge | `rgba(255,255,255,0.08)` | `white/[0.08]` | Card borders, dividers |
| Border Hover | Bright Edge | `rgba(255,255,255,0.15)` | `white/[0.15]` | Hover border state |
| Primary | Electric Blue | `#3B82F6` | `blue-500` | Primary CTAs, active nav, links |
| Primary Deep | Ocean Blue | `#2563EB` | `blue-600` | Gradient start, pressed states |
| Secondary Accent | Cyan | `#06B6D4` | `cyan-500` | Gradient end, overlines, highlights |
| Highlight | Warm Orange | `#FB923C` | `orange-400` | Ratings, rank badges, warm accents |
| Text Primary | White | `#FFFFFF` | `white` | Headlines, primary body text |
| Text Secondary | Cool Gray | `#9CA3AF` | `gray-400` | Descriptions, metadata |
| Text Muted | Dim Gray | `#6B7280` | `gray-500` | Labels, captions, inactive nav |
| Danger | Coral Red | `#F87171` | `red-400` | Hazard badges, warnings |
| Success | Reef Green | `rgba(34,197,94,0.2)` | `green-500/20` | Positive indicators |

### Gradient Definitions
- **CTA Gradient:** `bg-gradient-to-r from-blue-500 to-cyan-500` — primary buttons, active states
- **CTA Gradient Hover:** `bg-gradient-to-r from-blue-400 to-cyan-400` — hover shift
- **Glow Effect:** `shadow-[0_0_50px_rgba(6,182,212,0.25)]` on hover, `shadow-[0_0_30px_rgba(6,182,212,0.15)]` at rest
- **Card Glow:** `hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]`
- **Hero Overlay:** `bg-gradient-to-b from-[#0A0F1C]/70 via-[#0A0F1C]/30 to-[#0A0F1C]` — cinematic gradient letting the ocean breathe through
- **Section Divider Gradient:** `bg-gradient-to-r from-transparent via-white/5 to-transparent` — subtle horizontal rules between sections
- **Accent Gradient (text):** `bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent` — for highlighted inline text

### Color Evolution from Current Site
The current site uses `#020617` (slate-950) background. Direction A shifts to `#0A0F1C` — slightly warmer and less pure-black, creating a richer navy canvas that pairs better with the cinematic ocean photography. All blue accents shift one stop lighter (blue-600 to blue-500 as primary) for more vibrancy against the deeper background. Orange `#FB923C` is promoted from a minor warning color to a deliberate warm highlight, creating temperature contrast.

---

## Typography

### Fonts
- **Display/Headlines:** Bebas Neue (Google Fonts) — condensed, uppercase, high-impact. Brings the surf-film / editorial feel that Inter alone cannot deliver. Used for all H1-H3, brand wordmark in hero, and section titles.
- **Body/UI:** Inter (Google Fonts, 300-700) — clean readability, already established in the codebase. Used for body text, labels, buttons, navigation.

### Scale

| Element | Size | Weight | Style | Notes |
|---------|------|--------|-------|-------|
| Hero Brand "SURFIT.IA" | `text-[96px] md:text-[128px] lg:text-[160px]` | 400 | Bebas Neue, uppercase, `leading-[0.85] tracking-[0.02em]` | Bebas Neue is already bold at 400 weight. Line-height tight for stacked impact. |
| Hero Tagline | `text-xl md:text-2xl lg:text-3xl` | 300 (Light) | Inter, normal case, `leading-relaxed` | Light weight for editorial contrast against heavy display type |
| Overline | `text-xs md:text-sm` | 500 | Inter, uppercase, `tracking-[0.25em]`, text-cyan-500 | Section labels, category markers |
| Section Heading (H2) | `text-4xl md:text-5xl lg:text-6xl` | 400 | Bebas Neue, uppercase, `tracking-[0.02em]` | Larger than v3 to lean into typography-led design |
| Section Subhead | `text-lg md:text-xl` | 300 | Inter, normal case, text-gray-400 | Optional supporting line under H2 |
| Card Title (H3) | `text-2xl md:text-3xl` | 400 | Bebas Neue, uppercase, `tracking-[0.01em]` | Cards use display font for editorial consistency |
| Body | `text-base md:text-lg` | 400 | Inter, `leading-relaxed` | Minimum 16px — fixes current 9-10px mobile accessibility issue |
| Body Small | `text-sm` | 400 | Inter, `leading-relaxed` | Metadata, secondary descriptions |
| Label/Caption | `text-xs` | 500 | Inter, uppercase, `tracking-[0.2em]`, text-gray-500 | Tags, timestamps, small metadata |
| Button Text | `text-sm md:text-base` | 600 | Inter, uppercase, `tracking-[0.1em]` | All CTA buttons |
| Nav Links | `text-sm` | 500 | Inter, `tracking-[0.05em]` | Header navigation |

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Tailwind config:
```js
fontFamily: {
  display: ['"Bebas Neue"', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
}
```

---

## Layout & Sections

Page structure (top to bottom): Header, Hero, Features Bento Grid, Adventure & Advice, Top 10 Surf Spots, Footer. A sticky section navigation floats on the right side of the viewport.

### 0. Sticky Section Navigation (NEW)

- **Style:** Fixed vertical pill nav on the right edge of the viewport (`right-6`, vertically centered). 5-6 small dots (8px circles) connected by a faint vertical line.
- **Desktop:** Each dot represents a section (Hero, Features, Adventures, Spots, Footer). The active section dot scales to 12px and fills with the blue-to-cyan gradient. On hover, a label tooltip appears to the left of the dot (`text-xs`, Inter, bg-white/10 backdrop-blur-sm rounded-md px-2 py-1`).
- **Mobile:** Collapses to a minimal floating pill at the bottom-right (`bottom-6 right-4`). Shows only the current section name in a rounded pill (`bg-white/10 backdrop-blur-xl text-xs text-white/60 px-3 py-1.5`). Tap to reveal all section dots in a vertical popover.
- **Detection:** `IntersectionObserver` with `threshold: 0.3` on each section. Active state transitions with 200ms ease-out.
- **Z-index:** `z-40` (below header at z-50).
- **shadcn/ui:** `Tooltip` for hover labels.

### 1. Header / Navigation

- **Style:** Fixed, transparent on load. On scroll past 80px: gains `backdrop-blur-2xl bg-[#0A0F1C]/80 border-b border-white/5`. Hides on scroll down (past 400px), reveals on scroll up.
- **Height:** `h-16 md:h-20`
- **Left:** "SURFIT.IA" wordmark — Bebas Neue, `text-2xl`, white, with a small Waves icon (lucide) in cyan-500 to the left. No logo image, just type + icon.
- **Center:** Section anchor links — "AI Coach", "Spots", "Shop", "Adventures" — Inter 500, `text-sm`, text-gray-400, hover:text-white. Active link has a 2px bottom border in gradient (blue-500 to cyan-500). Hidden on mobile.
- **Right:** "Surf Forecast" external link (hidden below `sm`) — Inter, `text-xs`, uppercase, tracking-widest, text-gray-400 hover:text-cyan-400, with Waves icon. Hamburger button on mobile.
- **Mobile drawer:** `Sheet` (shadcn/ui) from right, `w-72`, bg-[#0A0F1C], border-white/10. Contains all nav links + Surf Forecast link. Links close the sheet on click.
- **Scroll behavior:** CSS `transition-transform duration-300`. `translateY(-100%)` when hidden, `translateY(0)` when visible.

### 2. Hero

- **Style:** Full viewport height (`h-dvh`), cinematic ocean background with heavy gradient overlay. The typography IS the hero — massive Bebas Neue stacked text.
- **Background:** Existing Unsplash ocean photo (`photo-1518837695005`), `object-cover`, fills 120% height for parallax headroom. Gradient overlay: `from-[#0A0F1C]/70 via-[#0A0F1C]/30 to-[#0A0F1C]` — lets the ocean show through in the middle third.
- **Parallax:** Background image translates at 0.4x scroll speed using Framer Motion `useScroll` + `useTransform`. Content fades out from `opacity 1 → 0` between 0% and 80% scroll progress.
- **Content layout:** Centered vertically and horizontally, `max-w-5xl`, stacked:
  1. **Overline:** "AI-POWERED SURF COACHING" — Inter 500, `text-xs md:text-sm`, uppercase, `tracking-[0.25em]`, text-cyan-500. Fades up with 200ms delay.
  2. **Brand:** "SURFIT.IA" — Bebas Neue, `text-[96px] md:text-[128px] lg:text-[160px]`, white, `leading-[0.85]`. Each letter animates in with a staggered clip-path reveal (left to right, 50ms per letter, 400ms delay from page load). This is the single H1 on the page.
  3. **Tagline:** "Domina la ciencia del surf con inteligencia artificial. AI Surf posture check & correction." — Inter 300, `text-xl md:text-2xl`, text-gray-300, `max-w-2xl mx-auto`. Fades up with 600ms delay.
  4. **CTA:** "Entrar al Dashboard" — `Button` (shadcn/ui), size `lg`, gradient background (blue-500 to cyan-500), white text, Inter 600 uppercase `tracking-[0.1em]`, `rounded-full`, `px-10 md:px-12 py-6 md:py-7`. Glow: `shadow-[0_0_50px_rgba(6,182,212,0.25)]`, hover: `shadow-[0_0_70px_rgba(6,182,212,0.35)] scale-105`. Fades up with 800ms delay.
- **Scroll indicator:** Animated chevron-down icon at bottom center, `text-white/30`, bounces `y: [0, 12, 0]` with `duration: 2.5s, repeat: Infinity, ease: easeInOut`.
- **Heading fix:** This is the ONLY H1 on the page. All section headings below use H2.

### 3. Features Bento Grid (AI Coach + Tools)

- **Section ID:** `#features`
- **Padding:** `py-24 md:py-36 px-4`
- **Container:** `max-w-7xl mx-auto`
- **Section header:** Centered. Overline "Everything You Need" (cyan-500) + H2 "YOUR SURF TOOLKIT" (Bebas Neue, `text-4xl md:text-5xl lg:text-6xl`). Fade-up on scroll.
- **Grid layout:** CSS Grid, `grid-cols-1 md:grid-cols-3`, `gap-4 md:gap-6`

```
Desktop layout:
┌─────────────────────────┬──────────────┐
│                         │              │
│   AI COACH (2col x 2row)│    MEDIA     │
│                         │   (tabs)     │
├────────────┬────────────┼──────────────┤
│            │  GOOGLE    │    WORLD     │
│ SURF SHOP  │  TRAVEL    │  SPOT GALLERY│
└────────────┴────────────┴──────────────┘
```

- **Card style (all cards):** Glassmorphism — `rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08]`. Hover: `bg-white/[0.08] border-white/[0.15] shadow-[0_0_40px_rgba(59,130,246,0.12)] scale-[1.02]`. Transition: `duration-300 ease-out`.

#### AI Coach Card (Hero Card)
- **Grid position:** `md:col-span-2 md:row-span-2`
- **Internal gradient overlay:** `bg-gradient-to-br from-blue-500/10 to-cyan-500/5` behind content
- **Content:**
  - Icon: Upload icon in a `h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500` container
  - Overline: "AI COACH" — cyan-500, uppercase tracking
  - H3: "BIOMECHANICAL ANALYSIS" — Bebas Neue, `text-2xl md:text-3xl`, white
  - Body: "Upload a photo to receive instant AI feedback on your stance, rail work, and gaze. AI Surf posture check & correction powered by computer vision." — Inter, text-gray-400, `text-sm md:text-base`
  - CTA: "Upload Surf Photo" — gradient button with ArrowRight icon, `rounded-full`, glow
- **Decorative:** Subtle wave SVG path in bottom-right corner, `opacity-10`, cyan-500
- **Min height:** `min-h-[320px] md:min-h-[400px]`

#### Media Card
- **Grid position:** `md:col-span-1`
- **Content:** `Tabs` (shadcn/ui) — "Surf Images" and "Videos" tabs
  - Tab list: `bg-white/5 border border-white/[0.08]`
  - Active tab: `bg-white/10 text-white`
  - Images tab: description + "View Gallery" outline button
  - Videos tab: description + "Watch Highlights" outline button
- **Icons:** ImageIcon for images, Play for videos (lucide)

#### Surf Shop Card
- **Icon:** ShoppingBag in `h-9 w-9 rounded-lg bg-orange-500/10`, text-orange-400
- **H3:** "SURF SHOP" — Bebas Neue
- **Body:** "Discover the 10 best surf shops online. Best prices, premium boards, and wetsuits in Europe & World."
- **CTA:** "Open Store List" — ghost button, text-cyan-400, uppercase tracking, ArrowRight icon

#### Google Travel Card
- **Icon:** Globe in `h-9 w-9 rounded-lg bg-blue-500/10`, text-blue-400
- **H3:** "GOOGLE TRAVEL SURF" — Bebas Neue
- **Body:** "Explore the best surf trips and prices to blue destinations worldwide via Google Travel."
- **CTA:** "Book Trip" — ghost button, text-cyan-400

#### World Spot Gallery Card
- **Icon:** MapPin in `h-9 w-9 rounded-lg bg-green-500/10`, text-green-400
- **H3:** "WORLD SPOT GALLERY" — Bebas Neue
- **Body:** "Explore panoramic photos and the best locations where surfing happens globally."
- **CTA:** "View Spots" — ghost button, text-cyan-400

**Mobile:** Single column, all cards full-width, AI Coach card no longer spans 2 rows.

### 4. Adventure & Advice

- **Section ID:** `#adventures`
- **Style:** Full-width section with cinematic background image (existing wave photo `photo-1512100356132`), very low opacity (`opacity-[0.08]`), heavy gradient overlay: `from-[#0A0F1C] via-[#0A0F1C]/95 to-[#0A0F1C]`. Creates atmospheric depth without competing with content.
- **Padding:** `py-24 md:py-36`
- **Container:** `max-w-7xl mx-auto px-4`
- **Header layout:** Flex row on desktop (heading left, CTA right), stacked on mobile.
  - Overline: "Best Trips & Videos" — cyan-500
  - H2: "ADVENTURE & ADVICE" — Bebas Neue, `text-4xl md:text-5xl lg:text-6xl`
  - CTA: "Watch Best Trips" — outline button (`border-white/10 text-white hover:bg-white/10 rounded-full`) with Play icon
- **Card carousel:** Horizontal scroll using `ScrollArea` (shadcn/ui). Flex row, `gap-4 md:gap-6`.
- **Trip cards (5 cards):**
  - Width: `flex-shrink-0 w-[280px] md:w-[340px]`
  - Glass card style with `overflow-hidden`
  - Thumbnail: `aspect-video`, image scales to `110%` on hover (`transition-transform duration-700 ease-out`)
  - Play overlay: centered 48px circle (`bg-white/20 backdrop-blur-sm`), appears on hover with fade
  - Below image: card title (Inter 600, white) + location (Inter, `text-xs`, gray-400)
- **Bottom link:** "YouTube Curated List" — centered, `text-xs`, uppercase tracking, gray-400 hover:cyan-400, ExternalLink icon

#### Trip Data to Preserve
| Title | Location | Thumbnail |
|-------|----------|-----------|
| Bali Dream Session | Uluwatu, Indonesia | `photo-1502680390548-bdbac40c7e54` |
| Nazare Giants | Leiria, Portugal | `photo-1509914398892-963f53e6e2f1` |
| Pipeline Masters | Oahu, Hawaii | `photo-1455729552457-5c322b382249` |
| Mentawai Perfection | Sumatra, Indonesia | `photo-1507525428034-b723cf961d3e` |
| Hossegor Barrels | Landes, France | `photo-1516370873344-fb7c61054fa9` |

### 5. Top 10 World Surf Spots

- **Section ID:** `#spots`
- **Padding:** `py-24 md:py-36 px-4`
- **Container:** `max-w-7xl mx-auto`
- **Header layout:** Flex row on desktop (heading left, "View All" ghost CTA right), stacked on mobile.
  - Overline: "Curated by Elite Wave Hunters" — cyan-500
  - H2: "TOP 10 WORLD SURF SPOTS" — Bebas Neue, `text-4xl md:text-5xl lg:text-6xl`
- **Grid:** `grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5`
- **Top 3 treatment:** Cards #1-3 get a subtle gradient left-border: `border-l-2 border-gradient` (from blue-500 to cyan-500) to visually elevate them.

#### Spot Card Anatomy (each card)
- **Outer:** Glass card — `rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.08]`. Hover: `bg-white/[0.08] border-white/[0.15] shadow-[0_0_30px_rgba(59,130,246,0.1)]`. Full card is clickable to expand/collapse.
- **Collapsed state (always visible):**
  - Row 1: Rank badge (`h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500`, centered `#N` in white bold `text-sm`) | Spot name (Bebas Neue, `text-xl md:text-2xl`, white) + Rating (Star icon filled orange-400, `text-xs font-bold text-orange-400`)
  - Row 2: Location with MapPin icon (gray-400, `text-xs`)
  - Row 3: Food tip + Travel tip — `text-xs text-gray-500`, truncated, separated by `·` on desktop
- **Expanded state (on click/tap):**
  - Animated with `AnimatePresence` — `height: 0 → auto`, `opacity: 0 → 1`, 300ms ease-in-out
  - Separator: `border-t border-white/5`
  - 3-column grid (`sm:grid-cols-3`):
    - Wave Type: label (gray-500 uppercase) + value (white, `text-sm`)
    - Best Season: label + value
    - Local Hazards: label + value (text-red-400)
  - Action buttons row:
    - "Maps" — outline button, `rounded-full text-xs`, Map icon
    - "Forecast" — outline button, `rounded-full text-xs`, Waves icon
    - "Ask Coach" — gradient button (blue-500 to cyan-500), `rounded-full text-xs`, MessageCircle icon, pushed to `ml-auto`
- **Ask Coach icon button:** Also visible in collapsed state (top-right), ghost variant, MessageCircle icon
- **Chevron:** Rotates 180deg when expanded, gray-500, `transition-transform duration-300`
- **shadcn/ui:** `Card` for structure, `Button` for all actions, `Badge` for ranking, `Collapsible` or custom AnimatePresence for expand.

### 6. Footer

- **Style:** `border-t border-white/5 bg-[#0A0F1C]`
- **Padding:** `py-12 md:py-16 px-4`
- **Container:** `max-w-7xl mx-auto`
- **Layout:** 4-column grid on desktop (`grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`)
  - **Column 1 (Brand):** `col-span-2 md:col-span-1`. Waves icon + "SURFIT.IA" (Bebas Neue, `text-xl`, white). Description: "AI-powered surf coaching. Analyze your technique, explore the world's best waves, and plan your next adventure." — Inter, `text-sm`, gray-500.
  - **Column 2 (Features):** H4 "FEATURES" (Inter, `text-xs`, uppercase, tracking, gray-400). Links: AI Coach, Surf Shop, Travel, Spot Gallery.
  - **Column 3 (Explore):** H4 "EXPLORE". Links: Top 10 Spots, Adventures, Best Trips.
  - **Column 4 (External):** H4 "EXTERNAL". Links: Surf Forecast (opens new tab), YouTube (opens new tab).
- **Bottom bar:** `Separator` (shadcn/ui, `bg-white/5`, `my-8`) then flex row: copyright left ("2026 SURFIT.IA. All rights reserved."), Privacy + Terms links right. `text-xs text-gray-600`.
- **ARIA:** `<footer role="contentinfo">`, links have descriptive text, external links have `rel="noopener noreferrer"` and `aria-label` indicating they open in a new tab.

---

## shadcn/ui Components

| Component | Usage | Customization |
|-----------|-------|---------------|
| `Button` | All CTAs | Variants: `default` (gradient bg from-blue-500 to-cyan-500, white text, rounded-full, glow shadow), `outline` (border-white/10, text-white, hover:bg-white/10, rounded-full), `ghost` (text-cyan-400, no bg, hover:bg-white/5) |
| `Card` | Feature cards, spot cards, adventure cards | Glass style: bg-white/5 backdrop-blur-xl border-white/[0.08] rounded-2xl |
| `Badge` | Ranking badges (#1-#10), difficulty levels | Gradient bg (blue-500 to cyan-500), white text, rounded-xl |
| `Sheet` | Mobile navigation drawer | Side="right", w-72, bg-[#0A0F1C], border-white/10 |
| `Tabs` | Media section (Images / Videos) | TabsList: bg-white/5 border-white/[0.08]. Active trigger: bg-white/10 text-white |
| `Collapsible` | Spot card expandable details | AnimatePresence for height animation |
| `Tooltip` | Section nav dot labels, icon hints | bg-white/10 backdrop-blur-sm text-white text-xs |
| `Separator` | Footer divider, section borders | bg-white/5 |
| `ScrollArea` | Adventure horizontal scroll | Hide scrollbar, smooth momentum scroll |

---

## Motion & Interaction

### Library
Framer Motion (already installed). Consider adding Lenis for smooth scroll behavior (optional enhancement).

### Page Load — Hero Sequence
| Step | Element | Animation | Delay | Duration | Easing |
|------|---------|-----------|-------|----------|--------|
| 1 | Overline "AI-POWERED..." | `opacity: 0→1, y: 20→0` | `0.2s` | `0.6s` | `ease-out` (Framer: `[0, 0, 0.2, 1]`) |
| 2 | Brand "SURFIT.IA" | Clip-path reveal per letter: `inset(0 100% 0 0) → inset(0 0% 0 0)` | `0.4s` + `50ms/letter` stagger | `0.6s/letter` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| 3 | Tagline | `opacity: 0→1, y: 20→0` | `0.6s` | `0.6s` | `ease-out` |
| 4 | CTA Button | `opacity: 0→1, y: 20→0, scale: 0.95→1` | `0.8s` | `0.5s` | `ease-out` |
| 5 | Scroll chevron | `opacity: 0→1` then loop `y: [0, 12, 0]` | `1.5s` | `0.4s` fade, `2.5s` loop | `ease-in-out` |

### Hero Parallax
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);      // background moves at 0.4x
const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // content fades out
```

### Scroll-Triggered Section Animations
- **Section headings:** `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}`
- **Overlines:** Same as headings but `y: 20` and `delay: 0` (headings get `delay: 0.1`)
- **Cards in grid:** Stagger children — each card gets `delay: index * 0.1`, max total stagger 0.5s. `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, ease: "easeOut" }}`
- **Adventure trip cards:** Same stagger pattern, `delay: index * 0.1`
- **Spot cards:** `delay: index * 0.08`, `y: 30→0`, `duration: 0.5`

### Hover Effects
| Element | Effect | Timing |
|---------|--------|--------|
| Glass cards | `scale: 1→1.02`, border `white/[0.08]→white/[0.15]`, bg `white/5→white/[0.08]`, `shadow-[0_0_40px_rgba(59,130,246,0.12)]` | `300ms ease-out` |
| CTA buttons (gradient) | `scale: 1→1.05`, glow `30px→70px spread`, gradient shifts one stop lighter | `300ms ease-out` |
| CTA buttons (pressed) | `scale: 1→0.95` | `100ms ease-in` |
| Outline/ghost buttons | `bg-transparent→bg-white/10` | `200ms ease-out` |
| Nav links | Underline slides in: `width: 0→100%` from left, 2px gradient bar | `300ms ease-out` |
| Trip card thumbnails | Image `scale: 1→1.10`, play overlay `opacity: 0→1` | Image: `700ms ease-out`, overlay: `300ms ease-out` |
| Spot cards | Card glow + border brighten (no scale — avoid jitter in dense grid) | `300ms ease-out` |
| Footer links | `text-gray-500→text-white` | `200ms ease-out` |

### Expand/Collapse (Spot Cards)
```tsx
<AnimatePresence>
  {expanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
      {/* expanded content */}
    </motion.div>
  )}
</AnimatePresence>
```
Chevron rotation: `rotate(0deg)→rotate(180deg)`, `300ms ease-out`.

### Sticky Section Nav Transitions
- Active dot: `scale: 1→1.5`, fill transitions from `bg-white/20` to `bg-gradient-to-r from-blue-500 to-cyan-500`, `200ms ease-out`
- Tooltip: `opacity: 0→1, x: 10→0`, `150ms ease-out`, shows after 300ms hover delay

---

## Dark/Light Mode

- **Default and only mode:** Dark. The cinematic ocean aesthetic is the brand. No light mode toggle.
- **Implementation:** `darkMode: 'class'` in Tailwind config, `<html class="dark">` always set. All colors are authored for dark background.
- **System preference:** Ignored. Force dark always via `<meta name="color-scheme" content="dark" />`.

---

## SEO & Accessibility Fixes

### SEO (fixes for missing elements)
- **Title tag:** `<title>SURFIT.IA — AI-Powered Surf Coaching & Wave Guide</title>`
- **Meta description:** `<meta name="description" content="Analyze your surf technique with AI, explore the world's top 10 surf spots, find the best gear, and plan your next wave adventure." />`
- **Canonical:** `<link rel="canonical" href="https://waveridersurf.com/" />`
- **OG tags:**
  ```html
  <meta property="og:title" content="SURFIT.IA — AI-Powered Surf Coaching & Wave Guide" />
  <meta property="og:description" content="Analyze your surf technique with AI, explore the world's top 10 surf spots, and plan your next wave adventure." />
  <meta property="og:image" content="https://waveridersurf.com/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://waveridersurf.com/" />
  ```
- **Language:** `<html lang="en">` — standardize to English. Keep "Entrar al Dashboard" as the Spanish-flavor CTA for brand identity. Consider full i18n later.
- **Heading hierarchy:** Single H1 (hero "SURFIT.IA"), all sections use H2, card titles use H3. No duplicate H1s.

### Accessibility
- **ARIA labels:** All icon-only buttons get `aria-label` (e.g., "Ask Coach about Pipeline", "Open navigation menu", "Close navigation menu")
- **Focus styles:** `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500` on all interactive elements
- **Keyboard nav:** All expandable cards support Enter/Space to toggle. Tab order follows visual flow. Sheet can be closed with Escape.
- **Color contrast:** White (#FFFFFF) on #0A0F1C background = 16.37:1 ratio (AAA). Gray-400 (#9CA3AF) on #0A0F1C = 6.43:1 (AA). Gray-500 (#6B7280) on #0A0F1C = 4.2:1 (AA for large text only — used only for labels/captions).
- **Body text minimum:** 16px on all viewports. Fixes the current 9-10px mobile issue.
- **Reduced motion:** Wrap all Framer Motion animations in `useReducedMotion()` check. When `prefers-reduced-motion: reduce`, disable parallax, stagger, and scale effects. Keep simple opacity fades.
- **Skip to content:** Hidden link before header: "Skip to main content" → `#main-content`. Visible on focus.

---

## Content to Preserve

### Hero
- Brand: "SURFIT.IA"
- Overline: "AI-POWERED SURF COACHING"
- Tagline: "Domina la ciencia del surf con inteligencia artificial. AI Surf posture check & correction."
- CTA: "Entrar al Dashboard"

### AI Coach / Features
- H2: "YOUR SURF TOOLKIT"
- AI Coach overline: "AI COACH"
- AI Coach H3: "BIOMECHANICAL ANALYSIS"
- AI Coach body: "Upload a photo to receive instant AI feedback on your stance, rail work, and gaze. AI Surf posture check & correction powered by computer vision."
- AI Coach CTA: "Upload Surf Photo"
- Media tab labels: "Surf Images", "Videos"
- Media CTAs: "View Gallery", "Watch Highlights"
- Surf Shop H3, body, CTA: "Open Store List"
- Google Travel H3, body, CTA: "Book Trip"
- World Spot Gallery H3, body, CTA: "View Spots"

### Adventure & Advice
- Overline: "Best Trips & Videos"
- H2: "ADVENTURE & ADVICE"
- CTA: "Watch Best Trips"
- Bottom link: "YouTube Curated List"

### Top 10 World Surf Spots — Full Data

| Rank | Rating | Name | Location | Food Tip | Travel Tip | Wave Type | Best Season | Hazards |
|------|--------|------|----------|----------|------------|-----------|-------------|---------|
| 1 | 5.0 | Pipeline | Oahu, Hawaii | Fresh Poke Bowls at Kahuku Supermarket | The ultimate proving ground. Winter is for pros. | Hollow Reef Break | November - February | Shallow reef, extreme crowds, heavy localism |
| 2 | 5.0 | Teahupo'o | Tahiti, French Polynesia | Poisson Cru (Raw fish with coconut milk) | End of the road. Take a taxi boat to watch safely. | Heavy Slab / Reef Break | May - August | Extremely shallow reef, heavy lip, remote location |
| 3 | 4.9 | Uluwatu | Bali, Indonesia | Nasi Goreng at the cliffside warungs | Spiritual center. Rent a scooter to explore the Bukit. | Long Left Reef Break | April - October | Sharp reef, strong currents, cave entry/exit |
| 4 | 4.9 | Jeffreys Bay | Eastern Cape, South Africa | Braai (BBQ) and fresh calamari | Endless right handers. Visit Addo Elephant Park nearby. | Long Right Point Break | June - August | Sharks, cold water, long paddle outs |
| 5 | 4.8 | Cloud 9 | Siargao, Philippines | Kinilaw and sweet island mangoes | Tropical paradise. Island hopping is a must. | Hollow Right Reef Break | September - November | Sharp reef, shallow at low tide, crowds |
| 6 | 4.8 | Mavericks | California, USA | Clam Chowder at Half Moon Bay Brewing | Cold, heavy water. Watch from the cliffs during swells. | Big Wave Reef Break | November - March | Extreme size, cold water, rocks, sharks |
| 7 | 5.0 | Nazare | Leiria, Portugal | Grilled Sardines and Vinho Verde | Home of giants. Visit the Fort of Sao Miguel Arcanjo. | Giant Beach Break | October - March | Extreme size, heavy currents, jet ski traffic |
| 8 | 4.7 | Gold Coast | Queensland, Australia | Aussie Meat Pies and Flat Whites | The Superbank. Surfers Paradise nightlife is legendary. | Long Right Point Break | February - May | Extreme crowds, sharks, strong sweep |
| 9 | 4.8 | Puerto Escondido | Oaxaca, Mexico | Fish Tacos and Oaxacan Mezcal | Mexican Pipeline. Great for advanced tubers and sunset lovers. | Heavy Beach Break | May - August | Heavy currents, broken boards, dangerous shorebreak |
| 10 | 4.8 | Hossegor | Landes, France | Fresh Croissants and Bordeaux Wine | European surf capital. Best sandbars in the world. | Hollow Beach Break | September - November | Heavy shorebreak, strong currents, shifting peaks |

Each spot card includes: Maps link, Forecast link, Ask Coach CTA.

### Section Headers (Overlines + H2s)
- Spots overline: "Curated by Elite Wave Hunters"
- Spots H2: "TOP 10 WORLD SURF SPOTS"

### Images
| Image | URL | Usage |
|-------|-----|-------|
| Hero ocean | `https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2670&auto=format&fit=crop` | Hero background |
| Wave background | `https://images.unsplash.com/photo-1512100356132-d324c38c7941?q=80&w=2670&auto=format&fit=crop` | Adventure section background |
| Bali Dream | `https://images.unsplash.com/photo-1502680390548-bdbac40c7e54?q=80&w=800&auto=format&fit=crop` | Trip card thumbnail |
| Nazare Giants | `https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?q=80&w=800&auto=format&fit=crop` | Trip card thumbnail |
| Pipeline Masters | `https://images.unsplash.com/photo-1455729552457-5c322b382249?q=80&w=800&auto=format&fit=crop` | Trip card thumbnail |
| Mentawai Perfection | `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop` | Trip card thumbnail |
| Hossegor Barrels | `https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?q=80&w=800&auto=format&fit=crop` | Trip card thumbnail |

### External Links
- Surf Forecast: `https://www.windy.com/?waves,30.392,-28.125,3`

### Footer
- Brand description: "AI-powered surf coaching. Analyze your technique, explore the world's best waves, and plan your next adventure."
- Copyright: "2026 SURFIT.IA. All rights reserved."
- Footer link columns: Features (AI Coach, Surf Shop, Travel, Spot Gallery), Explore (Top 10 Spots, Adventures, Best Trips), External (Surf Forecast, YouTube)
- Legal: Privacy, Terms

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Notes |
|------------|-------|-------------|
| Mobile | `< 640px` | Single column, stacked cards, hamburger nav, section nav as bottom-right pill, hero text `text-[96px]`, body `text-base` (16px min) |
| Tablet | `640-1023px` | 2-column grids where sensible, reduced spacing, section nav still as pill, hero text `text-[128px]` |
| Desktop | `1024px+` | Full 3-col bento grid, 2-col spots grid, floating dot nav on right, hero text `text-[160px]` |
| Wide | `1280px+` | Max container `max-w-7xl` (1280px), centered, generous padding |

---

## File/Component Structure

```
components/
├── section-nav.tsx         — sticky floating section dots (NEW)
├── site-header.tsx         — sticky nav with scroll show/hide
├── hero.tsx                — full-screen cinematic hero with parallax
├── features-grid.tsx       — bento grid (AI coach, media, shop, travel, spots)
├── adventure.tsx           — trip cards horizontal scroll + background
├── surf-spots.tsx          — top 10 section header + grid
├── spot-card.tsx           — individual expandable spot card
├── site-footer.tsx         — full 4-column footer
└── ui/                     — shadcn/ui primitives (Button, Card, Badge, Sheet, Tabs, Collapsible, Tooltip, Separator, ScrollArea)
```

---

## Key Differences from v3

| Aspect | v3 | v4 Direction A |
|--------|-----|----------------|
| Display font | Space Grotesk | Bebas Neue (condensed, more cinematic/editorial) |
| Background | `#020617` (slate-950) | `#0A0F1C` (warmer deep navy) |
| Primary accent | `#2563EB` (blue-600) | `#3B82F6` (blue-500, one stop brighter) |
| Orange role | Warning only | Promoted to highlight accent (ratings, badges) |
| Hero text size | 96-128px | 96-160px (larger on wide screens) |
| Hero animation | Simple fade-up | Per-letter clip-path reveal |
| Section nav | Anchor links in header only | Dedicated sticky floating dot nav |
| Section heading size | `text-3xl→5xl` | `text-4xl→6xl` (bigger to match typography-led direction) |
| Card borders | `white/10` | `white/[0.08]` (subtler at rest, more contrast on hover) |
| Body min size | 9-10px on mobile (broken) | 16px minimum everywhere (fixed) |
| SEO | Missing meta/OG/canonical | All present |
| Heading hierarchy | Two H1s | Single H1 in hero |
| Footer | Copyright only (original) / Full (v3) | Full 4-column with legal links |
| Accessibility | Missing ARIA labels | Full ARIA, focus styles, skip-to-content, reduced-motion |
