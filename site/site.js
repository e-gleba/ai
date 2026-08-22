const root = document.documentElement;
const themeButton = document.querySelector('button[data-theme]');
const menuButton = document.querySelector('[data-menu]');
const scrim = document.querySelector('[data-scrim]');
const toast = document.querySelector('.toast');
const themes = ['auto', 'light', 'dark'];

const svgCopy = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const svgCheck = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const svgLink = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07.07l2-2A5 5 0 0 0 12 4l-1.15 1.15"/><path d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15"/></svg>';
const svgExternal = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';

function resolvedTheme() {
  if (root.dataset.theme !== 'auto') return root.dataset.theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeLabel() {
  themeButton.setAttribute('aria-label', `Color theme: ${root.dataset.theme}. Activate to change.`);
  themeButton.title = `Theme: ${root.dataset.theme}`;
  document.querySelector('meta[name="theme-color"]').content = resolvedTheme() === 'dark' ? '#0a0a0f' : '#ffffff';
}

function closeMenu() {
  document.body.classList.remove('nav-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

async function copy(value, message) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const area = document.createElement('textarea');
      area.value = value;
      area.style.cssText = 'position:fixed;opacity:0';
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    notify(message);
    return true;
  } catch {
    notify('Copy failed');
    return false;
  }
}

themeButton.addEventListener('click', () => {
  const next = themes[(themes.indexOf(root.dataset.theme) + 1) % themes.length];
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateThemeLabel();
});
menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
scrim?.addEventListener('click', closeMenu);
document.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());

document.querySelectorAll('button[data-copy-link]').forEach((button) => button.addEventListener('click', () => {
  copy(new URL(button.dataset.copyLink, location.origin).href, 'Raw link copied');
}));
document.querySelectorAll('[data-copy-content]').forEach((button) => button.addEventListener('click', async () => {
  const response = await fetch(button.dataset.copyContent);
  if (!response.ok) throw new Error(`Failed to load page: ${response.status}`);
  copy(await response.text(), 'Page copied');
}));

document.querySelectorAll('.prose pre').forEach((pre) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  pre.replaceWith(wrapper);
  wrapper.append(pre);

  const actions = document.createElement('div');
  actions.className = 'code-actions';
  const codeText = () => (pre.querySelector('code') ?? pre).innerText;

  // skill pages only: copy the skill, then open Scira — the user pastes,
  // adds a task, and submits when ready; no auto-eval on arrival
  if (pre.hasAttribute('data-scira')) {
    const sciraButton = document.createElement('button');
    sciraButton.type = 'button';
    sciraButton.className = 'code-scira';
    sciraButton.setAttribute('aria-label', 'Copy skill and open Scira');
    sciraButton.title = 'Copy skill and open Scira';
    sciraButton.innerHTML = svgExternal;
    sciraButton.addEventListener('click', async () => {
      if (!await copy(codeText(), 'Skill copied — paste it in Scira, then add your task')) return;
      window.open('https://scira.ai/', '_blank', 'noopener');
    });
    actions.append(sciraButton);
  }

  // skill pages only: the raw-link button lives on the block, not the page top
  if (pre.dataset.copyLink) {
    const linkButton = document.createElement('button');
    linkButton.type = 'button';
    linkButton.className = 'code-link';
    linkButton.setAttribute('aria-label', 'Copy raw link');
    linkButton.title = 'Copy raw link';
    linkButton.innerHTML = svgLink;
    linkButton.addEventListener('click', () => {
      copy(new URL(pre.dataset.copyLink, location.origin).href, 'Raw link copied');
    });
    actions.append(linkButton);
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'code-copy';
  button.setAttribute('aria-label', 'Copy code');
  button.innerHTML = svgCopy;
  button.addEventListener('click', async () => {
    if (!await copy(codeText(), 'Code copied')) return;
    button.classList.add('copied');
    button.innerHTML = svgCheck;
    button.setAttribute('aria-label', 'Copied');
    clearTimeout(button.timer);
    button.timer = setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = svgCopy;
      button.setAttribute('aria-label', 'Copy code');
    }, 1600);
  });
  actions.append(button);
  wrapper.append(actions);
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeLabel);
updateThemeLabel();
