---
name: webapp-analyzer
model: sonnet
description: >
  Extract and analyze the full anatomy of a live webapp for redesign purposes — content, structure,
  visual design, components, navigation, responsiveness, and API surface. Use this skill whenever
  the user wants to audit, reverse-engineer, or prepare a redesign of an existing website or web
  application. Triggers include phrases like "analyze this site", "extract the design system",
  "audit this webapp", "I want to redesign this", "extract content from this page", "get the
  structure of this site", "reverse engineer this UI", "what components does this site use",
  "capture the layout", or any request to understand an existing web interface before rebuilding it.
  Also trigger when the user pastes a URL and asks to understand its design, structure, or content.
  This skill requires the Chrome DevTools MCP tools to be connected.
---

# Webapp Analyzer

Extract everything important from a live webapp to prepare for a redesign. This skill uses Chrome
DevTools MCP tools to crawl, screenshot, and programmatically extract content, structure, design
tokens, navigation, components, and API surface from any website.

## Prerequisites

- **Chrome DevTools MCP** tools must be connected
- The target site must be accessible in the browser (public or already authenticated)

## Scripts

All JavaScript extraction scripts live in `scripts/` alongside this file. Each is an IIFE that
returns JSON and is designed to be injected via `mcp__chrome-devtools__evaluate_script`.

| Script | Purpose |
|--------|---------|
| `scripts/page_discovery.js` | Smart link collection with grouping, SPA scroll section detection |
| `scripts/nav_extraction.js` | Navigation structure extraction (nav, header, sidebar elements) |
| `scripts/content_extraction.js` | Headings, body text, images, CTAs, forms, meta tags |
| `scripts/component_detection.js` | Repeated class patterns, framework detection, landmarks |
| `scripts/design_tokens.js` | CSS variables, colors, fonts, spacing, border radii, layouts |
| `scripts/api_surface.js` | Client state, scripts, stylesheets, third-party dependencies |

A Python loader is also available at `scripts/scripts.py` for programmatic access.

## MCP Tools Reference

| Tool | Used for |
|------|----------|
| `mcp__chrome-devtools__list_pages` | Get current tab context |
| `mcp__chrome-devtools__navigate_page` | Navigate to URLs |
| `mcp__chrome-devtools__evaluate_script` | Inject JS extraction scripts |
| `mcp__chrome-devtools__resize_page` | Set viewport for responsive captures |
| `mcp__chrome-devtools__take_screenshot` | Capture visual state |
| `mcp__chrome-devtools__take_snapshot` | Accessibility tree / page text |
| `mcp__chrome-devtools__list_network_requests` | API and resource discovery |

## Workflow Overview

The analysis runs in 6 phases. Each phase produces a section of the final report.

```
Phase 1: Page Discovery       → grouped sitemap of pages/routes/sections
Phase 2: Visual Capture        → screenshots at desktop, tablet, mobile breakpoints
Phase 3: Content Extraction    → text, headings, images, labels, CTAs
Phase 4: Structure & Components → DOM tree, component patterns, navigation
Phase 5: Design Tokens         → colors, typography, spacing, layout grid, CSS variables
Phase 6: API & Data Surface    → network requests, data endpoints, client-side state
```

---

## Phase 1: Page Discovery

**Goal:** Build a grouped map of all pages, routes, and scroll sections.

1. Use `mcp__chrome-devtools__list_pages` to get the current tab context.
2. Navigate to the target URL with `mcp__chrome-devtools__navigate_page`.
3. Run `scripts/page_discovery.js` via `mcp__chrome-devtools__evaluate_script`.

   This script collects ALL internal/external links and SPA scroll sections, then groups them
   intelligently:
   - **Internal links** are grouped by URL path prefix using a trie. Dynamic segments
     (e.g., `/product/123`, `/product/456`) are collapsed into `/product/{dynamic}`.
     Pagination and filter variants are detected automatically.
   - **External links** are grouped by domain.
   - **Anchor-only links** (`#section`) are grouped together.
   - **SPA scroll sections** (`<section>`, elements with `[id]`) are detected with their
     nearest heading and vertical position (top/middle/bottom).
   - The script classifies the site as `spa`, `multi-page`, or `hybrid`.

   Output shape:
   ```json
   {
     "siteType": "spa|multi-page|hybrid",
     "stats": { "totalLinksFound": N, "totalScrollSections": N, "groups": N },
     "groups": [
       { "name": "/blog", "type": "internal", "totalUrls": 87, "representative": [...] },
       { "name": "SPA scroll sections", "type": "scroll-section", "representative": [...] },
       { "name": "External: instagram.com", "type": "external", "totalUrls": 3 }
     ]
   }
   ```

4. Run `scripts/nav_extraction.js` via `mcp__chrome-devtools__evaluate_script` to extract
   navigation structure (nav elements, menus, sidebar).

5. Present the grouped site map to the user. Representative URLs are auto-selected per group.
   The user can adjust by adding/removing groups or individual URLs. For SPAs, scroll sections
   serve as the "pages" to analyze.

---

## Phase 2: Visual Capture

**Goal:** Screenshot each page at 3 breakpoints to document current visual state.

For each page in the analysis set:

1. Navigate to the page with `mcp__chrome-devtools__navigate_page`.
2. Capture at **desktop** (1440x900):
   - `mcp__chrome-devtools__resize_page` → width: 1440, height: 900
   - `mcp__chrome-devtools__take_screenshot`
3. Capture at **tablet** (768x1024):
   - `mcp__chrome-devtools__resize_page` → width: 768, height: 1024
   - `mcp__chrome-devtools__take_screenshot`
4. Capture at **mobile** (375x812):
   - `mcp__chrome-devtools__resize_page` → width: 375, height: 812
   - `mcp__chrome-devtools__take_screenshot`
5. Restore to desktop width when done.

Save screenshots to the working directory with descriptive names: `{page-slug}_{breakpoint}.png`

After capturing, note any visible responsive issues (overlapping elements, hidden content,
broken layouts) — these are valuable redesign signals.

---

## Phase 3: Content Extraction

**Goal:** Extract all textual content, headings, images, and calls-to-action.

1. Run `scripts/content_extraction.js` via `mcp__chrome-devtools__evaluate_script`.

   This extracts: heading hierarchy, main content text (up to 10,000 chars), images with alt
   text audit, CTAs/buttons, forms with fields, and meta information (title, description,
   OG image, canonical, language).

2. Also use `mcp__chrome-devtools__take_snapshot` for a clean text-only dump of the page.

### 3a. Language & Content Mismatch Detection (required)

After the main extraction, run this additional check to detect language inconsistencies.
Record the results explicitly in the report — downstream skills depend on this:

```javascript
(() => {
  const pageLang = document.documentElement.lang || 'not-declared';
  const spanishPatterns = /[áéíóúüñ¿¡]/i;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const mixedNodes = [];
  let node;
  while ((node = walker.nextNode()) && mixedNodes.length < 20) {
    const text = node.textContent.trim();
    if (text.length > 10 && spanishPatterns.test(text)) {
      mixedNodes.push(text.slice(0, 120));
    }
  }
  return { pageLang, mixedLanguageTextFound: mixedNodes.length > 0, examples: mixedNodes.slice(0, 5) };
})()
```

Record the output in the report under "Language Notes" (see report template below).

### 3b. Authenticated Resource Link Detection (required)

Identify any links that point to authenticated resources — these must be preserved verbatim
in the redesign output. Run:

```javascript
(() => {
  const authPatterns = ['/app', '/dashboard', '/login', '/signup', '/register', '/account', '/portal'];
  const allLinks = [...document.querySelectorAll('a[href]')];
  const authLinks = allLinks.filter(a => {
    const href = a.getAttribute('href') || '';
    return authPatterns.some(p => href.includes(p)) || (href.startsWith('http') && !href.includes(window.location.hostname));
  }).map(a => ({
    text: a.textContent.trim().slice(0, 80),
    href: a.getAttribute('href'),
    isExternal: a.getAttribute('href').startsWith('http'),
    isCTA: ['button', 'btn', 'cta'].some(c => a.className.includes(c)) || a.closest('button') !== null
  }));
  return { authenticatedLinks: authLinks };
})()
```

Record all results in the "Authenticated Resource Links" section of the report (see template).
If no authenticated links are found, explicitly state "None found — this appears to be a
purely informational/marketing site."

---

## Phase 4: Structure & Components

**Goal:** Map the DOM structure, identify reusable component patterns, and document the
information architecture.

### 4a. DOM Structure

Use `mcp__chrome-devtools__take_snapshot` to get the accessibility tree. This reveals:
- Landmark regions (header, nav, main, aside, footer)
- ARIA roles and labels
- Interactive element inventory
- Heading hierarchy (accessibility compliance)

### 4b. Component Pattern Detection

Run `scripts/component_detection.js` via `mcp__chrome-devtools__evaluate_script`.

This detects:
- Repeated class patterns (3+ uses = likely component)
- Framework hints (React/Next.js, Angular, Vue/Nuxt, Svelte, jQuery, Bootstrap, Tailwind)
- Semantic landmark structure

### 4c. Navigation & Information Architecture

Combine the nav data from Phase 1 with the landmark data to map out:
- Primary navigation (top-level pages)
- Secondary navigation (sidebar, footer)
- Breadcrumbs
- User flows (login → dashboard → settings, etc.)

---

## Phase 5: Design Tokens

**Goal:** Extract the visual design system — colors, typography, spacing, and layout patterns.

Run `scripts/design_tokens.js` via `mcp__chrome-devtools__evaluate_script`.

This extracts:
- CSS custom properties (`:root` / `:host` variables)
- Colors in use (from 300 sampled elements: text, background, border)
- Typography (font families, sizes, weights, line heights)
- Spacing patterns (padding, margin, gap)
- Border radii
- Layout patterns (flex vs grid usage counts)

---

## Phase 6: API & Data Surface

**Goal:** Understand what data the app loads and from where.

1. Use `mcp__chrome-devtools__list_network_requests` to discover API calls and resources.
2. Run `scripts/api_surface.js` via `mcp__chrome-devtools__evaluate_script`.

   This detects:
   - Client-side state (Redux, Next.js data, Nuxt state)
   - Script and stylesheet resources
   - Third-party service domains (analytics, CDNs, etc.)

---

## Output: The Analysis Report

After all phases complete, compile everything into a structured Markdown report. Include
screenshot file paths in the Responsive Behavior section.

```markdown
# Webapp Analysis Report: {Site Name}
**URL:** {url}
**Date:** {date}
**Pages Analyzed:** {count}
**Site Type:** {spa|multi-page|hybrid}

## 1. Site Map & Navigation
- Grouped page inventory (from Phase 1 smart grouping)
- Navigation structure (primary, secondary, footer)
- Information architecture

### Authenticated Resource Links
Links pointing to app/dashboard/login resources that must be preserved in the redesign:
| CTA Text | URL | Location | Type |
|----------|-----|----------|------|
| (e.g., "Entrar al Dashboard") | (e.g., https://app.domain.com) | Hero CTA | Authenticated app |

If none: "None found — informational/marketing site only."

## 2. Visual Design System
### Colors
- Color palette with hex/RGB values
- Usage context (primary, secondary, background, text, accent)
### Typography
- Font families
- Font size scale
- Weight variations
- Line heights
### Spacing & Layout
- Spacing scale
- Grid/layout patterns
- Border radii

## 3. Content Inventory
### Per Page:
- Heading hierarchy
- Body content summary
- Images (with alt text audit)
- CTAs and interactive elements
- Forms and input fields

## 4. Component Library
- Detected repeated patterns
- Framework identification
- Landmark/semantic structure
- Accessibility notes

## 5. Technical Surface
- CSS custom properties / design tokens
- API endpoints discovered
- Third-party dependencies
- Client-side state management

## 6. Responsive Behavior
- Breakpoint screenshots: `screenshots/{page}_desktop.png`, `screenshots/{page}_tablet.png`, `screenshots/{page}_mobile.png`
- Layout change observations
- Mobile-specific issues noted

## 7. Redesign Signals
- Accessibility gaps
- Content hierarchy issues
- Inconsistent design tokens
- Performance observations
- Mobile responsiveness problems

### Language Notes
- **Page language declaration:** `lang="{value}"` (or "not declared")
- **Detected content language:** {language(s) found}
- **Mismatch detected:** {Yes / No}
- **Mixed-language examples:** {list up to 5 text snippets that differ from page lang}
- **Recommendation:** {Translate all to page lang | Add functional toggle | Keep as-is with justification}
```

---

## Tips for Best Results

- **Authenticated apps**: Log in first before running the analysis, or ask the user to navigate
  to the authenticated state.
- **SPAs**: The page discovery script auto-detects scroll sections. For SPAs with client-side
  routing, trigger route changes via clicks rather than direct navigation.
- **Large sites**: The smart grouping automatically picks representative pages from each group.
  Focus on one representative per group unless the user wants broader coverage.
- **Design tokens**: If the site uses a known design system (Material UI, Chakra, etc.), note
  this — it simplifies the redesign since token mapping is straightforward.
