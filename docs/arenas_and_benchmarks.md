# arenas_and_benchmarks

[handbook](../README.md) · prev: [model_selection](model_selection.md) · next: [prompt_library](prompt_library.md)

Where to look when you need a number instead of a vibe. Each source measures a
different thing; never average them into one ranking.

## human preference

- [LMArena](https://lmarena.ai) — blind pairwise votes, Elo. Closest thing to a
  general chat ranking. Bias: rewards formatting and agreeableness, so it
  overrates chatty models for engineering work.

## independent cross-benchmark indexes

- [Artificial Analysis](https://artificialanalysis.ai) — intelligence, speed, and
  price on one chart; runs its own evals. Best single page for "is this worth
  the latency and the money".
- [LiveBench](https://livebench.ai) — contamination-resistant, questions rotate,
  reports reasoning, coding, agentic coding, math, data analysis, language, and
  instruction following, with cost per successful task beside the score.

## coding and agentic

- [SWE-bench](https://www.swebench.com) — real GitHub issues, patch must pass the
  project's own tests. `Verified` is the human-filtered 500-instance subset;
  `Multilingual` covers 9 languages. Hardest of the mainstream coding evals.
- [Aider polyglot leaderboard](https://aider.chat/docs/leaderboards/) — 225
  Exercism exercises across C++, Go, Java, JavaScript, Python, Rust. Measures
  whether edits apply cleanly and tests pass without a human. Best proxy for
  "will this model actually ship a diff".
- [LiveCodeBench](https://artificialanalysis.ai/evaluations/livecodebench) —
  contamination-free competitive programming harvested from LeetCode, AtCoder,
  and Codeforces, including self-repair and execution.
- [OpenSOTA](https://www.opensota.ai) — transparent weighted composite over
  SWE-bench, LiveCodeBench, Aider polyglot, and the Artificial Analysis indexes.

## open weights

- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
  — MMLU-Pro, GPQA, BBH, IFEval, MATH, MuSR for open models.
- [OpenRouter rankings](https://openrouter.ai/rankings) — what developers
  actually route production traffic to. Usage is a strong quality signal because
  people pay for it.

## how to read any leaderboard

1. Check the date the table was refreshed. Stale tables are worse than none.
2. Prefer contamination-resistant evals: rotating questions, post-cutoff problems,
   unpublished sources.
3. Prefer verifiable evals: real test suites, AST comparison, unit tests — not
   LLM-as-judge.
4. Prefer long-horizon tasks: multi-file patches, terminal sessions.
5. Sort by the column closest to your workload. A coding leader can be mid-pack
   at tool calling.
6. Look at cost per successful task, not price per million tokens.
7. Then run your own eval — see [model_selection](model_selection.md).

## trend check prompt

```
Date: {{date}}. Compare {{model_a}} and {{model_b}} for my work:
agentic C++ refactors, PR review of concurrent code, and long-document research.

Table with columns: benchmark, score A, score B, source link, date of measurement.
Use only independent sources (LiveBench, Artificial Analysis, SWE-bench Verified,
Aider polyglot, LMArena). Then:
- where each wins, in one line
- price and latency difference
- verdict for each of my three workloads
Mark any missing number as "no data" — never estimate.
```
