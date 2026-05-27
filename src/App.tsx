import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ApertureLoader } from './components/ApertureLoader';
import { ThreeBackground } from './components/ThreeBackground';
import { CursorEffect } from './components/CursorEffect';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { Pricing } from './components/Pricing';
import { BookingForm } from './components/BookingForm';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReelShorts } from './components/ReelShorts';
import { Award, Sparkles, Heart, Quote, Play, Calendar, Camera, Film, ArrowRight, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

class CinematicAmbientSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  start() {
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(5, this.ctx.currentTime);

      // Warm tanpura-like harmonically rich frequencies (A2, E3, A3, C#4)
      const freqs = [110, 165, 220, 277.18];
      
      freqs.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        osc.type = index % 2 === 0 ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        osc.detune.setValueAtTime((Math.random() * 2 - 1) * 8, this.ctx!.currentTime);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.setValueAtTime(0.08 / (index + 1), this.ctx!.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.filter!);
        osc.start();
        this.oscillators.push(osc);
      });

      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.gainNode.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 3.0);
    } catch (e) {
      console.warn('Failed to start cinematic ambient drone:', e);
    }
  }

  stop() {
    if (this.gainNode && this.ctx) {
      const currentVal = this.gainNode.gain.value;
      this.gainNode.gain.setValueAtTime(currentVal, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      const oscs = this.oscillators;
      const localLfo = this.lfo;
      const localCtx = this.ctx;
      setTimeout(() => {
        oscs.forEach(osc => { try { osc.stop(); } catch(e){} });
        try { localLfo?.stop(); } catch(e){}
        try { localCtx.close(); } catch(e){}
      }, 1300);
      this.oscillators = [];
      this.lfo = null;
      this.ctx = null;
      this.gainNode = null;
    }
  }
}

const ambientSynth = new CinematicAmbientSynth();

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<string>('home');
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroMedia = [
    { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-bride-and-groom-40156-large.mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroMedia.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      ambientSynth.stop();
    };
  }, []);

  const handleToggleSound = () => {
    if (isSoundPlaying) {
      ambientSynth.stop();
      setIsSoundPlaying(false);
    } else {
      ambientSynth.start();
      setIsSoundPlaying(true);
    }
  };
  const [targetY, setTargetY] = useState(window.innerHeight / 2);
  const [opacity, setOpacity] = useState(0.9);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for hovering spotlight targets
  const teamMemberRef1 = useRef<HTMLDivElement>(null);
  const teamMemberRef2 = useRef<HTMLDivElement>(null);
  const teamMemberRef3 = useRef<HTMLDivElement>(null);

  // 1. Lenis Smooth Scroll Setup
  useEffect(() => {
    if (isLoading) return;

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

    // Scroll tracker
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Dynamic Y tracking for spotlights based on viewport middle unless focused on elements
      if (activePage !== 'team') {
        const midY = window.innerHeight * 0.5 + window.scrollY * 0.05;
        setTargetY(Math.min(midY, window.innerHeight * 0.8));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, activePage]);

  // Adjust viewport size solvers
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loader handles its own cinematic audio — just transition the page
  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Switch View & Reset Scroll state
  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpacity(0.9);
  };

  // Sync 3D WebGL Camera position dynamically as user flips pages
  const getCameraPosition = () => {
    switch (activePage) {
      case 'home': return { x: 0, y: 0, z: 7.5 };
      case 'story': return { x: -3.5, y: 1.5, z: 9.5 };
      case 'events': return { x: 3.5, y: -1, z: 10.0 };
      case 'team': return { x: 0, y: 2, z: 9.0 };
      case 'book': return { x: 0, y: -2.5, z: 8.5 };
      default: return { x: 0, y: 0, z: 7.5 };
    }
  };

  // Interactive Spotlight tracking when hovering over Team Members
  const handleTeamMemberHover = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 + window.scrollY;
      setTargetY(centerY - window.scrollY);
    }
  };

  const handleTeamMemberLeave = () => {
    setTargetY(window.innerHeight / 2);
  };

  // 3D Parallax Tilt Card solver for Events Page
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.55,
      ease: 'power2.out',
    });
  };

  // Volumetric spotlight geometry alignment calculations
  const lx = 24;                        
  const cx = viewportWidth * 0.5;       
  const rx = viewportWidth - 24;        
  const tx = viewportWidth * 0.5;       

  const leftAngle = Math.atan2(targetY - 20, tx - lx) * (180 / Math.PI) - 90;
  const rightAngle = Math.atan2(targetY - 20, tx - rx) * (180 / Math.PI) - 90;

  return (
    <div className="w-full bg-[#07090E] text-textLight relative min-h-screen">
      
      {/* 📸 Custom Trailing Luxury Cursor */}
      <CursorEffect />

      {/* 🎬 Camera Shutter Iris Loader (overlays on top of page) */}
      {isLoading && <ApertureLoader onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <div className="iris-zoom-reveal">

          {/* 🎬 DUST & SCRATCH FILM GRAIN TEXTURE LAYER */}
          <div className="film-grain" />

          {/* 3D WebGL particle environment backdrop */}
          <ThreeBackground targetCameraPos={getCameraPosition()} />

          {/* Vignette backplate */}
          <div className="spotlight-overlay" />

          {/* 🎬 FLOATING INDIAN WEDDING BACKGROUND IMAGES (tactile drifting elements) */}
          <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden select-none">
            
            {/* Frame 1: Regal bride top-left (8%) */}
            <div className="floating-bg-frame drift-slow-1 max-md:hidden" style={{ top: '8%', left: '3%', width: '160px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=400" alt="Regal Bride" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 2: Sacred Henna hands top-right (16%) */}
            <div className="floating-bg-frame drift-slow-2 max-md:hidden" style={{ top: '16%', right: '3%', width: '180px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400" alt="Sacred Henna" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 3: Joyful Bride mid-left (26%) */}
            <div className="floating-bg-frame drift-slow-5 max-md:hidden" style={{ top: '26%', left: '1%', width: '170px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400" alt="Joyful Indian Bride" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 4: Royal Couple mid-right (36%) */}
            <div className="floating-bg-frame drift-slow-6 max-md:hidden" style={{ top: '36%', right: '2%', width: '180px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?q=80&w=400" alt="Royal Palace Couple" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 5: Sacred Rituals mid-left (48%) */}
            <div className="floating-bg-frame drift-slow-7 max-md:hidden" style={{ top: '48%', left: '4%', width: '160px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=400" alt="Sacred Ceremony" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 6: Mehendi hands mid-right (58%) */}
            <div className="floating-bg-frame drift-slow-8 max-md:hidden" style={{ top: '58%', right: '4%', width: '175px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1604336879180-2bd48ee893ee?q=80&w=400" alt="Mehendi Designs" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 7: Mandap sunset silhouette bottom-left (68%) */}
            <div className="floating-bg-frame drift-slow-3 max-md:hidden" style={{ top: '68%', left: '2%', width: '170px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400" alt="Palace Mandap" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 8: Palace twilight arches bottom-right (78%) */}
            <div className="floating-bg-frame drift-slow-4 max-md:hidden" style={{ top: '78%', right: '3%', width: '160px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=400" alt="Palace Twilight" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 9: Haldi Ceremony lower-left (86%) */}
            <div className="floating-bg-frame drift-slow-1 max-md:hidden" style={{ top: '86%', left: '3%', width: '180px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1611106211090-8f3c79eb8575?q=80&w=400" alt="Haldi Celebration" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

            {/* Frame 10: Bridal Ornaments bottom-right (94%) */}
            <div className="floating-bg-frame drift-slow-2 max-md:hidden" style={{ top: '94%', right: '2%', width: '160px' }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=400" alt="Bridal Jewelry" className="w-full h-auto object-cover rounded-lg desaturate-sweep font-sans" />
            </div>

          </div>

          {/* Volumetric smoke clouds */}
          <div className="fixed inset-0 pointer-events-none z-10 select-none opacity-40">
            <div className="smoke-cloud smoke-layer-1" style={{ top: `${targetY - 220}px`, left: `${tx - 280}px`, transition: 'top 0.15s ease-out, left 0.15s ease-out' }} />
            <div className="smoke-cloud smoke-layer-2" style={{ top: `${targetY - 120}px`, left: `${tx - 240}px`, transition: 'top 0.15s ease-out, left 0.15s ease-out' }} />
            <div className="smoke-cloud smoke-layer-3" style={{ top: `${targetY - 320}px`, left: `${tx - 320}px`, transition: 'top 0.15s ease-out, left 0.15s ease-out' }} />
          </div>

          <svg className="hidden">
            <defs>
              <filter id="smoke-distortion" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* 🎬 THREE SPOTLIGHT FIXTURES */}
          <div className="spotlight-fixture spotlight-fixture-left" style={{ left: `${lx - 16}px` }}>
            <div className="fixture-arm" />
            <div className="fixture-head-rotator" style={{ transform: `rotate(${leftAngle}deg)`, transition: 'transform 0.12s ease-out' }}>
              <div className="fixture-head" /><div className="fixture-lens" />
            </div>
          </div>
          
          <div className="spotlight-fixture spotlight-fixture-center" style={{ left: `${cx - 16}px` }}>
            <div className="fixture-arm" />
            <div className="fixture-head-rotator">
              <div className="fixture-head" />
              <div className="fixture-lens animate-pulse" style={{ animationDuration: '3.5s' }} />
            </div>
          </div>

          <div className="spotlight-fixture spotlight-fixture-right" style={{ right: `${viewportWidth - rx - 16}px` }}>
            <div className="fixture-arm" />
            <div className="fixture-head-rotator" style={{ transform: `rotate(${rightAngle}deg)`, transition: 'transform 0.12s ease-out' }}>
              <div className="fixture-head" /><div className="fixture-lens" />
            </div>
          </div>

          {/* 🎬 VOLUMETRIC LIGHT BEAMS */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-10 select-none transition-opacity duration-500 ease-in-out" style={{ opacity }}>
            <defs>
              <linearGradient id="left-beam-grad" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="35%" stopColor="#fffbf2" stopOpacity="0.12" />
                <stop offset="70%" stopColor="#fffbf2" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#fffbf2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="center-beam-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                <stop offset="35%" stopColor="#fffbf2" stopOpacity="0.14" />
                <stop offset="70%" stopColor="#fffbf2" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#fffbf2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="right-beam-grad" x1="100%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="35%" stopColor="#fffbf2" stopOpacity="0.12" />
                <stop offset="70%" stopColor="#fffbf2" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#fffbf2" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="pool-grad">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="30%" stopColor="#fffbf2" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#fffbf2" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#fffbf2" stopOpacity="0" />
              </radialGradient>
              <filter id="beam-blur-outer"><feGaussianBlur stdDeviation="24" /></filter>
              <filter id="beam-blur-inner"><feGaussianBlur stdDeviation="10" /></filter>
            </defs>

            <polygon points={`${lx},24 ${tx - 240},${targetY} ${tx + 240},${targetY}`} fill="url(#left-beam-grad)" filter="url(#beam-blur-outer)" style={{ transition: 'points 0.12s ease-out' }} />
            <polygon points={`${lx},24 ${tx - 110},${targetY} ${tx + 110},${targetY}`} fill="url(#left-beam-grad)" filter="url(#beam-blur-inner)" style={{ transition: 'points 0.12s ease-out' }} />

            <polygon points={`${cx},24 ${tx - 220},${targetY} ${tx + 220},${targetY}`} fill="url(#center-beam-grad)" filter="url(#beam-blur-outer)" style={{ transition: 'points 0.12s ease-out' }} />
            <polygon points={`${cx},24 ${tx - 100},${targetY} ${tx + 100},${targetY}`} fill="url(#center-beam-grad)" filter="url(#beam-blur-inner)" style={{ transition: 'points 0.12s ease-out' }} />

            <polygon points={`${rx},24 ${tx - 240},${targetY} ${tx + 240},${targetY}`} fill="url(#right-beam-grad)" filter="url(#beam-blur-outer)" style={{ transition: 'points 0.12s ease-out' }} />
            <polygon points={`${rx},24 ${tx - 110},${targetY} ${tx + 110},${targetY}`} fill="url(#right-beam-grad)" filter="url(#beam-blur-inner)" style={{ transition: 'points 0.12s ease-out' }} />

            <ellipse cx={tx} cy={targetY} rx="250" ry="60" fill="url(#pool-grad)" filter="url(#beam-blur-outer)" style={{ cy: `${targetY}px`, transition: 'cy 0.12s ease-out' }} />
          </svg>

          {/* Luxury Header Navigation */}
          <Navbar activePage={activePage} onChangePage={handlePageChange} />

          {/* ═══════════════════════════════════════════
             VIEW A: HOME PAGE
             ═══════════════════════════════════════════ */}
          {activePage === 'home' && (
            <div className="animate-fadeIn">
              
              {/* Cinematic Hero */}
              <section className="content-section min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative z-20">
                {/* Netflix-style trailer crossfader slideshow */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {heroMedia.map((media, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        heroSlide === idx ? 'opacity-40' : 'opacity-0'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={media.url} />
                      ) : (
                        <img className="w-full h-full object-cover" src={media.url} alt="Royal Palace Wedding Frame" />
                      )}
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/30 via-[#07090E]/75 to-[#07090E]" />
                </div>

                <div className="max-w-4xl relative z-10 mt-10">
                  <div className="flex flex-col items-center mb-8">
                    <div className="inline-block mb-3 px-5 py-2 rounded-full border border-goldPrimary/20 bg-goldPrimary/5 text-goldPrimary text-[10px] font-bold tracking-[0.25em] uppercase font-mono shadow-goldGlow/25">
                      Scene 01 // Palace Weddings & Shubh Muhurat
                    </div>
                    <span className="text-[10px] tracking-[0.3em] font-mono text-saffronPrimary uppercase font-bold animate-pulse">
                      ★ Only 12 High-Status Palace Commissions Accepted for 2026 Season ★
                    </span>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] font-serif text-white">
                    Studio<span className="text-gold-gradient font-black">Live</span>
                  </h1>
                  
                  <p className="text-base md:text-xl text-textDim max-w-2xl mx-auto mb-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-relaxed font-serif italic">
                    "We do not document events; we paint heritage love stories." <br/>
                    <span className="text-xs font-sans tracking-[0.08em] text-textDim/70 block mt-3 font-normal not-italic">
                      Premium desaturated golden editorial cinematography for luxury Indian celebrations.
                    </span>
                  </p>

                  <div className="flex justify-center items-center">
                    <button onClick={() => handlePageChange('book')} className="btn-gold shadow-goldGlow hover:scale-105 active:scale-95 transform transition-all duration-300 font-bold uppercase tracking-widest text-xs px-12 py-5 rounded-full cursor-pointer">
                      Reserve Shubh Muhurat Dates
                    </button>
                  </div>
                </div>
              </section>

              {/* Teaser About Segment */}
              <section className="content-section py-24 px-[5%] text-left relative z-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative h-[400px] rounded-3xl overflow-hidden border border-goldPrimary/15 shadow-stage-card bg-surfaceDark" data-cursor="view">
                    <img src="https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?q=80&w=800" alt="Ashish Kumar" className="w-full h-full object-cover desaturate-sweep" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgDark to-transparent" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-saffronPrimary uppercase font-bold block mb-2">The Genesis</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Philosophy of Light & Raw Emotion</h2>
                    <p className="text-textDim text-sm md:text-base leading-relaxed mb-6">
                      Founded along the heritage arches of Udaipur, StudioLive was built to redefine destination wedding cinematography. We believe that family milestones deserve elite cinema standards.
                    </p>
                    <button onClick={() => handlePageChange('story')} className="text-xs font-semibold uppercase text-goldPrimary flex items-center gap-2 tracking-[0.1em] hover:translate-x-1.5 transition-transform duration-300">
                      Learn Our Story <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Timeline Journey */}
              <Experience />

              {/* Visual Masonry Portfolio Showcase */}
              <Portfolio />

              {/* Cinematic Wedding Reels (Instagram-style interactive vertical reel gallery) */}
              <ReelShorts />

              {/* 3D Testimonials */}
              <section className="content-section py-24 px-[5%] max-w-[1200px] mx-auto relative z-20">
                <div className="text-center mb-16">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">Words of Legacy</p>
                  <h2 className="font-serif text-5xl md:text-6xl text-white">Reviews from the Cast</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
                  <div className="glass-panel p-8 rounded-[30px] flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-goldPrimary/20 hover:scale-103">
                    <Quote className="w-6 h-6 text-goldPrimary/20 mb-4" />
                    <p className="font-serif italic text-textLight mb-6">"StudioLive captured the soul of our wedding. They photographed the most intimate, tearful glances perfectly without staging."</p>
                    <div><h4 className="font-bold text-xs uppercase text-goldPrimary">Neha &amp; Siddharth</h4><span className="text-[9px] text-textDim font-mono">Udaipur Chapter</span></div>
                  </div>
                  <div className="glass-panel p-8 rounded-[30px] border-goldPrimary/30 flex flex-col justify-between shadow-goldGlow transition-all duration-300 hover:scale-105">
                    <Quote className="w-6 h-6 text-goldPrimary/35 mb-4" />
                    <p className="font-serif italic text-textLight mb-6">"The cinematic film made our entire family cry. It felt like watching a Hollywood movie starring our own heritage. Absolute visual mastery!"</p>
                    <div><h4 className="font-bold text-xs uppercase text-goldPrimary">Pooja &amp; Karan</h4><span className="text-[9px] text-textDim font-mono">Jaipur Chapter</span></div>
                  </div>
                  <div className="glass-panel p-8 rounded-[30px] flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-goldPrimary/20 hover:scale-103">
                    <Quote className="w-6 h-6 text-goldPrimary/20 mb-4" />
                    <p className="font-serif italic text-textLight mb-6">"Their absolute lighting science and virtual production sessions are unparalleled. The Italian handcrafted book is an absolute masterpiece."</p>
                    <div><h4 className="font-bold text-xs uppercase text-goldPrimary">Riya &amp; Vikram</h4><span className="text-[9px] text-textDim font-mono">Jaisalmer Chapter</span></div>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* ═══════════════════════════════════════════
             VIEW B: OUR STORY PAGE
             ═══════════════════════════════════════════ */}
          {activePage === 'story' && (
            <div className="animate-fadeIn">
              <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto text-left relative z-20">
                
                {/* Title */}
                <div className="text-center mb-20">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">Born out of Love</p>
                  <h2 className="font-serif text-5xl md:text-6xl text-white">Our Story &amp; Heritage</h2>
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto mt-4" />
                </div>

                {/* Section 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                  <div>
                    <h3 className="font-serif text-4xl mb-6 text-goldPrimary">Philosophy of Light</h3>
                    <p className="text-textDim text-base leading-relaxed mb-6">
                      Founded along the banks of Udaipur, StudioLive was built to redefine wedding cinematography. Indian weddings aren't just events; they are beautiful, multi-generation tapestries of colors, rituals, and emotional ties. We approach every wedding with deep cultural reverence.
                    </p>
                    <p className="text-textDim text-base leading-relaxed">
                      Our creative team is composed of photographers, lighting scientists, and Hollywood-grade editors who understand how to harness natural Indian golden hours, dynamic lighting, and unprompted candid tears.
                    </p>
                  </div>
                  <div className="h-[450px] max-md:h-[300px] bg-surfaceDark/65 border border-goldPrimary/12 rounded-[30px] overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600" alt="Refraction" className="w-full h-full object-cover desaturate-sweep" />
                  </div>
                </div>

                {/* Section 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
                  <div className="lg:order-2">
                    <h3 className="font-serif text-4xl mb-6 text-goldPrimary">The Virtual Production Standard</h3>
                    <p className="text-textDim text-base leading-relaxed mb-6">
                      We are pioneers in virtual production pipelines, combining realistic physical sets with 3D projection rendering. This unique fusion allows us to craft fine-art creative portraits that look like epic cinematic paintings.
                    </p>
                    <p className="text-textDim text-base leading-relaxed">
                      Every print goes through strict color grading chemistry and is preserved in custom walnut casing. Your heritage stays vivid for generations.
                    </p>
                  </div>
                  <div className="h-[450px] max-md:h-[300px] bg-surfaceDark/65 border border-goldPrimary/12 rounded-[30px] overflow-hidden shadow-2xl lg:order-1">
                    <img src="https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?q=80&w=600" alt="Setup" className="w-full h-full object-cover desaturate-sweep" />
                  </div>
                </div>

                <div className="text-center mt-20">
                  <button onClick={() => handlePageChange('book')} className="btn-gold font-bold tracking-widest uppercase py-4 px-10 rounded-full shadow-goldGlow cursor-pointer">
                    WhatsApp Shubh Muhurat Check <Calendar size={15} className="ml-2 inline" />
                  </button>
                </div>

              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════
             VIEW C: EVENTS PAGE
             ═══════════════════════════════════════════ */}
          {activePage === 'events' && (
            <div className="animate-fadeIn">
              <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto text-left relative z-20">
                
                {/* Title */}
                <div className="text-center mb-20">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">Visual Offerings</p>
                  <h2 className="font-serif text-5xl md:text-6xl text-white">Events We Cover</h2>
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto mt-4" />
                </div>

                <p className="text-center text-textDim text-lg max-w-[700px] mx-auto mb-[60px] leading-relaxed">
                  Whether it is a regal palace union in Rajasthan, an intimate hill station pre-wedding, or high-fashion commercial campaigns, we bring our cinematic lens to your biggest days.
                </p>

                {/* Offerings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Wedding */}
                  <div 
                    onClick={() => handlePageChange('book')}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="bg-surfaceDark/60 border border-goldPrimary/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="h-[260px] relative overflow-hidden pointer-events-none">
                      <img src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600" alt="Regal Wedding" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                      <div className="absolute bottom-5 left-5 w-10 h-10 rounded-full bg-saffronPrimary/10 border border-saffronPrimary/35 flex items-center justify-center text-saffronPrimary"><Camera size={18} /></div>
                    </div>
                    <div className="p-8 pointer-events-none">
                      <h3 className="font-serif text-2xl text-white mb-3">Regal Weddings</h3>
                      <p className="text-textDim text-sm mb-5 leading-relaxed">Comprehensive 8K documentation of grand multi-day Indian wedding celebrations, from structural palace rituals to candid emotional sweeps.</p>
                      <div className="text-[11px] font-mono tracking-widest text-goldPrimary uppercase flex items-center gap-2">Book This Offering <ArrowRight size={14} /></div>
                    </div>
                  </div>

                  {/* Pre-wedding */}
                  <div 
                    onClick={() => handlePageChange('book')}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="bg-surfaceDark/60 border border-goldPrimary/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="h-[260px] relative overflow-hidden pointer-events-none">
                      <img src="https://images.unsplash.com/photo-1595878715977-2e8f8df6392e?q=80&w=600" alt="Pre-wedding" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                      <div className="absolute bottom-5 left-5 w-10 h-10 rounded-full bg-saffronPrimary/10 border border-saffronPrimary/35 flex items-center justify-center text-saffronPrimary"><Sparkles size={18} /></div>
                    </div>
                    <div className="p-8 pointer-events-none">
                      <h3 className="font-serif text-2xl text-white mb-3">Pre-Wedding Shoots</h3>
                      <p className="text-textDim text-sm mb-5 leading-relaxed">Cinematic, sun-kissed twilight pre-wedding visual showreels captured in breathtaking geographic landmarks and lakeshores.</p>
                      <div className="text-[11px] font-mono tracking-widest text-goldPrimary uppercase flex items-center gap-2">Book This Offering <ArrowRight size={14} /></div>
                    </div>
                  </div>

                  {/* Creative Portraits */}
                  <div 
                    onClick={() => handlePageChange('book')}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="bg-surfaceDark/60 border border-goldPrimary/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="h-[260px] relative overflow-hidden pointer-events-none">
                      <img src="https://images.unsplash.com/photo-1597157639073-69284ac0f8b2?q=80&w=600" alt="Creative Portraits" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                      <div className="absolute bottom-5 left-5 w-10 h-10 rounded-full bg-saffronPrimary/10 border border-saffronPrimary/35 flex items-center justify-center text-saffronPrimary"><Camera size={18} /></div>
                    </div>
                    <div className="p-8 pointer-events-none">
                      <h3 className="font-serif text-2xl text-white mb-3">Creative Portfolios</h3>
                      <p className="text-textDim text-sm mb-5 leading-relaxed">High-end visual portfolios and fine-art styling shoots combining physical lighting controls and modern virtual sets.</p>
                      <div className="text-[11px] font-mono tracking-widest text-goldPrimary uppercase flex items-center gap-2">Book This Offering <ArrowRight size={14} /></div>
                    </div>
                  </div>

                  {/* Cinema Films */}
                  <div 
                    onClick={() => handlePageChange('book')}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="bg-surfaceDark/60 border border-goldPrimary/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="h-[260px] relative overflow-hidden pointer-events-none">
                      <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600" alt="Cinematic Films" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                      <div className="absolute bottom-5 left-5 w-10 h-10 rounded-full bg-saffronPrimary/10 border border-saffronPrimary/35 flex items-center justify-center text-saffronPrimary"><Film size={18} /></div>
                    </div>
                    <div className="p-8 pointer-events-none">
                      <h3 className="font-serif text-2xl text-white mb-3">Cinematic Films</h3>
                      <p className="text-textDim text-sm mb-5 leading-relaxed">Theatrical editing, bespoke scoring, and narrative-driven storytelling that encapsulates the heart of your heritage.</p>
                      <div className="text-[11px] font-mono tracking-widest text-goldPrimary uppercase flex items-center gap-2">Book This Offering <ArrowRight size={14} /></div>
                    </div>
                  </div>

                </div>

              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════
             VIEW D: TEAM PAGE
             ═══════════════════════════════════════════ */}
          {activePage === 'team' && (
            <div className="animate-fadeIn">
              <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto text-left relative z-20">
                
                {/* Title */}
                <div className="text-center mb-20">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">The Visionaries</p>
                  <h2 className="font-serif text-5xl md:text-6xl text-white">Our Creative Leaders</h2>
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto mt-4" />
                </div>

                <p className="text-center text-textDim text-lg max-w-[700px] mx-auto mb-16 leading-relaxed">
                  Behind every visual record is an elite squad of cinematographers, color scientists, and candid specialists committed to turning your special day into a living heritage showreel.
                </p>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  
                  {/* Member 1 */}
                  <div 
                    ref={teamMemberRef1}
                    onMouseEnter={() => handleTeamMemberHover(teamMemberRef1)}
                    onMouseLeave={handleTeamMemberLeave}
                    className="glass-panel p-10 text-center border border-goldPrimary/10 transition-all duration-300 hover:-translate-y-2 hover:border-goldPrimary/30 hover:shadow-goldGlow group cursor-pointer"
                  >
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-bgDark to-goldPrimary/20 border-2 border-goldPrimary shadow-lg flex items-center justify-center text-goldPrimary mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                      <Camera size={36} />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">Ashish Kumar</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-saffronPrimary mb-4">Principal Cinematographer</p>
                    <p className="text-textDim text-sm leading-relaxed">An award-winning visual director with 12+ years of experience capturing epic heritage films in Jaipur and Udaipur palaces.</p>
                  </div>

                  {/* Member 2 */}
                  <div 
                    ref={teamMemberRef2}
                    onMouseEnter={() => handleTeamMemberHover(teamMemberRef2)}
                    onMouseLeave={handleTeamMemberLeave}
                    className="glass-panel p-10 text-center border border-goldPrimary/10 transition-all duration-300 hover:-translate-y-2 hover:border-goldPrimary/30 hover:shadow-goldGlow group cursor-pointer"
                  >
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-bgDark to-goldPrimary/20 border-2 border-goldPrimary shadow-lg flex items-center justify-center text-goldPrimary mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                      <Sparkles size={36} />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">Vikram Rathore</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-saffronPrimary mb-4">Lighting &amp; 3D VFX Director</p>
                    <p className="text-textDim text-sm leading-relaxed">A lighting scientist leading our virtual production pipeline, ensuring breathtaking ambient blending on set.</p>
                  </div>

                  {/* Member 3 */}
                  <div 
                    ref={teamMemberRef3}
                    onMouseEnter={() => handleTeamMemberHover(teamMemberRef3)}
                    onMouseLeave={handleTeamMemberLeave}
                    className="glass-panel p-10 text-center border border-goldPrimary/10 transition-all duration-300 hover:-translate-y-2 hover:border-goldPrimary/30 hover:shadow-goldGlow group cursor-pointer"
                  >
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-bgDark to-goldPrimary/20 border-2 border-goldPrimary shadow-lg flex items-center justify-center text-goldPrimary mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                      <Heart size={36} />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">Priya Sharma</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-saffronPrimary mb-4">Chief Candid Storyteller</p>
                    <p className="text-textDim text-sm leading-relaxed">Specializing in capturing intimate glances, tearful laughter, and silent glances without direct prompting.</p>
                  </div>

                </div>

              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════
             VIEW E: BOOK NOW PAGE
             ═══════════════════════════════════════════ */}
          {activePage === 'book' && (
            <div className="animate-fadeIn">
              
              {/* Core Reservation Inputs */}
              <BookingForm />

              {/* pricing calculator deck */}
              <div className="border-t border-white/5 py-12">
                <Pricing />
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════
             LUXURY COHESIVE GLOBAL FOOTER
             ═══════════════════════════════════════════ */}
          <Footer onChangePage={handlePageChange} />

        </div>
      )}

    </div>
  );
};
