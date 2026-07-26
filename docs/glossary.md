# glossary

[handbook](../README.md) · prev: [failure_modes](failure_modes.md)

One line each. Terms used across this handbook.

## agents and context

- **agent** — a model in a loop with tools, allowed to act and observe results.
- **agentic coding** — the agent edits, builds, tests, and iterates on its own.
- **AGENTS.md** — always-loaded project instructions: build, test, style, boundaries.
- **rule** — a scoped constraint applied when a path glob matches.
- **skill** — an on-demand procedure with steps, loaded when the task matches.
- **hook** — a deterministic script fired at a lifecycle point, not a suggestion.
- **context window** — total tokens the model can attend to in one request.
- **context rot** — quality decay from stale, contradictory, or over-full context.
- **grounding** — supplying verifiable facts (files, compile flags, logs) instead
  of relying on the model's memory.
- **effort / reasoning setting** — how much internal deliberation is spent per request.

See [context_engineering](context_engineering.md).

## protocol

- **MCP** — Model Context Protocol: one wire format between AI clients and
  tools, data, and prompts.
- **tool** — model-invoked action with side effects or live data.
- **resource** — readable context the application selects.
- **prompt (MCP)** — reusable parameterized template the user selects.
- **spec revision** — dated protocol version; upgrades can break clients.

See [mcp](mcp.md).

## evaluation

- **Elo / arena rating** — ranking from blind pairwise human votes.
- **contamination** — benchmark questions present in training data, inflating scores.
- **SWE-bench Verified** — human-filtered 500 real GitHub issues; patch must pass
  the project's tests.
- **Aider polyglot** — 225 Exercism exercises across six languages, scored on
  edits that apply and pass.
- **LiveCodeBench** — rotating competitive programming problems collected after
  model cutoffs.
- **cost per successful task** — spend divided by tasks that landed without rework;
  the only cost number worth tracking.
- **personal eval** — your own 5–10 real tasks with known-good answers.

See [arenas_and_benchmarks](arenas_and_benchmarks.md).

## serving and local

- **open weights** — downloadable parameters; license still governs use.
- **quantization** — lower-precision weights to cut memory, at some quality cost.
- **GGUF** — quantized model file format used by llama.cpp.
- **kv cache** — per-request memory holding attention state; grows with context.
- **tokens/s** — throughput on your hardware; measure, do not assume.
- **OpenAI-compatible endpoint** — common HTTP shape that lets one client target
  local or cloud backends.

See [local_models](local_models.md).

## c++ and toolchain

- **compile_commands.json** — compilation database: exact flags per translation
  unit; the best single grounding artifact for C++ agents.
- **clangd** — language server that consumes the compilation database.
- **UB** — undefined behaviour; the compiler may assume it never happens.
- **asan / ubsan / tsan** — sanitizers for memory, undefined behaviour, and threads.
- **ABI** — binary interface; changing it silently breaks linked consumers.
- **hot path** — code where allocations, copies, and virtual calls are measurable.
- **minimal reproducer** — smallest self-contained program that shows the bug.

See [cpp_playbook](cpp_playbook.md).

## research

- **primary source** — the document itself: filing, standard, datasheet, source code.
- **triangulation** — three genuinely independent sources, not three reprints.
- **provenance** — where a claim came from and when you read it.
- **`[unverified]`** — marker for anything not traced to a primary or
  institutional source.

See [research_osint](research_osint.md).

## process

- **task card** — the fixed brief given to one agent: scope, files, verification.
- **worktree** — separate checkout of the same repo, one per agent.
- **fan-out** — running several agents in parallel on disjoint tasks.
- **surgical diff** — every changed line traces to the stated request.
- **friction note** — end-of-day record of what wasted time; the input to
  improving the whole setup.

See [parallel_agents](parallel_agents.md), [daily_routine](daily_routine.md).
