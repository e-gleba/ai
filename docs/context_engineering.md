# context_engineering

[handbook](../README.md) · prev: [parallel_agents](parallel_agents.md) · next: [mcp](mcp.md)

The repo is the prompt. Most "the model is dumb" problems are missing context,
not missing intelligence.

## the four layers

| layer | always loaded | use for |
| --- | --- | --- |
| instructions (`AGENTS.md`) | yes | project truth: build, test, style, boundaries |
| rules (scoped) | when the glob matches | per-directory or per-language conventions |
| skills | on demand, when the task matches | procedures with steps, scripts, and examples |
| tools / MCP | on call | live data and side effects |

Rule of thumb: facts go in instructions, procedures go in skills, capabilities
go in tools. Putting a procedure in instructions burns context on every turn.

## agents.md — the one file that matters

Keep it under ~100 lines. It is read every session.

```markdown
# project

One paragraph: what this is, what it is not.

## build

    cmake --preset dev
    cmake --build --preset dev -j

## test

    ctest --preset dev --output-on-failure

## layout

- `src/` engine core; no dependency on `tools/`
- `include/` public headers; changing these is an ABI event
- `tests/` one file per unit; name mirrors source
- `third_party/` vendored, never edit

## conventions

- C++23. snake_case for types and functions. No Hungarian, no `m_` prefixes.
- No exceptions across module boundaries; return `std::expected`.
- No raw `new`/`delete`. Ownership is explicit in the type.
- Headers: no transitive includes; include what you use.

## rules for agents

- Minimum diff. Do not reformat untouched code.
- Never edit `third_party/` or generated files.
- Never change public headers without saying so in the PR description.
- If the build fails twice for the same reason, stop and report.
- Prefer adding a failing test first.
```

The value is in the constraints and the exact commands, not the prose.

## directory layout for agent config

```
.
├── AGENTS.md                # project truth, always loaded
├── .cursor/
│   ├── rules/               # scoped .mdc rules with globs
│   └── skills/              # optional, editor-side skills
├── .agents/
│   └── skills/
│       └── release_check/
│           └── SKILL.md
├── .opencode/               # terminal agent config
├── .mcp.json                # local mcp servers for this repo
├── compile_commands.json    # generated; the single best c++ grounding artifact
└── docs/
    └── decisions/           # short adrs; agents read these instead of guessing
```

## scoped rule template

```markdown
---
description: c++ source conventions
globs: ["src/**/*.cpp", "src/**/*.hpp"]
alwaysApply: false
---

- Prefer `std::span` over pointer+length pairs.
- No `std::endl`; use `'\n'`.
- Allocations in hot paths require a comment naming the arena.
- Public functions carry a one-line contract comment: preconditions only.
```

Keep each rule file single-purpose. A 300-line rule file is ignored in practice.

## skill template

```markdown
---
name: release_check
description: >
  Pre-release verification for the engine. Use when preparing a tag,
  cutting a release branch, or when asked to verify release readiness.
---

# release_check

1. Confirm the version bump in `CMakeLists.txt` matches the tag.
2. Build with `-DCMAKE_BUILD_TYPE=RelWithDebInfo` and warnings as errors.
3. Run `ctest` plus the asan and ubsan presets.
4. Diff public headers against the previous tag; any change is a note in the changelog.
5. Produce the changelog grouped as: breaking, features, fixes, internal.

Stop and report if any step fails. Never auto-fix during a release check.
```

Skill vs rule: a rule is a constraint that is always true; a skill is a
procedure invoked for a class of task. If it has numbered steps, it is a skill.

## context budget

- Load the smallest set of files that makes the task decidable.
- Prefer `file:line` citations over pasting whole files.
- Re-anchor long sessions: restate goal, constraints, and current state every
  few turns, or restart the session.
- A stale plan in context is worse than no plan. Delete it when it changes.

## decisions folder

Short ADRs beat tribal knowledge:

```markdown
# 0007 — no exceptions across module boundaries

Date: {{date}}
Status: accepted

## context
Mixed toolchains and plugin loading make exception propagation unreliable.

## decision
Module boundaries return `std::expected`. Exceptions may exist inside a module.

## consequences
Wrappers at boundaries; agents must not "simplify" by throwing across them.
```

Agents follow written decisions. They cannot follow decisions that live in chat.
