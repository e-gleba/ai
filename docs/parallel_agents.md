# parallel_agents

[handbook](../readme.md) · prev: [code_review](code_review.md) · next: [context_engineering](context_engineering.md)

**In one sentence:** several agents raise throughput only up to the limit of what you
can review today.

## the hard rules

1. One agent, one checkout, one branch. Never two agents in one working copy.
2. Tasks must not share files. Shared files mean a merge you debug by hand.
3. Only fan out for work you can review the same day.
4. Every task carries its own verification command. No check, no fan-out.
5. Serialize anything touching build files, public headers, or generated code.

## isolation with git worktrees

```sh
git worktree add ../wt_feature_a -b feat/a
git worktree add ../wt_feature_b -b feat/b
git worktree list
git worktree remove ../wt_feature_a
```

Reference: [git worktree](https://git-scm.com/docs/git-worktree). Each worktree gets
its own build directory, so agents never fight over build artifacts —
[cpp_playbook](cpp_playbook.md).

## shapes that work

| shape | example | why it works |
| --- | --- | --- |
| independent breadth | fix 5 unrelated warnings in 5 files | no overlap, trivial review |
| same task, several attempts | 3 agents try the same tricky change, you keep the best | uses variance instead of fighting it |
| pipeline by role | one plans, one implements, one reviews | each stage has a narrow contract |
| scout and builder | one reads and writes findings to a file, another implements | reading is cheap, writing is expensive |

Role-splitting in more detail: [best_practice](best_practice.md).

## shapes that fail

- Two agents refactoring the same subsystem.
- One editing a header while another edits its users.
- Parallel work with no tests: several changes nobody can verify.
- More parallel tasks than you can review before the branches go stale.

## task card

Give each agent exactly this, nothing shared.

```
TASK: {{one_sentence}}
WORKTREE: {{path}}   BRANCH: {{branch}}
FILES YOU MAY TOUCH: {{explicit_list}}
FILES YOU MUST NOT TOUCH: build files, public headers, generated code
BUILD: {{build_cmd}}
TEST: {{test_cmd}}
DONE WHEN: {{observable_condition}}
IF BLOCKED: write BLOCKED.md with what you need, then stop. Do not improvise.
CONSTRAINTS: minimum change; no new abstractions; no unrelated cleanup.
OUTPUT: diff, commands run, results.
```

The `IF BLOCKED` line is the most valuable one. It turns silent invention into a
question.

## same task, three attempts

```
1. Same task card to 3 agents in 3 worktrees, different models.
2. Collect git diff --stat for each.
3. Judge:
   "Here are 3 diffs solving the same task: A, B, C. Rank by correctness, then by
    minimality. Name the specific defect that disqualifies each loser.
    Do not merge them into a hybrid."
4. Keep the winner, delete the rest and their worktrees.
```

Never stitch two agent diffs together. Pick one.

## merge order

```
smallest and lowest-risk first -> rebase the rest -> re-run the check per branch
```

Rebase rather than chaining merge commits. Each rebase re-runs verification; a branch
that cannot survive a rebase was never independent.

## the ceiling

```
useful parallelism = review minutes available / review minutes per change
```

If that is 3, running 8 agents produces 5 stale branches.

## cost

N agents cost about N times one agent. Reserve fan-out for tasks where either the
outcome varies a lot (a hard bug) or the review is trivial (a mechanical change).
Everything in between is cheaper done once, carefully.
