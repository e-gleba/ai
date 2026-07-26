# local_models

[handbook](../README.md) · prev: [cpp_playbook](cpp_playbook.md) · next: [research_osint](research_osint.md)

Local is not about beating frontier models. It is about privacy, availability,
and unit cost at volume.

## when local wins

- Proprietary or unreleased material that must not leave the machine.
- Bulk passes: classify 50k log lines, redact a corpus, generate test vectors.
- Offline or unreliable-network work.
- Latency-sensitive small tasks — no round trip, no rate limit.
- Deterministic pipelines you want to re-run a year from now.

## when local loses

- Hard reasoning, architecture, subtle concurrency bugs.
- Long-horizon agentic coding with many tool calls.
- Anything where one wrong answer costs more than the API bill.

## runtimes

| runtime | use for |
| --- | --- |
| [Ollama](https://ollama.com) | fastest path to a working local endpoint, model pulls, simple API |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | maximum control, GGUF quantization, CPU/GPU splits, embedded targets |
| [vLLM](https://github.com/vllm-project/vllm) | throughput serving, batching, many concurrent requests |
| [LM Studio](https://lmstudio.ai) | GUI experimentation and quick model comparison |

All expose an OpenAI-compatible endpoint, so the same client code points at
local or cloud by changing a base URL. Keep that switch in one place.

## sizing, practical

```
VRAM needed ~= parameters * bytes_per_weight + kv_cache + overhead
Q4 quantization ~= 0.5 byte/param  ->  a 30B model ~= 16-18 GB
kv cache grows with context length and batch size, not with weights
```

Guidance:
- Prefer a smaller model at higher quantization quality over a larger model at
  aggressive quantization; degradation is not linear.
- Context length costs memory continuously. Do not set 128k "just in case".
- Measure tokens/s on your own hardware before committing a pipeline to it.

## picking an open model

Shortlist from open-weights columns on the leaderboards in
[arenas_and_benchmarks](arenas_and_benchmarks.md), then run your own eval from
[model_selection](model_selection.md). Ignore vendor charts.

Checks that matter more than score:
- Structured output reliability — does it hold JSON schema across 100 calls?
- Tool-call format stability — does it emit valid calls without retries?
- Long-input behaviour — does quality fall off a cliff at half the window?
- License — commercial use, redistribution, and fine-tune terms.

## bulk pipeline shape

```
1. Deterministic pre-filter with grep/ripgrep. Never pay a model to skip lines.
2. Local model with a strict output contract, temperature 0, one item per call.
3. Schema validation. Anything invalid goes to a retry queue, not to the output.
4. Frontier model only on the retry queue and on a random 2% audit sample.
5. Store inputs, outputs, model name, and prompt hash. Reproducibility is the point.
```

This is the pattern that turns an expensive frontier job into a cheap local job
with a small paid audit.

## prompt style for small models

Small models follow structure, not nuance.

```
You output only JSON matching this schema:
{"category": "<one of: build|test|runtime|network|other>", "confidence": 0.0-1.0}

Rules: no prose, no markdown fences, no explanation.
If unsure, use "other" with confidence below 0.5.

Input:
{{line}}
```

- One task per call. No multi-part instructions.
- Enumerate allowed values; never ask for free-form labels.
- Give one example, not five — few-shot eats the small context window.
- Temperature 0 for anything you will parse.

## hardware note

Unified-memory laptops run mid-size models comfortably; discrete GPUs win on
throughput. For a workstation, VRAM capacity decides which models you can run
at all, and memory bandwidth decides how fast they feel. Both matter more than
raw compute for inference.
