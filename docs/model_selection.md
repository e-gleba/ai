# model_selection

[handbook](../readme.md) · prev: [tool_stack](tool_stack.md) · next: [prompt_library](prompt_library.md)

**In one sentence:** pick by the kind of task, verify on your own work, and always
keep a second option.

Brand names change every few weeks. The classes below do not.

## classes

| class | shape | use for |
| --- | --- | --- |
| frontier reasoning | slow, expensive, high effort | architecture, hard bugs, concurrency, math |
| frontier coding | strong at editing files and calling tools | implementation, multi-file refactors |
| fast mid-tier | cheap, low latency | boilerplate, docs, commit messages, triage |
| open weights, large | self-hosted or cheap through an API | bulk passes, privacy, offline, full control |
| small local | runs on your own machine | search with meaning, redaction, air-gapped work |

## routing table

```
design note, invariants, "why does this break with 3 threads" -> frontier reasoning, high effort
implement a scoped change with tests                          -> frontier coding, agentic
review a change for correctness                               -> frontier reasoning
review a change for style and consistency                     -> fast mid-tier
summarize 200 pages                                           -> long-context mid-tier
generate 500 test cases, mass rewrite                         -> open weights, bulk
anything unreleased, confidential, or under NDA               -> local only
```

## the only benchmark that decides

Keep a personal set of 5 to 10 real tasks with known-good answers.

```
I will give you {{n}} tasks from my real codebase. Answer only, no preamble.
I will grade against a known-good solution.

Task 1: {{task}}
Task 2: {{task}}
```

Run it when you consider changing defaults. Record score, cost, and wall time.
Public tables narrow the shortlist; this set decides.

## settings before switching models

- For logic bugs, raising the reasoning effort usually beats moving to a bigger
 model.
- For cost, lowering effort usually beats moving to a smaller model: same tool
 calls, less deliberation.
- Long context degrades before it fails. Past roughly half the window, precision
 drops. Split the work and restate the goal instead of dumping everything in.

## cost, measured honestly

```
cost per success = total spend / tasks that landed without rework
```

A cheap model that needs two retries and a human fix is not cheap. Track cost per
landed change, never tokens.

## fallback

Every default needs a second choice from a different vendor, plus a local model as
the floor. Outages and quiet quality regressions are normal —
[local_models](local_models.md).

## when a new model appears

```
New model: {{model}}. Vendor claims: {{claims}}.
Tell me only:
1. Context window, output limit, price in and out.
2. Reliability of tool calling and structured output, with a source.
3. Independent benchmark placement against my current default {{current}}.
4. Regressions or refusals users report.
5. Verdict: switch, trial on one workload, or ignore.
Cite every point. Write [unverified] where no source exists.
```
