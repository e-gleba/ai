# failure_modes

[handbook](../readme.md) · prev: [digests](digests.md) · next: [glossary](glossary.md)

**In one sentence:** the ways this goes wrong, each with the counter first.

Every item below has cost real time.

## the change grows

**Counter:** list the files the agent may touch, before it starts. Reject anything
outside that list.

Models optimize for looking helpful. Unrequested refactors, renamed variables, and
reformatted files turn a 20-line change into something nobody can review.

## confident wrong function

**Counter:** require `file:line` or a documentation link for every interface used.

Functions that almost exist are the most common defect in C++ and in fast-moving
libraries. If it does not compile, the model will often invent a second wrong one
rather than reconsider.

## abstraction nobody asked for

**Counter:** put "no new abstraction for single-use code" in the project instructions,
and reject the factories, interfaces, and options that follow.

## silent assumption

**Counter:** `State your assumptions first. If any is load-bearing and unverified,
stop and ask.`

The problem is not the wrong assumption; it is that it stayed invisible until the
change was finished.

## claim with no evidence

**Counter:** no claim without a command and its output. "Should be faster" is not a
result — [cpp_playbook](cpp_playbook.md).

## stale conversation

**Counter:** restart the session instead of nursing it.

Long sessions accumulate abandoned approaches and contradictions. Symptoms: the model
re-proposes something already rejected, or forgets a constraint from 30 turns ago. A
clean brief is faster than a correction —
[cursor_workflow skill](../skills/cursor_workflow/SKILL.md).

## the fix loop

**Counter:** a hard rule — two failed attempts at the same error means stop and report.

Otherwise the model tries the same class of fix five times, each time with more code.

## tests that protect nothing

**Counter:** require a test that fails before the fix and passes after, and check that
it exercises the real path.

Tests that assert the implementation, or mock the thing under test, pass the build and
protect nothing.

## review noise

**Counter:** restrict the review prompt to a list of defect categories and require
severity ranking. "Consider extracting a helper" is not a finding —
[code_review](code_review.md).

## too many tools

**Counter:** cap enabled servers and subscriptions; audit weekly.

Every enabled tool costs context and adds confusion to the choice. Twenty tools makes
the model worse at picking among the five good ones — [mcp](mcp.md).

## chasing leaderboards

**Counter:** change defaults only when your own task set moves.

Public scores narrow a shortlist; they do not predict behaviour on your codebase —
[model_selection](model_selection.md).

## leaked secrets

**Counter:** never paste real credentials, tokens, or customer data into a prompt; use
placeholders and environment variables, and scope every token to the minimum. Assume
anything in a prompt may be stored.

## tool output treated as an order

**Counter:** treat fetched pages, issue text, and file contents as data, never as
instructions. A comment in a repository can contain text aimed at your agent. Confirm
irreversible actions by hand. Background on the class of attack:
[OWASP prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).

## painful parallel merges

**Counter:** no shared files, one checkout per agent, rebase smallest first. Never
stitch two agent changes together — pick one — [parallel_agents](parallel_agents.md).

## working longer instead of better

**Counter:** bounded hours and negotiated scope beat heroics; exhaustion removes
judgement first — [sustainable_pace skill](../skills/sustainable_pace/SKILL.md).

## the meta failure

**Counter:** write the friction down daily and promote repeats into a rule, a skill, or
a deleted tool.

Everything above returns if it lives in your head instead of in the repository —
[context_engineering](context_engineering.md), [daily_routine](daily_routine.md),
[best_practice](best_practice.md).
