# cpp_playbook

[handbook](../README.md) · prev: [mcp](mcp.md) · next: [local_models](local_models.md)

C++ is the worst case for language models: the language is huge, the toolchain
matters, and plausible code is often undefined behaviour. Grounding fixes most
of it.

## grounding artifacts, in order of value

1. `compile_commands.json` — exact flags, includes, and standard per file.
   Without it an agent guesses your dialect.
2. A one-command build and a one-command test.
3. Warnings as errors in the dev preset.
4. Sanitizer presets.
5. A minimal reproducer file the agent may edit freely.

```sh
cmake --preset dev -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
ln -sf build/dev/compile_commands.json .
```

## presets worth having

```
dev        -O0 -g, warnings as errors, clang-tidy on changed files
asan       -fsanitize=address,undefined -fno-omit-frame-pointer
tsan       -fsanitize=thread
relwithdeb -O2 -g, for profiling and benchmarks
```

Any agent claim about correctness that was not run under asan or tsan is a
guess when threads or lifetimes are involved.

## codegen truth

Use [Compiler Explorer](https://godbolt.org) whenever the argument is about
performance or "the compiler will optimize it".

```
Compile this on {{compiler}} {{version}} with {{flags}} and show me:
- whether the call was inlined
- whether the loop was vectorized, and to what width
- any bounds check or exception path that survived
- the diff against this alternative implementation: {{alt}}
Answer from the assembly only. If the assembly does not show it, say so.
```

Rules:
- Compare two compilers before concluding anything about "C++".
- Benchmark on [Quick Bench](https://quick-bench.com) before claiming a win.
- Assembly beats intuition; measurement beats assembly.

## review focus for c++ diffs

Order matters — stop at the first category that fails.

1. **Lifetime and ownership** — who owns, who outlives, dangling references
   into containers that reallocate.
2. **Undefined behaviour** — signed overflow, strict aliasing, misaligned loads,
   `reinterpret_cast` chains, out-of-bounds indexes, uninitialized reads.
3. **Concurrency** — happens-before, atomics and their memory orders,
   double-checked patterns, false sharing.
4. **Error paths** — leaks on failure, partially constructed objects, swallowed
   `std::expected`.
5. **ABI and headers** — layout changes, inline function changes, exported symbols.
6. **Performance** — hidden copies, hidden allocations, allocations in hot loops,
   virtual calls in inner loops.
7. **Style** — last, and delegate it to a lint pass.

Full pipeline in [code_review](code_review.md).

## prompts

Explain a hot path:

```
File: {{path}}, function {{fn}}.
Explain the data flow. Then list, with file:line:
- every allocation
- every copy of an object larger than a pointer pair
- every virtual dispatch inside a loop
- every place a cache miss is likely and why
Do not propose fixes yet.
```

Threading audit:

```
Here is the class: {{code}}.
Assume it is used from a render thread and a worker pool.
Answer:
- which members are shared mutable state
- which invariants span more than one member (these need one lock, not two)
- every memory order used and whether it is sufficient, with reasoning
- the smallest test that would expose a race under tsan
```

Reduce a bug to a minimal reproducer:

```
Symptom: {{symptom}}. Full file: {{code}}.
Produce a single-translation-unit reproducer under 40 lines with no external
dependencies, buildable with `{{compiler}} -std=c++23 -fsanitize=address`.
If you cannot reproduce it without a dependency, name the dependency and stop.
```

## what agents get wrong repeatedly

- Inventing standard library APIs that almost exist, or from a newer standard
  than your flags allow.
- Adding `std::move` where it does nothing or where it breaks a later use.
- "Modernizing" with `std::optional`/`std::variant` in hot paths, adding cost.
- Replacing a manual loop with an algorithm that changes iteration semantics.
- Reformatting whole files. Enforce this with clang-format in a hook, then the
  agent cannot argue.
- Claiming a perf win with no measurement. Demand numbers, always.

Counter-patterns: [failure_modes](failure_modes.md).
