const root = document.documentElement;
const themeButton = document.querySelector('[data-theme]');
const menuButton = document.querySelector('[data-menu]');
const scrim = document.querySelector('[data-scrim]');
const toast = document.querySelector('.toast');
const themes = ['auto', 'light', 'dark'];

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
  await navigator.clipboard.writeText(value);
  notify(message);
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
  if (!response.ok) throw new Error(`Failed to load skill: ${response.status}`);
  copy(await response.text(), 'Skill copied');
}));

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeLabel);
updateThemeLabel();
