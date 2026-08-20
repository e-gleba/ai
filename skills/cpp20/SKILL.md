---
name: cpp20
description: >
  Modern C++ design practice: C++23 by default, value semantics, ranges,
  concepts, error handling, and the reuse-first discipline behind the
  standard library and Boost. Use when writing, reviewing, or refactoring
  C++, choosing between designs, or deciding whether a standard facility is
  the right tool.
---

# cpp20

Ground every answer in a primary source, in this order:
[cppreference](https://en.cppreference.com/w/cpp/),
the [working draft](https://eel.is/c++draft/) when exact wording matters,
[compiler support tables](https://en.cppreference.com/w/cpp/compiler_support)
before assuming a feature exists in the toolchain, and
[Compiler Explorer](https://godbolt.org) for what the compiler actually
produced.

Default standard: the project's. If none is stated, C++23.

## naming and style

Boost style, per the
[Boost library guidelines](https://www.boost.org/development/library_guidelines.html)
and the [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines):

- `snake_case` for types, functions, variables, namespaces
- `UPPER_CASE` for macros only
- no `m_` prefixes, no Hungarian notation
- `class` for types with invariants, `struct` for plain data

## reuse first, in this order

1. The standard library.
2. [Boost](https://www.boost.org) — the proving ground most of the standard
   came from.
3. A well-starred, maintained library: [fmt](https://github.com/fmtlib/fmt),
   [spdlog](https://github.com/gabime/spdlog),
   [GSL](https://github.com/microsoft/GSL) for `gsl::not_null` and
   `gsl::narrow`, [abseil](https://github.com/abseil/abseil-cpp).

Never hand-roll what a tested library already does. When a design or trick
is taken from one, cite it at the call site:

```cpp
// small-buffer optimisation, approach from boost::container::small_vector
// https://www.boost.org/doc/libs/release/doc/html/container.html
```

## the three ideas

1. **Value semantics first.** A type that copies correctly, moves cheaply,
   and shares nothing is almost impossible to misuse. References, pointers,
   and shared ownership only when the design requires them.
2. **Algorithms over loops, concepts over types.** State the requirement,
   not the type — the generic-programming tradition from Stepanov's
   *Elements of Programming* [book](http://elementsofprogramming.com).
3. **Zero overhead means measured, not assumed.** An abstraction is free
   only if the generated code says so.

## defaults

```cpp
// ownership visible in the type
std::unique_ptr<texture> load(std::filesystem::path const& path);

// non-owning views as parameters, by value
void upload(std::span<std::byte const> bytes);
void log(std::string_view message);

// errors that must be handled, no exceptions across a boundary
std::expected<config, parse_error> parse(std::string_view text);

// requirements, not type lists
template <std::ranges::input_range range>
  requires std::convertible_to<std::ranges::range_value_t<range>, double>
double sum(range&& values);
```

Rules that hold in nearly all cases:

- No raw `new`, `delete`, `malloc`, or owning raw pointers.
- No output parameters where a return value works.
- Never store a `std::span` or `std::string_view` where it can outlive the
  buffer.
- `const` by default; `constexpr` where it costs nothing; `noexcept` only
  when honestly promised.
- Rule of zero: no special member functions unless the type manages a
  resource. Write one, owe the rest.

## ranges, sharp edges named

```cpp
auto visible = entities
             | std::views::filter([](auto const& e) { return e.visible; })
             | std::views::transform(&entity::bounds);
```

- Views are lazy and non-owning. Never return a view over a local.
- A pipeline re-evaluates on each traversal.
- `std::ranges::to` materializes; do it once, deliberately.
- Hot path: compare generated code against a plain loop on
  [Compiler Explorer](https://godbolt.org), measure on
  [Quick Bench](https://quick-bench.com). Readability wins outside hot
  paths; numbers decide inside them.

## concepts instead of enable_if

```cpp
template <typename T>
concept trivially_serializable =
    std::is_trivially_copyable_v<T> &&
    std::has_unique_object_representations_v<T>;

template <trivially_serializable T>
void write(std::span<std::byte> out, T const& value);
```

Concepts make the error point at the caller's mistake, not line 900 of a
header. Name them after the requirement, not the types that satisfy it.

## what to be careful with

| facility | caution |
| --- | --- |
| coroutines | the language gives machinery, not a scheduler; frame lifetime is yours |
| modules | toolchain support still varies; check before committing a project |
| `std::shared_ptr` | shared ownership is a design decision; cycles and atomic traffic cost |
| exceptions | fine inside a module, dangerous across binary boundaries |
| `std::function` | type erasure allocates; hot paths take a concrete callable |
| implicit conversions | a single-argument constructor without `explicit` fires by accident |

## review order

1. Lifetime and ownership: who owns it, what outlives what.
2. Undefined behaviour: aliasing, alignment, signed overflow, uninit reads.
3. Concurrency: memory orders, invariants spanning members, false sharing.
4. Error paths: leaks, half-constructed objects, ignored results.
5. Interface and binary-interface impact.
6. Performance, with numbers.
7. Style, delegated to a linter.

Longer version with prompts: [cpp_playbook](../../docs/cpp_playbook.md).

## when asked "is this the modern way"

Answer with a source, a compiler-support check, and generated code. Fashion
is not an argument. If the standard facility is heavier than the
hand-written version in this context, say so and show the measurement.
