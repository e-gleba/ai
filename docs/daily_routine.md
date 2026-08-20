# daily_routine

[handbook](../readme.md) · prev: [start_here](start_here.md) · next: [tool_stack](tool_stack.md)

**In one sentence:** the day is **plan → blocks → ledger** — that's the whole thing.

Remember three words: **Plan. Blocks. Ledger.**

## plan — 10 min, morning

Ask the agent for today's list, then do it:

```
Repo: {{repo}}. Branch: {{branch}}.
Read open issues and my open PRs. Give me:
- 3 things that unblock other people (review, answer, merge) — do these first
- 2 things that move my own work, each under 90 min
- 1 thing to delete or simplify
For each: a check I can run, not a feeling.
```

**Rule:** unblock others before your own feature.

## blocks — 90 min each, one agent

- One agent session per block. (Many agents → [parallel_agents](parallel_agents.md).)
- Start by making the goal checkable: a test name, a number, a command.
- Diff over ~400 lines → stop, split it.

## ledger — 5 min, end of day

```
Date: {{date}}. Today: {{raw_notes}}.
Write, terse, no praise:
- shipped: what landed
- in flight: state + what unblocks it
- learned: at most 3 durable facts
- friction: what wasted time + the one change that removes it
```

**The friction line is the point.** Repeated friction → a rule, a skill, or a deleted
tool ([context_engineering](context_engineering.md)).

## weekly — 20 min

- Promote repeated friction into project instructions.
- Recheck model defaults on your own tasks ([model_selection](model_selection.md)).
- Cancel anything unopened for 7 days. Delete dead prompts.
