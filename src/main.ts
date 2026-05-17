import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  // GSAP Page Load Animation
  const tl = gsap.timeline();
  tl.to('.page-transition-overlay', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      // Hide completely to ensure it never blocks clicks
      const overlay = document.querySelector('.page-transition-overlay') as HTMLElement;
      if (overlay) overlay.style.display = 'none';
    }
  })
  .from('.page-content', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    clearProps: 'all'
  }, "-=0.4");

  // GSAP Scroll Animations (Replacing Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    gsap.fromTo(el, 
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Page Exit Transitions
  const navLinks = document.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target && !target.startsWith('#') && target !== window.location.pathname) {
        e.preventDefault();
        
        const overlay = document.querySelector('.page-transition-overlay') as HTMLElement;
        if (overlay) overlay.style.display = 'block';

        gsap.to('.page-transition-overlay', {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            window.location.href = target;
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-links');
  
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
});
