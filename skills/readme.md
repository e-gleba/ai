# skills

[handbook](../readme.md)

**In one sentence:** drop-in procedures an agent loads only when the task
matches.

A skill is a folder with a `SKILL.md` file: YAML front matter with `name` and
`description`, then instructions. The agent keeps only the description in
context until the task matches, then reads the body — this staged loading is
the whole point of the format
[Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
[specification](https://agentskills.io/specification).

## available

| skill | use when |
| --- | --- |
| [cmake](cmake/SKILL.md) | writing or fixing CMake: targets, presets, install, packaging |
| [cpp20](cpp20/SKILL.md) | modern C++ in namespace tb: fixed-width ints, value semantics, reuse-first |
| [python](python/SKILL.md) | writing or reviewing Python: stdlib first, black, ruff, hints |
| [code_review](code_review/SKILL.md) | preparing or reviewing a pull request with plain git |
| [tb_engine](tb_engine/SKILL.md) | working in a DAVA-derived engine fork with a `tb::` namespace |
| [android_studio](android_studio/SKILL.md) | building, profiling, or debugging an Android target |
| [crash_investigation](crash_investigation/SKILL.md) | reading a native crash: minidump, symbols, the five shapes |
| [wwise](wwise/SKILL.md) | integrating or debugging Wwise audio in a game engine |
| [rnd](rnd/SKILL.md) | running a research spike that must end in a decision |
| [agent_workflow](agent_workflow/SKILL.md) | running an editor agent session that stays reviewable |
| [caveman](caveman/SKILL.md) | terse replies: the answer or the code first, facts only, no filler |

## install

Copy the folders where your tool looks for them:

```sh
mkdir -p .agents/skills && cp -r skills/* .agents/skills/     # portable location
mkdir -p .claude/skills && cp -r skills/* .claude/skills/     # claude code
```

Cursor reads project rules from `.cursor/rules/*.mdc` instead
[cursor rules](https://cursor.com/docs/context/rules); a skill body converts
to a rule by adding a `globs` line and dropping the steps that do not apply.

## authoring rules

- `name`: lowercase, underscores, matches the folder.
- `description`: what it does **and** when to use it — this is the trigger.
- Self-contained: link only to stable external documentation, never to other
  files in this repository. A copied skill must work on its own — the agent
  that loads it cannot see this repository.
- ASCII only: no smart quotes, em dashes, arrows, or box-drawing characters.
  Plain punctuation costs fewer tokens and survives every terminal, parser,
  and diff viewer.
- No walls of text: short sentences, lists and tables over paragraphs, code
  in fenced blocks. The reader is a model on a token budget and a human in
  a hurry.
- Link every non-obvious claim to a stable source, or mark it `[unverified]`.
- Body under about 500 lines; move detail into `references/` beside it.
- Config-file examples carry their schema, so an editor's language server
  validates them: a `$schema` field in JSON, a
  `# yaml-language-server: $schema=<url>` modeline as the first line of
  YAML.
- End with the short `reply contract` block the existing skills use: answer
  or code first, terse balanced prose, claims sourced or marked
  `[unverified]`, minimum code, measurements for performance claims. Keep it
  small — a fat style block is an input-token tax on every invocation.
- Procedures with steps belong here. Constraints that are always true belong
  in `AGENTS.md` — [agents.md](https://agents.md).
