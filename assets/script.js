// Mobile nav toggle
(function () {
  const button = document.getElementById('mobile-menu-button');
  const links = document.getElementById('nav-links');
  const nav = document.getElementById('nav');
  const closeButton = document.querySelector('.nav__close');
  if (!button || !links || !nav) return;
  
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    
    // Prevent body scroll when menu is open
    if (!expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !links.contains(e.target)) {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking close button
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      button.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
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


