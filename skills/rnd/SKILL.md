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

## inputs

- {{question}} - what you need to know, one sentence
- {{hypothesis}} - expected result, with a number if possible
- {{timebox}} - hard stop: hours or days
- {{kill_if}} - the result that means stop
- {{done_when}} - the measurement that answers the question

## the spike card

```
QUESTION: {{question}}
HYPOTHESIS: {{hypothesis}}
TIMEBOX: {{timebox}}
KILL IF: {{kill_if}}
DONE WHEN: {{done_when}}
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

The record goes in the repository, not the chat — the
[ADR format](https://adr.github.io) is the stable reference. Teams that
skip this re-run the same spike every quarter.

## agent use in a spike

Good: generating the harness, the test data, the comparison table, the
literature summary with citations. Bad: judging the result — the agent has
not seen your production constraints. Ground every claim: sanitizers for
claims about correctness, measurements for claims about speed.

## reply contract

- The card or the decision record first, then two lines of why. No
  preamble.
- Terse, balanced: drop filler; keep numbers, units, and kill criteria
  exact.
- Every result carries the exact command or input that produced it;
  anything unmeasured is marked [unverified].
