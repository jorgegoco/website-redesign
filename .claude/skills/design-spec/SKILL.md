---
name: design-spec
description: >
  Create a complete design specification for a landing page redesign by combining an existing
  webapp analysis report with trend research. Produces a detailed spec covering color palette,
  typography, layout, shadcn/ui components, motion, and dark/light mode. Triggers: "create
  design spec", "design direction", "define the design system". Requires analyzer report and
  trend research to exist in the working directory.
---

# Design Spec

Produce a complete design specification document by combining the original site's design tokens
with trend research recommendations. This spec becomes the single source of truth for all
downstream generation and assembly.

## Working Directory

All paths below are relative to `{workdir}`, set by the orchestrator.
When running standalone, `{workdir}` defaults to `.redesign/`.

## Input

- `{workdir}/analysis-report.md` — webapp-analyzer output (content, tokens, components)
- `{workdir}/trend-research.md` — design-researcher output (patterns, directions, color/typography trends)

Read both files. If either is missing, tell the user which skill to run first.

## Output

Save to `{workdir}/design-spec.md`. Wait for user approval before this file is considered final.

## Workflow

### 1. Select Design Direction

The trend research contains 2-3 design directions (e.g., "Cinematic Dark Immersive",
"Clean Minimal Tech", "Bold Energetic Sport"), each with its own color palette, typography,
key patterns, and reference sites.

- Check if the user already specified a direction (in the conversation or as a note in the
  trend research file).
- If not, present the directions as a brief summary (name + one-line vibe) and ask the user
  to pick one, or to mix elements from multiple.
- **Do not proceed** until a direction is confirmed. This choice shapes every decision below.

Record the chosen direction name for the spec header.

### 2. Parse the Analyzer Report

Extract from the analysis:
- **Brand identity** — site name, tagline, overall vibe
- **Current colors** — primary brand color, backgrounds, text colors, accents, surfaces, borders
- **Current fonts** — heading and body font families, weights in use, size range
- **Content structure** — every section found (hero, features, spots, pricing, etc.) with its
  heading, body text, CTAs, and images. This defines the section list for the spec — do NOT
  use a hardcoded list.
- **Navigation** — primary/secondary nav links, header/footer structure
- **Interactive elements** — CTAs, forms, expandable panels, tabs, toggles
- **Redesign signals** — accessibility gaps, SEO issues, inconsistencies to fix

### 3. Parse the Trend Research

From the **chosen direction**, extract:
- **Color palette** — specific hex values for background, accent, secondary, text, highlights
- **Typography pairing** — heading font + body font recommendation
- **Key patterns** — layout styles and interaction patterns (e.g., bento grid, sticky nav,
  glassmorphism, scroll-triggered motion)
- **Reference sites** — for visual reference during generation

From the **trending patterns section**, extract any patterns worth incorporating regardless
of direction (e.g., sticky section navigation is useful for any long-scroll page).

From the **color and typography trends**, extract broader guidance (gradient trends, size
trends, pairing logic) to inform fine-tuning.

### 4. Make Design Decisions

Combine both inputs. Key principles:

- **Evolve, don't abandon** the original brand colors. Keep the primary brand color recognizable;
  modernize supporting colors using the chosen direction's palette as a guide.
- **Match patterns to content** — if the site has 10 items to showcase, a bento grid or card
  grid makes sense. If it has a strong hero message, a typography-led hero fits. Let the actual
  content drive layout choices.
- **Fix redesign signals** — address every accessibility gap, SEO issue, and structural
  inconsistency flagged in the analyzer report.
- **shadcn/ui first** — always check if shadcn/ui has a component before designing custom.
  Map every interactive element to a specific shadcn/ui component.

### 5. Write the Design Spec

Use the template below. **Adapt it to the actual site** — sections, colors, and content come
from the analyzer report, not from a generic checklist.

````markdown
# Design Spec: {Site Name} Redesign

**Direction:** {Chosen direction name} — {1-2 sentence summary of the vibe and rationale,
referencing what's being preserved from the original and what's being modernized.}

---

## Color Palette

| Role | Color | Hex | Tailwind | Usage |
|------|-------|-----|----------|-------|
| Background | ... | #... | `...` | Page background |
| Surface | ... | ... | `...` | Cards, panels |
| Surface Hover | ... | ... | `...` | Card hover states |
| Border | ... | ... | `...` | Card borders, dividers |
| Primary | ... | #... | `...` | Primary CTAs, active states |
| Secondary | ... | #... | `...` | Supporting elements, links |
| Accent | ... | #... | `...` | Highlights, badges, gradients |
| Text Primary | ... | #... | `...` | Headings, body text |
| Text Secondary | ... | #... | `...` | Descriptions, metadata |
| Text Muted | ... | #... | `...` | Labels, captions |
{Add more rows as needed: Danger, Warning, Success, etc.}

### Gradient Definitions
- **CTA Gradient:** `{Tailwind gradient classes}`
- **Glow Effect:** `{box-shadow value}` on hover
- **Card Glow:** `{box-shadow value}` on hover
- **Hero Overlay:** `{Tailwind gradient classes}`
{Add or remove gradients based on the design direction.}

---

## Typography

### Fonts (Google Fonts)
- **Heading/Display:** {font} — {why this font fits the direction}
- **Body:** {font} — {why this font fits}

### Scale
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Brand/Display | `text-7xl md:text-8xl ...` | 700-900 | {font}, uppercase, tracking-tight |
| Section Heading (H2) | `text-3xl md:text-4xl ...` | 700 | {font}, tracking-tight |
| Card Title (H3) | `text-xl md:text-2xl` | 600 | {font} |
| Body | `text-sm md:text-base` | 400 | {font} |
| Label/Overline | `text-xs` | 700 | uppercase, tracking-[0.2em] |
| Small/Caption | `text-xs` | 400 | text-muted |
{Adjust rows to match actual content needs.}

---

## Layout & Sections

{Derive this list from the analyzer report's content inventory. For EACH section found,
write a detailed layout spec.}

### 1. {Section Name}
- **Style:** {layout approach — e.g., full-viewport hero, bento grid, card grid, horizontal scroll}
- **Layout:** {specific grid/flex structure, column spans, breakpoint behavior}
- **Content:** {what goes here — headings, body text, CTAs, images, from the analyzer report}
- **Card/element style:** {visual treatment — glass card, gradient border, etc.}
- **Mobile behavior:** {how this section adapts}

### 2. {Section Name}
...

{Continue for ALL sections. Include Header/Navigation and Footer as sections.}

---

## shadcn/ui Components

| Component | Usage |
|-----------|-------|
| `Button` | {variants and where used} |
| `Card` | {where used} |
| ... | ... |
{Map every interactive element from the analyzer report to a specific shadcn/ui component.}

---

## Motion & Interaction

### Scroll Animations (Framer Motion)
- **Section entrance:** {animation description — e.g., fade-up `y: 30 → 0, opacity: 0 → 1`}
- **Stagger children:** {timing — e.g., cards appear with 100ms delay}
- **Hero reveal:** {specific animation for the hero — e.g., text reveal, parallax}
- **Parallax:** {if used — speed, which elements}

### Hover Effects
- **Cards:** {specific transform + shadow values}
- **Buttons:** {specific transform + glow values}
- **Links:** {underline behavior}

### Transitions
- **Duration:** {default and layout-change durations}
- **Easing:** {easing functions for enters vs hovers}

---

## Dark/Light Mode
- **Default theme:** {dark/light}
- **Toggle support:** {yes/no — and why}
- **Implementation:** {Tailwind darkMode strategy}

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Notes |
|------------|-------|-------------|
| Mobile | < 640px | {key layout changes} |
| Tablet | 640-1023px | {key layout changes} |
| Desktop | 1024px+ | {full layout description} |
| Wide | 1280px+ | {max-width, centering} |

---

## Content to Preserve

### Text Content
{List ALL text content from the analyzer report, organized by section:
hero headings, taglines, CTAs, feature descriptions, etc.}

### Images
{List all images with their alt text and source URLs.}

### Meta (fix gaps from analyzer report)
- **Title:** {improved title}
- **Description:** {new meta description}
- **OG Image:** {strategy}
- **Language:** {language decision}
- **Canonical:** {URL}

### External Links
{List all external links to preserve, grouped by purpose.}
````

### 6. Present for Approval

Show the spec to the user. This is a **gate** — no code generation happens until approved.
The user may want to adjust colors, swap fonts, change layout choices, or add/remove sections.
Iterate until approved.
