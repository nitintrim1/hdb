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

// Gallery Slider Functionality
(function () {
  const slider = document.querySelector('.gallery-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.gallery-slider__slide');
  const indicators = slider.querySelectorAll('.gallery-slider__indicator');
  const prevBtn = slider.querySelector('.gallery-slider__prev');
  const nextBtn = slider.querySelector('.gallery-slider__next');
  
  let currentSlide = 0;
  let autoPlayInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }
  
  // Function to go to previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }
  
  // Function to start auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  }
  
  // Function to stop auto-play
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  }
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  });
  
  // Pause auto-play on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
  
  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    }
  }
  
  // Start auto-play when page loads
  startAutoPlay();
  
  // Pause auto-play when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });
})();


