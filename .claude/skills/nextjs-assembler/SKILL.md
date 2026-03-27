---
name: nextjs-assembler
description: >
  Scaffold a Next.js + Tailwind + shadcn/ui project and assemble a complete landing page from
  generated components, a design spec, and content from an analyzer report. Handles project
  creation, dependency setup, Tailwind v4 theme config, font imports, static export config,
  component integration, and page composition. Triggers: "assemble the project", "scaffold
  nextjs", "build the site", "create the next.js project".
---

# Next.js Assembler

Scaffold a production-ready Next.js project and assemble all generated components into a
complete, deployable landing page.

## Working Directory

All paths below are relative to `{workdir}`, set by the orchestrator.
When running standalone, `{workdir}` defaults to `.redesign/`.

## Input

- `{workdir}/design-spec.md` — approved design specification (colors, fonts, layout, components)
- `{workdir}/components/` — generated component files (hero.tsx, features-grid.tsx, etc.)
- `{workdir}/analysis-report.md` — content inventory (text, images, meta, nav)

Read all three. If any are missing, tell the user which skill to run first.

## Output

A complete Next.js project directory ready to run with `npm run dev` and build with
`npm run build`. Static output goes to `out/`.

## Before You Start

Extract these from the design spec — you will need them across multiple steps:

1. **Fonts** — heading font name + body font name (from Typography section)
2. **Colors** — full palette with hex values and Tailwind mappings (from Color Palette table)
3. **Gradients** — all gradient definitions (from Gradient Definitions section)
4. **shadcn/ui components** — exact list (from shadcn/ui Components table)
5. **Section order** — from Layout & Sections (defines page.tsx composition)
6. **Metadata** — title, description, OG image, language (from Content to Preserve)

## Workflow

### 1. Scaffold the Project

```bash
npx create-next-app@latest {project-name} \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Project name comes from `{workdir}/project-name.txt` or is derived from the site name.

### 2. Initialize shadcn/ui

```bash
cd {project-name}
npx shadcn@latest init -d
```

This creates `components.json` and sets up the `@/components/ui/` directory.

### 3. Add shadcn/ui Components

Read the **shadcn/ui Components** table from the design spec. Install exactly the components
listed — no more, no less.

```bash
npx shadcn@latest add button card badge sheet tabs separator scroll-area tooltip
```

**Important:** Also scan the generated component files for any additional shadcn imports
that aren't in the spec table (e.g., `Collapsible`, `Popover`). Install those too.

### 4. Configure Fonts

Read the **Typography** section of the design spec. Use the EXACT fonts listed there.

In `src/app/layout.tsx`:

```typescript
import { {HeadingFont}, {BodyFont} } from "next/font/google"

const headingFont = {HeadingFont}({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],  // weights from the design spec
})

const bodyFont = {BodyFont}({
  subsets: ["latin"],
  variable: "--font-body",
})
```

Apply both font variables to the root element:

```typescript
<html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
  <body className="font-body antialiased">
```

**Google Fonts import names** (these differ from display names):
- Bebas Neue → `Bebas_Neue` (weight: ["400"] only — Bebas has one weight)
- Space Grotesk → `Space_Grotesk`
- Inter → `Inter`
- Outfit → `Outfit`
- DM Sans → `DM_Sans`

### 5. Configure Tailwind v4 Theme

Tailwind v4 does NOT use `tailwind.config.ts`. Configuration lives in `src/app/globals.css`
using the `@theme inline` directive.

After the Tailwind imports (`@import "tailwindcss"`), add the theme block with all design
spec tokens:

```css
@import "tailwindcss";

@theme inline {
  /* Fonts */
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);

  /* Colors from design spec Color Palette table */
  --color-background: {hex};
  --color-surface: {hex or rgba};
  --color-surface-hover: {hex or rgba};
  --color-border: {hex or rgba};
  --color-primary: {hex};
  --color-secondary: {hex};
  --color-accent: {hex};
  --color-text-primary: {hex};
  --color-text-secondary: {hex};
  --color-text-muted: {hex};
  --color-danger: {hex};
  --color-warning: {hex};
  --color-success: {hex};
  /* Add ALL colors from the design spec — do not skip any */
}
```

This makes colors available as `bg-background`, `text-primary`, `border-border`, etc.

**Important:** Keep any existing shadcn/ui CSS variables that `globals.css` already has
(from `shadcn init`). Merge your design spec colors with them — don't replace the whole file.

### 6. Configure Static Export and Install Dependencies

In `next.config.ts`:

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
}

export default nextConfig
```

Install animation library:

```bash
npm install framer-motion
```

### 7. Copy and Integrate Components

List ALL `.tsx` files in `{workdir}/components/`. Copy every single one to
`src/components/sections/`:

```bash
cp {workdir}/components/*.tsx src/components/sections/
```

**Verify:** After copying, check each component's imports:
- `@/components/ui/*` — should resolve correctly (shadcn is at this path)
- `lucide-react` — already a dependency of shadcn
- `framer-motion` — installed in step 6

If any component imports from another generated component (e.g., `surf-spots.tsx` imports
`./spot-card`), ensure both files are in the same directory and the import path is correct.

### 8. Compose page.tsx

Read the design spec's **Layout & Sections** to determine the correct section order.
Then read each component file to determine its export style (default export vs named export).

In `src/app/page.tsx`:

```typescript
import SiteHeader from "@/components/sections/site-header"
import Hero from "@/components/sections/hero"
// ... import ALL section components in order
import SiteFooter from "@/components/sections/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* Utility components like SectionNav go here if they exist */}
      <main>
        <Hero />
        {/* ... all content sections in design spec order */}
      </main>
      <SiteFooter />
    </>
  )
}
```

**Critical:** Import and use EVERY component from `src/components/sections/`. If a component
is a page-level utility (like `section-nav.tsx` for floating navigation), place it outside
`<main>` at the appropriate position. No generated component should be dead code.

### 9. Set Metadata

In `src/app/layout.tsx`, set metadata from the design spec's **Content to Preserve** section:

```typescript
export const metadata: Metadata = {
  title: "{from design spec}",
  description: "{from design spec}",
  openGraph: {
    title: "{from design spec}",
    description: "{from design spec}",
    images: ["{og:image strategy from design spec}"],
  },
}
```

Also set the `lang` attribute on `<html>` to match the design spec's language decision.

### 10. Build and Verify

```bash
npm run build
```

Fix any TypeScript or build errors. Common issues:
- **Missing shadcn component:** Run `npx shadcn@latest add {component-name}`
- **Import path errors:** Ensure `@/` alias resolves to `./src/`
- **Type errors in components:** Fix inline — don't skip with `// @ts-ignore`
- **Framer Motion SSR issues:** Ensure all animated components have `"use client"`

Verify:
- `out/` directory exists (static export succeeded)
- `npm run dev` starts without errors
- Open `http://localhost:3000` — page renders with all sections

## Tips

- **Don't modify component internals** — the components are already styled and content-complete.
  Only fix broken imports or TypeScript errors.
- **Font loading:** If a font only has one weight (like Bebas Neue), only specify that weight
  in the `next/font/google` config. Specifying weights the font doesn't have causes build errors.
- **Delete boilerplate:** Remove the default Next.js content from `page.tsx` and clean up
  `globals.css` boilerplate (default body styles, etc.) before adding design spec tokens.
- **Keep shadcn CSS variables:** The `shadcn init` step adds CSS variables to `globals.css`.
  Keep those — they're needed by shadcn components. Add your design spec colors alongside them.
