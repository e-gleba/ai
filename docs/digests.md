# digests

[handbook](../README.md) · prev: [research_osint](research_osint.md) · next: [failure_modes](failure_modes.md)

Recurring prompts per interest area. Run on a schedule, keep the output short,
throw it away after reading. The value is in noticing change, not archiving.

Shared header — paste above any digest below:

```
Date: {{date}}. Window: since {{last_run}}.
Format: max 5 bullets per section, one line each, source link per bullet.
No hype, no adjectives, no "could revolutionize". Numbers where numbers exist.
Mark unverified items [unverified]. If nothing material happened, say so.
End with: "watch next" — at most 2 items and what would make them matter.
```

## ai and tooling — daily

```
Sections:
1. Model releases and deprecations that affect agentic coding.
2. Agent tooling: IDEs, CLIs, MCP, context limits, pricing changes.
3. Open weights worth self-hosting, with license note.
4. Independent benchmark movement (LiveBench, SWE-bench, Aider, Artificial Analysis).
5. Anything that would change my defaults in model_selection.md.
```

Follow-ups: [model_selection](model_selection.md),
[arenas_and_benchmarks](arenas_and_benchmarks.md).

## game engines and graphics — weekly

```
Sections:
1. Engine releases and notable technical changes (rendering, ECS, streaming, tooling).
2. Graphics APIs and drivers: Vulkan, D3D12, Metal extensions and deprecations.
3. Technical talks, papers, or postmortems with real numbers.
4. Open-source engine and renderer activity worth reading.
5. Console and handheld platform technical news.
```

## c++ and systems — weekly

```
Sections:
1. Standards activity: papers, plenary outcomes, feature status per compiler.
2. Compiler and toolchain releases: gcc, clang, msvc, lld, sanitizers.
3. Build and tooling: cmake, clangd, clang-tidy, package managers.
4. Notable performance or UB findings in widely used libraries.
5. One technique worth trying on godbolt this week.
```

Pairs with [cpp_playbook](cpp_playbook.md).

## electronics and semiconductors — weekly

```
Sections:
1. Process nodes, fabs, capacity, and equipment news with dates and numbers.
2. GPUs and accelerators: bandwidth, capacity, availability, pricing.
3. Embedded and MCU: new parts, toolchains, errata worth knowing.
4. Supply chain and export controls affecting availability.
5. One part or dev board worth ordering, with a reason.
```

## reverse engineering and security — weekly

```
Sections:
1. Notable teardowns, format reversals, and interoperability work.
2. Tooling: disassemblers, decompilers, emulators, tracing, fuzzing.
3. Vulnerability classes newly relevant to native code, with a writeup link.
4. Anti-cheat, DRM, and platform hardening developments (technical only).
5. One writeup worth reading end to end.
```

Method: [research_osint](research_osint.md).

## belarus and russia — economy, it, policy — weekly

```
Sections:
1. Macro: currency, inflation, rates, budget, trade — official statistics only.
2. IT sector: companies, relocations, hiring, taxation, regulation.
3. Labour market for engineers: wages, demand, visa and permit changes.
4. Sanctions and export controls: new listings, carve-outs, enforcement, with
   the primary listing document.
5. Regulation that touches software, data, or crypto.

Rules: cite the register, ministry, or central bank document. Separate what a
law says from how it is applied. No political commentary — effects only.
```

## political economy — biweekly

```
Sections:
1. Structural shifts: energy, logistics, industrial policy, capital controls.
2. Trade and tariff changes with the legal instrument that enacted them.
3. Technology sovereignty moves: chips, cloud, standards bodies.
4. Labour and demographics affecting engineering supply.
5. One second-order effect nobody in my feed is talking about, and the evidence.
```

## space, satellites, astronomy — weekly

```
Sections:
1. Launches: date, vehicle, payload, orbit, outcome.
2. Satellite constellations and notable operational changes.
3. Mission milestones and science results with the agency source.
4. Observation targets visible from ~54 N in the next 7 days, with times.
5. Instrumentation and amateur-accessible data sources worth exploring.
```

## open source and r&d — weekly

```
Sections:
1. Projects in my domains with meaningful releases, not star spikes.
2. Papers with released code that I could actually run.
3. Datasets or benchmarks newly usable.
4. Licensing or governance changes in dependencies I use.
5. One project where a small contribution from me would land.
```

## monthly meta digest

```
Date: {{date}}.
Input: my friction notes from the last month: {{notes}}.
Output:
1. Repeated frictions, ranked by time cost.
2. For each: does it become a rule, a skill, a script, or a deleted tool?
3. Which of my current defaults look wrong given the last month of evidence.
4. What to stop doing entirely.
Terse. Concrete changes only.
```

Feeds back into [context_engineering](context_engineering.md) and
[daily_routine](daily_routine.md).
