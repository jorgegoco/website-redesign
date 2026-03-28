# Agent Instructions

Read this entire file before starting any task.

---

## Project Purpose

This is a **personal reusable boilerplate** for redesigning client websites end-to-end. The goal is a polished, reliable workflow that goes from a live URL to a deployable Next.js landing page — repeatable across different clients and industries.

### Entry points

- **`webapp-redesign` skill** — the orchestrator that chains all 6 skills in sequence. Start here when running a redesign.
- **This file (CLAUDE.md)** — project context, rules, and constraints. Read before every session.

### Skill chain

```
webapp-analyzer → design-researcher → design-spec → component-generator → nextjs-assembler → live-reviewer
```

Each skill has its own `SKILL.md` in `.claude/skills/{skill-name}/`. Skills are evaluated and improved individually.

### Current audit material

`surfit-ia-a/`, `surfit-ia-b/`, `surfit-ia-c/` — three built Next.js outputs representing design directions A, B, C for waveridersurf.com (generated via `.redesign/waveridersurf.com/v4/`). Use these to audit skill outputs and improve SKILL.md files one by one.

### Key directories

| Path | Purpose |
|---|---|
| `.claude/skills/` | Skill definitions (SKILL.md files) |
| `.redesign/` | Versioned artifacts per domain (analysis, spec, components, screenshots) |
| `surfit-ia-{a,b,c}/` | Current reference outputs for skill auditing |

---

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section at the bottom of this file.
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
