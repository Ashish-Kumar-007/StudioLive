import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ThreeBackground } from './components/ThreeBackground';
import { ApertureLoader } from './components/ApertureLoader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
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

  // 2. High-Performance Dual Spotlight HTML5 Canvas Frame Loop
  useEffect(() => {
    let animFrameId: number;
    const canvas = document.getElementById('spotlight-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Eased coordinates & opacity local states
    let currentLeftX = window.innerWidth * 0.35;
    let currentLeftY = window.innerHeight * 0.5;
    let currentRightX = window.innerWidth * 0.65;
    let currentRightY = window.innerHeight * 0.5;
    let currentOpacity = 0;

    const solveDualSpotlights = () => {
      const sections = document.querySelectorAll('.reveal-section');
      if (sections.length === 0) return;

      let activeSec: Element | null = null;
      let minDistance = Infinity;

      // Detect section closest to viewport vertical center
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const secCenter = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const distance = Math.abs(secCenter - viewCenter);
        if (distance < minDistance) {
          minDistance = distance;
          activeSec = sec;
        }
      });

      // Target opacity scales to 0 if we scroll past all sections or if no section is active near viewport center
      let targetOpacity = 0;
      if (activeSec && minDistance < window.innerHeight * 0.75) {
        targetOpacity = 1;
      }

      // Smoothly interpolate opacity state with 0.08 easing factor
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      if (activeSec) {
        const rect = (activeSec as Element).getBoundingClientRect();
        const secCenterX = rect.left + rect.width / 2;
        const secCenterY = rect.top + rect.height / 2;

        // Stage-setup dual offset targets (spots always synchronize to the same active section in absolute unison)
        const targetLeftX = secCenterX - 75;
        const targetLeftY = secCenterY;
        const targetRightX = secCenterX + 75;
        const targetRightY = secCenterY;

        // Fluid 0.08 eased coordinate interpolation
        currentLeftX += (targetLeftX - currentLeftX) * 0.08;
        currentLeftY += (targetLeftY - currentLeftY) * 0.08;
        currentRightX += (targetRightX - currentRightX) * 0.08;
        currentRightY += (targetRightY - currentRightY) * 0.08;

        // Ensure canvas matches screen bounds perfectly
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Draw Global Semi-Transparent Dark Mask Overlay (~88% opacity near-black)
          ctx.fillStyle = 'rgba(7, 9, 14, 0.88)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 2. Cut holes only if there is visible spotlight alpha
          if (currentOpacity > 0.001) {
            ctx.globalCompositeOperation = 'destination-out';

            const radius = 300; // Constant spotlight size throughout scroll

            // 3. Draw Left spotlight radial gradient
            const leftGrad = ctx.createRadialGradient(
              currentLeftX, currentLeftY, 0,
              currentLeftX, currentLeftY, radius
          );
            leftGrad.addColorStop(0, `rgba(0, 0, 0, ${currentOpacity})`);
            leftGrad.addColorStop(0.55, `rgba(0, 0, 0, ${currentOpacity})`);
            leftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = leftGrad;
            ctx.beginPath();
            ctx.arc(currentLeftX, currentLeftY, radius, 0, Math.PI * 2);
            ctx.fill();

            // 4. Draw Right spotlight radial gradient
            const rightGrad = ctx.createRadialGradient(
              currentRightX, currentRightY, 0,
              currentRightX, currentRightY, radius
            );
            rightGrad.addColorStop(0, `rgba(0, 0, 0, ${currentOpacity})`);
            rightGrad.addColorStop(0.55, `rgba(0, 0, 0, ${currentOpacity})`);
            rightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = rightGrad;
            ctx.beginPath();
            ctx.arc(currentRightX, currentRightY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Reset composite mode standardly
            ctx.globalCompositeOperation = 'source-over';
          }
        }

        // 5. Update CSS custom variables for stage-light rays, halos, and global opacity
        document.documentElement.style.setProperty('--stage-opacity', `${currentOpacity}`);
        document.documentElement.style.setProperty('--spotlight-left-x', `${currentLeftX}px`);
        document.documentElement.style.setProperty('--spotlight-left-y', `${currentLeftY}px`);
        document.documentElement.style.setProperty('--spotlight-right-x', `${currentRightX}px`);
        document.documentElement.style.setProperty('--spotlight-right-y', `${currentRightY}px`);

        // Compute left ray trigonometry originating from bottom-left of top area (0, 85px)
        const dxL = currentLeftX - 0;
        const dyL = currentLeftY - 85;
        const lenL = Math.sqrt(dxL * dxL + dyL * dyL);
        const angL = Math.atan2(dyL, dxL) * (180 / Math.PI);
        document.documentElement.style.setProperty('--beam-left-length', `${lenL}px`);
        document.documentElement.style.setProperty('--beam-left-angle', `${angL}deg`);

        // Compute right ray trigonometry originating from bottom-right of top area (window.innerWidth, 85px)
        const dxR = currentRightX - window.innerWidth;
        const dyR = currentRightY - 85;
        const lenR = Math.sqrt(dxR * dxR + dyR * dyR);
        const angR = Math.atan2(dyR, dxR) * (180 / Math.PI);
        document.documentElement.style.setProperty('--beam-right-length', `${lenR}px`);
        document.documentElement.style.setProperty('--beam-right-angle', `${angR}deg`);
      }
    };

    const loop = () => {
      solveDualSpotlights();
      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [activePage]);

  // 3. Camera Aperture Lens Shutter Routing Trigger
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
        return <Home onNavigate={handlePageChange} />;
      case 'story':
        return <Story onChangePage={handlePageChange} />;
      case 'events':
        return <Events onChangePage={handlePageChange} />;
      case 'team':
        return <Team />;
      case 'book':
        return <Book />;
      default:
        return <Home onNavigate={handlePageChange} />;
    }
  };

  return (
    <div id="app-viewport" className="relative z-10 w-full min-h-screen">

      {/* 3D WebGL Canvas Parallax Layer */}
      <ThreeBackground targetCameraPos={targetCameraPos} />

      {/* High-Performance Canvas Stage Overlay cutting both spotlights */}
      <canvas id="spotlight-canvas" className="fixed inset-0 z-25 pointer-events-none" />

      {/* Top-Left Stage Light Ray */}
      <div className="stage-ray-left max-lg:hidden" />

      {/* Top-Right Stage Light Ray */}
      <div className="stage-ray-right max-lg:hidden" />

      {/* Top-Left Spotlight Halo ring */}
      <div className="spotlight-halo-left max-lg:hidden" />

      {/* Top-Right Spotlight Halo ring */}
      <div className="spotlight-halo-right max-lg:hidden" />

      {/* Shutter Shutter Screen Overlay */}
      <ApertureLoader onLoadingComplete={() => {}} />

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
