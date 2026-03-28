---
name: skill-debugger
model: sonnet
description: >
  Audit any generated Next.js landing page output against a set of quality criteria — link
  integrity, language consistency, CTA functionality, image loading, and navigation completeness.
  Produces a structured audit report with per-component issues mapped to the upstream skill
  responsible for fixing them. Use this after assembly and before delivery, or when iterating
  on an existing output. Triggers: "debug this output", "audit the site", "check the links",
  "review the output", "what's broken", "test the redesign".
---

# Skill Debugger

Systematically audit a generated Next.js landing page output. Identify broken links, language
mismatches, non-functional CTAs, placeholder images, and navigation gaps. Produce a structured
report that maps every issue to the upstream skill that should be fixed to prevent recurrence.

## Prerequisites

- **Chrome DevTools MCP** tools must be connected
- The project must have a working `bun dev` setup (Next.js project)
- Node/bun must be installed

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `{project_dir}` | Yes | Path to the Next.js project directory (e.g., `surfit-ia-a/`) |
| `{analysis_report}` | Optional | Path to the original `analysis-report.md` for link/content comparison |
| `{design_spec}` | Optional | Path to the `design-spec.md` for visual conformance checks |

Ask the user for `{project_dir}` if not provided. Infer the other two from the standard
`.redesign/{domain}/{version}/` structure when possible.

## Output

- `{project_dir}/audit-report.md` — structured audit report (see format below)
- `{project_dir}/screenshots/audit_desktop.png`
- `{project_dir}/screenshots/audit_tablet.png`
- `{project_dir}/screenshots/audit_mobile.png`

---

## Workflow

### Step 1: Start Dev Server

```bash
cd {project_dir} && bun dev &
```

Wait for the server to be ready (poll `localhost:3000` until it responds, max 30s).
Note the port if 3000 is taken (Next.js will try 3001, 3002, etc.).

### Step 2: Open in Chrome MCP

1. Use `mcp__chrome-devtools__list_pages` to get current tabs.
2. Navigate to `http://localhost:{port}` with `mcp__chrome-devtools__navigate_page`.
3. Wait for the page to fully render (1–2s after navigation).

### Step 3: Visual Capture

Capture screenshots at three breakpoints. Save to `{project_dir}/screenshots/`:

| Breakpoint | Width | Height | Filename |
|-----------|-------|--------|----------|
| Desktop | 1440 | 900 | `audit_desktop.png` |
| Tablet | 768 | 1024 | `audit_tablet.png` |
| Mobile | 375 | 812 | `audit_mobile.png` |

Use `mcp__chrome-devtools__resize_page` then `mcp__chrome-devtools__take_screenshot` for each.
Restore to desktop width when done. Present all three screenshots to the user.

> **Animation warning:** Next.js projects using Framer Motion `whileInView` keep sections at
> `opacity: 0` until scrolled into view. A `fullPage: true` screenshot captures the full DOM
> without scrolling — animated sections appear invisible/dark. To capture all sections properly:
> 1. Take a first screenshot (hero, above the fold) with `fullPage: false`
> 2. Use `evaluate_script` to scroll: `() => window.scrollTo(0, N)` for each section
> 3. Wait ~600ms after each scroll, then screenshot
> Alternatively: take `fullPage: false` screenshots at each major scroll position.

### Step 4: Automated Checks

Run each check via `mcp__chrome-devtools__evaluate_script`. Each script returns a JSON result.

---

#### Check A: Link Integrity

```javascript
(() => {
  const issues = [];
  const anchors = [...document.querySelectorAll('a')];
  anchors.forEach(a => {
    const href = a.getAttribute('href');
    const text = a.textContent.trim().slice(0, 60);
    if (!href || href === '') {
      issues.push({ severity: 'critical', element: 'a', text, issue: 'Missing href entirely', fix: 'Add a real href or remove the element' });
    } else if (href === '#') {
      issues.push({ severity: 'critical', element: 'a', text, issue: 'href="#" — silent dead link', fix: 'Use a real URL, a valid #section-id, or remove' });
    } else if (href.startsWith('#TODO')) {
      issues.push({ severity: 'warning', element: 'a', text, issue: `Placeholder link: ${href}`, fix: 'Replace with real URL before delivery' });
    }
  });
  return { check: 'link-integrity', count: anchors.length, issues };
})()
```

---

#### Check B: Button/CTA Audit

> **Important — React limitation:** React attaches event handlers to the document root via
> its synthetic event system. This means `btn.onclick !== null` returns `true` for ALL buttons
> in a React app, even those with no real action. The DOM script below will always return 0
> issues on React apps. Use the **source code scan** below instead.

**Runtime check (catches non-React dead buttons):**
```javascript
(() => {
  const issues = [];
  const buttons = [...document.querySelectorAll('button, [role="button"]')];
  buttons.forEach(btn => {
    const text = btn.textContent.trim().slice(0, 60);
    const isInsideLink = btn.closest('a') !== null;
    const isFormSubmit = btn.type === 'submit';
    const hasAriaExpanded = btn.hasAttribute('aria-expanded');
    const hasDataAction = [...btn.attributes].some(a => a.name.startsWith('data-'));
    if (!isInsideLink && !isFormSubmit && !hasAriaExpanded && !hasDataAction) {
      issues.push({ severity: 'warning', element: 'button', text, issue: 'Button not inside <a> and not submit — may be a dead button in React (verify via source scan)', fix: 'Wrap in <a href="...">, verify onClick handler exists, or check source' });
    }
  });
  return { check: 'cta-audit-runtime', count: buttons.length, issues };
})()
```

**Source code scan (required for React/Next.js projects — authoritative):**

Use Grep to scan component TSX files for `<Button` elements that are NOT wrapped in `<a>`:

```bash
# Find Button elements — then manually verify each has a wrapping <a> or meaningful onClick
grep -n "<Button" {project_dir}/src/**/*.tsx | grep -v "asChild"
```

For each `<Button` found, check the surrounding lines in the source file:
- If the `<Button>` is NOT inside `<a href="...">` and has no `onClick` with navigation → **Critical: dead button**
- If it has `onClick={() => someStateHandler()}` (e.g., toggle, modal) → **OK, not navigation**
- If it has `onClick={() => window.location.href = ...}` or `router.push(...)` → **OK**
- If it has no onClick at all → **Critical: dead button**

This source scan is the authoritative check for React projects. Always run it.

---

#### Check C: Language Consistency

```javascript
(() => {
  const pageLang = document.documentElement.lang || 'not set';
  const issues = [];
  // Sample text nodes for non-ASCII Latin characters (simple Spanish indicator)
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const spanishPatterns = /[áéíóúüñ¿¡]/i;
  const sampledNodes = [];
  let node;
  while ((node = walker.nextNode()) && sampledNodes.length < 200) {
    const text = node.textContent.trim();
    if (text.length > 10 && spanishPatterns.test(text)) {
      sampledNodes.push(text.slice(0, 80));
    }
  }
  if (pageLang === 'en' && sampledNodes.length > 0) {
    issues.push({
      severity: 'high',
      issue: `lang="${pageLang}" but Spanish/accented text found in ${sampledNodes.length} text node(s)`,
      examples: sampledNodes.slice(0, 5),
      fix: 'Translate content to match lang attribute, or implement a functional language toggle'
    });
  }
  if (pageLang === 'not set') {
    issues.push({ severity: 'warning', issue: 'No lang attribute on <html>', fix: 'Add lang="en" (or appropriate language) to <html>' });
  }
  return { check: 'language-consistency', pageLang, issues };
})()
```

---

#### Check D: Image Audit

```javascript
(() => {
  const issues = [];
  const imgs = [...document.querySelectorAll('img')];
  imgs.forEach(img => {
    const src = img.getAttribute('src') || '';
    const alt = img.getAttribute('alt');
    if (!img.complete || img.naturalWidth === 0) {
      issues.push({ severity: 'critical', src: src.slice(0, 80), issue: 'Image failed to load', fix: 'Check src URL, replace with working image' });
    }
    if (alt === null) {
      issues.push({ severity: 'warning', src: src.slice(0, 80), issue: 'Missing alt attribute', fix: 'Add descriptive alt text' });
    }
  });
  // Check for placeholder patterns (dashed borders, camera icons in empty boxes)
  const placeholders = [...document.querySelectorAll('[class*="dashed"], [class*="placeholder"]')];
  placeholders.forEach(el => {
    issues.push({ severity: 'medium', element: el.tagName, classes: el.className.slice(0, 60), issue: 'Possible placeholder UI (dashed border or placeholder class)', fix: 'Replace with real image or remove if not needed' });
  });
  return { check: 'image-audit', count: imgs.length, issues };
})()
```

---

#### Check E: Navigation Completeness

```javascript
(() => {
  const navLinks = [...document.querySelectorAll('nav a, header a')];
  const footerLinks = [...document.querySelectorAll('footer a')];
  const navMap = navLinks.map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }));
  const footerMap = footerLinks.map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }));
  const brokenNav = navMap.filter(l => !l.href || l.href === '#');
  const brokenFooter = footerMap.filter(l => !l.href || l.href === '#');
  return {
    check: 'navigation-completeness',
    navLinks: navMap,
    footerLinks: footerMap,
    issues: [
      ...brokenNav.map(l => ({ severity: 'high', location: 'nav/header', text: l.text, issue: `Broken nav link: href="${l.href}"`, fix: 'Point to correct #section-id or real URL' })),
      ...brokenFooter.map(l => ({ severity: 'high', location: 'footer', text: l.text, issue: `Broken footer link: href="${l.href}"`, fix: 'Point to correct URL or remove' }))
    ]
  };
})()
```

---

### Step 5: Cross-Reference with Analysis Report (if provided)

If `{analysis_report}` is available, read it and compare:

- **Original CTAs:** Every CTA from the analyzer's "CTAs and interactive elements" section should appear in the output. Flag any that are missing.
- **External links:** Every external link from the analyzer (e.g., Windy.com, social profiles) should be preserved. Flag any that are missing or point to `#`.
- **Authenticated resources:** Any link the analyzer flagged as "authenticated resource" (dashboard, login, app) must appear with a real URL or a `#TODO-replace` marker — never silently omitted.
- **Section coverage:** Every section from the analyzer's sitemap should have a corresponding section in the output with a working `id` attribute.

---

### Step 6: Generate Audit Report

Compile all check results into `{project_dir}/audit-report.md`:

```markdown
# Audit Report: {project_dir}
**Date:** {date}
**Auditor:** skill-debugger
**Project:** {project_dir}
**Analysis Report:** {path or "not provided"}
**Design Spec:** {path or "not provided"}

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | N |
| High | N |
| Medium/Warning | N |
| Info | N |
| **Total** | **N** |

**Overall status:** {Pass / Needs fixes / Critical issues found}

---

## Issues by Component

For each component file (site-header.tsx, hero.tsx, etc.):

### {component-name}.tsx

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 1 | Critical | Button "Entrar al Dashboard" has no href | Wrap in `<a href="{dashboard-url}">` or use `href="#TODO-dashboard-url"` | component-generator |
| 2 | High | Language mismatch: lang="en" but Spanish text found | Translate CTA or add functional toggle | component-generator, design-spec |
| ... | ... | ... | ... | ... |

---

## Skill Improvement Recommendations

For each upstream skill that needs updating:

### component-generator
- **Issue pattern:** {X} instances of bare `href="#"` across components
- **Rule to add:** "Never emit `href="#"` — use real URL, `#section-id`, or `#TODO-replace`"

### webapp-analyzer
- **Issue pattern:** Dashboard URL not captured from original site
- **Rule to add:** "Explicitly flag all authenticated resource links in Section 1"

### design-spec
- **Issue pattern:** Language strategy not specified, allowing mixed-language output
- **Rule to add:** "Always declare a Language Strategy section with explicit decision"

---

## Screenshots

- Desktop (1440px): `screenshots/audit_desktop.png`
- Tablet (768px): `screenshots/audit_tablet.png`
- Mobile (375px): `screenshots/audit_mobile.png`

---

## Next Steps

1. Apply fixes listed above to the project output
2. Re-run skill-debugger to confirm issues are resolved
3. Update the upstream skills per "Skill Improvement Recommendations"
4. Commit the fixed output and skill updates separately
```

---

### Step 7: Present Findings

Show the user:
1. The three screenshots (visual overview)
2. The summary table (critical/high/medium counts)
3. The top 5 most impactful issues with their fixes
4. Ask: "Shall I apply these fixes now, or do you want to review the full report first?"

---

### Step 8: Apply Fixes (with user approval)

For each Critical/High issue, apply the targeted fix directly to the component file:

- **Broken href:** Update the href to the correct URL or `#TODO-replace` with a comment
- **Button without action:** Wrap in `<a>` or add `onClick` with `window.location.href`
- **Language mismatch:** Translate the flagged text to match `lang` attribute, or add a TODO comment
- **Broken image:** Replace with a working fallback URL (use Unsplash as default)
- **Footer legal links:** Remove `#` links and replace with a `<span>` or remove the item entirely

After applying all fixes, re-navigate to `localhost:{port}` and take a new screenshot set
(save as `audit_fixed_desktop.png`, etc.) to confirm the changes.

---

## Tips

- **Port conflicts:** If `bun dev` uses a port other than 3000, check the terminal output or try
  3001, 3002 before asking the user.
- **Server not starting:** Ensure `node_modules` is installed first (`bun install`).
- **False positives on language check:** The Spanish accent detector may flag proper nouns or
  international place names (e.g., "Teahupo'o", "Uluwatu"). Use judgment — flag only text that
  is clearly a full sentence in a different language.
- **Buttons inside forms:** `<button type="submit">` without onclick is valid — skip those in
  Check B.
- **shadcn/ui Button component:** The `<Button>` component renders as a `<button>` in the DOM.
  If it has no wrapping `<a>` and no onClick, it should be flagged.
- **#section-id links:** `href="#features"`, `href="#spots"` etc. are valid — only flag `href="#"`
  with no segment after the hash.

---

## Skill Mapping Reference

Use this table when filling the "Skill to update" column in the audit report:

| Issue Type | Primary Skill | Secondary Skill |
|-----------|---------------|-----------------|
| Broken href / missing link | component-generator | — |
| Button with no action | component-generator | — |
| Language mismatch in content | component-generator | design-spec |
| Non-functional language toggle | component-generator | — |
| Missing dashboard/authenticated link | component-generator | webapp-analyzer |
| Same image across directions | component-generator | — |
| Sections structurally identical across directions | design-spec | component-generator |
| Missing section from original site | component-generator | webapp-analyzer |
| No navigation map in spec | design-spec | — |
| Missing external links from original | webapp-analyzer | component-generator |
