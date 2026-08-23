# start_here

[handbook](../readme.md) · next: [tool_stack](tool_stack.md)

**In one sentence:** this page explains the words used everywhere else, so
nothing later needs a background in software.

## the five words that matter

**Model.** A program that predicts text. You give it words, it gives words back.
It has no memory between conversations unless you provide one.

**Prompt.** The message you send. Clear instructions produce clear results; vague
instructions produce confident nonsense.

**Context.** Everything the model can see right now: your message, the files you
attached, the conversation so far. It is finite, like a desk surface. Pile too
much on it and things fall off the edge.

**Tool.** Something the model is allowed to use: read a file, run a test, search
the web. Without tools a model can only talk. With tools it can act, and then it
can also break things.

**Agent.** A model in a loop with tools: it acts, looks at the result, and tries
again until the goal is met or it gets stuck. That loop is where the time savings
come from, and also where the accidents come from.

## the one rule

**A model is a fast, tireless, overconfident junior.** It is excellent at
producing plausible work and poor at knowing when it is wrong. Therefore every
useful process here has the same shape:

```
1. Say exactly what "done" means, as something checkable.
2. Let the model work.
3. Check it — with a test, a build, a source, or your own eyes.
4. Keep the result or throw it away. Never keep it "probably".
```

If you cannot describe how you will check the answer, you are not ready to ask
the question.

## why "checkable" matters so much

Compare two requests:

| vague | checkable |
| --- | --- |
| make this faster | make this loop run under 2 ms, measured with this benchmark |
| add validation | write tests for these bad inputs, then make them pass |
| fix the bug | write a test that reproduces the crash, then make it pass |

The right column can be verified by a machine. The left column can only be
argued about.

## the whole handbook in five lines

1. Choose the tool by the loop it closes, not by the brand:
   [tool_stack](tool_stack.md)
2. Choose the model by the kind of task, then test it on your own work:
   [model_selection](model_selection.md)
3. Write the goal down as something checkable: [prompt_library](prompt_library.md)
4. Put the project's rules in the project, not in your head:
   [context_engineering](context_engineering.md)
5. Write down what wasted your time today, and change one thing.

## words you will meet later

Full list in [glossary](glossary.md). The five that confuse people most:

- **Token** — roughly a word fragment. Both cost and the size of the desk are
  measured in tokens.
- **Context window** — how big that desk is.
- **Hallucination** — a confident invention. The model is not lying; it has no
  concept of truth, only of plausibility.
- **MCP** — a common plug shape, so a tool built once works in every AI app:
  [mcp](mcp.md)
- **Local model** — one that runs on your own machine, so nothing leaves it:
  [local_models](local_models.md)
