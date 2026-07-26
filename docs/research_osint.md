# research_osint

[handbook](../readme.md) · prev: [cpp_playbook](cpp_playbook.md) · next: [digests](digests.md)

**In one sentence:** research is a verification discipline — the model finds
candidates, you promote them to facts.

## source tiers

| tier | examples | how to treat it |
| --- | --- | --- |
| primary | filings, court records, standards, source code, datasheets, launch manifests, official statistics | quote it and link it |
| institutional | regulators, central banks, statistics offices, space agencies | reliable, note the methodology |
| trade press | specialist outlets and analysts | use it to find the primary source |
| aggregated | wikis, summaries, AI answers | navigation only, never a citation |
| social | forums, chats, video | leads only, always marked unverified |

If a claim cannot be traced to the first two tiers, it ships with `[unverified]`.

## deep research

```
Question: {{question}}
Date: {{date}}. Scope: {{place_and_period}}.

Method:
1. State what would have to be true for the answer to be yes, and for no.
2. Look for primary sources for each. Prefer documents over articles.
3. Build a table: claim | source | date | tier | confidence.
4. Give the answer with a confidence level.
5. Say what would change your mind, and where that evidence would be found.

No unsourced numbers. Show contradictions instead of resolving them silently.
Label inference as inference. If the honest answer is unknown, say unknown.
```

## triangulation

```
Claim: {{claim}}
Find three independent sources. Independent means different owners, not three
outlets reprinting one agency story — check for a common origin and say so.
Output: source | date | what it actually says (quote) | how it differs.
Then: does the claim survive, and what is the strongest evidence against it?
```

## entities and ownership

```
Entity: {{name}} ({{jurisdiction}}).
Assemble from public records only:
- legal name, registration number, date of incorporation
- ownership chain as far as records go, naming the register for each link
- directors and officers, with dates
- subsidiaries and affiliates
- sanctions or export-control status, with the listing document
- public contracts or tenders
A table with a source link per row. Leave gaps empty; do not infer.
```

## timelines

```
Subject: {{subject}}. Window: {{start}} to {{end}}.
Build a table: date | event | source | tier.
One row per verifiable event, no narrative glue. Conflicting dates get both rows
and a note. End with the three largest gaps in the record.
```

## imagery and location

- Verify a location against terrain, structures, shadows, and signage — not
  against the caption.
- Check the publication date against the capture date; they differ more often
  than not.
- Launch and satellite information is public: mission pages, orbital data, and
  agency press kits are primary sources.

```
Claim: {{description}} at {{alleged_location}}, {{alleged_date}}.
List the verifiable features (terrain, structures, vegetation, shadows, text).
For each: does it support or contradict the claim, and against what reference?
Verdict: consistent, inconsistent, or insufficient. Never guess a coordinate.
```

## reverse engineering, methodically

Same evidence discipline; keep it to systems you are entitled to analyse and to
interoperability, security, or preservation purposes.

```
Target: {{binary_or_format}}. Goal: {{interoperability_goal}}.
Plan:
1. Static structure: sections, imports, strings, recognizable formats.
2. Hypotheses about the format or protocol, ranked.
3. The cheapest experiment that tests the top hypothesis.
4. What a correct parser must reject, not only what it must accept.
Output a specification skeleton with a confidence level per field. Cite offsets
for every claim. Mark unknown bytes as unknown; do not invent field meanings.
```

## reading a paper

```
Paper: {{title_or_link}}.
Output:
- claim: what is actually new, one sentence
- method: how they got it, and the one assumption everything rests on
- evidence quality: dataset, baselines, ablations, what is missing
- reproducibility: code, data, compute required
- does it change what I should do? yes or no, one line why
Skip related work. Do not restate the abstract.
```

## hygiene

- Save the link and the date at the moment you read it. Pages change.
- Store quotes, not paraphrases, for anything load-bearing.
- Keep observation and inference separate in your notes, permanently.
- Two independent tools minimum for anything that matters —
  [tool_stack](tool_stack.md).
