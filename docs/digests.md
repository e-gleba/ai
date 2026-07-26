# digests

[handbook](../readme.md) · prev: [research_osint](research_osint.md) · next: [failure_modes](failure_modes.md)

**In one sentence:** recurring prompts per interest, run on a schedule, read once,
thrown away — the value is noticing change, not building an archive.

Paste this header above any digest below:

```
Date: {{date}}. Window: since {{last_run}}.
Format: max 5 bullets per section, one line each, a source link per bullet.
No hype, no adjectives, no "could revolutionize". Numbers where numbers exist.
Mark unverified items [unverified]. If nothing material happened, say so.
End with "watch next": at most 2 items, and what would make them matter.
```

## ai and tooling — daily

```
Sections:
1. Model releases and retirements that affect agentic coding.
2. Agent tooling: editors, terminals, MCP, context limits, pricing changes.
3. Open-weight models worth self-hosting, with a licence note.
4. Movement on independent benchmarks.
5. Anything that would change my current defaults.
```

Then: [model_selection](model_selection.md),
[arenas_and_benchmarks](arenas_and_benchmarks.md).

## game engines and graphics — weekly

```
Sections:
1. Engine releases and notable technical changes: rendering, streaming, tooling.
2. Graphics APIs and drivers: new extensions, deprecations, driver bugs.
3. Talks, papers, or postmortems with real numbers.
4. Open-source engines and renderers worth reading.
5. Platform technical news for consoles and handhelds.
```

Applying it: [engine_rnd](engine_rnd.md).

## c++ and systems — weekly

```
Sections:
1. Standards activity: papers, decisions, feature status per compiler.
2. Compiler and toolchain releases, including sanitizers and linkers.
3. Build tooling: cmake, clangd, static analysis, package managers.
4. Performance or undefined-behaviour findings in widely used libraries.
5. One technique worth trying on Compiler Explorer this week.
```

## electronics and semiconductors — weekly

```
Sections:
1. Process nodes, fabs, capacity, equipment — with dates and numbers.
2. GPUs and accelerators: memory, bandwidth, availability, price.
3. Embedded and microcontrollers: new parts, toolchains, errata.
4. Supply chain and export controls affecting availability.
5. One part or board worth ordering, and why.
```

## reverse engineering and security — weekly

```
Sections:
1. Notable teardowns, format reversals, interoperability work.
2. Tooling: disassemblers, decompilers, emulators, tracing, fuzzing.
3. Vulnerability classes newly relevant to native code, with a writeup.
4. Platform hardening and protection developments, technical only.
5. One writeup worth reading end to end.
```

Method: [research_osint](research_osint.md).

## belarus and russia — economy, it, policy — weekly

```
Sections:
1. Macroeconomics: currency, inflation, rates, budget, trade — official data only.
2. IT sector: companies, relocations, hiring, taxation, regulation.
3. Engineering labour market: wages, demand, permits.
4. Sanctions and export controls: new listings, exemptions, enforcement, with the
   primary listing document.
5. Regulation touching software, data, or payments.

Cite the register, ministry, or central bank document. Separate what a rule says
from how it is applied. Effects only, no political commentary.
```

## political economy — every two weeks

```
Sections:
1. Structural shifts: energy, logistics, industrial policy, capital controls.
2. Trade and tariff changes, with the instrument that enacted them.
3. Technology sovereignty: chips, cloud, standards bodies.
4. Labour and demographics affecting the supply of engineers.
5. One second-order effect nobody is discussing, and the evidence for it.
```

## space, satellites, astronomy — weekly

```
Sections:
1. Launches: date, vehicle, payload, orbit, outcome.
2. Constellations and notable operational changes.
3. Mission milestones and science results, with the agency source.
4. What is observable from about 54 degrees north in the next 7 days, with times.
5. Instruments and public data sources worth exploring.
```

## open source and research — weekly

```
Sections:
1. Projects in my areas with meaningful releases, not star spikes.
2. Papers with released code I could actually run.
3. Datasets or benchmarks that became usable.
4. Licence or governance changes in dependencies I use.
5. One project where a small contribution from me would land.
```

## monthly review

```
Date: {{date}}.
Input: my friction notes from the last month: {{notes}}.
Output:
1. Repeated frictions, ranked by time cost.
2. For each: does it become a rule, a skill, a script, or a deleted tool?
3. Which current defaults now look wrong, given the evidence.
4. What to stop doing entirely.
Terse. Concrete changes only.
```

Feeds [context_engineering](context_engineering.md) and
[daily_routine](daily_routine.md).
