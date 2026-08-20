# daily_routine

[handbook](../readme.md) · prev: [start_here](start_here.md) · next: [tool_stack](tool_stack.md)

**In one sentence:** fixed slots in the day, each with a clear exit condition, so
progress does not depend on mood.

## 09:00 — intake, 10 minutes

```
Date: {{date}}.
Compressed intake brief, max 5 bullets per section, one line each, a source
link per bullet:
1. Model and tooling releases that change how I work.
2. C++ and systems: standards papers, compiler releases, engine tech.
3. Anything that would change my current defaults.
No speculation, no filler. Mark anything unverified as [unverified].
If a section has nothing real, write "nothing material".
```

Exit: one page of bullets. Anything actionable becomes a task, not a memory.

## 09:15 — plan against the repository

```
Repo: {{repo}}. Branch: {{branch}}.
Read the open issues and my open pull requests. Produce:
- 3 things that unblock other people (review, answer, merge) — highest priority.
- 2 things that move my own work forward, each under 90 minutes.
- 1 thing to delete or simplify.
For each: definition of done as a check I can run, not a feeling.
```

Unblocking other people always comes before your own feature.

## work blocks — 90 minutes, one lead agent

- One primary agent session per block. Read [parallel_agents](parallel_agents.md)
  before running several.
- Start by making the goal checkable: a test name, a number, or a command whose
  output must change.
- Never let an agent run longer than you can review. Diff over about 400 lines:
  stop and split it.

## review slots — twice a day

Batch reviews instead of reacting to notifications. Pipeline in
[code_review](code_review.md).

## end of day — 5 minutes, the ledger

```
Date: {{date}}.
Here is what I did today: {{raw_notes}}.
Write:
- shipped: what landed, one line each
- in flight: state, and what unblocks it tomorrow
- learned: at most 3 durable facts worth keeping
- friction: what wasted time, and the one change that removes it
Terse. No praise.
```

The friction line is the point. Every repeated friction becomes a rule, a skill,
or a deleted tool — see [context_engineering](context_engineering.md).

## weekly, 20 minutes

- Reread the friction lines; promote repeats into project instructions.
- Recheck model defaults against your own task set —
  [model_selection](model_selection.md).
- Cancel anything unopened for seven days.
- Delete dead prompts from [prompt_library](prompt_library.md). A small library
  is a used library.
