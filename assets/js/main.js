// Theme
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? 'light' : 'dark';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? 'light' : 'dark';
});

// Search
const searchInput = document.getElementById('search');
const cards = document.querySelectorAll('[data-searchable]');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const text = (card.getAttribute('data-searchable') || '').toLowerCase();
    const match = text.includes(query);
    card.classList.toggle('search-hidden', !match);
    if (match) visibleCount++;
  });

  // Show/hide empty state
  const emptyState = document.getElementById('empty-state');
  if (emptyState) {
    emptyState.classList.toggle('search-hidden', visibleCount > 0);
  }
});

// Copy to clipboard
function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.textContent = 'copied';
    showToast('Copied to clipboard');
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = 'copy';
    }, 1500);
  });
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const target = btn.getAttribute('data-copy-target');
    const text = target ? document.getElementById(target)?.textContent || '' : btn.getAttribute('data-copy') || '';
    if (text) copyText(btn, text);
  });
});

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Active nav link on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// Filter chips
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.getAttribute('data-filter');
    const group = chip.closest('.filters');

    // Toggle active within group
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    // Filter cards
    const targetCards = chip.closest('.section').querySelectorAll('.card');
    targetCards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(',');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('search-hidden', !show);
    });
  });
});

// Accordion
document.querySelectorAll('.accordion-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.parentElement.nextElementSibling;
    content.classList.toggle('open');
    toggle.textContent = content.classList.contains('open') ? '[-]' : '[+]';
  });
});

// Keyboard shortcut: '/' to focus search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.blur();
  }
});
