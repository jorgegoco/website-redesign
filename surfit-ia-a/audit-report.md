# Audit Report: surfit-ia-a/
**Date:** 2026-03-28
**Auditor:** skill-debugger v1
**Project:** surfit-ia-a/ (Direction A — Cinematic Dark Immersive)
**Analysis Report:** .redesign/waveridersurf.com/v4/analysis-report.md
**Design Spec:** .redesign/waveridersurf.com/v4/direction-a/design-spec.md

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 6 |
| High | 6 |
| Medium | 3 |
| Info | 2 |
| **Total** | **17** |

**Overall status:** Critical issues found — not ready for delivery

---

## Issues by Component

### site-header.tsx

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 1 | High | Logo `SURFIT.IA` links to `href="#"` (silent dead link) | Change to `href="#hero"` (scroll to top) or `href="/"` | component-generator |
| 2 | Info | `Shop` nav link points to `#features` — surf shop and AI Coach are different features | Either add a dedicated `#shop` section ID or rename the label to reflect the actual target | component-generator |

### hero.tsx

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 3 | Critical | `<Button>` "Entrar al Dashboard" has **no href and no onClick** — it's a visually styled dead button | Wrap in `<a href="#TODO-dashboard-url">` or add `onClick={() => window.location.href = 'https://app.surfit.ia'}`. If dashboard URL is unknown, use `href="#TODO-dashboard-url"` with a comment | component-generator, webapp-analyzer |
| 4 | High | Spanish CTA in `lang="en"` page: "Entrar al Dashboard" — no functional language toggle | Translate to "Enter Dashboard" OR implement a `useState<'en'\|'es'>` functional toggle | component-generator, design-spec |
| 5 | High | Spanish body text in `lang="en"` page: "Domina la ciencia del surf con inteligencia artificial." | Translate to English: "Master the science of surfing with artificial intelligence." | component-generator |

### features-grid.tsx

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 6 | Critical | `<Button>` "Upload Surf Photo" — no href, no onClick action (dead button) | This should open a file picker or navigate to the AI coach tool. Add `onClick` handler or link to the actual upload URL | component-generator |
| 7 | Critical | `<Button>` "View Gallery" — no href, no action | Link to actual media gallery or remove if not implemented | component-generator |
| 8 | Critical | `<Button>` "Open Store List" — no href, no action | Link to actual store or external resource | component-generator |
| 9 | Critical | `<Button>` "Book Trip" — no href, no action | Link to actual booking resource or remove | component-generator |
| 10 | Critical | `<Button>` "View Spots" — no href, no action | Link to `#spots` section | component-generator |

### site-footer.tsx

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 11 | High | `YouTube` link → `href="#"` | Replace with real YouTube channel URL. The analyzer should have captured this from the original site | webapp-analyzer, component-generator |
| 12 | High | `YouTube Curated List` link → `href="#"` (in features section) | Same — link to real YouTube playlist | component-generator |
| 13 | High | `Privacy` → `href="#"` | Either link to a real privacy policy page or **remove the link** entirely — do not leave `href="#"` | component-generator |
| 14 | High | `Terms` → `href="#"` | Same as Privacy — link to real page or remove | component-generator |
| 15 | Medium | All "Features" column links point to `#features` | "Surf Shop", "Travel", "Spot Gallery" are distinct features but all link to the same `#features` anchor — consider dedicated section IDs or removing deceptive footer entries | component-generator |

### Image audit (across all components)

| # | Severity | Issue | Fix | Skill to update |
|---|----------|-------|-----|-----------------|
| 16 | Medium | 3 Unsplash images failed to load (likely rate-limited or URL format issue): `photo-1512100356132`, `photo-1502680390548`, `photo-1455729552457` | Verify URLs are valid; add `?w=800&auto=format&fit=crop` params; or replace with confirmed-working alternatives | component-generator |
| 17 | Medium | Hero uses the same Unsplash photo (`photo-1518837695005`) as directions B and C | Choose a distinct hero image for each direction | component-generator |

---

## Skill Debugger Self-Improvement Note

> **Check B (button CTA audit) returned false negatives.** The script detected 0 issues on 38 buttons because React's synthetic event system attaches handlers to the document root, making `btn.onclick !== null` return `true` for all buttons — even those with no real action. Future versions of Check B should instead inspect the React fiber tree or use source-code analysis (grep for `<Button>` without `asChild` or a wrapping `<a>`) rather than runtime DOM inspection.

---

## Skill Improvement Recommendations

### component-generator
- **Issue pattern:** 6 dead `<Button>` elements with no href and no meaningful onClick across hero.tsx and features-grid.tsx
- **Rule to add (already added):** "Every `<Button>` must be wrapped in `<a href="...">` or have a meaningful `onClick` handler — not a visual-only button"
- **Issue pattern:** 4 instances of `href="#"` in footer.tsx (YouTube, YouTube Curated List, Privacy, Terms)
- **Issue pattern:** 2 Spanish text strings in a `lang="en"` page with no language toggle

### webapp-analyzer
- **Issue pattern:** Dashboard URL not captured — "Entrar al Dashboard" has no target URL in the analysis report
- **Rule to add (already added):** "Run authenticated resource link detection script; record all `/app`, `/dashboard`, `/login` targets in Section 1 of the report"
- **Issue pattern:** YouTube channel URL not captured from original site

### design-spec
- **Issue pattern:** Language strategy not declared — mixed language slipped through to component generation
- **Rule to add (already added):** "Always complete Language Strategy section before writing component layout specs"

---

## Screenshots

| Breakpoint | File |
|-----------|------|
| Desktop (1440px) | `screenshots/audit_desktop.png` |
| Tablet (768px) | `screenshots/audit_tablet.png` |
| Mobile (375px) | `screenshots/audit_mobile.png` |

### Visual Observations from Screenshots

- **Desktop:** Hero renders correctly (cinematic dark, Bebas Neue, parallax). Sections below the hero appear very dark/nearly invisible — content sections may not be rendering (possible hydration or animation issue)
- **Tablet:** Same rendering gap — content below hero is missing/dark
- **Mobile:** Hero renders well. Content sections invisible. Footer renders correctly at bottom

> **Unresolved:** The near-empty appearance of the middle page sections (features, adventures, spots) may be a JS hydration issue or Framer Motion animation state not triggering. Recommend opening browser console during live review to check for errors.

---

## Next Steps

1. **Apply fixes** to surfit-ia-a/ (see issue list above)
2. **Re-run skill-debugger** to confirm all Critical/High issues resolved
3. **Investigate rendering gap** — open browser console at localhost:3000, scroll down, check for JS errors or Framer Motion failures
4. The skill improvements are already committed (`7ad7a78`) — they will apply to future redesigns
5. Once surfit-ia-a/ is clean, repeat this audit on surfit-ia-b/ and surfit-ia-c/
