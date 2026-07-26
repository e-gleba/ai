# research_osint

[handbook](../README.md) · prev: [local_models](local_models.md) · next: [digests](digests.md)

Research is a verification discipline, not a search skill. The model finds
candidates; you promote them to facts.

## source tiers

| tier | examples | treatment |
| --- | --- | --- |
| primary | filings, court records, standards documents, source code, datasheets, launch manifests, official statistics | quote and link |
| institutional | regulators, central banks, statistical offices, space agencies | reliable, note methodology |
| secondary | trade press, specialist analysts | use to find primaries |
| aggregated | wikis, summaries, AI answers | navigation only, never a citation |
| social | forums, chats, video | leads only, always mark unverified |

Rule: if a claim cannot be traced to tier 1 or 2, it ships with `[unverified]`.

## deep research prompt

```
Question: {{question}}
Date: {{date}}. Scope: {{geography_and_timeframe}}.

Method:
1. List what would have to be true for the answer to be yes, and for no.
2. Search for primary sources for each. Prefer documents over articles.
3. Build an evidence table: claim | source | date | tier | confidence.
4. State the answer with a confidence level.
5. List what would change your mind and where that evidence would live.

Rules: no unsourced numbers; contradictions get shown, not resolved silently;
mark inference as inference. If the honest answer is "unknown", say unknown.
```

## triangulation

```
Claim: {{claim}}
Find three independent sources. Independent means different owners, not three
outlets reprinting one wire story — check for a common origin and say so.
Output: source | date | what it actually says (quote) | how it differs.
Then: does the claim survive? What is the strongest counter-evidence?
```

## entity and structure research

For companies, org charts, ownership, and supply relations:

```
Entity: {{name}} ({{jurisdiction}}).
Assemble from public records only:
- legal name, registration id, incorporation date
- ownership chain as far as records go, with the register that shows each link
- directors and officers with dates
- subsidiaries and affiliates
- known sanctions or export-control status, with the listing document
- public contracts or tenders
Output as a table with a source link per row. Gaps stay empty; do not infer.
```

## timeline reconstruction

```
Subject: {{subject}}. Window: {{start}} to {{end}}.
Build a timeline: date | event | source | tier.
Rules: one row per verifiable event; no narrative glue; conflicting dates get
both rows and a note. End with the three largest gaps in the record.
```

## geospatial and imagery

- Verify location claims against terrain, shadows, signage, and known imagery
  rather than captions.
- Check publication date against capture date; they differ more often than not.
- Satellite and launch tracking is public: mission pages, orbital element sets,
  and agency press kits are tier 1.

```
Image/claim: {{description}} at {{alleged_location}}, {{alleged_date}}.
List the verifiable features (terrain, structures, vegetation, shadows, text).
For each: does it support or contradict the claim, and against what reference?
Verdict: consistent, inconsistent, or insufficient. Never guess a coordinate.
```

## reverse engineering — legal and methodical

Interoperability and security research follow the same evidence discipline.

```
Target: {{binary_or_format}}. Goal: {{interop_goal}}.
Plan:
1. Static structure: sections, imports, strings, obvious formats.
2. Hypotheses about the format/protocol, ranked.
3. The cheapest experiment to test the top hypothesis.
4. What a correct parser must reject, not just accept.
Output a spec skeleton with confidence per field. Cite offsets for every claim.
Do not fabricate field meanings; mark unknown bytes as unknown.
```

Keep it to formats and systems you are entitled to analyse, and to
interoperability, security, and preservation purposes.

## paper reading

```
Paper: {{title_or_link}}.
Output:
- claim: what is actually new, one sentence
- method: how they got it, and the one assumption everything rests on
- evidence quality: dataset, baselines, ablations, what is missing
- reproducibility: code, data, compute needed
- does it change what I should do? yes/no, one line why
Skip the related-work section. Do not summarize the abstract back to me.
```

## hygiene

- Save the link and the date at the moment you read it. Pages change.
- Store quotes, not paraphrases, for anything load-bearing.
- Separate observation from inference in your own notes, permanently.
- Two tools minimum for anything that matters — see [tool_stack](tool_stack.md).
