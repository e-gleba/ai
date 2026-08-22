---
name: code_review
description: >
  Review a change with plain git, no hosting CLI. Diff extraction, author
  self-check, four reviewer passes, and raw-diff copy commands for Bitbucket
  and any other host. Use when preparing a pull request, reviewing one, or
  triaging a review queue.
---

# code_review

One rule: the agent produces findings, the human approves. A finding without
`file:line` is not a finding.

## get the diff, any host

```sh
git fetch origin main
git diff origin/main...HEAD > pr.diff     # three dots: from the merge base
git log origin/main..HEAD --oneline       # the commits
```

Or copy the raw diff from the browser, no CLI:

- Bitbucket Cloud:
  `https://api.bitbucket.org/2.0/repositories/<workspace>/<repo>/pullrequests/<id>/diff`
  [api reference](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests/)
- Bitbucket Data Center:
  `https://<host>/rest/api/1.0/projects/<KEY>/repos/<repo>/pull-requests/<id>/diff?contextLines=1000`
  [api reference](https://developer.atlassian.com/server/bitbucket/rest/)
- GitHub without `gh`: append `.diff` to the pull request URL.

Paste the diff or the failing build log into the prompt. Facts beat
descriptions.

## author, before opening

1. `git diff --stat` — over about 400 changed lines, split it.
2. Read your own diff. Never send an agent diff you have not read.
3. Run this pass and fix what it finds:

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

## reviewer, four passes

One prompt per pass. One prompt doing all four does all four badly.

| pass | question | model class |
| --- | --- | --- |
| 1. intent | does the change match the stated goal, and is that goal right | frontier reasoning |
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

Pass 2 is the hostile-review prompt above, run on their diff. Pass 4 is a
linter's job; a cheap model or `clang-tidy` handles it.

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

## triage the queue

```
My open review requests: {{list}}
Rank by: blocking other people > small and mergeable > large and risky.
For each: estimated review time, the first thing to check, and whether a linter
could handle it instead of my attention.
```

## rules

- Reject "consider extracting a helper" noise.
- If two passes disagree, correctness wins.
- Batch reviews into two slots a day.
- Engine code gets two extra gates first: platform-specific code stays in
  the platform layer, and public-header or ABI changes need a deprecation
  path.

## reply contract

- Findings first, each with `file:line`, the why, and the smallest fix.
  Say "none" for empty categories. No preamble, no praise, no summary of
  the diff.
- Terse, balanced: drop filler and hedging; keep negations and the words
  that carry meaning.
- Every claim about the code cites `file:line` or is marked [unverified].
- The smallest fix wins: no drive-by refactors, no abstractions used once.
