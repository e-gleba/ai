# engine_rnd

[handbook](../readme.md) · prev: [chinese_practice](chinese_practice.md) · next: [local_models](local_models.md)

**In one sentence:** how to use AI on the hard parts — a cross-platform game
engine core — without letting it near the parts where a wrong guess is expensive.

Engine work is the worst case for a model: many platforms, long-lived binary
interfaces, performance measured in microseconds, and confidential platform
material. So the split matters more than the prompt.

## where AI earns its keep

| area | why it works |
| --- | --- |
| mechanical spread of a pattern | apply one approved change across 40 call sites, verified by the build |
| platform abstraction audits | find where platform-specific code leaked past the boundary layer |
| build and toolchain plumbing | CMake, presets, matrices, packaging — tedious and fully verifiable |
| test and harness generation | fuzz inputs, golden files, replay harnesses, stress loops |
| crash and log triage | cluster thousands of reports, propose the shared cause |
| format and protocol work | asset formats, serialization versions, endianness tables |
| tooling around the engine | editor scripts, asset validators, CI reports |
| reading unfamiliar subsystems | a guided tour with citations before you touch it |

## where it does not

| area | why |
| --- | --- |
| memory and lifetime design in the core | a plausible wrong answer costs days of debugging |
| lock-free and concurrency primitives | correctness is not visible in the diff |
| public API and ABI shape | the cost lands on every consumer, forever |
| numerical determinism across platforms | subtle, and tests rarely catch it early |
| anything under a platform holder's confidentiality | do not send it to a hosted model at all |

## the confidentiality rule, stated plainly

Console SDK headers, platform documentation, unreleased hardware details, and
proprietary middleware source do not go into a hosted model. Ever. If you need
model help on such code:

1. Reproduce the problem with public APIs and generic names, or
2. use a local model on your machine — see [local_models](local_models.md).

Write this rule into the project instructions so an agent cannot wander into
those directories: [context_engineering](context_engineering.md).

## grounding for engine work

Beyond `compile_commands.json` from [cpp_playbook](cpp_playbook.md), an engine
agent needs:

- A one-command build **per platform**, and the name of the platform in the task.
- The current profile or trace, as data, when the task is about performance.
- The module dependency rules, written down: who may include whom.
- The list of directories that are off limits: vendored code, generated code,
  platform SDK wrappers.

## platform abstraction audit

```
Module: {{path}}. Platform layer lives in: {{platform_dir}}.
Find every place platform-specific behaviour leaked into portable code:
- direct use of platform headers, types, or macros outside {{platform_dir}}
- assumptions about pointer size, endianness, alignment, or page size
- assumptions about filesystem case sensitivity or path separators
- assumptions about thread count, core count, or scheduling
- floating point behaviour that differs per compiler or per architecture
For each: file:line, the assumption, and the smallest portable replacement.
Rank by how likely it is to fail on the platform we support least often.
No refactor yet — findings only.
```

## api and abi change review

```
Diff touching public headers: {{diff}}
Answer strictly:
1. Does object layout change? Which types, which members, and why.
2. Do inline or template definitions change, such that mixed builds break?
3. Do exported symbols change, disappear, or change mangling?
4. Which downstream code must be recompiled versus relinked?
5. Is there a source-compatible way to get the same effect? Show it.
If any answer is yes, propose the deprecation path instead of the direct change.
```

## performance work, evidence first

```
Hot path: {{function}} in {{file}}. Profile excerpt: {{profile}}.
Target: {{budget}} on {{platform}}.
Steps:
1. From the profile only, state where the time actually goes. No guessing.
2. List candidate causes: memory layout, branch behaviour, allocation, dispatch,
   synchronization, bandwidth. Rank by expected win, cheapest experiment first.
3. Propose one change, and the measurement that would prove or kill it.
Do not propose a second change until the first is measured.
```

Then confirm the code generation on [Compiler Explorer](https://godbolt.org) and
the effect on [Quick Bench](https://quick-bench.com). A performance claim without
a number is not a result — see [failure_modes](failure_modes.md).

## shader and variant explosion

```
Shader: {{path}}. Variant axes: {{defines}}. Backends: {{backends}}.
Produce:
- the full variant count, and which axes multiply with which
- variants that are unreachable given our material rules, with the reason
- an ordering that maximizes cache reuse in the build
- what should become a runtime branch instead of a compile-time variant, and
  the cost of that choice
Numbers only; state assumptions explicitly.
```

## crash triage at volume

```
Here are {{n}} crash reports (stack digests, module, platform, build):
{{data}}
Cluster them by probable shared cause, not by identical text.
For each cluster: size, platforms affected, the frame that matters, the
hypothesis, and the cheapest way to confirm it with the data we already have.
Flag any cluster where the top frame is likely a symptom of memory corruption
elsewhere.
```

## determinism and replay

```
Simulation: {{module}}. Platforms: {{platforms}}.
List every source of non-determinism, with file:line:
- floating point differences: fast-math flags, fused multiply-add, library math
- iteration order over hash containers or pointer-keyed maps
- uninitialized memory read
- time, threading, or job completion order affecting state
- random number generators without a seeded, versioned stream
For each: is it inside the simulation state or outside it? Only inside matters.
Then propose the smallest test that detects a divergence within one frame.
```

## engine onboarding tour

Use this before touching an unfamiliar subsystem:

```
Subsystem: {{path}}. I have {{time}} minutes.
Give me:
- the entry points, and who calls them, with file:line
- the ownership model: who allocates, who frees, what outlives a frame
- what runs on which thread, and what is guarded by what
- the three invariants a change is most likely to break
- the tests that already cover it, and the biggest gap in that coverage
Cite file:line for every claim. Say "unclear" instead of guessing.
```

## what a good engine task card looks like

```
TASK: replace ad-hoc alignment math with the shared helper in {{header}}
PLATFORM: {{platform}} first; the change must compile on all targets
FILES YOU MAY TOUCH: {{explicit_list}}
OFF LIMITS: platform sdk wrappers, vendored code, generated code, public headers
BUILD: {{per_platform_build_cmd}}
TEST: {{test_cmd}} plus the asan preset
DONE WHEN: all targets build warning-free and the alignment tests pass
IF BLOCKED: write BLOCKED.md and stop. Do not invent a platform workaround.
```

Full template and the rules for running several of these at once:
[parallel_agents](parallel_agents.md).

## review order for engine diffs

Same order as [cpp_playbook](cpp_playbook.md), with two engine-specific gates
first:

```
0. Does it cross the platform boundary layer?   -> if yes, stop and redesign
1. Does it change public headers or ABI?        -> if yes, deprecation path required
2. lifetime and ownership
3. undefined behaviour
4. concurrency
5. error paths
6. performance, with numbers
7. style, delegated to a linter
```
