# e-gleba /ai

Personal **AI guidebook / recipe book** — tools with real limits, copy-ready prompts, pipelines, digests, business asks, soundtrack, and a daily prompt that fills today’s date.

Live: [e-gleba.github.io/ai](https://e-gleba.github.io/ai/) · Portfolio: [e-gleba.github.io](https://e-gleba.github.io)

## Feel

Raycast-clean reading UI: spotlight (`⌘K` / `/`), liquid-glass cards, drawer detail, theme switcher. No graph — just recipes you reopen every day.

## Stack (CDN, no bundler)

| Lib | Why |
|-----|-----|
| [Alpine.js](https://alpinejs.dev) | UI state |
| [Fuse.js](https://fusejs.io) | Fuzzy spotlight search |
| Pure static HTML/CSS | GitHub Pages |

Content source of truth: [`assets/js/data.js`](assets/js/data.js).

## What's inside

- **Daily prompt** with today’s date filled in
- **Tools** with context / speed / cost / limitations (Cursor, OpenCode, You.com, Scira, …)
- **Models** for the daily bench
- **Prompts** ready to copy (`{{vars}}` fillers)
- **Pipelines** with parallel stages
- **Digests**: engines, RE, chips, OSINT, space, BY/RU business, …
- **Business & law** asks + career framing (Осознанная Меркантильность)
- **Soundtrack**: Orchestra · Twin Atlantic · Halo
- **Bookmarks / arenas**: LM Arena, Artificial Analysis, watch lists

## Local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploy

Official Pages Actions → artifact dir `site/`.  
**Settings → Pages → Source = GitHub Actions**.
