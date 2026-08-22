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
| [cursor_workflow](cursor_workflow/SKILL.md) | running an editor agent session that stays reviewable |
| [sustainable_pace](sustainable_pace/SKILL.md) | the work is fine but the days are not |
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

## community collections worth stealing from

Do not write what already exists. Search the registries first —
[skills.sh](https://skills.sh), the public directory behind the
`npx skills add <owner>/<repo>` installer, and
[aihero.dev/skills](https://www.aihero.dev/skills), a documented catalog with
per-skill pages. Then steal from the maintained sets:

| source | take |
| --- | --- |
| [mattpocock/skills](https://github.com/mattpocock/skills) | grill-me, handoff, write-a-skill |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | the original terse-mode skill, honest numbers included |
| [anthropics/skills](https://github.com/anthropics/skills) | the official reference set and the format itself |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | react-best-practices, nextjs, ai-sdk, web-design-guidelines |
| [obra/superpowers](https://github.com/obra/superpowers) | brainstorming, tdd, and debugging workflows |
| [trailofbits/skills](https://github.com/trailofbits/skills) | security review and audit procedures |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | the index of official team skills, hand-picked |

## authoring rules

- `name`: lowercase, underscores, matches the folder.
- `description`: what it does **and** when to use it — this is the trigger.
- Self-contained: link only to stable external documentation, never to other
  files in this repository. A copied skill must work on its own — the agent
  that loads it cannot see this repository.
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
