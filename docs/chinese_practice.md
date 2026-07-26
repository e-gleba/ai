# chinese_practice

[handbook](../readme.md) · prev: [context_engineering](context_engineering.md) · next: [engine_rnd](engine_rnd.md)

**In one sentence:** the working habits that make Chinese AI-heavy teams fast are
process habits, not secret prompts — and they transfer directly.

What follows is the useful part of that culture. The overwork part is not
included; copy the systems, not the hours.

## 1. specification before code — 先设计，后编码

Nothing gets implemented until the shape is agreed. The sequence is fixed:

```
需求 (requirement) -> 方案 (design) -> 实现 (implementation) -> 验收 (acceptance)
```

Practically: the agent's first output is never code. It is a short design with
acceptance criteria. You approve or reject the design. Only then does it write.

```
Task: {{task}}
Do not write code yet. Produce:
1. Requirement restated in one sentence, including what is explicitly out of scope.
2. Two candidate designs, with the trade-off of each in one line.
3. Your recommendation and why.
4. Acceptance criteria (验收标准) as checkable items: commands, numbers, tests.
5. The riskiest unknown, and the cheapest way to resolve it first.
Wait for my approval before implementing.
```

This single habit removes most wasted agent work. Rejecting a design costs one
minute; rejecting a finished pull request costs an afternoon.

## 2. plan mode is a gate, not a formality

Every serious agent has a planning mode. Treat approval of the plan as a real
gate with a real veto. Rules that make it work:

- The plan must fit on one screen. A plan longer than that is a project.
- Every step names the file it touches and the check that proves it worked.
- If the agent cannot name the check, the step is not understood yet.
- Once approved, the plan is frozen. Scope changes require a new plan, not an
  improvised extra step.

## 3. small steps, fast loops — 小步快跑

Never one big change. Land the smallest version that is real, measure, continue.
The rhythm is: implement one step, run the check, commit, next step. A branch
that cannot be merged today is a branch that will need rework tomorrow.

## 4. roles instead of one omniscient assistant — 分工

Split the work by role, one agent per role, each with a narrow contract:

| role | job | output |
| --- | --- | --- |
| 产品 (product) | what and why, scope boundary | one-paragraph requirement |
| 架构 (architecture) | design, interfaces, risks | design note with acceptance criteria |
| 开发 (development) | implementation inside the approved design | diff plus test results |
| 测试 (test) | tries to break it | failing cases, or a signed-off report |
| 复盘 (retrospective) | what to change in the process | one process change |

The gain is not "more agents". It is that each stage has a narrow contract, so
a bad output is caught by the next stage instead of by you at the end. Mechanics
in [parallel_agents](parallel_agents.md).

## 5. reusable procedures — SOP 化

Anything done twice becomes a written standard operating procedure with a fixed
prompt skeleton:

```
角色 (role)      : who is answering, with what bias
任务 (task)      : one imperative sentence
约束 (constraints): what must not change, what must not be touched
输出 (output)    : the exact shape — sections, table columns, length
验收 (acceptance): the command or number that proves success
```

Store these next to the code, version them, and review them like code. A prompt
that lives in someone's chat history is not an asset. See
[context_engineering](context_engineering.md).

## 6. accumulate the knowledge — 沉淀

After a task, one paragraph goes back into the repository: what surprised us,
what rule prevents it next time. This is the habit that compounds; teams that
skip it re-solve the same problem every quarter. The end-of-day ledger in
[daily_routine](daily_routine.md) is the personal version.

## 7. review the finished work honestly — 复盘

A short retrospective on every non-trivial task, and it is about the process,
not the person:

```
Task: {{task}}. Outcome: {{outcome}}.
Answer in four lines:
1. What actually consumed the time?
2. Which step could have been skipped entirely?
3. What check should have existed earlier?
4. One change to the standard procedure, stated as a rule.
No praise, no blame.
```

## 8. cost is a first-class constraint — 性价比

The default question is not "which model is best" but "which is the cheapest that
passes the check". The routine:

1. Try the cheap open-weight model first — Qwen, DeepSeek, GLM, Kimi, MiniMax and
   similar families are strong and cheap enough for most volume work.
2. Escalate to a frontier model only for the parts that failed the check.
3. Audit a small random sample of the cheap output with the expensive model.

This mirrors the bulk pipeline in [local_models](local_models.md) and the
`cost per success` metric in [model_selection](model_selection.md). The mindset
difference is that cost sits in the design review, not in a monthly invoice
surprise.

## 9. always design the fallback — 兜底

Every automated path has a defined degradation: what happens when the model is
down, refuses, returns malformed output, or is quietly swapped for a different
one. Rules:

- Validate structured output against a schema; invalid goes to a queue, not to
  production.
- Keep a second provider and a local model as the floor.
- Never let an automated step be the only thing between a mistake and a user.

## 10. close the data loop — 数据闭环

Every failure becomes a test case. Collect the inputs that produced bad output,
turn them into your personal evaluation set, and re-run it whenever you change a
model or a prompt. Over a few months this set becomes more valuable than any
public leaderboard — see [arenas_and_benchmarks](arenas_and_benchmarks.md).

## 11. language is a tool choice

Ask in the language with the best available material. Domestic Chinese models
follow Chinese instructions more precisely, especially for formatting and role
prompts; English is better for standards documents, compiler behaviour, and
academic sources. For a technical term, give both forms once — it removes an
entire class of misunderstanding.

## what not to copy

- Long hours. The advantage above comes from process, not from time at the desk.
- Metrics theatre. Counting prompts, lines, or commits rewards noise.
- Blind trust in a benchmark table published by whoever sells the model.

## the compressed version

```
design before code · plan is a gate · small steps · roles with contracts
procedures written down · knowledge returned to the repo · honest retrospective
cheapest model that passes · fallback always defined · every failure becomes a test
```
