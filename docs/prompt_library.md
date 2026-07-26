# prompt_library

[handbook](../README.md) · prev: [arenas_and_benchmarks](arenas_and_benchmarks.md) · next: [code_review](code_review.md)

Small library, heavy use. If a prompt has not been used in a month, delete it.

## structure that works

```
role / stance     -> who is answering and with what bias
task              -> one sentence, imperative
context           -> facts, paths, constraints, versions
output contract   -> exact shape: sections, table columns, max length
verification      -> the command or check that proves it worked
stop rules        -> what to refuse, when to ask instead of guess
```

Anything missing an output contract comes back as prose. Prose is not a deliverable.

## fillers that change behaviour

Use sparingly; two or three per prompt.

- `State your assumptions first. If any is load-bearing and unverified, stop and ask.`
- `Minimum diff. Do not touch adjacent code, comments, or formatting.`
- `If a simpler approach exists, say so before implementing.`
- `Cite file:line for every claim about this repo.`
- `Mark anything you did not verify as [unverified].`
- `No preamble, no summary, no praise. Output only the artifact.`
- `If you are under 80% confident, list what you would need to check.`

## planning

```
Goal: {{goal}}. Repo: {{repo}}. Constraints: {{constraints}}.

Produce a plan as a numbered list. Each step:
  step -> verify: <command or observable check>
Rules:
- Max 6 steps. If it needs more, the goal is too big — say so and propose a split.
- Each step must be independently revertible.
- Name the riskiest step and what evidence would kill the plan.
No code yet.
```

## implementation, scoped

```
Task: {{task}}
Files you may touch: {{paths}}
Build: {{build_cmd}}   Test: {{test_cmd}}

Rules:
- Surgical diff. Every changed line must trace to the task.
- No new abstractions for single-use code. No speculative flexibility.
- No error handling for impossible states.
- Remove only imports/symbols your own change orphaned.
- Match the existing style even if you disagree with it.

Loop: implement -> run build -> run tests -> report. Repeat until green.
Output: the diff, then the exact commands you ran and their result.
```

## debug

```
Symptom: {{symptom}}
Repro: {{steps}}
Environment: {{compiler}}, {{flags}}, {{os}}, {{arch}}

Do this in order:
1. Restate the failure as a falsifiable hypothesis.
2. List 3 candidate causes, ranked, each with the cheapest experiment that
   discriminates it.
3. Ask me to run the cheapest experiment. Wait.
Do not propose a fix before a hypothesis survives one experiment.
```

## explain unfamiliar code

```
Read {{path}} (and only what it directly references).
Output:
- purpose: 2 lines
- invariants: what must always hold, with file:line
- ownership/lifetime: who allocates, who frees, who may outlive whom
- threading: what may be called concurrently, what is guarded and by what
- failure modes: what happens on error, and what leaks
- 3 questions I should ask the original author
Cite file:line for every claim. If something is unclear, say unclear.
```

## docs and commits

```
Write a commit message for this diff.
Format: imperative subject <= 50 chars, blank line, body wrapped at 72.
Body answers: why, not what. Mention any behaviour change and any risk.
No emojis, no co-author trailers, no marketing.
```

## learning something new, fast

```
Topic: {{topic}}. I know: {{prior}}.
Teach me in this shape:
1. The 5 concepts I cannot avoid, one line each.
2. The mental model that makes the rest derivable.
3. The 3 mistakes beginners make and why they feel correct.
4. One exercise I can do in 30 minutes to prove I understood.
5. Two primary sources — spec, paper, or source code. No blogspam.
```

## adversarial pass

Run this on your own conclusion before shipping it.

```
Here is my plan/answer: {{content}}
Attack it. Assume I am wrong.
- What breaks first under load, at scale, or on a different platform?
- What did I assume without evidence?
- What is the cheapest counterexample?
- If you had to bet against this, where would you bet?
No hedging. Rank the objections by severity.
```

## related

- Review-specific prompts: [code_review](code_review.md)
- Digest prompts per interest: [digests](digests.md)
- Research and verification: [research_osint](research_osint.md)
- C++ grounding: [cpp_playbook](cpp_playbook.md)
