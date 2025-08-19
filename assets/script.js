// Mobile nav toggle
(function () {
  const button = document.getElementById('mobile-menu-button');
  const links = document.getElementById('nav-links');
  if (!button || !links) return;
  
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('is-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !links.contains(e.target)) {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }
  });
  
  // Close menu when clicking on a link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    });
  });
})();

// FAQ details behavior: close others when one opens (optional UX)
(function () {
  const list = document.querySelector('.faq-list');
  if (!list) return;
  list.addEventListener('toggle', (e) => {
    const target = e.target;
    if (target.tagName.toLowerCase() !== 'details' || !target.open) return;
    list.querySelectorAll('details.faq[open]').forEach((d) => {
      if (d !== target) d.open = false;
    });
  });
})();

// Smooth scroll for anchor links (offset handled by CSS sticky header)
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


