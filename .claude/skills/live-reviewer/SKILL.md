---
name: live-reviewer
description: >
  Preview a Next.js project in the browser via Chrome MCP, capture screenshots at desktop,
  tablet, and mobile breakpoints, and iterate based on user feedback. Triggers: "preview the
  site", "review the design", "take screenshots", "show me the result", "how does it look".
  Requires Chrome MCP tools to be connected.
---

# Live Reviewer

Start a Next.js dev server, preview the site in Chrome via MCP tools, capture screenshots
at 3 breakpoints, and iterate on feedback until the user approves.

## Prerequisites

- **Chrome MCP tools** must be connected
- A Next.js project that can run with `npm run dev`

## Input

- Path to the Next.js project directory
- If not provided, look for the most recently created project in the working directory

## Output

Save screenshots to `screenshots/` in the project directory:
- `screenshots/desktop.png` (1440x900)
- `screenshots/tablet.png` (768x1024)
- `screenshots/mobile.png` (375x812)

## Workflow

### 1. Start Dev Server

```bash
cd {project-path}
npm run dev
```

Run in background. Wait for the "Ready" message (typically `http://localhost:3000`).

### 2. Navigate to the Site

```
navigate_page -> url: "http://localhost:3000"
```

Wait for the page to load:
```
wait_for -> text: [{any heading text from the site}], timeout: 15000
```

### 3. Capture Desktop (1440px)

```
resize_page -> width: 1440, height: 900
take_screenshot -> filePath: "{project-path}/screenshots/desktop.png"
```

### 4. Capture Tablet (768px)

```
resize_page -> width: 768, height: 1024
take_screenshot -> filePath: "{project-path}/screenshots/tablet.png"
```

### 5. Capture Mobile (375px)

```
resize_page -> width: 375, height: 812
take_screenshot -> filePath: "{project-path}/screenshots/mobile.png"
```

Restore to desktop width after captures.

### 6. Present to User

Show all three screenshots. Ask for feedback on:
- Overall visual impression
- Color balance and contrast
- Typography readability
- Section ordering and hierarchy
- Mobile responsiveness
- Any content that needs adjustment

### 7. Iteration Loop

For each piece of feedback:
1. Edit the component or config file
2. Dev server hot-reloads automatically
3. Re-screenshot the affected breakpoint(s)
4. Show the updated result
5. Repeat until approved

### 8. Final Build

Once approved:

```bash
npm run build
```

Verify the build succeeds. The static output will be in `out/`, ready for deployment.

## Tips

- **Full-page screenshots** — use `fullPage: true` on `take_screenshot` to capture the
  entire page, not just the viewport, when reviewing overall layout.
- **Quick iterations** — for small tweaks (color, spacing), edit the Tailwind config or
  component directly and re-screenshot. No need to restart the dev server.
- **Compare side-by-side** — capture before/after screenshots to show the user the diff.
