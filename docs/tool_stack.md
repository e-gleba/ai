# tool_stack

[handbook](../README.md) · prev: [daily_routine](daily_routine.md) · next: [model_selection](model_selection.md)

One job per tool. Overlap is waste. Every entry lists the real limitation,
because that is what decides where a task belongs.

## agentic coding

| tool | use for | limitation to plan around |
| --- | --- | --- |
| [Cursor](https://cursor.com) | main IDE, repo-wide edits, background agents, multi-file refactors | agent quality collapses without a compile/test loop; long sessions drift, restart instead of nursing |
| [OpenCode](https://opencode.ai) | terminal agent, headless runs, scripted pipelines, provider-agnostic | needs explicit context; no editor affordances, so `AGENTS.md` matters more |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | long-horizon refactors, plan-then-execute, hooks | cost per session; loves to over-edit unless told to be surgical |
| [Aider](https://aider.chat) | tight git-native diff loop, cheap models, exact repo-map control | manual file selection; not a good fit for exploratory reading |
| [Codex-style cloud agents](https://openai.com/codex) | parallel isolated tasks with clean sandboxes | no local toolchain quirks, so native/C++ builds often fail there |

Rule: the agent that runs your build is worth more than the agent with the best
benchmark. See [cpp_playbook](cpp_playbook.md).

## search and research

| tool | use for | limitation |
| --- | --- | --- |
| [You.com](https://you.com) | bulk research, large file uploads, multi-model side-by-side | can sanitize or truncate fetched content; model labels lag the real backend; plan-level quotas stall a heavy day |
| [Scira](https://scira.ai) | fast open-source AI search, MCP-aware, groups per domain | breadth over depth; verify primary sources yourself |
| [Perplexity](https://www.perplexity.ai) | quick cited answers, follow-up chains | summary bias; skips inconvenient sources |
| [Exa](https://exa.ai) | semantic web search as an API for your own pipelines | needs good query phrasing — describe the ideal page, not keywords |
| [DeepWiki](https://deepwiki.com) | ask questions about an unfamiliar github repo | index lag on very new repos |

Method for anything that matters: two independent tools, then open the primary
source. Details in [research_osint](research_osint.md).

## reading and grounding code

- [Compiler Explorer](https://godbolt.org) — codegen truth, diff two compilers,
  check that an "optimization" changed anything. See [cpp_playbook](cpp_playbook.md).
- [Quick Bench](https://quick-bench.com) — micro-benchmarks before you argue.
- [cppreference](https://en.cppreference.com) — the answer the model paraphrased wrong.
- [clangd](https://clangd.llvm.org) + `compile_commands.json` — the single highest-value
  grounding artifact for any C++ agent.

## orchestration and glue

- [MCP](https://modelcontextprotocol.io) — one integration surface for tools, data,
  prompts. See [mcp](mcp.md).
- [GitHub CLI](https://cli.github.com) — `gh pr view`, `gh pr diff`, `gh run watch`:
  give agents facts instead of screenshots.
- [pre-commit](https://pre-commit.com) — format and lint deterministically so agents
  stop "fixing" style.
- [just](https://github.com/casey/just) or plain `make` — a named verb per task
  (`just build`, `just test`) is the cheapest possible agent API.

## local

[Ollama](https://ollama.com), [llama.cpp](https://github.com/ggml-org/llama.cpp),
[vLLM](https://github.com/vllm-project/vllm) — offline, private, or bulk-cheap work.
See [local_models](local_models.md).

## selection rule

```
Pick the tool by the loop it closes, not by the model behind it:
- needs to compile and run -> agent with local toolchain access
- needs fresh external facts -> search tool with citations
- needs exact codegen -> godbolt
- needs many independent attempts -> cloud/parallel agents
- needs privacy or bulk volume -> local model
```

## subscription hygiene

Keep at most: one IDE agent, one terminal agent, one research tool, one arena
bookmark, one local runtime. Anything unopened for a week gets cancelled.
Re-subscribing is cheap; paying for idle tools is not.
