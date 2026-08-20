# prompt_library

[handbook](../readme.md) · prev: [model_selection](model_selection.md) · next: [code_review](code_review.md)

**In one sentence:** a small set of blocks that get used, not a museum of clever
prompts.

If a prompt has not been used in a month, delete it.

## the shape that works

```
stance      -> who is answering, and with what bias
task        -> one imperative sentence
context     -> facts, paths, versions, constraints
output      -> the exact shape: sections, table columns, maximum length
verification-> the command or check that proves it worked
stop rules  -> when to refuse, when to ask instead of guessing
```

A prompt with no output shape comes back as an essay. An essay is not a deliverable.

## lines that change behaviour

Use two or three, not all of them.

- `State your assumptions first. If any is load-bearing and unverified, stop and ask.`
- `Minimum change. Do not touch adjacent code, comments, or formatting.`
- `If a simpler approach exists, say so before implementing.`
- `Cite file:line for every claim about this repository.`
- `Mark anything you did not verify as [unverified].`
- `No preamble, no summary, no praise. Output only the artifact.`
- `If you are less than 80% confident, list what you would need to check.`

## planning

```
Goal: {{goal}}. Repo: {{repo}}. Constraints: {{constraints}}.

Produce a numbered plan. Each step:
  step -> verify: <command or observable check>
Rules:
- Maximum 6 steps. If it needs more, the goal is too big — say so and split it.
- Each step must be revertible on its own.
- Name the riskiest step and the evidence that would kill the plan.
No code yet.
```

## implementation, scoped

```
Task: {{task}}
Files you may touch: {{paths}}
Build: {{build_cmd}}   Test: {{test_cmd}}

Rules:
- Surgical change. Every changed line must trace to the task.
- No new abstraction for single-use code. No unrequested flexibility.
- No error handling for impossible states.
- Remove only the imports and symbols your own change orphaned.
- Match existing style even if you would write it differently.

Loop: implement, build, test, report. Repeat until green.
Output: the diff, then the exact commands you ran and their results.
```

## debugging

```
Symptom: {{symptom}}
Steps to reproduce: {{steps}}
Environment: {{compiler}}, {{flags}}, {{os}}, {{arch}}

In this order:
1. Restate the failure as a statement that can be proven false.
2. Give 3 candidate causes, ranked, each with the cheapest experiment that tells
   them apart.
3. Ask me to run the cheapest one. Wait.
Do not propose a fix until a hypothesis survives one experiment.
```

## understanding unfamiliar code

```
Read {{path}} and only what it directly references.
Output:
- purpose: 2 lines
- invariants: what must always hold, with file:line
- ownership: who allocates, who frees, what outlives what
- threading: what can be called at the same time, and what guards it
- failure modes: what happens on error, and what leaks
- 3 questions I should ask the original author
Cite file:line for every claim. Say "unclear" instead of guessing.
```

## commit message

```
Write a commit message for this diff.
Imperative subject, 50 characters or fewer; blank line; body wrapped at 72.
The body answers why, not what. Mention behaviour changes and risk.
No emoji, no trailers, no marketing.
```

Convention reference: [how to write a git commit message](https://cbea.ms/git-commit/).

## learning something quickly

```
Topic: {{topic}}. I already know: {{prior}}.
Teach me in this shape:
1. The 5 concepts I cannot avoid, one line each.
2. The mental model that makes the rest derivable.
3. The 3 mistakes beginners make, and why each feels correct.
4. One 30-minute exercise that proves I understood.
5. Two primary sources: a specification, a paper, or source code. No blog posts.
```

## attack your own conclusion

Run this before shipping any decision.

```
Here is my plan or answer: {{content}}
Attack it. Assume I am wrong.
- What breaks first under load, at scale, or on another platform?
- What did I assume without evidence?
- What is the cheapest counterexample?
- If you had to bet against this, where would you bet?
No hedging. Rank the objections by severity.
```

## related

- Review prompts: [code_review](code_review.md)
- Design-first sequence and written procedures: [best_practice](best_practice.md)
- C++ specifics: [cpp_playbook](cpp_playbook.md) and the
  [cpp20 skill](../skills/cpp20/SKILL.md)
