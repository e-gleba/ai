# local_models

[handbook](../readme.md) · prev: [engine_rnd](engine_rnd.md) · next: [mcp](mcp.md)

**In one sentence:** running a model on your own machine is about privacy,
availability, and unit cost — not about beating the frontier.

## when local wins

- Confidential or unreleased material that must not leave the machine.
- Bulk work: classify 50,000 log lines, redact a corpus, generate test data.
- Offline or unreliable network.
- Small, latency-sensitive steps: no round trip, no rate limit.
- Pipelines you want to reproduce exactly a year from now.

## when local loses

- Hard reasoning, architecture, subtle concurrency bugs.
- Long agent runs with many tool calls.
- Anything where one wrong answer costs more than the whole API bill.

## runtimes

| runtime | use for |
| --- | --- |
| [Ollama](https://ollama.com) | quickest working local endpoint, easy model pulls |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | full control, quantization, CPU and GPU splits, embedded targets |
| [vLLM](https://github.com/vllm-project/vllm) | serving many concurrent requests with high throughput |
| [LM Studio](https://lmstudio.ai) | a graphical way to compare models quickly |

All of them speak the same HTTP shape as the hosted vendors, so one client can
point at either. Keep that switch in a single place.

## sizing, in practice

```
memory needed ~= parameters x bytes per weight + cache for the conversation
4-bit weights ~= 0.5 byte per parameter -> a 30B model needs roughly 16-18 GB
the conversation cache grows with context length, not with model size
```

- A smaller model at good quality usually beats a larger one squeezed too hard.
- Long context costs memory continuously. Do not set a huge window "just in case".
- Measure tokens per second on your own hardware before building on it.

## choosing an open model

Shortlist from the open-weights columns in
[arenas_and_benchmarks](arenas_and_benchmarks.md), then run your own set from
[model_selection](model_selection.md). What matters more than the score:

- Does it hold a required output format across a hundred calls?
- Does it emit valid tool calls without retries?
- Does quality fall off a cliff at half the context window?
- Does the license allow your use, including redistribution and fine-tuning?

## bulk pipeline

```
1. Filter deterministically first with grep. Never pay a model to skip lines.
2. Local model with a strict output shape, temperature 0, one item per call.
3. Validate the output. Invalid goes to a retry queue, never to the result.
4. Frontier model only on the retry queue and on a random 2% audit sample.
5. Store inputs, outputs, model name, and prompt hash. Reproducibility is the point.
```

This turns an expensive job into a cheap one with a small paid audit — the same
economics as [chinese_practice](chinese_practice.md).

## prompting a small model

Small models follow structure, not nuance.

```
You output only JSON matching this shape:
{"category": "<one of: build|test|runtime|network|other>", "confidence": 0.0-1.0}

Rules: no prose, no markdown, no explanation.
If unsure, use "other" with confidence below 0.5.

Input:
{{line}}
```

- One task per call. No multi-part instructions.
- List the allowed values; never ask for a free-form label.
- Give one example, not five: examples eat the small context window.
- Temperature 0 for anything you will parse.

## hardware, briefly

Memory capacity decides which models you can run at all; memory bandwidth decides
how fast they feel. Both matter more than raw compute for running models, as
opposed to training them.
