# parallel_agents

[handbook](../README.md) · prev: [code_review](code_review.md) · next: [context_engineering](context_engineering.md)

Multiple agents are a throughput tool, not a magic trick. The constraint is not
model capacity — it is your review bandwidth and the repo's merge surface.

## the hard rules

1. One agent, one worktree, one branch. Never two agents in one checkout.
2. Tasks must be disjoint at file level. Overlap means a merge you will debug by hand.
3. Fan out only for work you can review in the same day.
4. Every task carries its own verification command. No verification, no fan-out.
5. Serialize anything that touches build files, public headers, or generated code.

## isolation with git worktrees

```sh
git worktree add ../wt_feature_a -b feat/a
git worktree add ../wt_feature_b -b feat/b
git worktree list
# when done
git worktree remove ../wt_feature_a
```

Each worktree gets its own build directory and its own `compile_commands.json`
so agents never fight over artifacts. See [cpp_playbook](cpp_playbook.md).

## good fan-out shapes

| shape | tasks | why it works |
| --- | --- | --- |
| breadth, independent | fix 5 unrelated warnings in 5 files | zero overlap, trivial review |
| same task, N attempts | 3 agents implement the same tricky change, you pick the best diff | exploits variance instead of fighting it |
| pipeline by role | one plans, one implements, one reviews | each stage has a narrow contract |
| scout and builder | one agent reads and writes a findings file, another implements from it | reading is cheap, writing is expensive |

## bad fan-out shapes

- Two agents refactoring the same subsystem.
- One agent editing a header while another edits its users.
- Parallel work with no tests — you get N unverifiable diffs.
- More parallel tasks than you can review before the branches go stale.

## task card template

Give each agent exactly this. Nothing more, nothing shared.

```
TASK: {{one_sentence}}
WORKTREE: {{path}}   BRANCH: {{branch}}
FILES YOU MAY TOUCH: {{explicit_list}}
FILES YOU MUST NOT TOUCH: build files, public headers, generated code
BUILD: {{build_cmd}}
TEST: {{test_cmd}}
DONE WHEN: {{observable_condition}}
IF BLOCKED: write BLOCKED.md with what you need and stop. Do not improvise.
CONSTRAINTS: minimum diff; no new abstractions; no unrelated cleanup.
OUTPUT: diff + commands run + results.
```

The `IF BLOCKED` line is the highest-value line in the card. It converts silent
hallucination into a question.

## same-task, three-attempts recipe

```
1. Same task card to 3 agents in 3 worktrees, different models or seeds.
2. Collect: git diff --stat for each.
3. Judge pass:
   "Here are 3 diffs solving the same task: A, B, C. Rank by correctness,
    then by minimality. Name the specific defect that disqualifies each loser.
    Do not merge them into a hybrid."
4. Take the winner, discard the rest, delete their worktrees.
```

Never merge two agent diffs together by hand. Pick one.

## merge order

```
smallest, lowest-risk branch first -> rebase the rest -> re-run tests per branch
```

Rebase, do not merge-commit chains of agent branches. Each rebase re-runs the
verification command; if a branch cannot survive a rebase, it was not disjoint.

## throughput ceiling

```
useful_parallelism = review_minutes_available / review_minutes_per_diff
```

If that number is 3, running 8 agents produces 5 stale branches. Measure it once
and hold the line.

## cost note

N parallel agents cost roughly N times one agent. Reserve fan-out for tasks
where either the variance is high (hard bug) or the reviewability is trivial
(mechanical change). Everything in between is cheaper done once, carefully.
