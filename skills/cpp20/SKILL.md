---
name: cpp20
description: >
  Modern C++20 and C++23 design practice: value semantics, ownership, concepts,
  ranges, constexpr, error handling, and the generic-programming discipline behind
  the standard library. Use when writing, reviewing, or refactoring C++, choosing
  between designs, or deciding whether a standard facility is the right tool.
---

# cpp20

Ground every answer in a primary source, in this order:
[cppreference](https://en.cppreference.com/w/cpp),
the [working draft](https://eel.is/c++draft/) when the wording matters,
[cppreference compiler support](https://en.cppreference.com/w/cpp/compiler_support)
before assuming a feature exists in your toolchain, and
[Compiler Explorer](https://godbolt.org) when the question is what the compiler
actually produced.

## the three ideas everything else follows from

1. **Value semantics first.** A type that copies correctly, moves cheaply, and has
   no hidden sharing is almost impossible to misuse. Reach for references,
   pointers, and shared ownership only when the design genuinely requires them.
   The classic treatment of what a well-behaved type owes its users is
   *The C++ Programming Language* by Bjarne Stroustrup
   [book](https://www.stroustrup.com/4th.html) and the reasoning in
   [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).

2. **Algorithms over loops, concepts over types.** Write the requirement, not the
   type. This is the tradition the standard library came from: generic programming
   as developed by Alexander Stepanov, argued from first principles in
   *Elements of Programming* [book](http://elementsofprogramming.com) and
   *From Mathematics to Generic Programming*.

3. **Zero-overhead means measured, not assumed.** An abstraction is free only if
   the generated code says so. Practical, well-tested small-utility design in this
   spirit is what the [Boost](https://www.boost.org) libraries exist for, and their
   maintainers' work — for instance Antony Polukhin's `Boost.PFR`, `Boost.Stacktrace`
   and `Boost.DLL` [author's talks and libraries](https://github.com/apolukhin) —
   is a good model for how much can be done without runtime cost.

## defaults

```cpp
// ownership visible in the type
std::unique_ptr<texture> load(std::filesystem::path const& p);

// non-owning views as parameters
void upload(std::span<std::byte const> bytes);
void log(std::string_view message);

// errors that must be handled, without exceptions crossing a boundary
std::expected<config, parse_error> parse(std::string_view text);

// requirements, not type lists
template <std::ranges::input_range R>
  requires std::convertible_to<std::ranges::range_value_t<R>, double>
double sum(R&& r);
```

Rules that hold in nearly all cases:

- No raw `new`, `delete`, `malloc`, or owning raw pointers.
- No output parameters where a return value works; return by value and let the
  compiler elide the copy.
- Pass `std::span` and `std::string_view` by value; never store them where they can
  outlive the buffer.
- `const` by default; `constexpr` where it costs nothing; `noexcept` only when you
  can honestly promise it.
- Rule of zero: write no special member functions unless the type manages a
  resource. If you write one, you owe the others.

## ranges, with the sharp edges named

```cpp
auto visible = entities
             | std::views::filter([](auto const& e) { return e.visible; })
             | std::views::transform(&entity::bounds);
```

- Views are lazy and non-owning. Never return a view over a local container.
- A pipeline can be re-evaluated: each traversal runs the predicate again.
- `std::ranges::to` materializes; do it once, deliberately.
- In a hot path, check the generated code before shipping a pipeline. Compare
  against a plain loop on [Compiler Explorer](https://godbolt.org) and measure on
  [Quick Bench](https://quick-bench.com); readability wins outside hot paths, and
  loses inside them if the numbers say so.

## concepts instead of enable_if

```cpp
template <typename T>
concept trivially_serializable =
    std::is_trivially_copyable_v<T> && std::has_unique_object_representations_v<T>;

template <trivially_serializable T>
void write(std::span<std::byte> out, T const& value);
```

Concepts make the error message point at the caller's mistake instead of at line
900 of a header. Name them after the requirement, not after the types that satisfy
them.

## what to be careful with

| facility | caution |
| --- | --- |
| coroutines | the language gives you the machinery, not the scheduler; allocation and lifetime of the frame are yours to manage |
| modules | toolchain and build-system support still varies; check before committing a project to them |
| `std::shared_ptr` | shared ownership is a design decision, not a convenience; cycles and atomic refcount traffic are real costs |
| exceptions | fine inside a module, dangerous across binary boundaries and plugin loads |
| `std::function` | type erasure allocates and hides an indirect call; in hot paths use a concrete callable or a non-owning reference |
| implicit conversions | a single-argument constructor without `explicit` will eventually be called by accident |

## review order for a c++ change

1. Lifetime and ownership: who owns it, what outlives what, views into containers
   that reallocate.
2. Undefined behaviour: aliasing, alignment, signed overflow, uninitialized reads,
   out-of-range indexes.
3. Concurrency: memory orders, invariants spanning several members, false sharing.
4. Error paths: leaks, half-constructed objects, ignored results.
5. Interface and binary-interface impact.
6. Performance, with numbers.
7. Style, delegated to a linter.

Longer version with prompts: [cpp_playbook](../../docs/cpp_playbook.md).

## when asked "is this the modern way"

Answer with a source, a compiler-support check, and generated code. Fashion is not
an argument; neither is a blog post. If the standard facility is heavier than the
hand-written version in this specific context, say so and show the measurement.
