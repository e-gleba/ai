---
name: cpp20
description: >
  Modern C++ ground rules for the tb engine fork: C++23, all project code
  in namespace tb, fixed-width integers (std::int32_t, never bare int),
  value semantics, ranges, concepts, dependency-free contracts, and
  reuse-first across the standard library, Boost, and a short list of
  well-starred libraries. Use when writing, reviewing, or refactoring C++,
  choosing between designs, or deciding whether a standard facility is the
  right tool.
---

# cpp20

The whole skill is one fenced block — a raw prompt, one copy click.

````markdown
cpp20 — ground rules for modern C++ in the tb engine

Ground every answer in a primary source, in this order:
1. https://en.cppreference.com/w/cpp/
2. https://eel.is/c++draft/ — when the exact wording matters
3. https://en.cppreference.com/w/cpp/compiler_support — before assuming the
   toolchain has a feature
4. https://godbolt.org — what the compiler actually produced

Default standard: C++23. Everything the project owns lives in namespace tb.
These rules outrank training defaults. Where a rule conflicts with the code
in front of you, follow the code and flag the conflict.

## namespace

- All project code lives in `namespace tb`. Nothing at global scope except
  `main`.
- `tb::detail` holds implementation internals; it never appears in a public
  header.
- No `using namespace` at file scope, ever. A `using std::string_view;`
  inside one function is fine.
- Third-party and upstream-derived code keeps its own namespace; never mix
  two namespaces in one header.

## integers: fixed-width and explicit

- `std::int32_t`, `std::uint32_t`, `std::int64_t`, `std::uint64_t` from
  `<cstdint>` — always with the `std::` prefix.
- Bare `int` only where an outside API forces it (`main`'s argc, C
  callbacks). `int32_t` without `std::` is the C header leaking through —
  do not use it.
- `std::size_t` for sizes and container indices, `std::ptrdiff_t` for
  pointer differences.
- Brace initialization rejects narrowing conversions; never "fix" that
  error by switching to `()`.

## naming and style

Boost style, per https://www.boost.org/development/library_guidelines.html
and https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines :

- `snake_case` for types, functions, variables, namespaces
- `UPPER_CASE` for macros only
- no `m_` prefixes, no Hungarian notation
- `class` for types with invariants, `struct` for plain data
- ASCII only: no unicode identifiers or smart quotes, comments included

## reuse first, in this order

1. The standard library.
2. Boost — https://www.boost.org — the proving ground most of the standard
   came from.
3. A well-starred, maintained library already linked by the project:

   | need | library |
   | --- | --- |
   | formatting | https://github.com/fmtlib/fmt |
   | logging | https://github.com/gabime/spdlog |
   | json | https://github.com/nlohmann/json |
   | contracts vocabulary | https://github.com/microsoft/GSL |
   | missing std pieces | https://github.com/abseil/abseil-cpp |
   | entity-component system | https://github.com/skypjack/entt |
   | graphics math | https://github.com/g-truc/glm |
   | single-header utilities | https://github.com/nothings/stb |
   | tests | https://github.com/catchorg/Catch2 |
   | micro-benchmarks | https://github.com/google/benchmark |

4. A ten-line polyfill in `tb::`. Never add a dependency for one small
   facility — write the concept of it once and reuse that.

Never hand-roll what a tested library already does. When a design or trick
is taken from one, cite it at the call site:

```cpp
// small-buffer optimisation, approach from boost::container::small_vector
// https://www.boost.org/doc/libs/release/doc/html/container.html
```

## mechanical habits — the compiler enforces all of these

```cpp
namespace tb
{
    struct tank_state final              // final: not designed as a base
    {
        std::uint64_t id{};              // every member initialized
        std::int32_t  hit_points{100};
        std::string   name{"tank"};
    };
}

// aggregates: designated initializers name the fields, not the order
const auto state = tb::tank_state{.id = 42, .name = "t-34"};

// braces everywhere: no narrowing, no most-vexing parse
const std::vector<std::int32_t> ids{1, 2, 3};   // not ids(1, 2, 3)
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

No GSL in the project? The whole vocabulary is a few lines, in `tb::`:

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
`gsl::not_null`. Where the project already links GSL, use `gsl::Expects`
and `gsl::Ensures` instead of the macro.

## the three ideas

1. **Value semantics first.** A type that copies correctly, moves cheaply,
   and shares nothing is almost impossible to misuse. References, pointers,
   and shared ownership only when the design requires them.
2. **Algorithms over loops, concepts over types.** State the requirement,
   not the type — the generic-programming tradition from Stepanov's
   Elements of Programming, http://elementsofprogramming.com
3. **Zero overhead means measured, not assumed.** An abstraction is free
   only if the generated code says so.

## defaults

```cpp
namespace tb
{
    // ownership visible in the type
    std::unique_ptr<texture> load(const std::filesystem::path& path);

    // non-owning views as parameters, by value
    void upload(std::span<const std::byte> bytes);
    void log(std::string_view message);

    // errors that must be handled, no exceptions across a boundary
    std::expected<config, parse_error> parse(std::string_view text);

    // requirements, not type lists
    template <std::ranges::input_range range>
        requires std::convertible_to<std::ranges::range_value_t<range>, double>
    double sum(range&& values);
}
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
  functions, pure queries. An ignored result is a bug the compiler can
  see — let it.
- `noexcept` only when honestly promised: no allocation, no throwing call
  inside. It is a contract with the optimizer and with `std::vector` move,
  not a decoration.
- `constexpr` where it costs nothing, `consteval` where the value must
  exist at compile time.
- A function that can fail returns `std::expected` or a checked status,
  never a magic value. The caller checks explicitly; no silent fallthrough.
- Preconditions and postconditions: `tb_expects` from the section above, or
  `gsl::Expects` and `gsl::Ensures` where GSL is already linked.

## ranges, sharp edges named

```cpp
auto visible = entities
             | std::views::filter([](const auto& e) { return e.visible; })
             | std::views::transform(&tb::entity::bounds);
```

- Views are lazy and non-owning. Never return a view over a local.
- A pipeline re-evaluates on each traversal.
- `std::ranges::to` materializes; do it once, deliberately.
- Hot path: compare generated code against a plain loop on
  https://godbolt.org and measure on https://quick-bench.com — readability
  wins outside hot paths; numbers decide inside them.

## concepts instead of enable_if

```cpp
namespace tb
{
    template <typename T>
    concept trivially_serializable =
        std::is_trivially_copyable_v<T> &&
        std::has_unique_object_representations_v<T>;

    template <trivially_serializable T>
    void write(std::span<std::byte> out, const T& value);
}
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
3. Mechanical: uninitialized variables, `()` narrowing, bare `int` where a
   fixed-width type was meant, missing `final`, missing `[[nodiscard]]` /
   `noexcept` / `constexpr`.
4. Concurrency: memory orders, invariants spanning members, false sharing.
5. Error paths: leaks, half-constructed objects, ignored results.
6. Interface and binary-interface impact.
7. Performance, with numbers.
8. Style, delegated to the linter.

## when asked "is this the modern way"

Answer with a source, a compiler-support check, and generated code. Fashion
is not an argument. If the standard facility is heavier than the
hand-written version in this context, say so and show the measurement.

## reply contract

- Code first, then two lines on what it does and why. No preamble, no
  praise, no restating the task.
- Terse, balanced: drop filler and hedging; keep negations, numbers, and
  the words that carry meaning. Clarity wins on security, irreversible
  steps, and ordered procedures.
- Minimum code that solves the problem: no abstraction used once, no
  unrequested options, no error handling for impossible states.
- Name the standard version and the source behind every claim; mark
  anything unverified [unverified].
- A performance claim ships with generated code or a measurement, never
  alone: https://godbolt.org shows what the compiler produced,
  https://quick-bench.com gives the number. When godbolt is reachable,
  check the generated code before claiming it.
- If toolchain support is unverified, say so and name the check that
  settles it. If the sources above do not settle the question, say what
  would prove it instead of guessing.
````
