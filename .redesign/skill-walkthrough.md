# Skill Walkthrough Progress

**URL:** https://waveridersurf.com
**Started:** 2026-03-26

## Progress

| # | Skill | Status | Notes |
|---|-------|--------|-------|
| 1 | webapp-analyzer | DONE | Refactored scripts, smart link grouping, updated MCP tool names |
| 2 | design-researcher | DONE | Independence principle, multi-direction output, 5-query search strategy |
| 3 | design-spec | DONE | Direction selection, dynamic sections, enhanced templates, 3 directions generated |
| 4 | component-generator | DONE | Replaced v0-generator — Claude writes code directly, no external API |
| 5 | nextjs-assembler | DONE | Tailwind v4 update, font enforcement, 10-step workflow, 3 projects assembled |
| 6 | live-reviewer | PENDING | |

---

## Skill 1: webapp-analyzer

### Review Date: 2026-03-26

### What it does
Crawls a live website via Chrome DevTools MCP tools and extracts everything needed for a redesign. Runs in 6 phases:

1. **Page Discovery** — smart link grouping with trie-based URL analysis, SPA scroll section detection, site type classification
2. **Visual Capture** — screenshots at 3 breakpoints (1440px, 768px, 375px)
3. **Content Extraction** — headings, body text (10k char cap), images, CTAs, forms, meta tags
4. **Structure & Components** — DOM landmarks, repeated class patterns, framework detection
5. **Design Tokens** — CSS variables, colors, fonts, spacing, border radii, layout patterns
6. **API & Data Surface** — network requests, client-side state, third-party dependencies

### Output
- `analysis-report.md` — structured markdown with 7 sections (includes site type and screenshot paths)
- `screenshots/` — desktop, tablet, mobile captures

### Tools Required
- `mcp__chrome-devtools__list_pages`, `navigate_page`, `evaluate_script`, `resize_page`, `take_screenshot`, `take_snapshot`, `list_network_requests`

### Strengths (from v1 output review)
- Comprehensive report covering all 7 sections with real data
- Well-organized color table with role/value/notes
- Full content inventory with specific text for each section
- Good redesign signals section with actionable items
- Component patterns identified (glass card, pill button, spot card, etc.)

### Issues Found
1. Flat link list capped at 50 — no grouping, no SPA scroll detection
2. Outdated MCP tool names (e.g., `javascript_tool` instead of `evaluate_script`)
3. Inline JS blocks cluttering SKILL.md (5 large code blocks)
4. Content text capped at 5000 chars — too short for long single-page sites
5. Screenshot file paths not referenced in the report
6. No site type classification (SPA vs multi-page)

### Changes Made
1. **Extracted all JS into `scripts/` folder** — 6 separate `.js` files + `scripts.py` Python loader
2. **Rewrote Phase 1 with smart link grouping** — trie-based URL grouping, dynamic segment detection, SPA scroll sections, site type classification (`spa`/`multi-page`/`hybrid`), auto-selected representatives per group
3. **Updated all MCP tool names** to actual Chrome DevTools MCP names
4. **Increased content text cap** from 5000 to 10000 chars
5. **Added screenshot path references** to report template
6. **Added site type** to report header
7. **Added Scripts and MCP Tools Reference tables** to SKILL.md for clarity
8. **Cleaned up SKILL.md** — removed inline code blocks, now references external scripts

### Files Created/Modified
- `scripts/page_discovery.js` — NEW (smart grouping algorithm)
- `scripts/nav_extraction.js` — extracted from SKILL.md
- `scripts/content_extraction.js` — extracted + text cap increased to 10k
- `scripts/component_detection.js` — extracted from SKILL.md
- `scripts/design_tokens.js` — extracted from SKILL.md
- `scripts/api_surface.js` — extracted from SKILL.md
- `scripts/scripts.py` — NEW (Python loader for all JS scripts)
- `SKILL.md` — rewritten with all improvements

### Pending Verification
- [x] Run skill against https://waveridersurf.com to test Phase 1 smart grouping live

---

## Skill 2: design-researcher

### Review Date: 2026-03-26

### What it does
Researches current design trends for a specific industry using WebSearch and produces a trend summary with multiple design direction options. Acts as an **independent researcher** — does not decide what to keep or change from the existing site (that's Skill 3's job).

### Input
- Industry keyword (auto-detected from analyzer report or user-provided)
- Optional reference URLs
- Optional analyzer report (for industry detection only)

### Output
- `trend-research.md` — industry trends overview, 3-5 trending patterns, 2-3 design directions with color/typography/patterns each, color and typography trend sections

### Tools Required
- `WebSearch`, `WebFetch`, `Read`

### Strengths (from v1 output review)
- Good pattern recommendations with real examples
- Implementation hints with specific Tailwind/shadcn approaches
- Color and typography sections with concrete values
- Summary connecting recommendations to site context

### Issues Found
1. Not independent — v1 output cross-referenced the analyzer report, mixing research with design decisions
2. Single recommendation set — no alternative directions for Skill 3 to choose from
3. Only 3 search queries — missed UX-specific and visual identity searches
4. Hardcoded trend list was the primary source instead of actual search results
5. Industry detection was ad-hoc with no structured approach
6. Output lacked an "Industry Trends Overview" section for broader context

### Changes Made
1. **Added independence principle** — skill researches trends purely on industry merit, does not cross-reference with analyzer report
2. **Multiple design directions** — output now includes 2-3 coherent direction options (e.g., "Cinematic Dark Immersive" vs "Clean Minimal Tech" vs "Bold Energetic Sport"), each with color palette, typography, key patterns, and reference sites
3. **5-query search strategy** — broad trends, Awwwards/Behance examples, real references, UX patterns, color/typography trends
4. **Search-first pattern extraction** — patterns come from actual search results; hardcoded list is now a reference checklist only
5. **Structured industry detection** — explicit steps to infer industry from analyzer report content
6. **Added Industry Trends Overview section** — 2-3 paragraph context before diving into patterns
7. **User picks a direction** — Step 6 now asks user to choose or mix directions, which feeds into Skill 3

### Files Modified
- `SKILL.md` — rewritten with all improvements

### Test Output
- `.redesign/waveridersurf.com/v4/trend-research.md` — full output with 5 patterns, 3 directions, color/typography trends

---

## Skill 3: design-spec

### Review Date: 2026-03-26

### What it does
Combines the webapp-analyzer output (what the site IS) with the design-researcher output (what's trending) into a single design specification document. This spec becomes the single source of truth for all downstream generation and assembly.

### Input
- `analysis-report.md` — content, tokens, components, redesign signals
- `trend-research.md` — patterns, 2-3 design directions, color/typography trends

### Output
- `design-spec.md` — complete spec: color palette, typography, layout per section, shadcn/ui mapping, motion, responsive breakpoints, content to preserve

### Strengths (from v1 output review)
- Rich, detailed section layouts with specific card anatomy
- Tailwind class column in color table (very useful for downstream)
- Gradient definitions section with ready-to-paste classes
- Component structure preview (file tree)
- Responsive breakpoints table

### Issues Found
1. No direction selection — Skill 2 now outputs 2-3 directions but SKILL.md didn't reference this
2. Parsing instructions too vague — "extract selected patterns, color mood" for a much richer input
3. No "Design Direction" summary at the top of the spec
4. Template layout section hardcoded (Nav/Hero/Features/Social Proof/CTA/Footer) instead of derived from analyzer report
5. Missing Tailwind column in color table template
6. Missing gradient definitions in template
7. Typography table was a flat size list instead of Element → Size → Weight → Style
8. No responsive breakpoints section
9. Motion section too thin ("yes/no" instead of exact values)

### Changes Made
1. **Added Step 1: Direction Selection** — checks if user picked a direction from Skill 2, asks if not
2. **Expanded parsing instructions** — detailed extraction from both the chosen direction and trending patterns
3. **Added "Direction" header** — 1-2 sentence summary at top of spec
4. **Dynamic section list** — "derive from analyzer report's content inventory" replaces fixed list
5. **Enhanced color table** — added Tailwind column + Gradient Definitions subsection
6. **Enhanced typography** — Element → Size → Weight → Style table
7. **Added Responsive Breakpoints section** to template
8. **Expanded Motion section** — requires exact animation values, timing, easing, library
9. **Enhanced Content to Preserve** — organized by section with text, images, meta, external links
10. **Removed component structure preview** — that's Skill 5's domain

### Files Modified
- `SKILL.md` — rewritten with all improvements

### Test Output (3 directions)
- `.redesign/waveridersurf.com/v4/direction-a/design-spec.md` — Cinematic Dark Immersive (Bebas Neue, deep navy, glassmorphism, parallax)
- `.redesign/waveridersurf.com/v4/direction-b/design-spec.md` — Clean Minimal Tech (Space Grotesk, zinc-950, solid cards, minimal motion)
- `.redesign/waveridersurf.com/v4/direction-c/design-spec.md` — Bold Energetic Sport (Outfit, teal, solid colored cards, aggressive motion)

---

## Skill 4: component-generator (replaced v0-generator)

### Review Date: 2026-03-26

### What it does
Generates production-quality React components for each landing page section by writing code directly. Each component is a standalone `.tsx` file ready for assembly into a Next.js project. Replaces v0-generator — no v0.dev API or external service needed.

### Why v0-generator was replaced
- v0.dev tools (`v0_generate_ui`, `v0_generate_from_image`, `v0_chat_complete`) are unreliable/non-functional
- Research confirmed the current stack (Next.js + Tailwind v4 + shadcn/ui) is the best for Claude code generation
- shadcn/ui v4 was literally built for AI code generation agents
- No ecosystem change needed — just remove the v0.dev dependency

### Input
- `design-spec.md` — colors, fonts, layout, components, motion (from Skill 3)
- `analysis-report.md` — exact content per section (from Skill 1)

### Output
- `components/*.tsx` — one standalone file per section, `"use client"`, default exports
- Each uses: Tailwind v4, shadcn/ui primitives, Lucide icons, Framer Motion

### Contract with Skill 5 (nextjs-assembler)
- Components are completely decoupled — no props, no state lifting
- Content is hardcoded in each component
- Components import from `@/components/ui/*` (shadcn primitives)
- Composed at page level (simple stacking in `page.tsx`)

### Tech Stack (unchanged)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui v4 (base-nova style)
- Framer Motion for animations
- Lucide React for icons

### Skill Design
1. **6-step workflow:** Parse inputs → Plan components → Generate each → Verify → Present for review
2. **Quality checklist** baked in — 15 items every component must satisfy
3. **Pattern reference** — proven code patterns from v1 (glass cards, parallax hero, sticky header, bento grid, expandable cards, staggered grids, mobile Sheet nav)
4. **Direction-aware** — guidance on adapting patterns per direction (A: cinematic glass, B: clean solid, C: bold colored)

### Files Created/Modified
- `.claude/skills/component-generator/SKILL.md` — NEW (complete skill definition)
- `.claude/skills/v0-generator/` — deleted entirely (replaced by component-generator)
- `.claude/skills/webapp-redesign/SKILL.md` — updated references from v0-generator to component-generator

---

## Skill 5: nextjs-assembler

### Review Date: 2026-03-27

### What it does
Scaffolds a production-ready Next.js project and assembles all generated components into a complete, deployable landing page. Handles project creation, dependency setup, Tailwind v4 theme config, font imports, static export, component integration, and page composition.

### Input
- `design-spec.md` — colors, fonts, layout, components
- `components/*.tsx` — generated section components
- `analysis-report.md` — content inventory

### Output
- Complete Next.js project directory ready for `npm run dev` and `npm run build`

### Issues Found
1. **Tailwind v4 config mismatch** — skill said "edit tailwind.config.ts" but Tailwind v4 uses `@theme inline {}` in globals.css
2. **Font mismatch** — v1 used Space Grotesk instead of Bebas Neue (skill didn't enforce reading fonts FROM the spec)
3. **Missing component integration** — SectionNav generated but not imported in page.tsx
4. **Missing shadcn components** — Tooltip needed by section-nav but not installed
5. **Step 9 (Migrate Content) redundant** — component-generator already hardcodes content
6. **Step 11 (Add Scroll Animations) redundant** — components already include Framer Motion
7. **Named imports in template** — `{ SiteHeader }` but components use default exports
8. **References "v0-generated"** — old terminology

### Changes Made
1. **Updated Step 4 for Tailwind v4** — `@theme inline {}` in globals.css replaces tailwind.config.ts
2. **Updated Step 4 (Fonts)** — explicit instruction to read EXACT fonts from design spec, Google Fonts import name reference table
3. **Updated Step 3 (shadcn components)** — install from design spec table + scan component imports
4. **Updated Step 7 (Integrate)** — "import and use EVERY component, no dead code"
5. **Removed redundant steps** — content migration (already hardcoded) and scroll animations (already in components)
6. **Fixed import template** — default imports, not named
7. **Streamlined from 12 steps to 10**

### Files Modified
- `SKILL.md` — rewritten with all improvements

### Test Output (3 projects)
- `surfit-ia-a/` — Scaffolded, configured (Bebas Neue + Inter), TS clean, **build pending** (WSL2 bus error)
- `surfit-ia-b/` — Scaffolded, configured (Space Grotesk + Inter), **built successfully** (out/ exists)
- `surfit-ia-c/` — Scaffolded, configured (Outfit + DM Sans), TS clean, **build pending** (WSL2 bus error)

### Build Issues Encountered
- **Bus error (core dumped)** on WSL2 with 8GB RAM — Next.js 16 Turbopack crashes. B built fine; A and C need 32GB Ubuntu machine.
- **Framer Motion easing types** — `ease: [0.25, 0.1, 0.25, 1]` needs `as [number, number, number, number]` cast
- **shadcn/ui v4 (base-nova) no asChild** — stripped all `asChild` props (base-ui uses `render` prop pattern)
- **TooltipProvider** — prop is `delay` not `delayDuration` in base-nova

### Next Steps
- Build A and C on 32GB Ubuntu machine
- Skill 6 (live-reviewer) walkthrough
