import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Team from './pages/Team';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance transition on first mount
  useEffect(() => {
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none';
          }
        }
      );
    }

    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  // GSAP scroll trigger re-init whenever page contents change
  useEffect(() => {
    // Scroll to top instantly on page change (tucked under the cover transition)
    window.scrollTo(0, 0);

    // Give react time to render DOM, then initialize ScrollTrigger revelations
    setTimeout(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 3D Testimonials stagger swing!
      const testimonialCards = document.querySelectorAll('.testimonial-card-3d');
      if (testimonialCards.length > 0) {
        gsap.fromTo(testimonialCards,
          {
            opacity: 0,
            rotationY: -45,
            rotationX: 15,
            z: -400,
            scale: 0.85
          },
          {
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.15,
            clearProps: 'all',
            scrollTrigger: {
              trigger: '.testimonials-section-3d',
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, 100);

  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;

    if (containerRef.current && overlayRef.current) {
      const tl = gsap.timeline();

      // 1. Enable glossy flare sweep display
      overlayRef.current.style.display = 'block';

      // 2. Shrink active page container backward and tilt in Y-axis
      tl.to(containerRef.current, {
        scale: 0.85,
        rotationY: -45,
        z: -600,
        opacity: 0.2,
        duration: 0.6,
        ease: 'power2.in',
        transformPerspective: 1600,
        transformOrigin: '50% 50%',
        onComplete: () => {
          // 3. Switch React page state under the cover tilt
          setCurrentPage(page);

          // 4. Animate new page swing into view from opposite rotation
          gsap.fromTo(containerRef.current,
            {
              scale: 0.85,
              rotationY: 45,
              z: -600,
              opacity: 0.2,
            },
            {
              scale: 1,
              rotationY: 0,
              z: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              transformPerspective: 1600,
              transformOrigin: '50% 50%',
            }
          );
        }
      });

      // 5. Simultaneously run the glossy reflection sweep to look like gallery photograph lighting!
      gsap.fromTo(overlayRef.current,
        {
          x: '-100%',
          opacity: 0
        },
        {
          x: '100%',
          opacity: 0.8,
          duration: 1.3,
          ease: 'power2.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
              overlayRef.current.style.opacity = '0';
            }
          }
        }
      );
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'events':
        return <Events />;
      case 'team':
        return <Team />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-background text-primary font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">
      {/* Dynamic GSAP 3D Glossy Light Reflection Overlay */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0) 100%)',
          width: '200%',
          height: '100%',
          transform: 'translateX(-100%) skewX(-30deg)'
        }}
      />

      {/* Shared Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* 3D Viewport Wrapper */}
      <div className="perspective-container flex-grow overflow-hidden flex flex-col">
        {/* Active Page View */}
        <main ref={containerRef} className="flex-grow pt-16 origin-center">
          {renderPage()}
        </main>
      </div>

      {/* Floating WhatsApp desk */}
      <WhatsAppWidget />

      {/* Shared Modular Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
