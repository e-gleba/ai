# contributing

Thanks for reading. This repository is a handbook: only markdown, no code, no
build step. That makes contributing simple.

## what belongs here

- Practices that saved real time, described so a stranger can repeat them.
- Prompts that were actually used, with the placeholders left in.
- Honest limitations of tools, including the annoying ones.
- Plain-language explanations. If a sentence needs a second reading, rewrite it.

## what does not belong here

- Vendor marketing, hype, or scores copied from a launch post.
- Model names presented as permanent truth. Describe the class, not the brand.
- Long theory with no action attached.
- Screenshots, binaries, generated assets, or anything that needs a build.

## rules of the house

1. File names are lowercase with underscores: `code_review.md`, not `Code-Review.md`.
2. One topic per file. Link to other files instead of repeating them.
3. Every page starts with a heading, then a navigation line:
   `[handbook](../readme.md) · prev: ... · next: ...`
4. Prompts live in fenced code blocks so they copy cleanly.
5. Placeholders look like `{{this}}`. Dates use `{{date}}` in ISO form.
6. Claims about tools state the limitation, not only the benefit.
7. Prefer short sentences. Prefer common words. Explain a term the first time
   it appears, or link it to [glossary](docs/glossary.md).

## how to propose a change

```sh
git switch -c docs/short_topic_name
# edit markdown
git commit -m "docs: shorten the review pipeline section"
git push -u origin docs/short_topic_name
```

Then open a pull request. Small pull requests get read; large ones wait.

## checks that run automatically

- Markdown style, via `markdownlint`.
- Internal links, verified offline, so a renamed file cannot break navigation.
- External links, checked on a schedule, so a dead bookmark becomes an issue
  instead of a surprise.

You can run the same checks locally if you want:

```sh
npx markdownlint-cli2 "**/*.md"
lychee --offline --verbose .
```

Neither is required to open a pull request. Continuous integration will tell you.

## commit messages

```
docs: one short imperative line, lowercase, under 50 characters

Optional body explaining why the change matters. Wrap at 72 columns.
```

Prefixes in use: `docs:`, `chore:`, `fix:`.

## review standard

A change is merged when it is: true, shorter than what it replaces or clearly
worth the length, and readable by someone outside the field. Nothing else is
required.
