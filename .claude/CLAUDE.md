# Agent Instructions

Read this entire file before starting any task.

---

## Project Purpose

This is a **personal reusable boilerplate** for redesigning client websites end-to-end. The goal
is a polished, reliable workflow that goes from a live URL to a deployable Next.js landing page
— repeatable across different clients and industries.

All client work (redesigned apps, analysis outputs, screenshots) lives **outside this repo**.
This repo contains only the skill definitions and workflow machinery.

### Entry point

**`webapp-redesign` skill** — the orchestrator. Chain:

```
webapp-analyzer → design-researcher → design-spec → component-generator → nextjs-assembler → live-reviewer
```

### Key directories

| Path | Purpose |
|---|---|
| `.claude/skills/` | Skill definitions — the only source of truth for how each step works |
| `.redesign/` | **Gitignored** — local-only folder for testing individual skills against a URL |

### Testing a skill

To test a single skill in isolation, run it against a URL and let the output land in `.redesign/`.
That folder is gitignored and will never be committed. Do not move outputs into the repo root.

---

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the
entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the
   "Learned Rules" section at the bottom of this file.
2. Rules are numbered sequentially and written as clear, imperative instructions.
3. Format: `N. [CATEGORY] Never/Always do X — because Y.`
4. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
5. Before starting any task, scan all rules below for relevant constraints.
6. If two rules conflict, the higher-numbered (newer) rule wins.
7. Never delete rules. If a rule becomes obsolete, append a new rule that supersedes it.

### When to add a rule

- User explicitly corrects your output ("no, do it this way")
- User rejects a file, approach, or pattern
- You hit a bug caused by a wrong assumption about this codebase
- User states a preference ("always use X", "never do Y")

### Rule format example

```
14. [CODE] Always use `bun` instead of `npm` — user preference, bun is installed globally.
15. [STYLE] Never add emojis to commit messages — project convention.
16. [ARCH] API routes live in `src/server/routes/`, not `src/api/` — existing codebase pattern.
```

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->

1. [PROCESS] Always stage and commit related changes together in their own commit. Unrelated changes go in separate commits.
2. [STYLE] Never mention Claude, AI assistants, or similar tools in commit messages.
3. [ARCH] Never commit skill test outputs (.redesign/, surfit-ia-*/, or any client redesign artifact) — they are gitignored and local only.
