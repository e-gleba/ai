const root = document.documentElement;
const themeButton = document.querySelector('button[data-theme]');
const menuButton = document.querySelector('[data-menu]');
const scrim = document.querySelector('[data-scrim]');
const toast = document.querySelector('.toast');
const themes = ['auto', 'light', 'dark'];

const svgCopy = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const svgCheck = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

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

document.querySelectorAll('[data-copy-link]').forEach((button) => button.addEventListener('click', () => {
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

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'code-copy';
  button.setAttribute('aria-label', 'Copy code');
  button.innerHTML = svgCopy;
  button.addEventListener('click', async () => {
    const code = pre.querySelector('code');
    if (!await copy((code ?? pre).innerText, 'Code copied')) return;
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
  wrapper.append(button);
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeLabel);
updateThemeLabel();
