# e-gleba /ai

Interactive **AI Operating System** — a living map of tools, prompts, skills, MCP, and C++ workflows.

Live: [e-gleba.github.io/ai](https://e-gleba.github.io/ai/) · Portfolio: [e-gleba.github.io](https://e-gleba.github.io)

## Feel

Raycast-like shell: command palette (`⌘K` / `/`), fuzzy search, floating knowledge graph, slide-over details. Built so non-tech visitors can click around — and pros can copy real prompts.

## Stack (CDN, low maintenance)

| Lib | Why |
|-----|-----|
| [Alpine.js](https://alpinejs.dev) | UI state, almost no framework code |
| [Fuse.js](https://fusejs.io) | Fuzzy command-palette search |
| [vis-network](https://visjs.github.io/vis-network/) | Interactive floating graph |
| Pure static HTML/CSS | GitHub Pages, no bundler |

Content source of truth: [`assets/js/data.js`](assets/js/data.js) (snake_case).

## Local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploy

Official Pages Actions → artifact dir `site/`.  
**Settings → Pages → Source = GitHub Actions**.
