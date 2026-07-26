---
name: sustainable_pace
description: >
  Staying effective over years instead of months: bounded hours, honest estimates,
  saying no without conflict, handling reviews and criticism, and noticing burnout
  early. Use when the work is fine but the days are not, when a deadline is being
  negotiated, or when deciding what to drop.
---

# sustainable_pace

Engineering output over a year is decided by consistency, not by intensity. The
research on this is old and boring: hours beyond a normal week produce a short
burst and then a longer deficit
[Standish and industry data summary](https://www.igda.org/page/crunch),
and burnout is a recognised occupational phenomenon with defined symptoms
[WHO classification](https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases).

## the operating limits

1. **A fixed stop time.** Decide when the day ends before it starts. Work expands
   to fill whatever space it is given.
2. **Two deep blocks a day, no more.** Concentrated work is the scarce resource;
   meetings and reviews are not deep blocks.
3. **Unfinished is normal.** Stop mid-task with a written note about the next step.
   Trying to reach a clean stopping point is how evenings disappear.
4. **No decisions when tired.** Architecture, negotiations, and replies to
   irritating messages all wait for morning.
5. **One weekend day fully off the machine.** Not "light work" — off.

## estimates and saying no

Most stress comes from a commitment nobody negotiated.

```
Ask: {{request}}
Answer in this shape:
- what I can deliver by {{date}}: <smaller, concrete scope>
- what that displaces: <the thing it delays>
- what I need to go faster: <decision, access, or a removed dependency>
```

That is not refusal; it is a trade offered out loud. Refusing without an
alternative creates conflict, and accepting silently creates a missed date. The
same structure works for a manager, a producer, and a colleague.

Estimate rules:

- Give a range, never a single number.
- Estimate the unknowns separately: "two days if the format is documented, a week
  if I have to reverse it."
- Re-state the estimate the moment a new fact appears. Silence is read as agreement.

## reviews and criticism

- Separate the code from yourself. A rejected change is information, not a verdict.
- Ask for the reason, not the fix: "what breaks if we keep it this way?"
- If a review comment is unclear, ask once in writing, then move to a call. Long
  comment threads consume more energy than the change is worth.
- Do not defend a change you no longer believe in for the sake of consistency.
- When you are the reviewer, say what is wrong and what would be right instead.
  Vague disapproval is the most expensive thing in a review —
  [code_review](../../docs/code_review.md).

## avoiding the problems that create pressure

- Small changes. A large change is a large argument, a large risk, and a long wait
  for review.
- Write the decision down when it is made, so it is not relitigated later —
  [context_engineering](../../docs/context_engineering.md).
- Automate anything that has annoyed you twice.
- Make hidden work visible: an issue, a note, a message. Invisible work is
  unrewarded and infinite.
- Do not become the only person who can do something; that is not job security,
  it is a permanent on-call rota.

## warning signs, in order of appearance

```
1. Weekends spent recovering rather than doing anything.
2. Irritation at ordinary review comments.
3. Avoiding the task you know matters most.
4. Working longer with less to show for it.
5. Cynicism about work that used to be interesting.
```

At 1 or 2, cut hours for a week and see. At 3 or 4, change what you are working on.
At 5, treat it as a real condition, not a character flaw, and get help.

## weekly check, two minutes

```
Date: {{date}}
- Did I stop on time? How many days?
- Which commitment did I accept without negotiating it?
- What was the one thing I automated or deleted?
- Energy this week: up, flat, or down?
If energy is down two weeks running, cut scope before it is cut for you.
```

## the point

You are paid for judgement, and judgement is the first thing exhaustion removes.
Protecting the conditions for good decisions is part of the work, not a reward for
finishing it.
