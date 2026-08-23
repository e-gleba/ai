# mcp

[handbook](../readme.md) · prev: [local_models](local_models.md) · next: [glossary](glossary.md)

**In one sentence:** MCP is a common plug shape, so a tool you build once works in
every AI application that speaks it.

Documentation: [modelcontextprotocol.io](https://modelcontextprotocol.io).
Specification and schema:
[modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol).

## the three things a server can offer

| primitive | who triggers it | meaning |
| --- | --- | --- |
| tools | the model | actions: fetch live data, change something |
| resources | the application | readable context: files, records, documents |
| prompts | the user | reusable templates with parameters |

Keep them straight. A "tool" that only reads a fixed file should have been a
resource.

## when to build a server

Build one when all three are true:

1. You need the same capability in more than one application.
2. It needs credentials or a runtime you do not want inside a prompt.
3. Its output is structured enough to be verified.

Otherwise write a script and let the agent run it. A shell command documented in
`AGENTS.md` beats a server nobody maintains.

## tool design rules

- Few tools, each wide. Twenty narrow tools confuse the choice and eat context.
- Names state intent: `search_issues`, not `do_github`.
- Descriptions are prompts: say when to use it and when not to.
- Return compact structured text. Never dump raw HTML or enormous JSON.
- Destructive actions are separate tools, never a flag on a read tool.
- Make them idempotent where possible; agents retry.
- Errors must be actionable: what failed, which input was wrong, what to try.

## versions break

Protocol revisions are dated, such as `2025-11-25` and `2026-07-28`, and they can
carry breaking changes; the maintainers describe the 2026 revision as the largest
since launch and gave implementers a validation window before the final date
[release candidate notes](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/).

Practical consequences: pin the SDK version, read the changelog against the
previous revision before upgrading, and re-test tool calling after every client
update.

## local configuration

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

Keep repository-specific servers in the repository. Global configuration is for
general things such as search or documentation.

## safety

- Treat every tool result as untrusted input. A fetched page can contain text
  aimed at your agent.
- Scope credentials to the task. Never hand a server broad access for convenience.
- No secrets in tool descriptions, arguments, or logs.
- Require human confirmation for anything irreversible: force push, delete,
  deploy, payment, or a message sent as you.
- Default to read-only; add write tools deliberately, one at a time.

## design prompt

```
I want an MCP server for: {{capability}}.
Applications: {{clients}}. Authentication: {{auth}}. Data source: {{source}}.

Produce:
1. The minimum set of primitives: tool, resource, or prompt for each, and why.
2. Exact tool signatures with argument types and a one-line "use when".
3. What must not be a tool here, and why.
4. Failure modes and the error text each returns.
5. The smallest version worth shipping first.
Prefer fewer, wider tools. No speculative surface. Flag anything that needs human
confirmation.
```

## worth keeping enabled

- GitHub: pull requests, issues, review comments, failing logs. Pairs with
  the [code_review skill](../skills/code_review/SKILL.md).
- One search server — [tool_stack](tool_stack.md).
- Compiler Explorer, to compile and inspect machine code from a chat.
- Documentation questions for unfamiliar dependencies.
- Filesystem, limited to one project directory, read-only unless you need writes.

Prune the rest. Every enabled server costs context on every request.
