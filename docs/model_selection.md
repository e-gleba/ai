# model_selection

[handbook](../README.md) · prev: [tool_stack](tool_stack.md) · next: [arenas_and_benchmarks](arenas_and_benchmarks.md)

Model names change every few weeks. Classes do not. Pick by class, verify with
your own task, and keep a fallback.

## classes

| class | shape | use for |
| --- | --- | --- |
| frontier reasoning | slow, expensive, high effort settings | architecture, hard bugs, review of subtle concurrency, math |
| frontier coding | strong diff editing and tool calling | agentic implementation, multi-file refactors |
| fast mid-tier | cheap, low latency | boilerplate, docs, commit messages, triage, classification |
| open weights, large | self-host or cheap API | bulk passes, privacy, offline, fine control |
| small local | 4–30B on your box | grep-with-meaning, redaction, air-gapped work |

## routing table

```
Task -> class

design doc, invariants, "why is this broken at 3 threads" -> frontier reasoning, max effort
implement a scoped change with tests                      -> frontier coding, agentic
review a PR for correctness                               -> frontier reasoning
review a PR for style/consistency                         -> fast mid-tier
summarize 200 pages                                       -> long-context mid-tier
generate 500 test cases / mass rewrite                    -> open weights, bulk
anything touching unreleased or private material          -> local
```

## the only benchmark that matters

Keep a personal eval: 5–10 tasks from your actual work with known-good answers.

```
I will give you {{n}} tasks from my real codebase. For each: answer only,
no preamble. I will grade against a known-good solution.

Task 1: {{task}}
Task 2: {{task}}
```

Run it when you consider switching defaults. Track score, cost, and wall time.
Public leaderboards narrow the shortlist; your eval decides. Sources in
[arenas_and_benchmarks](arenas_and_benchmarks.md).

## effort and reasoning settings

- Raising reasoning effort beats switching to a bigger model for logic bugs.
- Lowering effort beats switching to a smaller model for cost — same syntax,
  same tool calls, less thinking.
- Long context degrades before it errors. Above roughly half the window,
  precision drops. Chunk and re-anchor rather than dumping everything.

## cost discipline

```
cost_per_success = total_spend / tasks_that_landed_without_rework
```

A cheaper model that needs two retries and a human fix is not cheaper.
Track cost per landed PR, not tokens.

## fallback plan

Every default needs a second choice from a different vendor. Outages and
sudden quality regressions are normal. Keep an [OpenRouter](https://openrouter.ai)
key or a local model as the floor — see [local_models](local_models.md).

## when a new model ships

```
New model: {{model}}. Provider claim: {{claims}}.
Tell me only:
1. Context window, output cap, pricing in/out.
2. Tool-calling and structured-output reliability, with a source.
3. Independent benchmark placement vs my current default {{current}}.
4. Known regressions or refusals reported by users.
5. Verdict: switch, trial on one workload, or ignore.
Cite each point. Say [unverified] where no source exists.
```
