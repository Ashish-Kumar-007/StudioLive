import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ThreeBackground } from './components/ThreeBackground';
import { ApertureLoader } from './components/ApertureLoader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Events } from './pages/Events';
import { Team } from './pages/Team';
import { Book } from './pages/Book';

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

    // Initial aperture open sweep on load
    const radiusObj = { value: 150 };
    gsap.to(radiusObj, {
      value: 0,
      duration: 1.6,
      ease: 'power4.inOut',
      onUpdate: () => {
        document.documentElement.style.setProperty('--aperture-radius', `${radiusObj.value}%`);
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);

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

      {/* Shutter Shutter Screen Overlay */}
      <ApertureLoader />

      {/* Header Sticky Navigation */}
      <Navbar activePage={activePage} onChangePage={handlePageChange} />

      {/* Core Virtual Content Container */}
      <main className="relative z-10 w-full pt-[85px]">
        {renderActivePage()}
      </main>

      {/* Brand Footer */}
      <Footer onChangePage={handlePageChange} />

    </div>
  );
};
