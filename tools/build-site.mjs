import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = `${root}/_site`;
const base = '/ai';
const siteUrl = 'https://e-gleba.github.io/ai';

const sections = [
  ['Foundations', ['start_here', 'daily_routine', 'tool_stack', 'model_selection']],
  ['Doing the work', ['prompt_library', 'code_review', 'parallel_agents', 'context_engineering', 'best_practice']],
  ['Hard mode', ['engine_rnd', 'cpp_playbook', 'local_models', 'mcp']],
  ['Reference', ['failure_modes', 'glossary']],
];

const skills = [
  ['cmake', 'Modern CMake'],
  ['cpp20', 'Modern C++'],
  ['python', 'Python'],
  ['code_review', 'Code review'],
  ['tb_engine', 'TB Engine'],
  ['android_studio', 'Android Studio'],
  ['crash_investigation', 'Crash investigation'],
  ['wwise', 'Wwise'],
  ['rnd', 'R&D spikes'],
  ['cursor_workflow', 'Cursor workflow'],
  ['sustainable_pace', 'Sustainable pace'],
];

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const titleCase = (name) => name.split('_').map((word) => word === 'cpp20' ? 'C++20' : word === 'mcp' ? 'MCP' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

function normalizeMarkdown(markdown, sourcePath) {
  const sourceDir = dirname(sourcePath);
  return markdown.replace(/\]\(([^)#]+\.md)(#[^)]+)?\)/g, (_, target, hash = '') => {
    const resolved = new URL(target, `file:///${sourceDir}/`).pathname.slice(1);
    if (resolved === 'readme.md') return `](${base}/${hash})`;
    if (resolved === 'skills/readme.md') return `](${base}/skills/${hash})`;
    if (resolved.endsWith('/SKILL.md')) return `](${base}/${resolved.replace('/SKILL.md', '/')}${hash})`;
    return `](${base}/${resolved.replace(/\.md$/, '/')}${hash})`;
  });
}

function nav(active = '') {
  const skillLinks = skills.map(([name, label]) => `<a ${active === `skills/${name}` ? 'aria-current="page"' : ''} href="${base}/skills/${name}/">${label}</a>`).join('');
  const skillsGroup = `<section class="nav-group"><h2>Skills</h2>${skillLinks}</section>`;
  const groups = sections.map(([heading, pages], index) => `
    <section class="nav-group">
      <h2>${heading}</h2>
      ${pages.map((name) => `<a ${active === `docs/${name}` ? 'aria-current="page"' : ''} href="${base}/docs/${name}/">${titleCase(name)}</a>`).join('')}
    </section>${index === 0 ? skillsGroup : ''}`).join('');
  return `<nav id="sidebar" class="sidebar" aria-label="Handbook navigation">
    <a class="brand" href="${base}/"><span class="brand-mark">AI</span><span>Handbook</span></a>
    ${groups}
  </nav>`;
}

function icon(name) {
  const paths = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.07.07l2-2A5 5 0 0 0 12 4l-1.15 1.15"/><path d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15"/>',
    copy: '<rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function shell({ title, description, body, active, rawUrl = '', skill = false }) {
  const actions = rawUrl ? `<div class="page-actions" aria-label="Page actions">
    ${skill ? `<button class="button primary" data-copy-content="${rawUrl}">${icon('copy')}<span>Copy skill</span></button>` : ''}
    <button class="button" data-copy-link="${rawUrl}">${icon('link')}<span>Copy raw link</span></button>
    <a class="button" href="${rawUrl}" target="_blank" rel="noopener">${icon('external')}<span>Open raw</span></a>
  </div>` : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#0a0a0f">
  <title>${escapeHtml(title)} · AI Handbook</title>
  <link rel="canonical" href="${siteUrl}${active ? `/${active}/` : '/'}">
  <link rel="stylesheet" href="${base}/assets/site.css">
  <script>document.documentElement.dataset.theme=localStorage.getItem('theme')||'auto'</script>
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  ${nav(active)}
  <header class="topbar">
    <button class="icon-button menu-button" data-menu aria-label="Open navigation" aria-controls="sidebar">${icon('menu')}</button>
    <a class="mobile-brand" href="${base}/">AI Handbook</a>
    <button class="icon-button" data-theme aria-label="Toggle color theme">${icon('sun')}</button>
  </header>
  <div class="scrim" data-scrim></div>
  <main id="content" class="main">
    ${actions}
    <article class="prose">${body}</article>
    <footer><span>Built from plain Markdown.</span><a href="https://github.com/e-gleba/ai">${icon('github')} Source</a></footer>
  </main>
  <div class="toast" role="status" aria-live="polite"></div>
  <script src="${base}/assets/site.js" defer></script>
</body>
</html>`;
}

async function read(path) { return readFile(`${root}/${path}`, 'utf8'); }
async function output(path, content) {
  const destination = `${out}/${path}`;
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function renderPage(source, destination, active, title, options = {}) {
  const markdown = await read(source);
  const body = options.skill
    ? `<pre><code class="language-markdown">${escapeHtml(markdown)}</code></pre>`
    : marked.parse(normalizeMarkdown(markdown, source), { gfm: true, breaks: false });
  await output(destination, shell({
    title,
    description: options.description || `AI Handbook: ${title}`,
    body,
    active,
    rawUrl: options.rawUrl,
    skill: options.skill,
  }));
}

await rm(out, { recursive: true, force: true });
await mkdir(`${out}/assets`, { recursive: true });
await cp(`${root}/site/site.css`, `${out}/assets/site.css`);
await cp(`${root}/site/site.js`, `${out}/assets/site.js`);
await output('.nojekyll', '');

await renderPage('readme.md', 'index.html', '', 'AI Handbook', {
  description: 'Practical principles, workflows, prompts, and skills for working with AI as an engineer.',
});

for (const [, pages] of sections) {
  for (const name of pages) {
    const source = `docs/${name}.md`;
    await renderPage(source, `docs/${name}/index.html`, `docs/${name}`, titleCase(name), {
      rawUrl: `${base}/${source}`,
    });
    await output(source, await read(source));
  }
}

await renderPage('skills/readme.md', 'skills/index.html', 'skills', 'Skills');
await output('skills/readme.md', await read('skills/readme.md'));
for (const [name, label] of skills) {
  const source = `skills/${name}/SKILL.md`;
  await renderPage(source, `skills/${name}/index.html`, `skills/${name}`, label, {
    rawUrl: `${base}/${source}`,
    skill: true,
  });
  await output(source, await read(source));
}

const rawEntries = [
  ...sections.flatMap(([, pages]) => pages.map((name) => [`${titleCase(name)}`, `${siteUrl}/docs/${name}.md`])),
  ...skills.map(([name, label]) => [`${label} skill`, `${siteUrl}/skills/${name}/SKILL.md`]),
];
await output('llms.txt', `# AI Handbook\n\n> Practical, source-linked guidance for engineers working with AI.\n\n${rawEntries.map(([label, url]) => `- [${label}](${url})`).join('\n')}\n`);

const unexpectedMarkdown = [];
for (const path of process.argv.slice(2)) if (extname(path) === '.md') unexpectedMarkdown.push(relative(root, path));
console.log(`Built ${1 + sections.flatMap(([, pages]) => pages).length + skills.length} pages in _site`);
