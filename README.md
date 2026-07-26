# e-gleba /ai

Personal **AI Operating System** — interactive cheatsheet for prompts, daily drivers, models, pipelines, MCPs, arenas, and interest digests.

Live: [e-gleba.github.io/ai](https://e-gleba.github.io/ai/) · Portfolio: [e-gleba.github.io](https://e-gleba.github.io)

## Stack

- Pure static HTML / CSS / JS (no bundler, no Jekyll)
- Deploy: official GitHub Pages Actions (`configure-pages` → `upload-pages-artifact` → `deploy-pages`)
- Content lives in [`assets/js/data.js`](assets/js/data.js) — edit there, UI re-renders

## Local

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Sections

| Section | Purpose |
|--------|---------|
| Daily | Date-aware prompt kickoff + reroll |
| Identity | Operator pillars / how agents should treat context |
| Drivers | Cursor, OpenCode, You.com, Scira, … |
| Models | Daily-use model matrix |
| Prompts | Copy-ready library (`{{date}}` filled) |
| Pipelines | Idea → agent → PR loops |
| MCP | Agent tool surfaces |
| Arenas | LM Arena, Artificial Analysis, … |
| Practices | Spec-first, critique loops, Chinese SOP patterns |
| Digests | Engines, RE, OSINT, BY/RU, space, electronics, … |
| Map | Bookmark graph |

## CI

Push to `main` deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). In repo **Settings → Pages**, set source to **GitHub Actions**.
