---
name: cursor_workflow
description: >
  Running an editor-agent session in Cursor so the result stays small, reviewable,
  and verifiable: rules and instruction files, plan gate, context selection, model
  choice per phase, background agents, and when to restart. Use when starting,
  configuring, or rescuing an agent session in an editor.
---

# cursor_workflow

Configuration surfaces and where they are documented:
[cursor docs](https://cursor.com/docs),
[rules](https://cursor.com/docs/context/rules) for `.cursor/rules/*.mdc`, and the
tool-agnostic [AGENTS.md](https://agents.md) file, which Cursor reads alongside its
own rules and which most other agents read too
[format repository](https://github.com/agentsmd/agents.md).

Put project truth in `AGENTS.md` so it works everywhere, and keep `.cursor/rules`
for editor-specific, path-scoped conventions. Do not duplicate one in the other.

## session shape

```
1. State the goal as something checkable.
2. Select context deliberately: the files that make the task decidable, nothing more.
3. Ask for a plan. Approve or reject it. Do not skip this on anything non-trivial.
4. Let it implement inside the approved plan, with build and test in the loop.
5. Read the diff yourself. Then run the review passes.
6. Commit, or discard and restart. Never keep a diff you do not understand.
```

Step 3 is the gate — see [best_practice](../../docs/best_practice.md).

## context selection

- Reference exact files and symbols instead of hoping the search finds them.
- Attach the failing test output or build log; a real error beats a description.
- Do not attach a whole directory "for context": it dilutes attention and hides
  the files that matter.
- Keep `compile_commands.json` at the repository root for C++ work —
  [cmake](../cmake/SKILL.md).

## model per phase

| phase | class | why |
| --- | --- | --- |
| plan and design | frontier reasoning, high effort | the expensive mistakes happen here |
| implementation | frontier coding | file edits and tool calls matter more than deliberation |
| mechanical spread | fast mid-tier | cheap, and the build verifies it |
| correctness review | frontier reasoning | needs to disagree with the implementer |

Choosing between classes: [model_selection](../../docs/model_selection.md).

## rules that keep diffs reviewable

Add these to `AGENTS.md` once, and stop repeating them in chat:

```markdown
## rules for agents

- Minimum change. Every changed line must trace to the request.
- Do not reformat, rename, or "improve" code outside the task.
- No new abstraction for single-use code.
- Never edit vendored or generated files.
- If the build fails twice for the same reason, stop and report.
- Prefer adding a failing test first.
```

## background and parallel agents

Use a separate agent only for work that shares no files with what you are doing.
One checkout per agent, disjoint file lists, and a verification command each —
[parallel_agents](../../docs/parallel_agents.md).

Good candidates: mechanical spread across many call sites, a second independent
attempt at a hard change, a documentation pass. Bad candidates: anything touching
the same subsystem you are editing.

## when to restart instead of continuing

Restart the session when any of these appear:

- The agent re-proposes something already rejected.
- It forgets a constraint stated earlier.
- The diff has grown beyond what you can read in one sitting.
- Two attempts at the same error have failed.
- The plan on screen no longer matches the code on disk.

Restarting with a clean brief is faster than arguing. Full list of symptoms:
[failure_modes](../../docs/failure_modes.md).

## end of session

```
1. git diff --stat  — is this the size you intended?
2. Run the review passes from docs/code_review.md.
3. Write the commit message from the diff, not from memory.
4. Note the one thing that wasted time today.
```

That last line is what turns a session into a better `AGENTS.md` next week —
[daily_routine](../../docs/daily_routine.md).
