# best_practice

[handbook](../readme.md) · prev: [context_engineering](context_engineering.md) · next: [local_models](local_models.md)

**In one sentence:** **design first, small steps, write it down, cheapest model that
passes.**

These are habits, not prompts. The time is won or lost here.

## the five rules

**1. Design before code.** The agent's first output is a short design you approve,
never code. Rejecting a design costs a minute; rejecting a finished PR costs an
afternoon.

```
Task: {{task}}
Do not write code yet. Produce:
1. Requirement in one sentence (and what's out of scope)
2. Two candidate designs, one-line trade-off each
3. Your recommendation and why
4. Acceptance criteria as checkable items: commands, numbers, tests
5. The riskiest unknown + cheapest way to settle it
Wait for my approval before implementing.
```

**2. Small steps.** One step → run the check → commit → next. A branch that can't
merge today needs rework tomorrow. Plan longer than one screen = a project; split it.

**3. Write the procedure down.** Done twice → it becomes a skill with a fixed
skeleton, stored next to the code. A prompt in chat history is not an asset.

```
role        : who answers, with what bias
task        : one imperative sentence
constraints : what must not change
output      : exact shape — sections, columns, length
acceptance  : the command or number that proves success
```

**4. Cheapest model that passes.** Try cheap/open first; escalate only what fails the
check; spot-check cheap output with the expensive model.
[model_selection](model_selection.md).

**5. Every failure becomes a test.** Save the inputs that produced bad output; re-run
them when you change a model or prompt. After a few months this set beats any public
table.

## the rest, one line each

- **Plan is a gate** — once approved it's frozen; scope change = new plan.
- **Return knowledge to the repo** — one paragraph after each task: what surprised
  you + the rule that prevents it. Else you re-solve it every quarter.
- **Blameless retro** — review the process, not the person
  ([Google SRE postmortem culture](https://sre.google/sre-book/postmortem-culture/)).
- **Define the fallback** — what happens when the model is down / refuses / returns
  garbage. Validate output against a schema; keep a second provider.
- **Ask in the language with the best sources** — English for standards, compilers,
  academic material.

## what not to copy

- Long hours — the edge is process, not desk time
  ([sustainable_pace](../skills/sustainable_pace/SKILL.md)).
- Metric theatre — counting prompts/lines/commits rewards noise.
- A benchmark published by whoever sells the model.

## the whole thing in one line

```
design first · small steps · write it down · cheapest that passes · failure → test
```
