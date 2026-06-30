'use strict';

const themeToggle = document.querySelector('[data-theme-toggle]');
const themeLabel = document.querySelector('[data-theme-label]');
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

const getStoredTheme = () => {
  try {
    return window.localStorage.getItem('portfolio-theme');
  } catch {
    return null;
  }
};

const storeTheme = (theme) => {
  try {
    window.localStorage.setItem('portfolio-theme', theme);
  } catch {
    return;
  }
};

const setTheme = (theme) => {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  const isLight = nextTheme === 'light';

  root.dataset.theme = nextTheme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  }

  if (themeLabel) {
    themeLabel.textContent = isLight ? 'Dark' : 'Light';
  }
};

setTheme(getStoredTheme() || (prefersLight ? 'light' : 'dark'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';

    storeTheme(nextTheme);
    setTheme(nextTheme);
  });
}

const navLinks = document.querySelectorAll('.site-nav a, .site-footer a[href="#top"], .brand');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document
  .querySelectorAll('.why-card, .experience-card, .project-card, .case-study, .skills-grid article, .education-card, .contact-panel')
  .forEach((element) => observer.observe(element));
