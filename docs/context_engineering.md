# context_engineering

[handbook](../readme.md) · prev: [parallel_agents](parallel_agents.md) · next: [chinese_practice](chinese_practice.md)

**In one sentence:** the repository is the prompt — most "the model is stupid"
problems are missing context, not missing intelligence.

## four layers

| layer | loaded when | holds |
| --- | --- | --- |
| instructions (`AGENTS.md`) | always | project truth: build, test, style, boundaries |
| rules | when a file pattern matches | conventions for one directory or language |
| skills | when the task matches | procedures with steps and examples |
| tools and MCP | when called | live data and actions |

Rule of thumb: facts go in instructions, procedures go in skills, capabilities go
in tools. A procedure placed in instructions burns context on every single turn.

## agents.md, the one file that matters

Keep it under about 100 lines; it is read every session.

```markdown
# project

One paragraph: what this is, what it is not.

## build

    cmake --preset dev
    cmake --build --preset dev -j

## test

    ctest --preset dev --output-on-failure

## layout

- `src/` engine core; must not depend on `tools/`
- `include/` public headers; changing these is a binary-interface event
- `tests/` one file per unit, name mirrors the source
- `third_party/` vendored, never edited

## conventions

- C++23. snake_case for types and functions. No `m_` prefixes.
- No exceptions across module boundaries; return `std::expected`.
- No raw `new` or `delete`. Ownership is visible in the type.
- Include what you use; no reliance on transitive includes.

## rules for agents

- Minimum change. Do not reformat untouched code.
- Never edit `third_party/` or generated files.
- Never change public headers without saying so in the description.
- If the build fails twice for the same reason, stop and report.
- Prefer adding a failing test first.
```

The value is in the exact commands and the constraints, not the prose.

## directory layout

```
.
├── AGENTS.md                # project truth, always loaded
├── .cursor/
│   ├── rules/               # scoped rules with file patterns
│   └── skills/              # editor-side skills
├── .agents/
│   └── skills/
│       └── release_check/
│           └── SKILL.md
├── .opencode/               # terminal agent config
├── .mcp.json                # servers for this repository
├── compile_commands.json    # generated; best grounding file for c++
└── docs/
    └── decisions/           # short decision records
```

## scoped rule

```markdown
---
description: c++ source conventions
globs: ["src/**/*.cpp", "src/**/*.hpp"]
alwaysApply: false
---

- Prefer `std::span` over a pointer and a length.
- No `std::endl`; use `'\n'`.
- An allocation in a hot path needs a comment naming the arena.
- Public functions carry a one-line contract comment: preconditions only.
```

One purpose per rule file. A 300-line rule file is ignored in practice.

## skill

```markdown
---
name: release_check
description: >
  Pre-release verification for the engine. Use when preparing a tag, cutting a
  release branch, or when asked to verify release readiness.
---

# release_check

1. Confirm the version in `CMakeLists.txt` matches the tag.
2. Build with warnings as errors in release-with-debug-info.
3. Run the test suite plus the address and undefined-behaviour presets.
4. Diff public headers against the previous tag; any change goes in the changelog.
5. Produce the changelog grouped as: breaking, features, fixes, internal.

Stop and report on any failure. Never auto-fix during a release check.
```

Rule or skill? A rule is a constraint that is always true. A skill is a procedure
for a class of task. If it has numbered steps, it is a skill.

## context budget

- Load the smallest set of files that makes the task decidable.
- Prefer `file:line` citations over pasting whole files.
- Restate goal, constraints, and current state every few turns — or restart.
- A stale plan in context is worse than no plan. Delete it when it changes.

## decision records

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

Agents follow written decisions. They cannot follow decisions that live in a chat
window.
