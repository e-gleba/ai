# tool_stack

[handbook](../readme.md) · prev: [daily_routine](daily_routine.md) · next: [model_selection](model_selection.md)

**In one sentence:** one job per tool, and the honest limitation of each, because
the limitation decides where a task belongs.

## agentic coding

| tool | use for | limitation to plan around |
| --- | --- | --- |
| [Cursor](https://cursor.com) | main editor, repo-wide edits, background agents | quality collapses without a build and test loop; long sessions drift — restart instead of nursing |
| [OpenCode](https://opencode.ai) | terminal agent, headless runs, scripted pipelines, any provider | no editor hints, so written project rules matter more |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | long refactors, plan-then-execute, lifecycle hooks | expensive per session; over-edits unless told to be surgical |
| [Aider](https://aider.chat) | tight git-native diff loop, cheap models, exact file control | you pick the files by hand; weak at exploring an unknown repo |
| cloud agents in a sandbox | many isolated tasks at once | no local toolchain, so native and C++ builds often fail there |

The agent that can run your build is worth more than the agent with the better
benchmark — see [cpp_playbook](cpp_playbook.md).

## search and research

| tool | use for | limitation to plan around |
| --- | --- | --- |
| [Scira](https://scira.ai) | default AI search: fast, open source, tool-aware, grouped by domain | breadth first — open the primary source before you quote a number |
| [You.com](https://you.com) | heavy days: generous quotas, large file uploads, several models side by side | model labels are unreliable — the name in the picker is not always the model behind it, and models get quietly swapped or pulled; after heavy use you can be throttled for about a day, so do the important run early |
| [Exa](https://exa.ai) | semantic search as an API inside your own pipeline | needs a description of the ideal page, not keywords |
| [Perplexity](https://www.perplexity.ai) | a quick second opinion | weakest of the four here: shallow summaries, drops inconvenient sources — use Scira first and treat this as a cross-check |
| [DeepWiki](https://deepwiki.com) | asking questions about an unfamiliar repository | index lags for very new or private code |

Working rule: two independent tools, then the primary document.

## reading and proving code

- [Compiler Explorer](https://godbolt.org) — what the compiler actually produced;
 settles performance arguments.
- [Quick Bench](https://quick-bench.com) — measure before you claim a win.
- [cppreference](https://en.cppreference.com) — the exact rule the model
 paraphrased incorrectly.
- [clangd](https://clangd.llvm.org) with `compile_commands.json` — the single most
 valuable grounding file for C++ work.

## glue

- [MCP](https://modelcontextprotocol.io) — one plug shape for tools and data:
 [mcp](mcp.md)
- [GitHub CLI](https://cli.github.com) — `gh pr diff`, `gh run view --log-failed`;
 give the model facts instead of guesses.
- [pre-commit](https://pre-commit.com) — formatting decided by a hook, so agents
 stop reformatting files.
- [just](https://github.com/casey/just) or plain `make` — a named verb per task
 (`just build`, `just test`) is the cheapest interface an agent can use.

## local

[Ollama](https://ollama.com), [llama.cpp](https://github.com/ggml-org/llama.cpp),
[vLLM](https://github.com/vllm-project/vllm) for private, offline, or high-volume
cheap work: [local_models](local_models.md).

## how to choose, in one block

```
needs to compile and run        -> agent with access to your real toolchain
needs fresh outside facts       -> search tool that shows sources
needs exact machine code        -> compiler explorer
needs many independent attempts -> several agents in separate checkouts
needs privacy or huge volume    -> local model
```

## keeping the stack small

Hold at most: one editor agent, one terminal agent, one search tool, one
benchmark bookmark, one local runtime. Anything unopened for a week gets
cancelled. Re-subscribing is cheap; paying for idle tools and splitting your
habits across five products is not.
