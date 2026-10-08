const pageLoader = document.querySelector('.page-loader');

window.addEventListener('load', () => {
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('is-hidden');
    }, 2000);
  }
});

const meteorLayer = document.querySelector('.meteor-layer');
const introSection = document.querySelector('.hero');

if (meteorLayer && introSection) {
  const introObserver = new IntersectionObserver(([entry]) => {
    meteorLayer.classList.toggle('is-active', !entry.isIntersecting);
  });

  introObserver.observe(introSection);
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const cvDownload = document.querySelector('.cv-button-secondary[download]');
if (cvDownload) {
  cvDownload.addEventListener('click', (event) => {
    event.preventDefault();

    const downloadLink = document.createElement('a');
    downloadLink.href = cvDownload.href;
    downloadLink.download = cvDownload.download;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  });
}

const siteCursor = document.querySelector('.site-cursor');
const canUseCustomCursor = window.matchMedia(
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
);

if (siteCursor && canUseCustomCursor.matches) {
  document.body.classList.add('cursor-enabled');

  window.addEventListener('pointermove', (event) => {
    siteCursor.style.left = `${event.clientX}px`;
    siteCursor.style.top = `${event.clientY}px`;
    siteCursor.classList.add('is-visible');

    const target = event.target instanceof Element ? event.target : null;
    siteCursor.classList.toggle(
      'is-hovering',
      Boolean(target?.closest('a, button, input, textarea, select, [role="button"]'))
    );
  });

  window.addEventListener('pointerdown', () => siteCursor.classList.add('is-pressed'));
  window.addEventListener('pointerup', () => siteCursor.classList.remove('is-pressed'));
  window.addEventListener('pointerleave', () => siteCursor.classList.remove('is-visible'));
  window.addEventListener('pointerenter', () => siteCursor.classList.add('is-visible'));
}