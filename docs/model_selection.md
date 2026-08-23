# model_selection

[handbook](../readme.md) · prev: [tool_stack](tool_stack.md)

**In one sentence:** there is no "best model" — there is the cheapest model that
passes *your* check, and four public sources tell you which three to try first.

Do not memorize model names. They rot in weeks. Memorize the four sources below
and the five-minute habit at the end — that is the whole skill.

## which model for what

Pick by the job, not by hype. Then confirm with the sources.

| your job | what you actually need | where to look |
| --- | --- | --- |
| writing code, fixing bugs | real-repo coding ability | [SWE-bench](https://www.swebench.com/) + [LMArena](https://lmarena.ai/) code |
| long agent runs, tool calls | reliability over many steps | [OpenRouter](https://openrouter.ai/rankings) (what devs actually ship) |
| summarizing, chat, drafting | what humans prefer | [LMArena](https://lmarena.ai/) |
| high volume, tight budget | quality per dollar, speed | [Artificial Analysis](https://artificialanalysis.ai/) |
| private / offline / no API | open weights, runs local | [LMArena](https://lmarena.ai/) open filter → [local_models](local_models.md) |

## the four sources (and how to read each)

**[LMArena](https://lmarena.ai/)** — humans vote on two anonymous answers, models
ranked by [Bradley-Terry / Elo-style](https://arena.ai/blog/ranking-method/) score.
*Read it as:* what people actually prefer. Best for chat, writing, code taste.
The method is open source ([arena-rank](https://github.com/lmarena/arena-rank)).

**[Artificial Analysis](https://artificialanalysis.ai/)** — independent lab measuring
intelligence vs speed vs cost per task. *Read it as:* the price/performance table.
Use it when cost or latency is the constraint.

**[OpenRouter rankings](https://openrouter.ai/rankings)** — live ranking by tokens
developers actually route through the API. *Read it as:* what the industry is
shipping, not what benchmarks claim. It measures adoption, not quality — that is
the point. Their [State of AI](https://openrouter.ai/state-of-ai) study shows the
open-model field is now fragmented across DeepSeek, Qwen, Kimi, MiniMax and more —
no single winner, so stay model-agnostic.

**[SWE-bench](https://www.swebench.com/)** — models resolve real GitHub issues in a
fixed harness. *Read it as:* the closest thing to "can it do my coding job". Use the
Verified / mini-SWE-agent view for an apples-to-apples model comparison.

## the only rule that matters

Leaderboards rank models on *their* tasks. Your task is different. So:

1. Shortlist **three** models from the sources above.
2. Run them on **your own small test set** — real prompts from your work.
3. Pick the **cheapest one that passes**.

That set, built from your own failures, beats any public table within a month.

## track new releases in 5 minutes a week

Do not follow news. Check these once a week, in this order, stop when you have an
answer:

1. [OpenRouter rankings](https://openrouter.ai/rankings) — is a new model suddenly
   getting real traffic? That is the market telling you something shipped.
2. [LMArena](https://lmarena.ai/) — did the top of your category move?
3. [Artificial Analysis](https://artificialanalysis.ai/) — did the price/performance
   frontier move?

If nothing moved, change nothing. A new model only earns a switch when it beats
your current pick **on your own test set** — not on a launch post.

## what to ignore

- A benchmark published by whoever sells the model.
- A single viral screenshot of one good answer.
- Any ranking with no method and no confidence interval.
- The urge to switch weekly. Switching costs more than it saves until the gap is
  real and measured on your tasks.
