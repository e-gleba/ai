# cpp_playbook

[handbook](../readme.md) · prev: [mcp](mcp.md) · next: [research_osint](research_osint.md)

**In one sentence:** C++ is the hardest case for a model, and grounding fixes most
of it.

The language is huge, the toolchain matters, and code that looks correct can be
undefined behaviour.

## grounding, most valuable first

1. `compile_commands.json` — the exact flags, includes, and language standard per
   file. Without it the model guesses your dialect.
2. One command to build, one command to test.
3. Warnings as errors in the development preset.
4. Sanitizer presets.
5. A scratch file the agent may edit freely for reproducers.

```sh
cmake --preset dev -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
ln -sf build/dev/compile_commands.json .
```

## presets worth having

```
dev        -O0 -g, warnings as errors, static analysis on changed files
asan       address and undefined behaviour sanitizers, frame pointers kept
tsan       thread sanitizer
relwithdeb -O2 -g, for profiling and benchmarks
```

Any claim about correctness in code involving threads or lifetimes, made without
running the sanitizers, is a guess.

## what the compiler actually did

Use [Compiler Explorer](https://godbolt.org) whenever the argument is about
performance or "the compiler will optimize it".

```
Compile this on {{compiler}} {{version}} with {{flags}} and tell me:
- was the call inlined
- was the loop vectorized, and at what width
- did any bounds check or exception path survive
- how does it differ from this alternative: {{alt}}
Answer from the assembly only. If the assembly does not show it, say so.
```

Rules: compare two compilers before concluding anything about "C++"; measure on
[Quick Bench](https://quick-bench.com) before claiming a win; assembly beats
intuition and measurement beats assembly.

## review order for c++ changes

Stop at the first category that fails.

1. **Lifetime and ownership** — who owns it, what outlives what, references into
   containers that reallocate.
2. **Undefined behaviour** — signed overflow, aliasing, misaligned access, cast
   chains, out-of-range indexes, uninitialized reads.
3. **Concurrency** — ordering guarantees, atomics and their memory orders,
   double-checked patterns, false sharing.
4. **Error paths** — leaks on failure, half-constructed objects, ignored results.
5. **Interfaces** — layout changes, inline changes, exported symbols.
6. **Performance** — hidden copies, hidden allocations, allocation in hot loops,
   virtual calls in inner loops.
7. **Style** — last, and delegated to a linter.

Full pipeline: [code_review](code_review.md). Engine-specific gates:
[engine_rnd](engine_rnd.md).

## prompts

Explain a hot path:

```
File {{path}}, function {{fn}}.
Explain the data flow, then list with file:line:
- every allocation
- every copy of an object larger than two pointers
- every virtual dispatch inside a loop
- every place a cache miss is likely, and why
Do not propose fixes yet.
```

Threading audit:

```
Class: {{code}}.
Assume it is used from a render thread and a worker pool.
Answer:
- which members are shared mutable state
- which invariants span more than one member (those need one lock, not two)
- every memory order used, and whether it is sufficient, with reasoning
- the smallest test that would expose a race under the thread sanitizer
```

Minimal reproducer:

```
Symptom: {{symptom}}. Full file: {{code}}.
Produce a single-file reproducer under 40 lines with no external dependencies,
buildable with `{{compiler}} -std=c++23 -fsanitize=address`.
If it cannot be reproduced without a dependency, name the dependency and stop.
```

## what models get wrong repeatedly

- Inventing standard library functions that almost exist, or that require a newer
  standard than your flags allow.
- Adding `std::move` where it does nothing, or where it breaks a later use.
- "Modernizing" hot paths with wrappers that add cost.
- Replacing a hand-written loop with an algorithm that changes the iteration
  semantics.
- Reformatting whole files. Settle this with a formatting hook so there is nothing
  to argue about.
- Claiming a performance win with no measurement. Ask for the number, every time.

Counters: [failure_modes](failure_modes.md).
