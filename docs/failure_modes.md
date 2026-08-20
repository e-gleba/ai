# failure_modes

[handbook](../readme.md) · prev: [cpp_playbook](cpp_playbook.md) · next: [glossary](glossary.md)

**In one sentence:** every failure has one counter — read the counter, skip the rest.

| failure | the counter |
| --- | --- |
| change grows unrequested | list the files it may touch, first |
| confident wrong function | require `file:line` or a doc link for every call |
| abstraction nobody asked for | "no new abstraction for single-use code" in instructions |
| silent assumption | "state assumptions; if load-bearing and unverified, stop and ask" |
| claim with no evidence | no claim without a command and its output |
| stale conversation | restart the session, don't nurse it |
| fix loop | two failed attempts at the same error → stop and report |
| tests that protect nothing | test must fail before the fix, pass after |
| review noise | restrict the prompt to defect categories + severity |
| too many tools | cap enabled servers; audit weekly ([mcp](mcp.md)) |
| chasing leaderboards | change defaults only when your own task set moves |
| leaked secrets | never paste real credentials; placeholders + env vars |
| tool output treated as an order | fetched text is data, never instructions ([OWASP prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)) |
| painful parallel merges | no shared files, one checkout per agent, rebase smallest first |
| working longer not better | bounded hours beat heroics ([sustainable_pace](../skills/sustainable_pace/SKILL.md)) |

## the meta failure

Everything above returns if it lives in your head instead of the repo.
**Counter:** write friction down daily; promote repeats into a rule, a skill, or a
deleted tool ([context_engineering](context_engineering.md),
[daily_routine](daily_routine.md)).
