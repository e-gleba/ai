# code_review

[handbook](../README.md) · prev: [prompt_library](prompt_library.md) · next: [parallel_agents](parallel_agents.md)

Review is where AI pays best: cheap to run, high value, and a wrong suggestion
costs nothing because a human gates it.

## author side, before opening the pr

1. `git diff --stat` — if it is over ~400 changed lines, split it.
2. Self-review the diff yourself first. Never send an unread agent diff.
3. Run the agent pass below and fix what it finds, so reviewers see a clean PR.

```
Here is my diff: {{diff}}
You are a hostile reviewer on a C++ systems codebase.
Find only real defects, ranked by severity:
- undefined behaviour, lifetime/ownership bugs, aliasing, alignment
- data races, missing synchronization, non-atomic invariants
- error paths that leak or swallow failures
- ABI or API breaks
- performance regressions in hot paths, hidden allocations, hidden copies
Ignore style. For each finding: file:line, why it is wrong, minimal fix.
If you find nothing in a category, say "none".
Do not comment on things not in the diff.
```

## pr description

```
Diff: {{diff}}. Issue: {{issue_link}}.
Write a PR description:
## what
2-4 bullets, behaviour-level.
## why
The problem, one paragraph, with the issue link.
## risk
What can break, and the blast radius.
## verification
Exact commands run and their result; benchmarks before/after if perf-related.
No marketing, no emoji, no restating the diff line by line.
```

## reviewer side, staged pipeline

Each stage is a separate pass with a separate prompt. Do not ask one prompt to
do all four; quality drops.

| stage | question | model class |
| --- | --- | --- |
| 1. intent | does the diff match the stated goal, and is the goal right? | frontier reasoning |
| 2. correctness | UB, lifetimes, races, error paths, edge cases | frontier reasoning, high effort |
| 3. design | is this the simplest shape, does it fit existing patterns | frontier reasoning |
| 4. hygiene | naming, dead code, tests, docs, style | fast mid-tier |

Stage 1 prompt:

```
Stated goal: {{goal}}. Diff: {{diff}}.
Answer three things only:
1. Does the diff accomplish the stated goal? Where does it fall short?
2. Does it do anything beyond the goal? List scope creep with file:line.
3. Is the goal itself the right fix, or is it treating a symptom?
```

Stage 3 prompt:

```
Diff: {{diff}}. Surrounding code: {{context}}.
Judge the design:
- Could this be materially smaller? Show the smaller shape.
- Does it introduce an abstraction used exactly once? Name it.
- Does it duplicate something the codebase already has? Cite file:line.
- Does it match the existing conventions of this module?
Answer with a verdict: approve, approve with nits, or request changes, plus the
single most important change.
```

## fetching facts instead of guessing

Give the reviewer agent real data:

```
gh pr view {{n}} --json title,body,files,commits
gh pr diff {{n}}
gh pr checks {{n}}
gh run view {{run_id}} --log-failed
```

Failing CI logs pasted into the prompt beat any amount of speculation.

## triage of an incoming review queue

```
Here are my open review requests: {{list}}
Rank them by: blocking others > small and mergeable > large and risky.
For each: estimated review time, the one thing to check first, and whether it
can be delegated to a lint/hygiene pass instead of my attention.
```

## rules that keep this honest

- The agent never approves. It produces findings; you decide.
- Every finding must carry `file:line`. No line reference means no finding.
- Reject "consider extracting a helper" style noise — see
  [failure_modes](failure_modes.md).
- If two stages disagree, the correctness stage wins.
- Batch reviews into two slots per day — see [daily_routine](daily_routine.md).
