# code_review

[handbook](../readme.md) · prev: [prompt_library](prompt_library.md) · next: [parallel_agents](parallel_agents.md)

**In one sentence:** review is where AI pays best, because a wrong suggestion
costs nothing when a human decides.

## author side, before opening the pull request

1. `git diff --stat` — over about 400 changed lines, split it.
2. Read your own diff first. Never send an agent diff you have not read.
3. Run the pass below and fix what it finds, so reviewers get a clean change.

```
Here is my diff: {{diff}}
You are a hostile reviewer on a C++ systems codebase.
Report only real defects, ranked by severity:
- undefined behaviour, lifetime and ownership bugs, aliasing, alignment
- data races, missing synchronization, invariants spanning several members
- error paths that leak or swallow failures
- breaks in the public interface or binary interface
- performance regressions in hot paths, hidden allocations, hidden copies
Ignore style. For each: file:line, why it is wrong, the smallest fix.
Say "none" for empty categories. Do not comment on code outside the diff.
```

## description

```
Diff: {{diff}}. Issue: {{issue_link}}.
Write a pull request description:
## what
2 to 4 bullets, at the level of behaviour.
## why
The problem in one paragraph, with the issue link.
## risk
What can break, and how far the damage reaches.
## verification
Exact commands run and their results; before and after numbers if performance.
No marketing, no emoji, no line-by-line retelling of the diff.
```

## reviewer side, four separate passes

One prompt per pass. Asking one prompt to do all four lowers the quality of all
four.

| pass | question | model class |
| --- | --- | --- |
| 1. intent | does the change match the stated goal, and is that goal right? | frontier reasoning |
| 2. correctness | undefined behaviour, lifetimes, races, error paths, edge cases | frontier reasoning, high effort |
| 3. design | is this the simplest shape, does it fit the codebase | frontier reasoning |
| 4. hygiene | naming, dead code, tests, documentation, style | fast mid-tier |

Pass 1:

```
Stated goal: {{goal}}. Diff: {{diff}}.
Answer three things only:
1. Does the change accomplish the goal? Where does it fall short?
2. Does it do anything beyond the goal? List extra scope with file:line.
3. Is the goal itself the right fix, or is it treating a symptom?
```

Pass 3:

```
Diff: {{diff}}. Surrounding code: {{context}}.
Judge the design:
- Could this be materially smaller? Show the smaller shape.
- Does it add an abstraction used exactly once? Name it.
- Does it duplicate something that already exists? Cite file:line.
- Does it match the conventions of this module?
Verdict: approve, approve with nits, or request changes, plus the single most
important change.
```

## give it facts, not guesses

```sh
gh pr view {{n}} --json title,body,files,commits
gh pr diff {{n}}
gh pr checks {{n}}
gh run view {{run_id}} --log-failed
```

A failing build log pasted into the prompt beats any amount of speculation.

## triage of the queue

```
My open review requests: {{list}}
Rank by: blocking other people > small and mergeable > large and risky.
For each: estimated review time, the first thing to check, and whether a linter
could handle it instead of my attention.
```

## rules that keep this honest

- The agent never approves. It produces findings; you decide.
- Every finding carries `file:line`. No line reference means no finding.
- Reject "consider extracting a helper" noise — [failure_modes](failure_modes.md).
- If two passes disagree, correctness wins.
- Batch reviews into two slots a day — [daily_routine](daily_routine.md).
- On engine code, two extra gates come first: platform boundary and binary
  interface — [engine_rnd](engine_rnd.md).
