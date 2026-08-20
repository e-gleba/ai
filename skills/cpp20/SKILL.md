---
name: cpp20
description: >
  Modern C++ design practice: C++23 by default, value semantics, ranges,
  concepts, error handling, contracts without dependencies, and the
  reuse-first discipline behind the standard library and Boost. Use when
  writing, reviewing, or refactoring C++, choosing between designs, or
  deciding whether a standard facility is the right tool.
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
3. A well-starred, maintained library **already linked by the project**:
   [fmt](https://github.com/fmtlib/fmt),
   [spdlog](https://github.com/gabime/spdlog),
   [GSL](https://github.com/microsoft/GSL),
   [abseil](https://github.com/abseil/abseil-cpp).
4. A ten-line polyfill in your own namespace. Never add a dependency for
   one small facility — write the concept of it once and reuse that.

Never hand-roll what a tested library already does. When a design or trick
is taken from one, cite it at the call site:

```cpp
// small-buffer optimisation, approach from boost::container::small_vector
// https://www.boost.org/doc/libs/release/doc/html/container.html
```

## mechanical habits — the compiler enforces all of these

```cpp
struct tank_state final                  // final: not designed as a base
{
    std::uint64_t id{};                  // every member initialized
    float         hit_points{100.0F};
    std::string   name{"tank"};
};

// aggregates: designated initializers name the fields, not the order
const auto state = tank_state{.id = 42, .name = "t-34"};

// braces everywhere: no narrowing, no most-vexing parse
const std::vector<int> ids{1, 2, 3};     // not ids(1, 2, 3)
```

- Initialize every variable at declaration. An uninitialized scalar is
  undefined behaviour waiting for a reader.
- `{}` over `()`: braces reject narrowing conversions and can never parse
  as a function declaration.
- Designated initializers (`.member = value`) for aggregates — the reader
  sees field names, not field order.
- `final` on every type not designed as a base class. Unplanned
  inheritance is a planned bug.
- RAII owns every resource: acquire in the constructor, release in the
  destructor. No `new`/`delete`, `fclose`, or manual `unlock` in user
  code — and no early return that skips a release.

## contracts without dependencies

No GSL in the project? The whole vocabulary is a few lines:

```cpp
namespace tb
{
    [[noreturn]] inline void contract_failed(
        const char*                expr,
        const std::source_location loc = std::source_location::current()) noexcept
    {
        std::fprintf(stderr, "contract failed: %s at %s:%u\n",
                     expr, loc.file_name(), loc.line());
        std::abort();
    }

    // gsl::finally, ten lines: runs f at scope exit, whatever the path
    template <typename F>
    struct [[nodiscard]] scope_exit final
    {
        F f;
        scope_exit(const scope_exit&)            = delete;
        scope_exit& operator=(const scope_exit&) = delete;
        ~scope_exit() noexcept(std::is_nothrow_invocable_v<F>) { f(); }
    };
    template <typename F>
    scope_exit(F) -> scope_exit<F>;
}

#define tb_expects(cond) \
    ((cond) ? static_cast<void>(0) : ::tb::contract_failed(#cond))
```

```cpp
tb_expects(index < size);                                    // precondition
const auto cleanup = tb::scope_exit{[&] { release(handle); }};
```

std already replaces the rest of GSL: `std::span` for `gsl::span`,
`std::string_view`, `std::as_const`, `[[nodiscard]]`. A reference
parameter, or a `tb_expects(p != nullptr)` on entry, covers most of
`gsl::not_null`. Where the project already links GSL, use
`gsl::Expects` and `gsl::Ensures` instead of the macro.

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

## function contracts

Say the guarantee in the signature, then keep it:

```cpp
[[nodiscard]] constexpr std::uint64_t hash(std::string_view text) noexcept;
```

- `[[nodiscard]]` on anything whose result matters: error returns, factory
  functions, pure queries. An ignored result is a bug the compiler can see —
  let it.
- `noexcept` only when honestly promised: no allocation, no throwing call
  inside. It is a contract with the optimizer and with `std::vector` move,
  not a decoration.
- `constexpr` where it costs nothing, `consteval` where the value must exist
  at compile time.
- A function that can fail returns `std::expected` or a checked status,
  never a magic value. The caller checks explicitly; no silent fallthrough.
- Preconditions and postconditions: `tb_expects` from the section above, or
  `gsl::Expects` and `gsl::Ensures` where GSL is already linked.

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
3. Mechanical: uninitialized variables, `()` narrowing, missing `final`,
   missing `[[nodiscard]]` / `noexcept` / `constexpr`.
4. Concurrency: memory orders, invariants spanning members, false sharing.
5. Error paths: leaks, half-constructed objects, ignored results.
6. Interface and binary-interface impact.
7. Performance, with numbers.
8. Style, delegated to the linter.

Longer version with prompts: [cpp_playbook](../../docs/cpp_playbook.md).

## when asked "is this the modern way"

Answer with a source, a compiler-support check, and generated code. Fashion
is not an argument. If the standard facility is heavier than the
hand-written version in this context, say so and show the measurement.
