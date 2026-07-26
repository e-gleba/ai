# e-gleba /ai

Personal **AI Operating System** — interactive cheatsheet for agents, skills, MCP, prompts, C++ workflows, and interest digests.

Live: [e-gleba.github.io/ai](https://e-gleba.github.io/ai/) · Portfolio: [e-gleba.github.io](https://e-gleba.github.io)

## Stack

- Pure static HTML / CSS / JS (no bundler, no Jekyll)
- Deploy: official GitHub Pages Actions (`configure-pages` → `upload-pages-artifact` → `deploy-pages`)
- Artifact dir: `site/` (no leading-underscore names)
- Content: [`assets/js/data.js`](assets/js/data.js) — snake_case keys

## Local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Sections

Daily · Identity · Layers · Agent dirs · Skills · MCP · Specs · C++ · Organize · Drivers · Models · Prompts · Templates · Pipelines · Arenas · Practices · Digests · Watch · Map

## CI

Push to `main` deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).  
**Settings → Pages → Source = GitHub Actions**.
