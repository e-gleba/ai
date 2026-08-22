# ai handbook

[![docs](https://github.com/e-gleba/ai/actions/workflows/docs.yml/badge.svg)](https://github.com/e-gleba/ai/actions/workflows/docs.yml)
[![external links](https://github.com/e-gleba/ai/actions/workflows/link_check.yml/badge.svg)](https://github.com/e-gleba/ai/actions/workflows/link_check.yml)

A working handbook for using AI as an engineer: which tool for which job, which model
for which task, the prompts that get used, and the review discipline that keeps the
output honest.

Plain markdown, no website, no build step. Copy a block, fill the `{{placeholders}}`,
get on with the day.

Written by a C++ game-engine R&D engineer, so the hard examples are systems code — but
most of it is process, and process transfers.

## new here

[start_here](docs/start_here.md) explains every term used later and assumes no
background. Then [failure_modes](docs/failure_modes.md), which saves more time than any
prompt.

## handbook

**foundations**

| page | what it answers |
| --- | --- |
| [start_here](docs/start_here.md) | the five words that matter, and the one rule |
| [daily_routine](docs/daily_routine.md) | what to do at 09:00, at review time, at the end of the day |
| [tool_stack](docs/tool_stack.md) | which tool for which job, and the real limitation of each |
| [model_selection](docs/model_selection.md) | how to pick a model without reading marketing |

**doing the work**

| page | what it answers |
| --- | --- |
| [prompt_library](docs/prompt_library.md) | the blocks: plan, implement, debug, explain, attack |
| [code_review](docs/code_review.md) | the review pipeline, author side and reviewer side |
| [parallel_agents](docs/parallel_agents.md) | several agents, one repository, no merge pain |
| [context_engineering](docs/context_engineering.md) | which config file exists, who reads it, what goes in it |
| [best_practice](docs/best_practice.md) | design-first process habits, with sources |

**hard mode**

| page | what it answers |
| --- | --- |
| [engine_rnd](docs/engine_rnd.md) | engine core work, and what must never reach a hosted model |
| [cpp_playbook](docs/cpp_playbook.md) | grounding C++: compile flags, sanitizers, machine code |
| [local_models](docs/local_models.md) | private, offline, and high-volume cheap work |
| [mcp](docs/mcp.md) | the common plug shape for tools, and how not to misuse it |

**reference**

| page | what it answers |
| --- | --- |
| [failure_modes](docs/failure_modes.md) | how this goes wrong, counter first |
| [glossary](docs/glossary.md) | every term, one line each |

## skills

Drop-in procedures an agent loads only when the task matches, in the portable
`SKILL.md` format — index and install steps in [skills](skills/readme.md).

| skill | use when |
| --- | --- |
| [cmake](skills/cmake/SKILL.md) | targets, presets, install, packaging, compilation database |
| [cpp20](skills/cpp20/SKILL.md) | modern C++23 in namespace tb: fixed-width ints, value semantics, reuse-first |
| [python](skills/python/SKILL.md) | stdlib first, black, ruff, type hints |
| [code_review](skills/code_review/SKILL.md) | review with plain git, on any host |
| [tb_engine](skills/tb_engine/SKILL.md) | a DAVA-derived engine fork under a `tb::` namespace |
| [android_studio](skills/android_studio/SKILL.md) | adb, profilers, Perfetto, native crashes, Gradle/NDK |
| [wwise](skills/wwise/SKILL.md) | events, soundbanks, RTPCs, profiler-driven audio debugging |
| [rnd](skills/rnd/SKILL.md) | spikes that end in a decision: hypothesis, timebox, kill criteria |
| [cursor_workflow](skills/cursor_workflow/SKILL.md) | keeping an editor-agent session reviewable |
| [sustainable_pace](skills/sustainable_pace/SKILL.md) | bounded hours, honest estimates, early warning signs |
| [caveman](skills/caveman/SKILL.md) | terse reply mode: code first, facts only, no filler |

## the idea in four lines

```
1. Say what "done" means, as something a machine can check.
2. Let the model work, inside stated limits.
3. Verify with a test, a build, a number, or a primary source.
4. Write down what wasted time today, and change one thing tomorrow.
```

## conventions

- Lowercase file names with underscores: `code_review.md`.
- One topic per file; pages link instead of repeating.
- Prompts in fenced blocks; `{{date}}` means today in ISO form, e.g. `2026-07-26`.
- Every tool claim states the limitation, not only the benefit.
- Every non-obvious fact carries the link it came from.

## checks

Markdown style and every internal link are verified on each pull request; external
links are audited weekly and a dead one opens an issue.

## contributing

[contributing](contributing.md) · [code of conduct](code_of_conduct.md) ·
[security](security.md)
