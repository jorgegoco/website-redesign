---
name: webapp-analyzer
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
argument-hint: "<url>"
disable-model-invocation: true
model: claude-sonnet-4-6
allowed-tools: >
  mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__resize_page,
  mcp__chrome-devtools__take_screenshot, mcp__chrome-devtools__take_snapshot,
  mcp__chrome-devtools__click, mcp__chrome-devtools__press_key,
  mcp__chrome-devtools__wait_for, mcp__chrome-devtools__evaluate_script,
  mcp__chrome-devtools__list_network_requests, Read, Write
---

# Webapp Analyzer

Crawl a live website the way a thorough human analyst would: follow every clickable element,
reveal hidden content by clicking tabs, cards, and toggles, and map every interactive state.
Works for SPAs, multi-page sites, and anything in between. URL-agnostic.

## Prerequisites

- **Chrome DevTools MCP** tools must be connected
- The target site must be accessible in the browser (public or already authenticated)

## Scripts

All JavaScript extraction scripts live in `scripts/` alongside this file. Each is designed to
be injected via `mcp__chrome-devtools__evaluate_script`.

| Script | Purpose |
|--------|---------|
| `scripts/content_extraction.js` | Headings, body text, images, CTAs, forms, meta tags |
| `scripts/clickable_discovery.js` | All cursor:pointer + onclick elements (non-ARIA) |
| `scripts/design_tokens.js` | CSS variables, colors, fonts, spacing, border radii, layouts |
| `scripts/api_surface.js` | Client state, scripts, stylesheets, third-party dependencies |

## MCP Tools Reference

| Tool | Used for |
|------|----------|
| `mcp__chrome-devtools__navigate_page` | Navigate to URL or back |
| `mcp__chrome-devtools__resize_page` | Set viewport (1440×900, once at start) |
| `mcp__chrome-devtools__take_screenshot` | Capture viewport — **never fullPage** |
| `mcp__chrome-devtools__take_snapshot` | Get a11y tree with element UIDs |
| `mcp__chrome-devtools__click` | Click element by UID (for ARIA-role elements) |
| `mcp__chrome-devtools__press_key` | Send keyboard events (Escape, PageDown, etc.) |
| `mcp__chrome-devtools__wait_for` | Wait for text/element after navigation |
| `mcp__chrome-devtools__evaluate_script` | Inject JS for discovery, clicks, content extraction |
| `mcp__chrome-devtools__list_network_requests` | API call discovery |

---

## Algorithm Overview

BFS crawler. Every interactive element — whether it has an ARIA role or not — goes into the
queue. Process each item, discover new items from the resulting state, repeat.

**Target URL:** `$ARGUMENTS` (passed when invoking `/webapp-analyzer <url>`)

```
QUEUE     = [$ARGUMENTS]   ← start URL from invocation argument
VISITED   = {}             ← URL strings + element signature strings

resize viewport to 1440×900 (once)

while QUEUE not empty:
  item = QUEUE.dequeue()
  if item.sig in VISITED → skip
  VISITED[item.sig] = true

  ── Arrive ──────────────────────────────────────────────────
  [1] If item is a URL: navigate, wait for load
      If item is a click-action: record base state, click it, detect outcome

  ── Capture ─────────────────────────────────────────────────
  [2] Screenshot → {slug}_state_{N}.png
  [3] Scroll to reveal below-fold content (see Scroll Step)
  [4] Extract content: run content_extraction.js

  ── Discover ────────────────────────────────────────────────
  [5] a11y snapshot → collect interactive UIDs (buttons, links, inputs)
  [6] Run clickable_discovery.js → collect cursor:pointer / onclick elements
      not covered by a11y roles
  [7] Merge into unified element list, deduplicate by signature

  ── Queue new items ──────────────────────────────────────────
  [8] For each element: classify minimally (see Element Rules) → add to QUEUE or skip

After QUEUE empty:
  [C1] Extract design tokens (once, on richest view)
  [C2] Scan API surface (once)
  [C3] Compile analysis-report.md
```

**Hard limits:**
- Max **15 unique items** in VISITED (raise with user if needed)
- **Desktop viewport only** (1440×900) — responsive only if user requests
- **Never use `fullPage: true`** in screenshots — viewport only

---

## Step 1 — Arrive

**For URL items:**
```
mcp__chrome-devtools__navigate_page url="{url}"
mcp__chrome-devtools__wait_for (optional, if page loads slowly)
```

**For click-action items:**

Record base state first:
```javascript
() => {
  const root = document.querySelector('main,[role="main"],#root,body');
  return { url: location.href, text: (root?.innerText||'').slice(0, 500) };
}
```

Then click via UID (ARIA elements) or JS (non-ARIA elements):
```
mcp__chrome-devtools__click uid="{uid}"
```
or
```javascript
// For cursor:pointer / onclick elements without ARIA role:
() => {
  const el = [...document.querySelectorAll('*')].find(e =>
    (e.innerText||'').trim().startsWith('{label}') &&
    getComputedStyle(e).cursor === 'pointer' &&
    !['A','BUTTON','INPUT','SELECT','TEXTAREA'].includes(e.tagName)
  );
  if (el) { el.click(); return 'clicked'; }
  return 'not found';
}
```

---

## Step 2 — Screenshot

```
mcp__chrome-devtools__take_screenshot → filePath: screenshots/{slug}_state_{N}.png
```

**View every screenshot immediately** — it reveals what the user actually sees.

---

## Step 3 — Scroll Step

Scroll through the full page to reveal lazy-loaded and below-fold content before running
discovery. This ensures interactive elements below the fold are captured.

```javascript
// Scroll to 1/3
() => { window.scrollTo(0, document.body.scrollHeight / 3); }
```
→ Take screenshot only if new content/sections are visible (compare text fingerprint)

```javascript
// Scroll to 2/3
() => { window.scrollTo(0, document.body.scrollHeight * 2 / 3); }
```
→ Take screenshot only if new content visible

```javascript
// Restore scroll position
() => { window.scrollTo(0, 0); }
```

Name scroll screenshots: `{slug}_scroll1.png`, `{slug}_scroll2.png` (only when new content found).

Use 3 stops (1/3, 2/3, bottom) as the default. Add more stops if the page is clearly taller
than 3 screens (e.g. long-form landing pages — scroll to 1/4, 1/2, 3/4, bottom instead).

---

## Step 4 — Content Extraction

Run `scripts/content_extraction.js` via `evaluate_script`. Captures: headings, main text,
images (with alt audit), CTAs, forms, meta (title, description, OG, canonical, lang).

Also run language mismatch check:
```javascript
() => {
  const lang = document.documentElement.lang || 'not-declared';
  const nonLatinAscii = /[^\x00-\x7F]/;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const foreign = [];
  let node;
  while ((node = walker.nextNode()) && foreign.length < 10) {
    const t = node.textContent.trim();
    if (t.length > 8 && nonLatinAscii.test(t)) foreign.push(t.slice(0, 100));
  }
  return { lang, foreignTextFound: foreign.length > 0, examples: foreign };
}
```

---

## Step 5 — a11y Snapshot

```
mcp__chrome-devtools__take_snapshot
```

Collects all elements with ARIA-interactive roles: `button`, `link`, `checkbox`, `combobox`,
`listbox`, `menuitem`, `tab`, `textbox`. Each has a `uid` for `mcp__chrome-devtools__click`.

---

## Step 6 — JS Discovery (non-ARIA elements)

Run `scripts/clickable_discovery.js`. This finds all `cursor:pointer` and `onclick` elements
that have **no ARIA-interactive role** — common in SPAs built with Tailwind, Bootstrap, or
custom CSS where clickable cards, tiles, and overlays use plain `div`/`span`.

The script returns: `{ tag, text, classes, top, left, width, height }` for each element.
Use the `text` field as the label when building element signatures and clicking via JS.

---

## Step 7 — Merge and Deduplicate

Build a unified element list from steps 5 and 6. Deduplicate by signature:

```
sig = normalize(label_or_text) + "|" + normalize(href_or_url_or_"click")
```

Where `normalize` means: lowercase, trim, collapse whitespace. For elements without an href
(buttons, divs, spans), use the literal string `"click"` as the second segment.

For elements with identical text and visually overlapping positions (parent + child both
clickable), keep only the outermost (largest bounding box).

---

## Step 8 — Queue New Items

For each element in the unified list:

| Condition | Action |
|-----------|--------|
| `sig` already in VISITED | Skip |
| `input[type=file]` | Record `label` + `accept`. Never click. Add to report only. |
| Link to **external domain** | Record `domain` + `label`. Skip. |
| Link to same-site URL, same path + `#hash` | Record as anchor. Skip. |
| Link to same-site URL, **new path** | Template-deduplicate, then add URL to QUEUE |
| Anything else (button, div, span…) | Add as click-action to QUEUE |

**Template deduplication:** Before queuing a same-site URL, strip trailing numeric/slug
segments (`/blog/post-123` → `/blog/`, `/products/red-shirt` → `/products/`). If that pattern
is already in VISITED or QUEUE, record "template — pattern ×N, analyzed 1" and skip.

**Repeated-element deduplication:** If 3+ click-actions share identical label text and CSS
class fingerprint, queue ONE and note "×N instances". Skip the rest.

---

## Outcome Detection

Run immediately after any click:

```javascript
() => ({
  url: location.href,
  text: (document.querySelector('main,[role="main"],#root,body')?.innerText||'').slice(0,500),
  hasOverlay: [...document.querySelectorAll('*')].some(el => {
    const s = getComputedStyle(el);
    // zIndex >= 10 catches navs/dropdowns; offsetHeight >= 60 catches banners/drawers
    return s.position === 'fixed' && parseInt(s.zIndex||'0') >= 10 && el.offsetHeight >= 60;
  })
})
```

| Outcome | Condition | Response |
|---------|-----------|----------|
| **A — New page** | URL changed | Screenshot → `{slug}_landing.png`. Add URL to QUEUE. Navigate back. |
| **B — Overlay** | `hasOverlay` true | Screenshot → `{slug}_modal_{label}.png`. Dismiss (backdrop click or Escape). Then re-run discovery on dismissed state. |
| **C — Content changed** | Same URL, `text` differs | Screenshot → `{slug}_{label}.png`. **Re-run discovery on expanded state (Steps 5–8) before restoring.** Then restore. |
| **D — No change** | URL same, text same, no overlay | Record "dead — no effect". |

**Key rule for outcome C:** When a click reveals new content (toggled section, panel, tab),
treat the expanded state like a new page — run Steps 5–8 on it, queue any new elements found,
then restore state. This ensures hidden-behind-toggle content is fully explored.

---

## State Restoration

After processing each interaction, restore to base state before the next:

| What was opened | How to restore |
|-----------------|---------------|
| Fixed overlay with backdrop | `evaluate_script`: click the backdrop div that has `onclick` |
| Fixed overlay (Escape closes it) | `press_key key="Escape"` |
| Toggle / accordion (div click) | `evaluate_script`: `el.click()` on the same element |
| URL navigation | `navigate_page type="back"` |
| Scroll position | `evaluate_script`: `window.scrollTo(0, 0)` |

---

## Phase C: Post-Queue Steps

### C1 — Design Tokens

Run `scripts/design_tokens.js` on the richest view. Extracts: CSS custom properties, colors,
font families/sizes/weights, spacing, border radii, flex/grid layout counts.

### C2 — API Surface

Run `scripts/api_surface.js` + `mcp__chrome-devtools__list_network_requests` (filter: xhr,
fetch, script, stylesheet, document). Flag any 404s.

### C3 — Compile Report

Write `analysis-report.md` to the output directory following the structure in
[report_template.md](report_template.md).

---

## Tips

- **View every screenshot** — it shows what the user actually sees, not what the DOM says.
- **Scroll before discovery** — below-fold sections often contain interactive elements not in
  the initial viewport.
- **Re-run discovery after outcome C** — expanded panels and opened sections may contain new
  links or buttons that were not in the original page state.
- **JS discovery catches what a11y misses** — any `div` or `span` with `cursor:pointer` is
  a potential interactive element. Run `clickable_discovery.js` every time.
- **File inputs trigger browser dialogs** — never click them, just record their purpose.
- **Dead buttons are redesign signals** — note every non-functional interactive element.
- **Template deduplication** — if a card/blog/product pattern repeats, analyze one fully and
  record the count. Do not analyze each instance individually.
