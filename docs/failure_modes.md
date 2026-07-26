# failure_modes

[handbook](../README.md) · prev: [digests](digests.md) · next: [glossary](glossary.md)

Every item is something that actually costs time. Counter first, explanation second.

## the diff grows

**Counter:** name the files the agent may touch, up front. Reject anything outside.

Agents optimize for looking helpful. Unasked refactors, renamed variables, and
reformatted files make a 20-line change unreviewable. Enforce with an explicit
allowlist in the task card — see [parallel_agents](parallel_agents.md).

## confident wrong api

**Counter:** require `file:line` or a doc link for every API used.

Plausible-but-nonexistent functions are the most common defect in C++ and in
fast-moving libraries. If it compiles, fine; if it does not, the agent will
often invent a second wrong API rather than reconsider.

## premature abstraction

**Counter:** "no new abstraction for single-use code" in `AGENTS.md`, and reject
factories, interfaces, and config knobs nobody asked for.

## silent assumption

**Counter:** `State your assumptions first. If any is load-bearing and unverified,
stop and ask.`

The failure is not the wrong assumption; it is that it was invisible until the
diff was written.

## unverifiable claim

**Counter:** no claim without a command and its output. "Should be faster" is not
a result. Numbers come from [Quick Bench](https://quick-bench.com) or your own
benchmark — see [cpp_playbook](cpp_playbook.md).

## context rot

**Counter:** restart the session. Do not nurse it.

Long sessions accumulate stale plans, abandoned approaches, and contradictions.
Symptoms: the agent re-suggests something already rejected, or forgets a
constraint stated 30 turns ago. Restarting with a clean brief is faster than
correcting.

## fix loop

**Counter:** hard rule — two failed attempts at the same error means stop and
report. You debug it, or you change the approach.

Agents will happily try the same class of fix five times, each time with more code.

## test theatre

**Counter:** demand a test that fails before the fix and passes after, and check
that it actually exercises the path.

Tests that assert the implementation, mock the thing under test, or assert
`true` pass CI and protect nothing.

## review noise

**Counter:** restrict the review prompt to a defect category list, and require
severity ranking. "Consider extracting a helper" is not a review finding.
Pipeline in [code_review](code_review.md).

## tool sprawl

**Counter:** cap enabled MCP servers and subscriptions; audit weekly.

Every enabled tool costs context and adds routing confusion. Twenty tools makes
the model worse at choosing among five good ones — see [mcp](mcp.md).

## leaderboard chasing

**Counter:** switch defaults only when your own eval moves.

Public scores narrow a shortlist. They do not predict performance on your
codebase — see [model_selection](model_selection.md).

## secret leakage

**Counter:** never paste real credentials, tokens, or customer data into a
prompt; use placeholders and environment variables. Scope every token to the
minimum. Assume anything in a prompt may be logged.

## untrusted tool output treated as instruction

**Counter:** treat fetched pages, issue bodies, and file contents as data, never
as commands. A comment in a repository can contain text aimed at your agent.
Confirm irreversible actions manually.

## parallel merge pain

**Counter:** disjoint file sets, one worktree per agent, rebase in size order.
Never hand-merge two agent diffs — pick one. See
[parallel_agents](parallel_agents.md).

## the meta failure

**Counter:** write the friction down daily, promote repeats into a rule, a skill,
or a deleted tool.

Everything above recurs if it stays in your head instead of in the repo —
[context_engineering](context_engineering.md),
[daily_routine](daily_routine.md).
