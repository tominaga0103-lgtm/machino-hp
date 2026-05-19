// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// Mark active nav link based on current page
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && href.split('#')[0] === currentPage) a.classList.add('active');
  if ((currentPage === '' || currentPage === 'index.html') && href === 'index.html') a.classList.add('active');
});

// Contact form handler
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate required fields
    const required = contactForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#ef4444';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;
    // Simulate submission (replace with actual endpoint)
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = '送信中...';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('visible');
    }, 900);
  });
}

// Simple fade-in on scroll
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feat-card, .svc-card, .work-card, .reason-card, .flow-step, .recruit-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Works filter (works.html)
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.work-card-full').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
