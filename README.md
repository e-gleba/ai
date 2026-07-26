# e-gleba /ai

Interactive **AI Operating System** — a living map of tools, prompts, skills, MCP, C++ workflows, decision trees, and context-window math.

Live: [e-gleba.github.io/ai](https://e-gleba.github.io/ai/) · Portfolio: [e-gleba.github.io](https://e-gleba.github.io)

## Feel

Raycast-like shell: spotlight search (`⌘K` / `/`), liquid-glass cards, dynamic Cytoscape knowledge graph with compound pipeline nodes, and interactive decision trees. Built so non-tech visitors can click around — and pros can copy real prompts plus full tool specs.

## Stack (CDN, no bundler)

| Lib | Why |
|-----|-----|
| [Alpine.js](https://alpinejs.dev) | UI state |
| [Fuse.js](https://fusejs.io) | Fuzzy spotlight search |
| [Cytoscape.js](https://js.cytoscape.org/) + [cytoscape-cola](https://github.com/cytoscape/cytoscape.js-cola) | Dynamic, draggable, compound graph |
| Pure static HTML/CSS | GitHub Pages |

Content source of truth: [`assets/js/data.js`](assets/js/data.js).

## What's inside

- **Tools** with full specs: context window, speed, cost, best-for, limitations.
- **Models** compared by context / speed / price.
- **Context & cost calculator** for common models.
- **Decision trees**: which model, which tool, rule vs skill vs MCP, ship vs spike.
- **Pipelines** rendered as nested GitHub-Actions-style graphs inside the map.
- **Prompts** ready to copy, with `{{vars}}` fillers.
- **Skills, MCP, C++ playbook, agent dirs, bookmarks, watch lists.**

## Local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploy

Official Pages Actions → artifact dir `site/`.  
**Settings → Pages → Source = GitHub Actions**.
