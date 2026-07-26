# arenas_and_benchmarks

[handbook](../readme.md) · prev: [model_selection](model_selection.md) · next: [prompt_library](prompt_library.md)

**In one sentence:** where to get a number instead of an impression, and how to
read it without being fooled.

Each source measures something different. Never average them into one ranking.

## human preference

- [LMArena](https://lmarena.ai) — people compare two anonymous answers and vote;
  the rating reflects who wins more often. Closest thing to a general chat
  ranking. It rewards pleasant formatting, so it overrates chatty models for
  engineering work.

## independent cross-benchmark indexes

- [Artificial Analysis](https://artificialanalysis.ai) — capability, speed, and
  price on one chart, measured independently. Best single page for "is this worth
  the latency and the money".
- [LiveBench](https://livebench.ai) — questions rotate, so they cannot be
  memorized in advance. Reports reasoning, coding, agentic coding, mathematics,
  data analysis, language, and instruction following, with cost per successful
  task next to the score.

## coding and agent work

- [SWE-bench](https://www.swebench.com) — real issues from real repositories; the
  patch must pass the project's own tests. `Verified` is the human-checked subset
  of 500 issues; `Multilingual` covers nine languages.
- [Aider polyglot leaderboard](https://aider.chat/docs/leaderboards/) — 225
  exercises across C++, Go, Java, JavaScript, Python, and Rust. Measures whether
  the edit applies and the tests pass without a human. Best proxy for "will this
  actually ship a change".
- [LiveCodeBench](https://artificialanalysis.ai/evaluations/livecodebench) — fresh
  competitive-programming problems collected after model training cut-offs,
  including self-repair and execution.
- [OpenSOTA](https://www.opensota.ai) — a composite with the weights published, so
  you can see what it is actually rewarding.

## open weights

- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
  — the standard suite for downloadable models.
- [OpenRouter rankings](https://openrouter.ai/rankings) — what developers route
  real paid traffic to. Usage is a strong signal because it costs money.

## how to read any table

1. Check when it was last refreshed. A stale table is worse than none.
2. Prefer benchmarks that resist memorization: rotating questions, problems
   published after the training cut-off.
3. Prefer benchmarks a machine can verify: real test suites, unit tests, syntax
   comparison — not one model grading another.
4. Prefer long tasks: multi-file changes, terminal sessions.
5. Sort by the column closest to your work. A coding leader can be average at
   tool calling.
6. Look at cost per successful task, not price per million tokens.
7. Then run your own set — [model_selection](model_selection.md).

## comparison prompt

```
Date: {{date}}. Compare {{model_a}} and {{model_b}} for my work:
agentic C++ refactors, review of concurrent code, long-document research.

Table: benchmark, score A, score B, source link, date measured.
Use only independent sources (LiveBench, Artificial Analysis, SWE-bench Verified,
Aider polyglot, LMArena). Then:
- where each wins, one line
- price and latency difference
- a verdict for each of my three workloads
Mark any missing number as "no data". Never estimate.
```
