# daily_routine

[handbook](../README.md) · next: [tool_stack](tool_stack.md)

Fixed loops beat inspiration. Each block below is a slot in the day with a
concrete exit condition.

## 09:00 — intake, 10 min

Goal: know what changed while you slept, in one pass, without a feed.

```
Date: {{date}}.
Give me a compressed intake brief. Sections, each max 5 bullets, each bullet
one line with a source link:

1. Frontier model / tooling releases that change how I work (agents, IDEs, MCP,
   context limits, pricing).
2. C++ / systems / graphics: standards papers, compiler releases, engine tech.
3. Hardware and semis: fabs, GPUs, embedded, supply chain.
4. Belarus / Russia: economy, IT sector, sanctions, labour market, regulation.
5. Space / astronomy: launches, satellites, missions, notable observations.

Rules: no speculation, no filler. Mark anything unverified as [unverified].
If a section has nothing real, write "nothing material".
```

Exit: one page of bullets. Anything that needs action goes to a task, not to memory.

## 09:15 — plan the day against the repo

```
Repo: {{repo}}. Branch: {{branch}}.
Read the tracked issues and my open PRs. Produce:
- 3 things that unblock other people (review, answer, merge) — highest priority.
- 2 things that move my own feature forward, each sized under 90 minutes.
- 1 thing to delete or simplify.
For each: definition of done as a check I can run, not a feeling.
```

Rule: unblocking others always precedes personal feature work.

## work blocks — 90 min, one agent lead

- One primary agent session per block. See [parallel_agents](parallel_agents.md)
  before you fan out.
- Start every block by making the goal verifiable:
  test name, benchmark number, or a command whose output must change.
- Never let an agent run longer than you can review. If the diff exceeds
  ~400 lines, stop and split.

## review slot — twice a day

Batch reviews. Do not context-switch per notification.
Use the pipeline in [code_review](code_review.md).

## 30 min — deep item

Rotate: reverse engineering, godbolt experiment, a paper, an OSINT question,
an electronics build. Prompts in [research_osint](research_osint.md) and
[digests](digests.md).

## end of day — 5 min ledger

```
Date: {{date}}.
Here is what I did today: {{raw_notes}}.
Write:
- shipped: merged/landed, one line each
- in flight: what state, what unblocks it tomorrow
- learned: at most 3 durable facts worth keeping
- friction: what wasted time, and the one change that removes it
Terse. No praise.
```

The `friction` line is the point. Every recurring friction item becomes a rule,
a skill, or a script — see [context_engineering](context_engineering.md).

## weekly, 20 min

- Reread the friction lines. Promote repeats into `AGENTS.md` or a skill.
- Recheck model defaults against [arenas_and_benchmarks](arenas_and_benchmarks.md).
- Prune tool subscriptions that were not opened in seven days.
- Delete dead prompts from [prompt_library](prompt_library.md). Small library wins.
