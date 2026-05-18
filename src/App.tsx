import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeBackground } from './components/ThreeBackground';
import { ApertureLoader } from './components/ApertureLoader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Events } from './pages/Events';
import { Team } from './pages/Team';
import { Book } from './pages/Book';

gsap.registerPlugin(ScrollTrigger);

const cameraPositions: Record<string, { x: number; y: number; z: number }> = {
  home: { x: 0, y: 0, z: 12 },
  story: { x: -6, y: 4, z: 10 },
  events: { x: 6, y: -4, z: 10 },
  team: { x: -6, y: -4, z: 10 },
  book: { x: 6, y: 4, z: 10 }
};

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [targetCameraPos, setTargetCameraPos] = useState(cameraPositions.home);

  // 3D Hinge Scroll Reveals & Parallax Background Zoom-Outs whenever the page panel loads
  useEffect(() => {
    // Small timeout to allow DOM content to fully mount
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        
        // 1. Auto-bind dynamic zoom-out triggers to every `.zoom-bg` background
        const bgElements = gsap.utils.toArray('.zoom-bg');
        bgElements.forEach((bg: any) => {
          const parent = bg.closest('section') || bg.parentElement;
          gsap.fromTo(bg,
            { scale: 1.25 },
            {
              scale: 1.0,
              scrollTrigger: {
                trigger: parent,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              }
            }
          );
        });

        // 2. Cinematic Section Zoom-Out Reveals on Scroll
        const sections = gsap.utils.toArray('.reveal-section');
        sections.forEach((sec: any) => {
          const content = sec.querySelector('.reveal-content') || sec;

          // Initial zoomed-in & transparent state
          gsap.set(content, {
            transformOrigin: 'center center',
            opacity: 0,
            scale: 1.25, // Start zoomed-in
            willChange: 'transform, opacity'
          });

          // Smooth scroll-driven zoom-out reveal trigger with projector lens tick
          gsap.to(content, {
            scrollTrigger: {
              trigger: sec,
              start: 'top 95%', // Starts fading in just as the section enters the bottom of the screen
              end: 'top 50%',   // Reaches full scale & opacity by mid-screen
              scrub: 1.2,       // Smooth scrubbing physics
              toggleActions: 'play none none reverse',
              onEnter: () => {
                // Flash the screen briefly to mimic a slide projector tick
                gsap.fromTo('.carousel-flash', 
                  { opacity: 0.22 },
                  { opacity: 0, duration: 0.2, ease: 'power2.out' }
                );
              }
            },
            opacity: 1,
            scale: 1.0,        // Zooms out to default size
            ease: 'power2.out',
          });
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [activePage]);

  // 1. Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Lock shutter closed initially so the photos deal out on top of the black mask
    document.documentElement.style.setProperty('--aperture-radius', '150%');

    return () => {
      lenis.destroy();
    };
  }, []);

  // initial loading finish handler
  const handleLoadingComplete = () => {
    const radiusObj = { value: 150 };
    gsap.to(radiusObj, {
      value: 0,
      duration: 1.6,
      ease: 'power4.inOut',
      onUpdate: () => {
        document.documentElement.style.setProperty('--aperture-radius', `${radiusObj.value}%`);
      }
    });
  };

  // 2. Camera Aperture Lens Shutter Routing Trigger
  const handlePageChange = (newPageId: string) => {
    if (newPageId === activePage) return;

    const radiusObj = { value: 0 };
    const closeTimeline = gsap.timeline({
      onComplete: () => {
        // Toggle the virtual page layout & glide Three.js target camera coordinates
        setActivePage(newPageId);
        setTargetCameraPos(cameraPositions[newPageId]);
        window.scrollTo(0, 0);

        // Open Shutter Shutter sweep
        const openRadiusObj = { value: 150 };
        gsap.to(openRadiusObj, {
          value: 0,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            document.documentElement.style.setProperty('--aperture-radius', `${openRadiusObj.value}%`);
          }
        });
      }
    });

    // Close Shutter
    closeTimeline.to(radiusObj, {
      value: 150,
      duration: 0.9,
      ease: 'power3.in',
      onUpdate: () => {
        document.documentElement.style.setProperty('--aperture-radius', `${radiusObj.value}%`);
      }
    });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home onChangePage={handlePageChange} />;
      case 'story':
        return <Story onChangePage={handlePageChange} />;
      case 'events':
        return <Events onChangePage={handlePageChange} />;
      case 'team':
        return <Team />;
      case 'book':
        return <Book />;
      default:
        return <Home onChangePage={handlePageChange} />;
    }
  };

  return (
    <div id="app-viewport" className="relative z-10 w-full min-h-screen">
      
      {/* 3D WebGL Canvas Parallax Layer */}
      <ThreeBackground targetCameraPos={targetCameraPos} />

      {/* Analog celluloid film grain moving noise */}
      <div className="film-grain" />

      {/* Projector click flash transition */}
      <div className="carousel-flash" />

      {/* 🎞️ FIXED PROJECTOR SIDEBAR (Left) */}
      <div className="projector-sidebar fixed left-0 top-0 h-screen w-[22%] z-40 bg-transparent flex flex-col justify-center items-center max-lg:hidden">
        
        {/* Retro Projector Reels Container */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-8">
          {/* Upper Reel */}
          <div className="absolute top-2 left-6 w-16 h-16 rounded-full border-2 border-dashed border-goldPrimary/30 flex items-center justify-center reel-spin-slow">
            <div className="w-12 h-[1px] bg-goldPrimary/30 absolute" />
            <div className="w-[1px] h-12 bg-goldPrimary/30 absolute" />
            <div className="w-3 h-3 rounded-full bg-goldPrimary/20 absolute" />
          </div>
          
          {/* Lower Reel */}
          <div className="absolute bottom-2 right-6 w-20 h-20 rounded-full border-2 border-dashed border-goldPrimary/30 flex items-center justify-center reel-spin-fast">
            <div className="w-16 h-[1px] bg-goldPrimary/30 absolute" />
            <div className="w-[1px] h-16 bg-goldPrimary/30 absolute" />
            <div className="w-4 h-4 rounded-full bg-goldPrimary/20 absolute" />
          </div>
          
          {/* Projector Body */}
          <div className="w-24 h-16 bg-surfaceDark border border-goldPrimary/20 rounded-lg z-10 flex items-center justify-center shadow-goldGlow/10 relative">
            {/* Projector dials */}
            <div className="w-2 h-2 rounded-full bg-goldPrimary/40 absolute bottom-2 left-2 animate-pulse" />
            <div className="w-3 h-3 rounded-full border border-goldPrimary/30 absolute bottom-2 left-6" />
            {/* Projector Lens with glowing pulsating focal point */}
            <div className="absolute -right-3 top-4 w-4 h-8 bg-goldPrimary/30 border border-goldPrimary/40 rounded-r-md flex items-center justify-center">
              <div className="w-2 h-5 bg-white/90 rounded-r-sm shadow-goldGlow animate-pulse" />
            </div>
          </div>
        </div>

        {/* Projector Indicators */}
        <div className="text-center font-mono text-[9px] tracking-[0.25em] text-goldPrimary/60 uppercase">
          <span className="text-saffronPrimary animate-ping inline-block mr-2 text-[7px] -translate-y-0.5">●</span>
          Projecting Film
        </div>
      </div>

      {/* 🔦 PROJECTOR LIGHT CONE BEAM */}
      <div className="fixed left-[22%] top-0 h-screen right-0 z-0 pointer-events-none overflow-hidden max-lg:left-0">
        <div className="projection-beam-cone" />
      </div>

      {/* Shutter Shutter Screen Overlay with Polaroid Cascade */}
      <ApertureLoader onLoadingComplete={handleLoadingComplete} />

      {/* Header Sticky Navigation */}
      <Navbar activePage={activePage} onChangePage={handlePageChange} />

      {/* Core Virtual Content Container shifted inside the projected space */}
      <main className="relative z-10 w-full lg:pl-[22%] pt-[85px] projected-screen">
        {renderActivePage()}
        
        {/* Brand Footer nested inside the projected offset */}
        <Footer onChangePage={handlePageChange} />
      </main>

    </div>
  );
};
