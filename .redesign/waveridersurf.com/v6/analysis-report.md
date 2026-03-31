# Webapp Analysis Report: Surfit - AI Wave Rider
**URL:** https://waveridersurf.com/
**Date:** 2026-03-29
**Views analyzed:** 2
**Site type:** SPA (React, single URL, all state managed client-side)

---

## Sitemap

```
https://waveridersurf.com/                                         [view1_landing.png]
└─ [button JS] "ENTRAR AL DASHBOARD" → app revealed               [view2_landing.png]
    ├─ [scroll] below-fold content                                 [view2_scroll1.png, view2_scroll2.png]
    ├─ [a11y button] "English" → language dropdown (6 options)     [view2_dropdown_language.png]
    ├─ [JS div] "Surf Images" → My Photo Gallery overlay           [view2_surf-images.png]
    ├─ [JS div] "Videos" → My Video Gallery overlay                [view2_videos.png]
    ├─ [JS div] "Surf Shop" → SURFIT STORE overlay (10 shops)      [view2_surf-shop.png]
    ├─ [JS div] "World Spot Gallery" → World Surf Sanctuaries      [view2_world-spot-gallery.png]
    ├─ [JS div] "Adventure & Advice" → Epic Surf Adventures        [view2_best-trips.png]
    ├─ [a11y button] "Ask Coach" ×10 → inline coach tip            [view2_ask-coach.png]
    ├─ [a11y button] expand ×10 → inline spot detail panel         [view2_spot-detail.png]
    └─ [JS div] "Surfit" logo → hero overlay restored              [view2_logo-home-nav.png]
```

---

## Views

### View 1: Hero Overlay (Landing)
**URL / trigger:** https://waveridersurf.com/
**Screenshots:** `screenshots/view1_landing.png`

**Content:**
- Title: "Surfit - AI Wave Rider"
- H1: "SURFIT.IA"
- Key text: "NEXT-GEN SURF INTELLIGENCE", "DOMINA LA FUERZA DEL OCÉANO CON EL PODER DE LA INTELIGENCIA ARTIFICIAL"
- Feature labels: "BIOMECHANICAL", "GLOBAL SPOTS", "AI COACHING"
- Images: 1 (background ocean photo, Unsplash)
- Forms: none
- Meta: description=no, OG image=no, canonical=no, lang="en"

**Notes:** A full-screen hero overlay (`div.fixed.inset-0.z-[200]`) covers the entire app on load.
The app dashboard is rendered beneath it in the DOM but completely hidden. Spanish-language tagline
in an otherwise English app.

**Interaction map:**

| Element | Source | Outcome | Screenshot |
|---------|--------|---------|------------|
| "ENTRAR AL DASHBOARD" | a11y button | C — hero dismissed, app revealed | view2_landing.png |

---

### View 2: App Dashboard
**URL / trigger:** clicking "ENTRAR AL DASHBOARD" on View 1 (same URL, React state change)
**Screenshots:** `screenshots/view2_landing.png`, `view2_scroll1.png`, `view2_scroll2.png`

**Content:**
- H1: "IA Wave Rider"
- H2: "Biomechanical Analysis", "Adventure & Advice", "TOP 10 WORLD SURF SPOTS & TRAINER"
- H3: "Upload Surf Photo", "Surf Shop", "Google Travel Surf", "World Spot Gallery"
- Key text: AI surf photo/video analysis, curated surf shop directory, world spot rankings with coach tips
- Images: background wave (Unsplash), surf spot card images
- Forms: file input (`accept="image/*,video/*"`) inside "Upload Surf Photo" card — AI analysis feature
- Meta: description=no, OG image=no, canonical=no, lang="en"
- Footer: "© 2024 Surfit AI. Powered by Gemini."

**Interaction map:**

| Element | Source | Outcome | Screenshot |
|---------|--------|---------|------------|
| "Surfit" logo (header) | JS cursor:pointer div | C — hero overlay re-shown (View 1 restored) | view2_logo-home-nav.png |
| "English" button | a11y button | C — 6 language options: 🇺🇸 English, 🇪🇸 Español, 🇫🇷 Français, 🇵🇹 Português, 🇩🇪 Deutsch, 🇯🇵 日本語 | view2_dropdown_language.png |
| "SEARCH" | JS cursor:pointer div | D — dead (no change) | — |
| "SURF FORECAST" | a11y link | external — windy.com | — |
| "Upload Surf Photo" card | JS cursor:pointer div | skip — wraps `input[type=file]` (accepts image/*, video/*) | — |
| "Surf Images" card | JS cursor:pointer div | B — fixed overlay: "My Photo Gallery" (upload history, dated entries) | view2_surf-images.png |
| "Videos" card | JS cursor:pointer div | B — fixed overlay: "My Video Gallery" (upload history, dated entries) | view2_videos.png |
| "Surf Shop" card | JS cursor:pointer div | B — fixed overlay: "SURFIT STORE / OFFICIAL PARTNERS" — Top 10 surf shops with external "Visit Store" links | view2_surf-shop.png |
| "Google Travel Surf" | a11y link | external — google.com/travel | — |
| "World Spot Gallery" card | JS cursor:pointer div | B — fixed overlay: "World Surf Sanctuaries" — 6 spots with "EXPLORE VIEW" buttons (dead) | view2_world-spot-gallery.png |
| "EXPLORE VIEW" ×6 | a11y button (inside overlay) | D — dead | — |
| "Adventure & Advice" card | JS cursor:pointer div | B — fixed overlay: "Epic Surf Adventures & Guides" — 6 YouTube trip links | view2_best-trips.png |
| "VIEW ALL" | a11y button | D — dead | — |
| "Ask Coach" ×10 | a11y button (template) | C — inline coach tip revealed (e.g. "Paddle hard and commit fully.") | view2_ask-coach.png |
| expand button ×10 (unnamed) | a11y button (template) | C — inline spot detail panel (wave type, season, hazards) | view2_spot-detail.png |
| "Maps" ×10 | a11y link (template) | external — google.com/maps (×10 instances, 1 recorded) | — |
| "Forecast" ×10 | a11y link (template) | external — surfline.com (×10 instances, 1 recorded) | — |

---

## Template Catalog

| Template | Pattern | Instances | Analyzed |
|----------|---------|-----------|---------|
| Surf spot card | Ranked card: Ask Coach + expand button | 10 | View 2 (Pipeline) |
| "Ask Coach" modal | Inline coach tip (AI-generated) | 10 | View 2 (Pipeline) |
| Spot detail panel | Inline wave type / season / hazards | 10 | View 2 (Pipeline) |
| Maps link | google.com/maps per spot | 10 | Recorded, skipped |
| Forecast link | surfline.com per spot | 10 | Recorded, skipped |
| Shop "Visit Store" | External shop links inside Surf Shop overlay | 10 | Recorded inside overlay |
| Adventure trip | YouTube search link inside Adventure overlay | 6 | Recorded inside overlay |

---

## Design Tokens

### Colors
| Role | Value | Tailwind equiv |
|------|-------|---------------|
| Background (deepest) | rgb(2, 6, 23) — #020617 | slate-950 |
| Text primary | rgb(255, 255, 255) | white |
| Text secondary | rgb(156, 163, 175) | gray-400 |
| Text muted | rgb(107, 114, 128) | gray-500 |
| Text light | rgb(229, 231, 235) | gray-200 |
| Accent blue (primary) | rgb(37, 99, 235) | blue-600 |
| Accent blue (light) | rgb(96, 165, 250) | blue-400 |
| Blue tint bg | rgba(37, 99, 235, 0.1–0.2) | blue-600/10–20 |
| Card surface | rgba(255, 255, 255, 0.05) | white/5 |
| Card border | rgba(255, 255, 255, 0.1) | white/10 |
| Overlay backdrop | rgba(0, 0, 0, 0.6) | black/60 |
| Badge red | rgb(248, 113, 113) / rgba(239, 68, 68, 0.1) | red-400 / red-500/10 |
| Badge orange | rgb(251, 146, 60) / rgba(249, 115, 22, 0.1) | orange-400 / orange-500/10 |
| Badge green | rgb(74, 222, 128) / rgba(34, 197, 94, 0.1) | green-400 / green-500/10 |
| Badge purple | rgba(168, 85, 247, 0.1) | purple-500/10 |

### Typography
- **Font family:** Inter (Google Fonts, weights 300/400/500/600/700/800)
- **Size scale:** 9px, 11px, 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 96px
- **Weights in use:** 400 (normal), 500 (medium), 700 (bold), 900 (black)

### Spacing & Layout
- **Border radii:** 9999px (pill/full), 24px (rounded-3xl), 16px (rounded-2xl)
- **Layout pattern:** 65 flex containers / 7 grid containers
- **Main grid:** `grid-cols-12` (12-column)
- **Card heights:** h-48 (192px) for section cards, h-96 (384px) for adventure card
- **CSS custom properties:** none (Tailwind CDN, no design token system)

---

## External Links

| Domain | Count | Purpose | Sample URL |
|--------|-------|---------|------------|
| windy.com | 1 | Surf wave forecast | https://www.windy.com/?waves,30.392,-28.125,3 |
| google.com/travel | 1 | Surf trip booking | https://www.google.com/travel/explore?q=surfing |
| google.com/maps | 10 | Per-spot map link | https://www.google.com/maps/search/?api=1&query=Pipeline… |
| surfline.com | 10 | Per-spot wave forecast | https://www.surfline.com/search/Pipeline |
| decathlon.com | 1 | Surf shop (inside overlay) | https://www.decathlon.com/collections/surfing |
| blue-tomato.com | 1 | Surf shop (inside overlay) | https://www.blue-tomato.com/en-GB/surf/ |
| mundo-surf.com | 1 | Surf shop (inside overlay) | https://www.mundo-surf.com/en/ |
| torq-surfboards.com | 1 | Surf shop (inside overlay) | https://www.torq-surfboards.com/ |
| pukassurfshop.com | 1 | Surf shop (inside overlay) | https://pukassurfshop.com/ |
| firewiresurfboards.com | 1 | Surf shop (inside overlay) | https://www.firewiresurfboards.com/ |
| boardshop.co.uk | 1 | Surf shop (inside overlay) | https://www.boardshop.co.uk/ |
| tradeinn.com/xtremeinn | 1 | Surf shop (inside overlay) | https://www.tradeinn.com/xtremeinn/en/surfing/13/f |
| needessentials.com | 1 | Surf shop (inside overlay) | https://needessentials.com/ |
| thesurfboardwarehouse.com.au | 1 | Surf shop (inside overlay) | https://www.thesurfboardwarehouse.com.au/ |
| youtube.com | 6 | Surf trip videos (inside overlay) | https://www.youtube.com/results?search_query=mentawai+surf+trip |

---

## Technical Surface

| Item | Detail |
|------|--------|
| Framework | React SPA (single bundle, no SSR) |
| Build | Vite (hashed bundle: `index-DJlDBCnZ.js`) |
| Main bundle | `/assets/index-DJlDBCnZ.js` [200 OK] |
| Stylesheets | `index.css` [**404 — BROKEN**], Google Fonts Inter [200] |
| Tailwind | CDN (`cdn.tailwindcss.com`) — runtime, not compiled |
| AI API | Gemini (client-side, for surf photo/video analysis) |
| Third-party | cdn.tailwindcss.com, fonts.googleapis.com |
| Client state | React local state (no Redux / Zustand / Next.js detected) |
| WebSocket | `_websocket-interceptor.js` (hosting/dev tool artifact) |
| Lang | `lang="en"` declared |

---

## Redesign Signals

### Critical
- **`index.css` returns 404** — production stylesheet missing. Any base/reset styles absent.
- **"SEARCH" is dead** — prominent header element that does nothing. Users expect a search experience.
- **"VIEW ALL" is dead** — non-functional button in the surf spots section.
- **"EXPLORE VIEW" ×6 dead** — all buttons inside World Surf Sanctuaries overlay have no effect.
- **No meta description, no OG image, no canonical URL** — invisible to search engines and social sharing.

### Structural
- **Hero overlay UX anti-pattern** — entire app hidden behind `z-[200]` fixed overlay on load. User must click "ENTRAR AL DASHBOARD" (Spanish CTA) to see the English app. Creates confusion.
- **JS-only interactive elements** — "Surf Images", "Videos", "Surf Shop", "World Spot Gallery", "Adventure & Advice", "Surfit" logo are all `div`/`span` with `cursor:pointer`/`onclick` but no ARIA roles. Inaccessible to keyboard/screen-reader users.
- **All content under one URL** — complete SPA. Redesign must replicate React state management for all 5 overlay panels.
- **Tailwind via CDN** — no tree-shaking, full runtime CSS (~350 kB), no custom theme. Redesign should use compiled Tailwind with proper config.
- **Core feature buried** — the AI photo/video analysis (Gemini) is the headline value but sits below the fold as a small upload widget. Should lead the redesigned experience.
- **Content inside overlays not discoverable via URL** — Surf Shop, World Spot Gallery, Adventure content only reachable by clicking specific cards. No deep linking.

### Language Notes
- **Page lang:** `lang="en"`
- **Foreign text detected:** yes
- **Examples:** "DOMINA LA FUERZA DEL OCÉANO CON EL PODER DE LA INTELIGENCIA ARTIFICIAL", "ENTRAR AL DASHBOARD", "SURFIT.IA"
- **Recommendation:** Consistent language strategy required. The 6-language dropdown suggests multilingual intent — implement proper i18n. Remove Spanish brand text from an English-primary interface, or commit to full Spanish support.
