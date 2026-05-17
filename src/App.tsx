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
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
    }
  }, []);

  // GSAP scroll trigger re-init whenever page contents change
  useEffect(() => {
    // Scroll to top instantly on page change
    window.scrollTo(0, 0);

    // Subtle page entrance fade + slide upward
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

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
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, 100);

  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;

    if (overlayRef.current) {
      // 1. Show overlay
      overlayRef.current.style.display = 'block';
      
      // 2. Animate overlay to solid covering
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          // 3. Switch React page state under the cover
          setCurrentPage(page);
          
          // 4. Animate overlay back to transparency
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              if (overlayRef.current) overlayRef.current.style.display = 'none';
            }
          });
        }
      });
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
      {/* Dynamic GSAP Page Transition Overlay */}
      <div 
        ref={overlayRef} 
        className="page-transition-overlay fixed inset-0 bg-primary z-[9999] pointer-events-none opacity-100"
      />

      {/* Shared Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Active Page View */}
      <main ref={containerRef} className="flex-grow pt-16">
        {renderPage()}
      </main>

      {/* Floating WhatsApp desk */}
      <WhatsAppWidget />

      {/* Shared Modular Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
