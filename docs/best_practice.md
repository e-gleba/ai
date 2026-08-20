# best_practice

[handbook](../readme.md) · prev: [context_engineering](context_engineering.md) · next: [engine_rnd](engine_rnd.md)

**In one sentence:** the process habits that make AI work pay off, with a note on
where each one comes from.

None of these are prompts. They are the surrounding discipline, which is where
almost all the time is won or lost.

## 1. design before code

The agent's first output is never code. It is a short design with acceptance
criteria that you approve or reject.

```
Task: {{task}}
Do not write code yet. Produce:
1. The requirement in one sentence, including what is out of scope.
2. Two candidate designs, each with its trade-off in one line.
3. Your recommendation, and why.
4. Acceptance criteria as checkable items: commands, numbers, tests.
5. The riskiest unknown, and the cheapest way to settle it first.
Wait for my approval before implementing.
```

Rejecting a design costs a minute; rejecting a finished pull request costs an
afternoon. This is the oldest idea in the handbook — the spirit of a written
specification — and it is why plan-first modes exist in every serious agent
[Claude Code plan mode](https://code.claude.com/docs/en/common-workflows).

## 2. the plan is a gate, not a formality

- A plan longer than one screen is a project; split it.
- Every step names the file it touches and the check that proves it worked.
- If the agent cannot name the check, it does not understand the step.
- Once approved, the plan is frozen. Scope changes require a new plan.

## 3. small steps

Implement one step, run the check, commit, next step. A branch that cannot merge
today will need rework tomorrow. This is ordinary continuous-integration
discipline, and it predates AI by decades
[trunk based development](https://trunkbaseddevelopment.com).

## 4. roles with narrow contracts

Split the work by role, one agent per role. The gain is not "more agents"; it is
that each stage catches the previous stage's mistakes before you do.

| role | job | output |
| --- | --- | --- |
| product | what and why, and the scope boundary | one-paragraph requirement |
| architecture | design, interfaces, risks | design note with acceptance criteria |
| implementation | code inside the approved design | diff plus test results |
| test | tries to break it | failing cases, or a signed-off report |
| retrospective | what to change in the process | one process change |

Mechanics: [parallel_agents](parallel_agents.md). The fixed handover between stages
is the valuable part — this is how large product teams run AI work at speed,
whether the label on it is manufacturing discipline or something else.

## 5. write the procedure down

Anything done twice becomes a written procedure with a fixed skeleton:

```
role        : who is answering, with what bias
task        : one imperative sentence
constraints : what must not change, what must not be touched
output      : the exact shape — sections, table columns, length
acceptance  : the command or number that proves success
```

Store it next to the code, version it, review it like code. A prompt that lives in
a chat history is not an asset. Portable format:
[Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview),
with ready ones in [skills](../skills/readme.md).

## 6. return the knowledge to the repository

After a task, one paragraph goes back into the repo: what surprised you, and the
rule that prevents it next time. Teams that skip this re-solve the same problem
every quarter. Personal version: the end-of-day ledger in
[daily_routine](daily_routine.md). Formal version: a decision record, see
[context_engineering](context_engineering.md).

## 7. retrospective on the process, not the person

```
Task: {{task}}. Outcome: {{outcome}}.
Answer in four lines:
1. What actually consumed the time?
2. Which step could have been skipped?
3. What check should have existed earlier?
4. One change to the standard procedure, stated as a rule.
No praise, no blame.
```

Blameless review is standard operations practice
[Google SRE postmortem culture](https://sre.google/sre-book/postmortem-culture/).

## 8. cost is a design constraint, not an invoice surprise

The question is not "which model is best" but "which is the cheapest that passes
the check".

1. Try the cheap or open-weight model first.
2. Escalate to a frontier model only for what failed the check.
3. Audit a small random sample of the cheap output with the expensive model.

Open-weight models make this cheap enough to be the default for volume work, and
most of the strong open releases currently come from Chinese labs — visible in
what developers actually route traffic to
[OpenRouter rankings](https://openrouter.ai/rankings). Pipeline shape:
[local_models](local_models.md). Metric: [model_selection](model_selection.md).

## 9. define the fallback

Every automated path needs a defined degradation: what happens when the model is
down, refuses, returns malformed output, or is quietly replaced.

- Validate structured output against a schema; invalid goes to a queue, not to
  production.
- Keep a second provider and a local model as the floor.
- Never let an automated step be the only thing between a mistake and a user.

## 10. every failure becomes a test

Collect the inputs that produced bad output and turn them into your own evaluation
set. Re-run it whenever you change a model or a prompt. After a few months this set
is worth more than any public table —
[model_selection](model_selection.md).

## 11. language is a tool choice

Ask in the language with the best source material. A model trained mostly in one
language follows that language's instructions slightly more precisely, but English
wins for standards documents, compiler behaviour, and academic sources. When a term
is ambiguous, give both forms once.

## what not to copy

- Long hours. The advantage above is process, not time at the desk —
  [sustainable_pace](../skills/sustainable_pace/SKILL.md).
- Metric theatre. Counting prompts, lines, or commits rewards noise.
- Trusting a benchmark table published by whoever sells the model.

## the compressed version

```
design before code · plan is a gate · small steps · roles with contracts
procedure written down · knowledge returned to the repo · blameless retrospective
cheapest model that passes · fallback defined · every failure becomes a test
```
