document.addEventListener('DOMContentLoaded', () => {
  // Navigation Background on Scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const target = document.querySelector(targetId) as HTMLElement;
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  mobileToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    // For a real mobile menu, we'd add more styling here, 
    // but this is the functional toggle.
  });
});
