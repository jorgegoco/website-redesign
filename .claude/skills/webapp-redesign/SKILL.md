---
name: webapp-redesign
model: haiku
description: >
  Orchestrate a complete landing page redesign from URL to deployable Next.js project. Chains
  6 skills in sequence: webapp-analyzer, design-researcher, design-spec, component-generator,
  nextjs-assembler, live-reviewer. Supports multiple projects (per URL) and versioned iterations.
  Each step saves output to .redesign/{domain}/{version}/ so the workflow can resume from any
  point. Triggers: "redesign this site", "redesign this URL", "modernize this landing page",
  "full redesign workflow".
---

# Webapp Redesign — Orchestrator

Chain all redesign skills to go from a URL to a deployed landing page in one workflow.
Each step produces artifacts in a versioned project directory so you can iterate and compare.

## Usage

```
"redesign https://example.com"
"redesign https://example.com from components"    ← new version, re-run from Step 4
"resume redesign example.com"                     ← continue latest version
```

## Step 0: Initialize Project

Before running any skill, set up the working directory.

### 0a. Parse the URL

Extract the domain slug from the target URL:
- `https://www.waveridersurf.com/` → `waveridersurf.com`
- `https://example.com/landing` → `example.com`

Strip protocol, `www.`, and path. Use the bare domain as the project folder name.

### 0b. Determine Version

Check `.redesign/{slug}/` for existing version directories (`v1/`, `v2/`, ...):

- **No versions exist:** Create `v1`. Set `{workdir} = .redesign/{slug}/v1/`
- **Versions exist, user wants a new iteration:** Create `v(N+1)` where N is the highest existing version.
- **Versions exist, user wants to resume:** Use the latest existing version.

### 0c. Artifact Inheritance (new versions only)

When creating v2+ from a previous version:

1. Ask: "Which step do you want to re-run from?" Options:
   - `analysis` (Step 1) — full re-run
   - `research` (Step 2)
   - `spec` (Step 3)
   - `components` (Step 4) — most common: regenerate with different method
   - `assembly` (Step 5)
   - `review` (Step 6)

2. **Copy** all artifacts from the previous version up to (but not including) the chosen step:
   - Re-run from `components`: copy `analysis-report.md`, `trend-research.md`, `design-spec.md`, `screenshots/`
   - Re-run from `spec`: copy `analysis-report.md`, `trend-research.md`, `screenshots/`
   - Re-run from `analysis`: copy nothing (full re-run)

3. Copied files count as "existing" for the skip logic below.

### 0d. Set Project Name

- v1: derive from the site name (e.g., `surfit-ia`)
- v2+: append version suffix (e.g., `surfit-ia-v2`)
- Save to `{workdir}/project-name.txt`

### 0e. Announce

Tell the user: "Working on **{slug} v{N}**, artifacts at `{workdir}`"

## Workflow

```
Step 1: webapp-analyzer     → {workdir}/analysis-report.md
Step 2: design-researcher   → {workdir}/trend-research.md
Step 3: design-spec         → {workdir}/design-spec.md       [waits for approval]
Step 4: component-generator  → {workdir}/components/*.tsx
Step 5: nextjs-assembler    → {project-name}/src/...
Step 6: live-reviewer       → {project-name}/screenshots/
```

### Step 1: Analyze the Site

**Skill:** `webapp-analyzer`
**Input:** The target URL
**Output:** `{workdir}/analysis-report.md`, `{workdir}/screenshots/`

Run the full 6-phase analysis. Save the report and reference screenshots.

**Skip if:** `{workdir}/analysis-report.md` already exists. Ask user if they want to re-run.

### Step 2: Research Design Trends

**Skill:** `design-researcher`
**Input:** Industry/niche (inferred from the analysis report)
**Output:** `{workdir}/trend-research.md`

Search for current landing page trends matching the site's industry.

**Skip if:** `{workdir}/trend-research.md` already exists.

### Step 3: Create Design Spec

**Skill:** `design-spec`
**Input:** Analysis report + trend research
**Output:** `{workdir}/design-spec.md`

Combine original site tokens with trend research to produce a complete design direction.
**This is a gate — wait for user approval before proceeding.**

**Skip if:** `{workdir}/design-spec.md` already exists and was previously approved.

### Step 4: Generate Components

**Skill:** `component-generator`
**Input:** Design spec + content from analysis report
**Output:** `{workdir}/components/*.tsx`

Generate React/Tailwind/shadcn components for each section by writing code directly.
One standalone `.tsx` file per section, following the design spec exactly.

**Skip if:** `{workdir}/components/` directory already has files.

### Step 5: Assemble the Project

**Skill:** `nextjs-assembler`
**Input:** Design spec + generated components + analysis report
**Output:** Complete Next.js project directory

Read the project name from `{workdir}/project-name.txt`.

**Skip if:** A project directory already exists with `package.json` and `src/app/page.tsx`.

### Step 6: Live Preview & Iterate

**Skill:** `live-reviewer`
**Input:** Path to the Next.js project
**Output:** Screenshots at 3 breakpoints

Start dev server, capture desktop/tablet/mobile screenshots, present to user.
Iterate on feedback. Run final build when approved.

## Resuming a Workflow

If a session ends mid-workflow, a fresh session can resume by:

1. Reading `.redesign/{slug}/` to find the latest version
2. Checking which artifacts exist in that version
3. Picking up from the next incomplete step

Example: "resume redesign waveridersurf.com"

## Comparing Versions

After completing multiple versions of the same project:

1. Use `live-reviewer` to capture screenshots of each version's project
2. Present screenshots side-by-side for comparison
3. Note which generation method was used (v0 MCP vs Claude direct vs Chrome automation)

## Directory Structure

```
{working-directory}/
├── .redesign/
│   ├── {domain-slug}/
│   │   ├── v1/
│   │   │   ├── analysis-report.md
│   │   │   ├── screenshots/
│   │   │   ├── trend-research.md
│   │   │   ├── design-spec.md
│   │   │   ├── components/
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── features.tsx
│   │   │   │   └── ...
│   │   │   └── project-name.txt
│   │   └── v2/
│   │       ├── analysis-report.md   ← inherited from v1
│   │       ├── design-spec.md       ← inherited from v1
│   │       ├── components/          ← regenerated
│   │       └── project-name.txt
│   └── {another-domain}/
│       └── v1/
│           └── ...
├── {project-name}/                  ← v1 Next.js output
│   ├── src/
│   ├── public/
│   ├── screenshots/
│   └── package.json
└── {project-name}-v2/               ← v2 Next.js output
    └── ...
```
