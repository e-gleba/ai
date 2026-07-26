# ai handbook

[![docs](https://github.com/e-gleba/ai/actions/workflows/docs.yml/badge.svg)](https://github.com/e-gleba/ai/actions/workflows/docs.yml)
[![external links](https://github.com/e-gleba/ai/actions/workflows/link_check.yml/badge.svg)](https://github.com/e-gleba/ai/actions/workflows/link_check.yml)

A working handbook for using AI as an engineer: which tool for which job, which
model for which task, the prompts that get used, and the review discipline that
keeps the output honest.

Plain markdown. No website, no build step, no dependencies. Copy a block, fill the
`{{placeholders}}`, get on with the day.

Written by a C++ game-engine R&D engineer, so the hard examples are systems code —
but most of it is process, and process transfers.

## new here

Start with [start_here](docs/start_here.md). It explains every term used later in
five short definitions and assumes no background. Then read
[failure_modes](docs/failure_modes.md), which saves more time than any prompt.

## the handbook

**foundations**

| page | what it answers |
| --- | --- |
| [start_here](docs/start_here.md) | the five words that matter, and the one rule |
| [daily_routine](docs/daily_routine.md) | what to do at 09:00, at review time, at the end of the day |
| [tool_stack](docs/tool_stack.md) | which tool for which job, and the real limitation of each |
| [model_selection](docs/model_selection.md) | how to pick a model without reading marketing |
| [arenas_and_benchmarks](docs/arenas_and_benchmarks.md) | where to get a number, and how to read it |

**doing the work**

| page | what it answers |
| --- | --- |
| [prompt_library](docs/prompt_library.md) | the blocks: plan, implement, debug, explain, attack |
| [code_review](docs/code_review.md) | the review pipeline, author side and reviewer side |
| [parallel_agents](docs/parallel_agents.md) | several agents, one repository, no merge pain |
| [context_engineering](docs/context_engineering.md) | project instructions, rules, skills, layout |
| [chinese_practice](docs/chinese_practice.md) | design-first process habits that make teams fast |

**hard mode**

| page | what it answers |
| --- | --- |
| [engine_rnd](docs/engine_rnd.md) | cross-platform engine core work, and what to keep away from hosted models |
| [cpp_playbook](docs/cpp_playbook.md) | grounding C++: compile flags, sanitizers, machine code |
| [local_models](docs/local_models.md) | private, offline, and high-volume cheap work |
| [mcp](docs/mcp.md) | the common plug shape for tools, and how not to misuse it |

**knowing things**

| page | what it answers |
| --- | --- |
| [research_osint](docs/research_osint.md) | sourcing, triangulation, verification, reverse engineering |
| [digests](docs/digests.md) | recurring digest prompts per interest area |
| [failure_modes](docs/failure_modes.md) | how this goes wrong, counter first |
| [glossary](docs/glossary.md) | every term, one line each |

## the idea in four lines

```
1. Say what "done" means, as something a machine can check.
2. Let the model work, inside stated limits.
3. Verify with a test, a build, a number, or a primary source.
4. Write down what wasted time today, and change one thing tomorrow.
```

## conventions

- File names are lowercase with underscores: `code_review.md`.
- One topic per file; pages link to each other instead of repeating.
- Prompts sit in fenced blocks so they copy cleanly; `{{date}}` means today in
  ISO form, such as `2026-07-26`.
- Every tool claim states the limitation, not only the benefit.
- No screenshots, no generated assets, no lockfiles.

## checks

Two workflows run on GitHub Actions: markdown style plus an offline check of every
internal link on each pull request, and a weekly audit of external links that opens
an issue when a bookmark dies.

## contributing

Corrections and better practices are welcome: [contributing](contributing.md),
[code of conduct](code_of_conduct.md), [security](security.md).
