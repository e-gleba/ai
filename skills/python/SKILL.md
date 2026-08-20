---
name: python
description: >
  Python practice: standard library first, then well-starred libraries,
  black for formatting, ruff for lint, type hints, and PEP 8 style. Use when
  writing, reviewing, or refactoring Python, choosing dependencies, or
  setting up tooling.
---

# python

Sources: [PEP 8](https://peps.python.org/pep-0008/) for style,
[PEP 484](https://peps.python.org/pep-0484/) for typing, and the
[standard library docs](https://docs.python.org/3/library/) before any
package index.

## reuse first, in this order

1. The standard library — it covers more than remembered: `pathlib`,
   `dataclasses`, `functools`, `itertools`, `contextlib`, `subprocess`,
   `concurrent.futures`, `sqlite3`.
2. A well-starred, maintained library:
   [httpx](https://github.com/encode/httpx),
   [pydantic](https://github.com/pydantic/pydantic),
   [rich](https://github.com/Textualize/rich),
   [typer](https://github.com/fastapi/typer),
   [pytest](https://github.com/pytest-dev/pytest).

Check stars, last commit, and open-issue age before adding a dependency.
When an approach is taken from a library's source, cite it at the call site:

```python
# retry with backoff, approach from httpx's transport layer
# https://github.com/encode/httpx/blob/master/httpx/_transports/default.py
```

## tooling, two commands

```sh
pip install black ruff
black . && ruff check --fix .
```

- [black](https://github.com/psf/black): the formatter. No configuration, no
  arguments about style, ever.
- [ruff](https://github.com/astral-sh/ruff): the linter. Replaces flake8,
  isort, and most of pylint, at rust speed.

Both run in CI. A style debate in review is a process failure.

## defaults

```python
from pathlib import Path


def load_config(path: Path) -> dict[str, str]:
    """One line: what it does, not how."""  # PEP 257
    ...
```

- `snake_case` for functions and variables, `PascalCase` for classes,
  `UPPER_CASE` for constants — PEP 8.
- Type hints on public functions; `dict[str, str]`, not `Dict[str, str]`
  (PEP 585).
- `pathlib.Path`, not string paths.
- `with` for every resource.
- Exceptions carry context: `raise ConfigError(f"missing key: {key}") from exc`.
- No `print` in libraries — `logging`.
- f-strings, not `%` or `.format`.

## review order

1. Correctness: edge cases, `None` handling, mutable default arguments.
2. Resources: files, sockets, and subprocesses closed on every path.
3. Errors: no bare `except`, no swallowed failures.
4. Dependencies: was the standard library enough?
5. Tests: pytest, one behaviour per test.
6. Style: black and ruff already answered this.
