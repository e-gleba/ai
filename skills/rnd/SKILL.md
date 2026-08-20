---
name: rnd
description: >
  Running an R&D spike so it ends in a decision, not a demo: hypothesis,
  timebox, kill criteria, one-variable experiments, and a written decision
  record. Use when exploring a new technique, library, or approach where the
  answer is not known in advance.
---

# rnd

Research without a kill criterion becomes a project. A spike is a question
with a deadline.

## the spike card

```
QUESTION: {{what we need to know, one sentence}}
HYPOTHESIS: {{what we expect, with a number if possible}}
TIMEBOX: {{hours or days, hard stop}}
KILL IF: {{the result that means stop}}
DONE WHEN: {{the measurement that answers the question}}
```

No card, no spike. The kill criterion is the part everyone skips and the
only part that matters.

## running it

1. Reproduce the smallest case that shows the question. Nothing else exists.
2. Change one variable per run. Two variables means two spikes.
3. Write down each result the moment you have it, with the exact command or
   input that produced it.
4. Stop at the timebox. An inconclusive spike is still a result: the
   approach is not cheap to evaluate, which is itself information.

## the decision record

```
Date: {{date}}
Question: {{question}}
Result: {{what happened, with numbers}}
Decision: keep | kill | pivot
Rule for next time: {{one sentence added to the project docs}}
```

The record goes in the repository, not the chat. Teams that skip this re-run
the same spike every quarter — [best_practice](../../docs/best_practice.md).

## agent use in a spike

Good: generating the harness, the test data, the comparison table, the
literature summary with citations. Bad: judging the result — the agent has
not seen your production constraints. Grounding rules from
[cpp_playbook](../../docs/cpp_playbook.md) apply: sanitizers for claims
about correctness, measurements for claims about speed.
