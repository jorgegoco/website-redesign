---
name: design-researcher
model: sonnet
description: >
  Research current landing page design trends for a specific industry using WebSearch.
  Returns a trend summary with trending patterns, multiple design direction options,
  and color/typography trends. This skill is an independent researcher — it does NOT
  decide what to keep or change from the existing site. That responsibility belongs to
  the design-spec skill, which combines the analysis report with these trend findings.
  Triggers: "research design trends", "find landing page inspiration", "what's trending in
  {industry} design". Can be run standalone or as part of the webapp-redesign workflow.
---

# Design Researcher

Research current design trends for a specific industry/niche and produce a trend summary
with actionable pattern recommendations and multiple design direction options.

**Independence principle:** This skill researches what's trending in the industry purely on
its own. It does NOT cross-reference with the analyzer report or decide what the existing site
should keep or change. It provides raw trend intelligence and design direction options for
Skill 3 (design-spec) to combine with the analysis.

## Input

- **Industry/niche** keyword (e.g., "surf tech", "SaaS", "e-commerce", "portfolio")
- **Optional:** 1-3 reference URLs the user admires (analyze their patterns too)
- **Optional:** Existing analyzer report (to auto-detect the industry only)

## Working Directory

All paths below are relative to `{workdir}`, set by the orchestrator.
When running standalone, `{workdir}` defaults to `.redesign/`.

## Output

Save to `{workdir}/trend-research.md`.

## Workflow

### 1. Identify the Industry

If an analyzer report exists at `{workdir}/analysis-report.md`, read it to infer the industry:
- Check the content inventory: headings, CTAs, body text themes
- Check the meta title and description
- Identify the primary domain: what does the site sell or offer?
- Produce a **2-3 word industry label** (e.g., "Surf Tech", "SaaS Analytics", "E-commerce Fashion")

If no report exists, ask the user for the industry keyword.

### 2. Run Targeted Web Searches

Run **5 targeted searches** to cover broad trends, award-winning examples, real references,
UX patterns, and visual identity:

```
WebSearch: "landing page design trends 2026 {industry}"
WebSearch: "{industry} website design Awwwards Behance 2026"
WebSearch: "best {industry} landing page examples"
WebSearch: "{industry} UX patterns hero section layout 2026"
WebSearch: "{industry} color palette typography trends"
```

If the user provided reference URLs, also run `webapp-analyzer` on those to extract their
design patterns (or read existing analyzer reports for those URLs).

### 3. Extract Trending Patterns

Extract **3-5 patterns** primarily from the search results. The following checklist serves as
a reference to ensure nothing obvious is missed — but the search results are the primary source:

- **Bold typography heroes** — oversized headlines, custom/expressive fonts
- **Bento grid layouts** — asymmetric card grids for features/services
- **Gradient & saturated color palettes** — dopamine design, neon accents
- **Dark mode default** — high-contrast themes with light mode toggle
- **Scroll-triggered animations** — fade-in, slide-up, parallax effects
- **Glassmorphism / frosted glass** — translucent cards with backdrop blur
- **3D elements & illustrations** — depth through shadows, layering
- **Mobile-first responsive** — thumb-friendly, fast-loading, minimal on small screens
- **Micro-interactions** — hover effects, button animations, cursor followers
- **AI-powered personalization** — dynamic content based on visitor context

*Note: This checklist reflects 2026 trends. Update periodically as patterns evolve.*

### 4. Compose Design Directions

This is the key differentiator. Instead of a single recommendation set, assemble **2-3
coherent design direction options**. Each direction is a complete, internally consistent
design system — not a mix-and-match list.

For each direction, define:
- **Name** — a short evocative label (e.g., "Premium Dark Immersive")
- **Vibe** — one-line mood description
- **Color palette** — primary, accent, background colors
- **Typography** — heading font + body font (Google Fonts recommended)
- **Key patterns** — 3-4 patterns from Step 3 that define this direction
- **Reference sites** — 2-3 real URLs exemplifying this direction

The directions should represent genuinely different aesthetics. For example:
- Direction A: dark, cinematic, immersive (think Apple product pages)
- Direction B: clean, minimal, editorial (think Stripe, Linear)
- Direction C: bold, energetic, saturated (think sports brands, Nike)

### 5. Write the Trend Research Summary

Save to `{workdir}/trend-research.md`:

```markdown
# Design Trend Research: {Industry}
**Date:** {date}
**Industry:** {industry label}
**Sources:** {list of URLs consulted}

## Industry Trends Overview
{2-3 paragraph summary of what's trending in this industry's web design right now}

## Trending Patterns

### 1. {Pattern Name}
- **What:** {one-line description}
- **Why it's trending:** {industry-specific reasoning}
- **Examples:** {1-2 real sites using this pattern}
- **Implementation hint:** {specific Tailwind/shadcn approach}

### 2. {Pattern Name}
...

(3-5 patterns total)

## Design Directions

### Direction A: {Name}
- **Vibe:** {mood description}
- **Color palette:** {primary, accent, background hex values}
- **Typography:** {heading font} + {body font}
- **Key patterns:** {which patterns from above define this direction}
- **Reference sites:** {2-3 URLs}

### Direction B: {Name}
- **Vibe:** ...
- **Color palette:** ...
- **Typography:** ...
- **Key patterns:** ...
- **Reference sites:** ...

### Direction C: {Name}
- ...

## Color Trends
- Current industry palette trends (warm/cool/neutral, popular combos)
- Dark vs light mode trends in {industry}

## Typography Trends
- Popular heading font styles in {industry} (serif, sans-serif, display, condensed)
- Recommended Google Fonts pairings
```

### 6. Present to User

Show the summary and ask the user to pick a direction (A, B, or C) or describe a custom
mix. The chosen direction is what gets passed to Skill 3 (design-spec) along with the
analysis report.
