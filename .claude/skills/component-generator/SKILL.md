---
name: component-generator
description: >
  Generate professional React/Tailwind/shadcn-ui landing page components by writing code directly.
  Takes a design spec and content from an analyzer report, then produces one standalone .tsx file
  per section. Triggers: "generate components", "create the UI", "build the components".
  Replaces v0-generator — no external API needed.
---

# Component Generator

Generate production-quality React components for each landing page section by writing code
directly. Each component is a standalone `.tsx` file ready for assembly into a Next.js project.

## Working Directory

All paths below are relative to `{workdir}`, set by the orchestrator.
When running standalone, `{workdir}` defaults to `.redesign/`.

## Input

- `{workdir}/design-spec.md` — approved design specification (colors, fonts, layout, components, motion)
- `{workdir}/analysis-report.md` — content inventory (headings, text, CTAs, images, links)

Read both files. If either is missing, tell the user which skill to run first.

## Output

Save generated components to `{workdir}/components/`. File names are kebab-case, derived from
the section names in the design spec (e.g., "Header / Navigation" → `site-header.tsx`).

## Tech Stack

Every component uses this stack — do not deviate:

- **React 19** with TypeScript
- **Tailwind CSS v4** utility classes (no inline styles, no CSS modules, no styled-components)
- **shadcn/ui** primitives imported from `@/components/ui/*`
- **Lucide React** icons imported from `lucide-react`
- **Framer Motion** for scroll/hover animations (when the spec calls for motion)
- **`"use client"`** directive on every component (client-side rendering)

## Workflow

### 1. Parse Inputs

Read both input files and extract:

**From the design spec:**
- Color palette (exact Tailwind classes from the Tailwind column)
- Gradient definitions (exact Tailwind gradient classes)
- Typography (fonts, scale table with sizes/weights per element)
- Section list (every section under "Layout & Sections" — this defines the component list)
- shadcn/ui component mapping table
- Motion & interaction specs (exact animation values, timing, easing)
- Responsive breakpoints and layout notes
- Dark/light mode config

**From the analysis report:**
- Exact text content per section (headings, body text, descriptions)
- Exact CTA text and link targets
- Image URLs and alt text
- External links to preserve
- Navigation structure
- All data (e.g., spot names, ratings, locations — every detail)

### 2. Plan Components

Map each section from the design spec to a component file:

| Section | File | shadcn/ui Components |
|---------|------|---------------------|
| Header / Navigation | `site-header.tsx` | Sheet, Button |
| Hero | `hero.tsx` | Button |
| ... | ... | ... |
| Footer | `site-footer.tsx` | Separator |

Present this plan to the user. Wait for confirmation before generating.

### 3. Generate Each Component

Write one `.tsx` file per section. Generate in this order:
1. Header/Navigation (sets the visual tone)
2. Hero (highest visual impact)
3. Main content sections (in page order)
4. Footer (simplest, do last)

For each component, follow the **Component Structure** and **Quality Checklist** below.

### 4. Verify

After generating all components:
- Read back each file
- Check all imports are consistent (`@/components/ui/*`, `lucide-react`, `framer-motion`)
- Check no placeholder text exists — all content must come from the analysis report
- Check color classes match the design spec palette exactly
- List any shadcn/ui components that need to be installed during assembly

### 5. Present for Review

Show the user:
- List of generated files with a one-line description each
- List of shadcn/ui components required (for Skill 5 to install)
- List of npm dependencies required beyond the base setup (e.g., `framer-motion`)
- Any decisions or trade-offs made during generation

This is a **gate** — wait for approval before proceeding to assembly.

---

## Component Structure

Every component file must follow this structure:

```tsx
"use client"

import { useState } from "react"                    // React hooks (only what's needed)
import { motion, useScroll, useTransform } from "framer-motion"  // Framer Motion (if animated)
import { Button } from "@/components/ui/button"      // shadcn/ui primitives
import { ChevronDown } from "lucide-react"           // Lucide icons

export default function SectionName() {
  // State and refs (if needed)
  // Animation config (variants, transforms)

  return (
    <section className="..." aria-label="...">       {/* Semantic HTML + a11y */}
      {/* Content from analysis report — hardcoded, never placeholder */}
    </section>
  )
}
```

**Rules:**
- One default export per file (named function, not arrow)
- No props — all content is hardcoded from the analysis report
- No external data fetching — everything is static
- TypeScript interfaces for internal data structures (e.g., spot data arrays)
- Keep component files self-contained — no imports from other generated components

---

## Image Sourcing Strategy

Before generating components, choose an image strategy. Document the choice in a comment at
the top of each component that uses images.

**Option 1 — Preserve originals (default):**
Copy `<img src>` URLs directly from the analysis report's image inventory. Fastest approach;
guaranteed to match brand identity. Use this unless the user requests otherwise.

**Option 2 — Unsplash (distinct per direction):**
Use `https://images.unsplash.com/photo-{id}?w=1600&auto=format&fit=crop`. The analyzer
captures multiple images from the original site — use **different photo IDs per direction**.
Never use the same Unsplash URL in two different design directions.

**Option 3 — AI-generated (user opt-in only):**
If the user explicitly requests AI-generated images, provide Midjourney or Stable Diffusion
prompts as comments in the component. Do not call external APIs automatically.

**Option 4 — Pexels API (keyword-driven):**
`https://api.pexels.com/v1/search?query={keyword}` — requires a free API key from pexels.com.
Good for finding thematic photos when the original site has no suitable images.

**Rule:** Each design direction MUST use visually distinct imagery. Identical `<img src>` values
across directions A, B, and C are a quality failure.

---

## Link & Language Rules

These rules exist because generated components have historically produced dead links and
language-inconsistent content. Follow them without exception.

### Link Integrity

Every `<a>` element MUST have a non-empty `href` that is one of:
- A real URL (`https://...`)
- A valid section anchor (`#features`, `#spots`, `#ai-coach`, etc.)
- A documented placeholder: `href="#TODO-replace"` with an inline comment explaining the target

**Never emit `href="#"` alone.** This is a silent dead link that passes visual review but
breaks navigation. When the real URL is unknown, use `href="#TODO-dashboard-url"` (or similar)
and add a `{/* TODO: Replace with actual URL */}` comment immediately above.

**Authenticated resource links (dashboard, login, app):**
If the analysis report flags a CTA as pointing to an authenticated resource, preserve the URL
exactly. If the URL was not captured, use `href="#TODO-dashboard-url"` — never silently omit
the link or leave the button without an href.

**Footer legal links (Privacy Policy, Terms of Service):**
These must either link to real pages or be **removed entirely**. Do not leave them as `href="#"`.
If the original site has no privacy policy, remove the footer link.

**shadcn/ui Button + anchor pattern:**
When a `<Button>` must navigate, the `<a>` goes *inside* the Button using `asChild`:
```tsx
// ✅ Correct
<Button asChild className="...">
  <a href="https://..." target="_blank" rel="noopener noreferrer">Label</a>
</Button>

// ❌ Wrong — <a> outside <Button> loses Button styling
<a href="..."><Button>Label</Button></a>

// ❌ Wrong — <a> inside <Button> without asChild = nested interactives + hydration error
<Button><a href="...">Label</a></Button>
```

### Language Consistency

1. Check `meta[lang]` (or the page's declared primary language) from the analysis report.
2. All user-visible text must be in that language — no mixing.
3. If the original site has a language mismatch (e.g., `lang="en"` page but Spanish CTAs):
   - Default to the declared language (English if `lang="en"`)
   - Add a comment: `{/* TODO: Original CTA was "Entrar al Dashboard" — translate as needed */}`
   - Do NOT silently keep the mismatched language
4. If a language toggle UI element is included in the design spec, it MUST be functional.
   Minimum implementation: `useState<'en'|'es'>('en')` with conditional rendering of two text
   sets. Never add a toggle button that has no `onClick` handler.

---

## Quality Checklist

Every generated component MUST satisfy ALL of these:

- [ ] `"use client"` directive as the first line
- [ ] Single default export (named function matching the component purpose)
- [ ] Tailwind v4 utility classes only (no inline `style={}`, no CSS modules)
- [ ] shadcn/ui primitives from `@/components/ui/*` (never raw HTML for buttons, cards, etc.)
- [ ] Icons from `lucide-react` (never inline SVGs, never other icon libraries)
- [ ] Framer Motion for animations specified in the design spec
- [ ] Responsive: mobile-first classes (base → `sm:` → `md:` → `lg:` → `xl:`)
- [ ] Real content from the analysis report (zero placeholder text — no "Lorem ipsum", no "Your text here")
- [ ] Semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`, `<h1>`-`<h3>`)
- [ ] `aria-label` on sections and interactive elements
- [ ] Colors match design spec exactly (use the Tailwind column values)
- [ ] Typography matches spec scale table (font family, size, weight per element type)
- [ ] Gradients match spec gradient definitions exactly
- [ ] Hover/focus states on all interactive elements
- [ ] Minimum 16px body text (never smaller on mobile)
- [ ] No `href="#"` — every link has a real target, `#section-id`, or `#TODO-replace` with comment
- [ ] No navigational `<Button>` without `asChild` — when a Button links somewhere, use `<Button asChild><a href="...">text</a></Button>`; never nest `<a>` inside `<Button>` without `asChild`, and never nest `<Button>` inside `<a>` — both produce invalid HTML
- [ ] `<SheetTrigger asChild>` — always pass `asChild` to SheetTrigger; omitting it creates a `<button>` inside `<button>` and causes a React hydration error
- [ ] Language consistency — all text matches the page's declared `lang` attribute
- [ ] Language toggle (if present) is functional — has `useState` + conditional rendering
- [ ] Image sources are distinct from other design directions (no shared `<img src>` across A/B/C)
- [ ] Unsplash photo IDs are verified working — if an ID cannot be confirmed (e.g., no prior screenshot evidence), prefer photo IDs already confirmed in this project or use the original site's images instead
- [ ] Section assembly order matches the design spec's "Section Assembly Order" table — if the spec doesn't have one, raise it before generating `page.tsx`
- [ ] At least one direction has a different section order from the others (e.g., SurfSpots before FeaturesGrid in direction C vs A/B)

---

## Pattern Reference

Proven patterns from previous successful generations. Use these as starting points
and adapt to the design spec's specific requirements.

### Sticky Header with Scroll Detection

```tsx
const [scrolled, setScrolled] = useState(false)
const [hidden, setHidden] = useState(false)
const lastScrollY = useRef(0)

useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY
    setScrolled(currentY > 50)
    setHidden(currentY > lastScrollY.current && currentY > 200)
    lastScrollY.current = currentY
  }
  window.addEventListener("scroll", handleScroll, { passive: true })
  return () => window.removeEventListener("scroll", handleScroll)
}, [])
```
Header classes: `fixed top-0 w-full z-50 transition-all duration-300`
Scrolled state: `backdrop-blur-xl bg-{background}/80 border-b border-{border}`

### Parallax Hero

```tsx
const { scrollYProgress } = useScroll()
const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

<motion.div style={{ y: backgroundY }} className="absolute inset-0">
  <img src="..." alt="..." className="w-full h-full object-cover" />
</motion.div>
```

### Scroll-Triggered Fade-Up

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" }
  })
}

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  custom={index}
  variants={fadeUp}
>
```

### Glass Card

```tsx
<Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10
  hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
  transition-all duration-300 group">
```

### Gradient CTA Button

```tsx
<Button className="bg-gradient-to-r from-{primary} to-{accent}
  hover:shadow-[0_0_40px_rgba({accent-rgb},0.3)]
  hover:scale-105 transition-all duration-300">
  {CTA text from analysis report}
</Button>
```

### Expandable Card with AnimatePresence

```tsx
const [expanded, setExpanded] = useState(false)

<AnimatePresence>
  {expanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Expanded content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Staggered Grid Children

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeUp}>
      {/* Card content */}
    </motion.div>
  ))}
</motion.div>
```

### Mobile Navigation with Sheet

```tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="bg-{background} border-{border}">
    {/* Mobile nav links */}
  </SheetContent>
</Sheet>
```

### Bento Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Hero card spans 2 columns */}
  <div className="md:col-span-2 md:row-span-2">
    <Card>...</Card>
  </div>
  {/* Regular cards */}
  <div><Card>...</Card></div>
  <div><Card>...</Card></div>
  <div><Card>...</Card></div>
</div>
```

---

## Adapting Patterns to the Design Spec

The patterns above are **starting points**. Always adapt them to match the design spec:

- **Direction A (Cinematic Dark):** Use glass cards, parallax hero, gradient glow effects.
  Animations are smooth and cinematic (600ms, easeOut).
- **Direction B (Clean Minimal Tech):** Use solid surface cards, no glass/blur. Minimal
  motion (300ms fade-ups only). Clean borders, no glow. Structured data layouts.
- **Direction C (Bold Energetic Sport):** Use solid colored card backgrounds (not glass).
  Aggressive motion (clip-path reveals, spring physics, text scramble). Bold color accents
  on cards and CTAs.

Read the design spec's Motion & Interaction section carefully — it has the exact values.

---

## Direction Differentiation Requirements

When generating components for multiple design directions (A, B, C) for the same site, each
direction MUST differ in at least **two of the following five dimensions** beyond color palette:

| Dimension | What to vary |
|-----------|-------------|
| **Section order** | Direction B might lead with AI Coach before a standard hero; C might open with a full-bleed video/image grid |
| **Layout pattern per section** | A = bento grid for features; B = horizontal data table layout; C = card carousel |
| **Typography scale emphasis** | A = large display headers (96–160px), minimal body; B = medium headers with dense data body; C = mid-size headers with oversized stat callouts |
| **Content focus** | A = emotional/aspirational copy; B = functional/technical copy ("Upload → Analyze → Improve"); C = action/sport energy copy ("Ride. Compete. Dominate.") |
| **CTA tone** | A = aspirational ("Discover your wave"); B = functional ("Start analysis"); C = energetic ("Go surf it") |

**Rule:** If you find that directions A, B, and C share the same section layout for more than
2 sections, stop and revisit the design spec. Ask: does the spec actually define structural
differences, or only aesthetic (color/font) ones? If the spec is under-differentiated, apply
the dimension table above to force meaningful layout variation before generating.

**Image rule (repeated for emphasis):** Never use the same `<img src>` value across two
different directions. Pick a distinct representative image for each direction that matches
its emotional tone.
