# skills

[handbook](../readme.md)

**In one sentence:** drop-in procedures an agent loads only when the task matches.

A skill is a folder with a `SKILL.md` file: YAML front matter with `name` and
`description`, then instructions. The agent keeps only the description in context
until the task matches, then reads the body — this staged loading is the whole
point of the format
[Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
[specification](https://agentskills.io/specification).

## available

| skill | use when |
| --- | --- |
| [cmake](cmake/SKILL.md) | writing or fixing CMake: targets, presets, install, packaging |
| [cpp20](cpp20/SKILL.md) | modern C++ design: value semantics, ranges, concepts, generic code |
| [tb_engine](tb_engine/SKILL.md) | working in a DAVA-derived engine fork with a `tb::` namespace |
| [cursor_workflow](cursor_workflow/SKILL.md) | running an editor agent session that stays reviewable |
| [sustainable_pace](sustainable_pace/SKILL.md) | the work is fine but the days are not |

## install

Copy the folders where your tool looks for them:

```sh
mkdir -p .agents/skills && cp -r skills/* .agents/skills/     # portable location
mkdir -p .claude/skills && cp -r skills/* .claude/skills/     # claude code
```

Cursor reads project rules from `.cursor/rules/*.mdc` instead
[cursor rules](https://cursor.com/docs/context/rules); a skill body converts to a
rule by adding a `globs` line and dropping the steps that do not apply.

## authoring rules

- `name`: lowercase, hyphens, matches the folder.
- `description`: what it does **and** when to use it — this is the trigger.
- Body under about 500 lines; move detail into `references/` beside it.
- Procedures with steps belong here. Constraints that are always true belong in
  `AGENTS.md` — see [context_engineering](../docs/context_engineering.md).
