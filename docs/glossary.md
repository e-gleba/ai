# glossary

[handbook](../readme.md) · prev: [failure_modes](failure_modes.md)

**In one sentence:** every term used in this handbook, one line each, plain words.

Newcomers should start with [start_here](start_here.md).

## basics

- **model** — a program that predicts text; you give words, it returns words.
- **prompt** — the message you send to a model.
- **token** — roughly a word fragment; cost and limits are counted in tokens.
- **context** — everything the model can see right now.
- **context window** — how much it can see at once.
- **hallucination** — a confident invention; the model tracks plausibility, not truth.
- **temperature** — how much randomness is allowed; zero for anything you will parse.
- **reasoning effort** — how much internal deliberation is spent per answer.

## agents and configuration

- **tool** — something a model is allowed to use: read a file, run a test, search.
- **agent** — a model in a loop with tools: act, observe, retry.
- **agentic coding** — the agent edits, builds, tests, and iterates on its own.
- **AGENTS.md** — always-loaded project instructions: build, test, style, limits.
- **rule** — a constraint applied when a file pattern matches.
- **skill** — an on-demand procedure with numbered steps.
- **hook** — a script that runs automatically at a lifecycle point, not a suggestion.
- **grounding** — giving the model verifiable facts instead of trusting its memory.
- **context rot** — quality decay caused by stale or contradictory context.

More: [context_engineering](context_engineering.md).

## protocol

- **MCP** — a common plug shape between AI applications and tools or data.
- **tool (MCP)** — an action the model can call.
- **resource** — readable context the application supplies.
- **prompt (MCP)** — a reusable template the user picks.
- **revision** — a dated protocol version; upgrades can break clients.

More: [mcp](mcp.md).

## evaluation

- **benchmark** — a fixed set of tasks used to compare models.
- **arena rating** — a score from blind human votes between two answers.
- **contamination** — benchmark questions present in training data, inflating scores.
- **SWE-bench Verified** — 500 human-checked real issues; the patch must pass tests.
- **Aider polyglot** — 225 exercises in six languages, scored on edits that pass.
- **LiveCodeBench** — fresh contest problems collected after training cut-offs.
- **cost per success** — spend divided by tasks that landed without rework.
- **personal task set** — your own 5 to 10 real tasks with known-good answers.

More: [arenas_and_benchmarks](arenas_and_benchmarks.md).

## running models yourself

- **open weights** — downloadable parameters; the licence still governs use.
- **quantization** — storing weights at lower precision to save memory.
- **GGUF** — a common file format for quantized models.
- **conversation cache** — per-request memory that grows with context length.
- **tokens per second** — throughput on your hardware; measure it, do not assume.

More: [local_models](local_models.md).

## c++ and toolchain

- **compile_commands.json** — the exact compiler flags per file; best grounding file.
- **clangd** — the language server that reads those flags.
- **undefined behaviour** — code the standard gives no meaning to; the compiler may
  assume it never happens.
- **sanitizer** — a build mode that catches memory, threading, or undefined-behaviour
  bugs at run time.
- **binary interface (ABI)** — how compiled code fits together; changing it breaks
  anything already built against it.
- **hot path** — code where copies, allocations, and dispatch are measurable.
- **minimal reproducer** — the smallest program that still shows the bug.

More: [cpp_playbook](cpp_playbook.md), [engine_rnd](engine_rnd.md).

## research

- **primary source** — the document itself: filing, standard, datasheet, source code.
- **triangulation** — three genuinely independent sources, not three reprints.
- **provenance** — where a claim came from, and when you read it.
- **[unverified]** — the marker for anything not traced to a solid source.

More: [research_osint](research_osint.md).

## process

- **task card** — the fixed brief for one agent: scope, files, checks.
- **worktree** — a separate checkout of the same repository, one per agent.
- **fan-out** — running several agents at once on non-overlapping tasks.
- **surgical change** — every changed line traces to the request.
- **acceptance criteria** — what must be true for the work to count as done.
- **retrospective** — a short review of the process after a task, not of the person.
- **friction note** — the end-of-day record of what wasted time.

More: [parallel_agents](parallel_agents.md), [chinese_practice](chinese_practice.md).
