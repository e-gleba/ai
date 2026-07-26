# mcp

[handbook](../README.md) · prev: [context_engineering](context_engineering.md) · next: [cpp_playbook](cpp_playbook.md)

Model Context Protocol is one wire format between an AI client and your tools,
data, and prompts, so an integration written once works in every client.
Spec and docs: [modelcontextprotocol.io](https://modelcontextprotocol.io),
schema and revisions in
[modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol).

## primitives

| primitive | direction | meaning |
| --- | --- | --- |
| tools | model-invoked | actions with side effects or live data |
| resources | app-selected | readable context: files, records, docs |
| prompts | user-selected | reusable parameterized templates |

Servers expose primitives; clients decide what the model sees. Keep the three
straight: a "tool" that only reads a static file should have been a resource.

## when to build a server

Build one when all three hold:

1. You need the same capability in more than one client.
2. The capability needs credentials or a runtime you do not want in the prompt.
3. The output is structured enough to be verified.

Otherwise write a script and let the agent run it. A shell command in
`AGENTS.md` beats a server nobody maintains.

## tool design rules

- Few tools, wide each. Twenty narrow tools blow the context and confuse routing.
- Names describe intent: `search_issues`, not `do_github`.
- Descriptions are prompts. Say when to use and when not to use.
- Return compact structured text. Never dump raw HTML or 10k-line JSON.
- Make destructive operations explicit and separate, never a flag on a read tool.
- Idempotent where possible; agents retry.
- Errors must be actionable: what failed, what input was wrong, what to try.

## versions and breakage

Protocol revisions are dated (`2025-11-25`, `2026-07-28`) and can carry breaking
changes; the maintainers describe the 2026 revision as the largest since launch,
with a validation window for SDKs before the final spec date
[release candidate notes](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/).
Practical consequence: pin your SDK, read the changelog against the previous
revision before upgrading, and test tool calling after every client update.

## local config shape

```json
{
  "mcpServers": {
    "repo_tools": {
      "command": "uvx",
      "args": ["my_repo_mcp", "--root", "."],
      "env": { "LOG_LEVEL": "warn" }
    }
  }
}
```

Keep it per-repo where the server is repo-specific. Global config is for things
like search or documentation servers.

## security posture

- Treat every tool result as untrusted input. A fetched page can contain
  instructions aimed at your agent.
- Never give a server broader credentials than the task needs; scope tokens.
- No secrets in tool descriptions, arguments, or logs.
- Human confirmation for anything irreversible: force push, delete, deploy,
  money, or messages sent on your behalf.
- Prefer read-only servers by default; add write tools deliberately.

## design prompt

```
I want an MCP server for: {{capability}}.
Clients: {{clients}}. Auth: {{auth}}. Data source: {{source}}.

Produce:
1. The minimum primitive set: for each, tools vs resources vs prompts, and why.
2. Exact tool signatures with argument types and a one-line "use when" description.
3. What must never be a tool here, and why.
4. Failure modes and the error text each returns.
5. The smallest thing worth shipping first.
Rules: prefer fewer, wider tools. No speculative surface. Flag anything that
needs human confirmation.
```

## catalogue worth keeping

- GitHub — PRs, issues, review comments, CI logs. Pairs with [code_review](code_review.md).
- A search server — see [tool_stack](tool_stack.md).
- Compiler Explorer — compile and inspect assembly from chat, see
  [cpp_playbook](cpp_playbook.md).
- Repo documentation Q&A for unfamiliar dependencies.
- Filesystem, scoped to one project root, read-only unless you need writes.

Prune the rest. Every enabled server costs context on every request.
