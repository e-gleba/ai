# engine_rnd

[handbook](../readme.md) · prev: [best_practice](best_practice.md) · next: [local_models](local_models.md)

**In one sentence:** how to use AI on a cross-platform game engine core without
letting it near the parts where a wrong guess is expensive.

Engine work is the worst case: many platforms, long-lived binary interfaces,
performance in microseconds, and confidential platform material. The split matters
more than the prompt. Fork-specific conventions live in the
[tb_engine skill](../skills/tb_engine/SKILL.md).

## where AI earns its keep

| area | why it works |
| --- | --- |
| mechanical spread of an approved pattern | 40 call sites, verified by the build |
| platform abstraction audits | finds platform code that leaked past the boundary |
| build and toolchain plumbing | tedious and fully verifiable — [cmake skill](../skills/cmake/SKILL.md) |
| test harnesses | fuzz inputs, golden files, replay, stress loops |
| crash and log triage | clusters thousands of reports, proposes a shared cause |
| formats and serialization | asset formats, version fields, endianness tables |
| tooling around the engine | editor scripts, asset validators, CI reports |
| reading unfamiliar subsystems | a guided tour with citations before you touch it |

## where it does not

| area | why |
| --- | --- |
| memory and lifetime design in the core | a plausible wrong answer costs days |
| lock-free and concurrency primitives | correctness is invisible in the diff |
| public API and binary interface shape | the cost lands on every consumer, forever |
| numerical determinism across platforms | subtle, and tests rarely catch it early |
| anything under a platform holder's confidentiality | it must not reach a hosted model |

## the confidentiality rule

Console SDK headers, platform documentation, unreleased hardware details, and
proprietary middleware source never go to a hosted model. If you need help on such
code: reproduce the problem with public APIs and generic names, or run a local model —
[local_models](local_models.md). Write the off-limits directories into the project
instructions so an agent cannot wander in —
[context_engineering](context_engineering.md).

## grounding for engine work

Beyond `compile_commands.json` from [cpp_playbook](cpp_playbook.md):

- one build command **per platform**, and the platform named in the task
- the current profile or trace, as data, when the task is about performance
- the module dependency rules: who may include whom
- the directories that are off limits: vendored, generated, platform wrappers

## platform abstraction audit

```
Module: {{path}}. Platform layer lives in: {{platform_dir}}.
Find every place platform-specific behaviour leaked into portable code:
- platform headers, types, or macros used outside {{platform_dir}}
- assumptions about pointer size, endianness, alignment, or page size
- assumptions about filesystem case sensitivity or path separators
- assumptions about core count or scheduling
- floating-point behaviour that differs per compiler or architecture
For each: file:line, the assumption, and the smallest portable replacement.
Rank by how likely it is to fail on the platform we support least often.
Findings only, no refactor.
```

## interface change review

```
Diff touching public headers: {{diff}}
Answer strictly:
1. Does object layout change? Which types, which members, why.
2. Do inline or template definitions change, such that mixed builds break?
3. Do exported symbols change, disappear, or change mangling?
4. Which downstream code must be recompiled rather than relinked?
5. Is there a source-compatible way to get the same effect? Show it.
If any answer is yes, propose the deprecation path instead of the direct change.
```

## performance, evidence first

```
Hot path: {{function}} in {{file}}. Profile excerpt: {{profile}}.
Target: {{budget}} on {{platform}}.
1. From the profile only, state where the time goes. No guessing.
2. Rank candidate causes: memory layout, branches, allocation, dispatch,
   synchronization, bandwidth. Cheapest experiment first.
3. Propose one change and the measurement that would prove or kill it.
No second change until the first is measured.
```

Confirm the generated code on [Compiler Explorer](https://godbolt.org) and the effect
on [Quick Bench](https://quick-bench.com). A performance claim without a number is not
a result — [failure_modes](failure_modes.md).

## shader variant explosion

```
Shader: {{path}}. Variant axes: {{defines}}. Backends: {{backends}}.
Produce:
- the total variant count, and which axes multiply with which
- variants unreachable under our material rules, with the reason
- a build order that maximizes cache reuse
- what should be a runtime branch instead of a compile-time variant, and its cost
Numbers only; state assumptions explicitly.
```

## crash triage at volume

```
Here are {{n}} crash reports (stack digest, module, platform, build):
{{data}}
Cluster by probable shared cause, not by identical text.
Per cluster: size, platforms, the frame that matters, the hypothesis, and the
cheapest confirmation using data we already have.
Flag clusters where the top frame is likely a symptom of corruption elsewhere.
```

## determinism and replay

```
Simulation: {{module}}. Platforms: {{platforms}}.
List every source of non-determinism, with file:line:
- floating-point differences: fast-math, fused multiply-add, library math
- iteration order over hash containers or pointer-keyed maps
- uninitialized memory reads
- time, threading, or job completion order affecting state
- random number generators without a seeded, versioned stream
For each: inside the simulation state or outside it? Only inside matters.
Then the smallest test that detects a divergence within one frame.
```

## subsystem onboarding tour

```
Subsystem: {{path}}. I have {{time}} minutes.
Give me:
- entry points and their callers, with file:line
- the ownership model: who allocates, who frees, what outlives a frame
- what runs on which thread, and what guards what
- the three invariants a change is most likely to break
- existing test coverage, and the biggest gap in it
Cite file:line for every claim. Say "unclear" instead of guessing.
```

## review order for engine diffs

Two engine gates before the C++ order in [cpp_playbook](cpp_playbook.md):

```
0. does it cross the platform boundary layer?  -> stop and redesign
1. does it change public headers or the abi?   -> deprecation path required
2. lifetime and ownership
3. undefined behaviour
4. concurrency
5. error paths
6. performance, with numbers
7. style, delegated to a linter
```
