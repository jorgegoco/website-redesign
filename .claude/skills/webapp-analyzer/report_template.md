# Webapp Analysis Report: {Site Name}
**URL:** {start_url}
**Date:** {date}
**Views analyzed:** {N}
**Site type:** {spa | multi-page | hybrid}

---

## Sitemap

{ASCII tree — views and how each was reached, with screenshot filenames}

---

## Views

### View 1: {name}
**URL / trigger:** {url or "clicking X on View N"}
**Screenshots:** `screenshots/{slug}_landing.png`, `{slug}_scroll1.png` (if applicable)

**Content:**
- Title: ...
- H1: ...
- Key text: ...
- Images: N (M missing alt)
- Forms: ...
- Meta: description={yes/no}, OG image={yes/no}, canonical={yes/no}, lang="{value}"

**Interaction map:**

| Element | Source | Outcome | Screenshot |
|---------|--------|---------|------------|
| "..." | a11y button | C — content revealed | {slug}_{label}.png |
| "..." | JS cursor:pointer div | C — panel opened | {slug}_{label}.png |
| "..." | a11y link | A — navigated to /path | {slug2}_landing.png |
| "..." | a11y link | external — example.com | — |
| "..." | file input | skip — accepts image/* | — |
| "..." | a11y button | D — dead | — |

---

### View 2: {name}
...

---

## Template Catalog

| Template | URL pattern | Instances | Analyzed view |
|----------|------------|-----------|--------------|
| {name} | /{path}/{slug} | N | View N |

---

## Design Tokens

### Colors
| Role | Value | Tailwind/CSS |
|------|-------|-------------|
| Background | ... | ... |

### Typography
- Font families: ...
- Size scale: ...
- Weights: ...

### Spacing & Layout
- Border radii: ...
- Layout pattern: N flex / M grid containers
- Main grid: ...
- CSS custom properties: {list or "none"}

---

## External Links

| Domain | Count | Purpose | Sample URL |
|--------|-------|---------|------------|

---

## Technical Surface

| Item | Detail |
|------|--------|
| Framework | ... |
| Build | ... |
| Main bundle | ... |
| Stylesheets | ... (note 404s) |
| API calls | ... |
| Third-party | ... |
| Client state | ... |

---

## Redesign Signals

### Critical
- ...

### Structural
- ...

### Language Notes
- **Page lang:** `lang="{value}"`
- **Foreign text detected:** {yes/no}
- **Examples:** ...
- **Recommendation:** ...
