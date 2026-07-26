# ai

Personal AI handbook. Plain markdown, no build step, no site, no CI.
Copy-first: every page holds ready-to-paste prompts, checklists, and links.

Author: c++ game engine R&D engineer (Minsk). Bias: systems code, review
discipline, reverse engineering, hardware, space, and open source.

## how to use

- Open the page for the job. Copy the block. Fill the `{{placeholders}}`.
- `{{date}}` means today in ISO form, e.g. `2026-07-26`.
- Every prompt is written to be pasted into any frontier chat or agent CLI.
- Nothing here depends on a specific vendor. Model names rot; the recipes do not.

## map

| page | what it answers |
| --- | --- |
| [daily_routine](docs/daily_routine.md) | what to do at 09:00, at review time, at end of day |
| [tool_stack](docs/tool_stack.md) | which tool for which job, and each tool's real limits |
| [model_selection](docs/model_selection.md) | how to pick a model without reading marketing |
| [arenas_and_benchmarks](docs/arenas_and_benchmarks.md) | where to check trends and scores |
| [prompt_library](docs/prompt_library.md) | the copy blocks |
| [code_review](docs/code_review.md) | pr review pipeline, author and reviewer side |
| [parallel_agents](docs/parallel_agents.md) | many agents, one repo, no conflicts |
| [context_engineering](docs/context_engineering.md) | agents.md, rules, skills, repo layout |
| [mcp](docs/mcp.md) | what mcp is, when to build a server, what to expose |
| [cpp_playbook](docs/cpp_playbook.md) | c++ specific grounding: compdb, godbolt, sanitizers |
| [local_models](docs/local_models.md) | offline / air-gapped / cheap-bulk work |
| [research_osint](docs/research_osint.md) | deep research, sourcing, verification |
| [digests](docs/digests.md) | recurring digest prompts per interest area |
| [failure_modes](docs/failure_modes.md) | how agent work goes wrong and the counter |
| [glossary](docs/glossary.md) | terms in one line each |

## conventions

- File names: `snake_case.md`, lowercase, no dashes.
- One topic per file. Cross-link instead of duplicating.
- Prompts live in fenced blocks so they copy clean.
- Placeholders: `{{like_this}}`.
- No screenshots, no generated assets, no lockfiles.

## license

Content is personal notes. Reuse freely, attribution welcome.
