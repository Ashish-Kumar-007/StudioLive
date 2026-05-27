import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface ApertureLoaderProps {
  onLoadingComplete: () => void;
}

// ═══════════════════════════════════════════════════════════════
// CINEMATIC AUDIO ENGINE — Procedural Web Audio API Synthesis
// All sounds are self-contained: no external audio files needed.
// ═══════════════════════════════════════════════════════════════
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch { return null; }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

/** Low rumble sweep — simulates sensor/mirror powering up */
function playBootTone() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.7);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.8);
  } catch {}
}

/** Bandpass-filtered noise burst — simulates AF servo motor whirring */
function playServoWhir() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    const len = ctx.sampleRate * 0.35;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const filt = ctx.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 2200; filt.Q.value = 12;
    filt.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.35);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    src.connect(filt).connect(gain).connect(ctx.destination);
    src.start();
  } catch {}
}

/** Dual-tone confirmation beep — simulates AF lock chirp */
function playFocusBeep() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    [0, 0.1].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = 1760;
      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.08);
    });
  } catch {}
}

/** Layered mechanical DSLR mirror-slap + blade noise — satisfying shutter click */
function playShutterClick() {
  const ctx = getCtx(); if (!ctx) return;
  try {
    // Layer 1: Metallic transient (mirror slap)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.09);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.9, ctx.currentTime);
    og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.connect(og).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.1);

    // Layer 2: Noise burst (shutter blade travel)
    const len = ctx.sampleRate * 0.14;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const ns = ctx.createBufferSource(); ns.buffer = buf;
    const filt = ctx.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 1300; filt.Q.value = 5;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.75, ctx.currentTime);
    ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    ns.connect(filt).connect(ng).connect(ctx.destination);
    ns.start();

    // Layer 3: Sub-bass thump (body resonance)
    const sub = ctx.createOscillator();
    sub.type = 'sine'; sub.frequency.value = 60;
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.4, ctx.currentTime);
    sg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    sub.connect(sg).connect(ctx.destination);
    sub.start(); sub.stop(ctx.currentTime + 0.16);
  } catch {}
}

// ═══════════════════════════════════════════════════════════════
// IRIS BLADE GEOMETRY — 8-blade cinema lens diaphragm
// Each blade is a pie-slice from center to outer ring.
// GSAP rotates each <g> around its pivot on the outer ring.
// ═══════════════════════════════════════════════════════════════
function createBladePath(
  index: number, total: number,
  cx: number, cy: number, outerR: number
): { d: string; pivotX: number; pivotY: number } {
  const sector = (Math.PI * 2) / total;
  const span = sector * 1.4; // overlap factor
  const a1 = index * sector;
  const a2 = a1 + span;

  const x1 = cx + Math.cos(a1) * outerR;
  const y1 = cy + Math.sin(a1) * outerR;
  const x2 = cx + Math.cos(a2) * outerR;
  const y2 = cy + Math.sin(a2) * outerR;

  const pivotAngle = (a1 + a2) / 2;
  const pivotX = cx + Math.cos(pivotAngle) * outerR;
  const pivotY = cy + Math.sin(pivotAngle) * outerR;

  const d = `M ${cx} ${cy} L ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} Z`;
  return { d, pivotX, pivotY };
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export const ApertureLoader: React.FC<ApertureLoaderProps> = ({ onLoadingComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Build blade data once (static geometry)
  const BLADES = 8;
  const S = 1000;
  const CX = S / 2;
  const CY = S / 2;
  const R = S * 0.52;

  const bladeData = Array.from({ length: BLADES }, (_, i) => createBladePath(i, BLADES, CX, CY, R));

  // Initialize AudioContext on user click (satisfies browser autoplay policy)
  const handleStart = useCallback(() => {
    // Create AudioContext inside user gesture — this is what browsers require
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {}
    }
    if (audioCtx?.state === 'suspended') audioCtx.resume();
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return; // Wait for user click

    const el = containerRef.current;
    if (!el) return;

    // ── Grab DOM elements ──
    const sensorDot       = el.querySelector('.ld-sensor')   as HTMLElement;
    const grainLayer      = el.querySelector('.ld-grain')    as HTMLElement;
    const hud             = el.querySelector('.ld-hud')      as HTMLElement;
    const statusEl        = el.querySelector('.ld-status')   as HTMLElement;
    const lockEl          = el.querySelector('.ld-lock')     as HTMLElement;
    const flashEl         = el.querySelector('.ld-flash')    as HTMLElement;
    const focusRing       = el.querySelector('.ld-ring')     as HTMLElement;
    const scanLine        = el.querySelector('.ld-scanline') as HTMLElement;
    const brackets        = el.querySelectorAll('.ld-bracket') as NodeListOf<HTMLElement>;
    const bladeGroups     = el.querySelectorAll('.ld-blade')   as NodeListOf<SVGGElement>;

    const isoEl     = el.querySelector('.v-iso')     as HTMLElement;
    const ssEl      = el.querySelector('.v-ss')      as HTMLElement;
    const fEl       = el.querySelector('.v-f')       as HTMLElement;
    const wbEl      = el.querySelector('.v-wb')      as HTMLElement;
    const tcEl      = el.querySelector('.v-tc')      as HTMLElement;

    // ── Initialize states ──
    gsap.set([sensorDot, hud, flashEl, lockEl, scanLine], { opacity: 0 });
    gsap.set(grainLayer, { opacity: 0 });
    gsap.set(brackets, { opacity: 0 });
    gsap.set(statusEl, { opacity: 0 });

    // Set iris blades to OPEN position (rotated away from center)
    bladeGroups.forEach((blade, i) => {
      const { pivotX, pivotY } = bladeData[i];
      gsap.set(blade, { svgOrigin: `${pivotX} ${pivotY}`, rotation: 50 });
    });

    // ── Value animation proxies ──
    const vals = { iso: 100, ss: 0, f: 0, wb: 4200, tc: 0 };
    const ssSpeeds = ['1/30', '1/48', '1/60', '1/125', '1/250'];
    const fStops   = ['f/2.8', 'f/2.0', 'f/1.4', 'f/1.2'];
    const bk       = { offset: 45 };

    function updateBrackets() {
      const o = bk.offset;
      brackets[0].style.top  = `-${o}px`; brackets[0].style.left  = `-${o}px`;
      brackets[1].style.top  = `-${o}px`; brackets[1].style.right = `-${o}px`;
      brackets[2].style.bottom = `-${o}px`; brackets[2].style.left  = `-${o}px`;
      brackets[3].style.bottom = `-${o}px`; brackets[3].style.right = `-${o}px`;
    }

    function updateVals() {
      isoEl.textContent  = String(Math.round(vals.iso));
      ssEl.textContent   = ssSpeeds[Math.min(Math.floor(vals.ss), ssSpeeds.length - 1)];
      fEl.textContent    = fStops[Math.min(Math.floor(vals.f), fStops.length - 1)];
      wbEl.textContent   = `${Math.round(vals.wb)}K`;
      tcEl.textContent   = `00:00:0${Math.min(Math.floor(vals.tc), 9)}:00`;
    }

    updateBrackets();
    updateVals();

    // ═══════════════════════════════════════════════════════
    // MASTER GSAP TIMELINE
    // ═══════════════════════════════════════════════════════
    const tl = gsap.timeline();

    // ───────── PHASE 1: BOOT (0 — 0.8s) ─────────
    // Sensor glow dot fades in center
    tl.to(sensorDot, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2);
    tl.to(grainLayer, { opacity: 0.3, duration: 0.6 }, 0.3);

    // Boot text + tone
    tl.to(statusEl, { opacity: 1, duration: 0.2 }, 0.5);
    tl.call(() => {
      statusEl.textContent = 'INITIALIZING SENSOR...';
      playBootTone();
    }, [], 0.5);

    // ───────── PHASE 2: HUD ACTIVE (0.8 — 1.6s) ─────────
    tl.call(() => { statusEl.textContent = 'CALIBRATING OPTICS...'; }, [], 0.8);
    tl.to(hud, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.8);

    // Exposure values tick through readings
    tl.to(vals, {
      iso: 800, ss: 4, f: 3, wb: 5600, tc: 4,
      duration: 1.6, ease: 'steps(7)', onUpdate: updateVals,
    }, 0.9);

    // Focus brackets appear
    tl.to(brackets, { opacity: 1, duration: 0.25 }, 1.1);

    // ───────── PHASE 3: AUTOFOCUS SCANNING (1.6 — 3.0s) ─────────
    tl.call(() => {
      statusEl.textContent = 'AUTOFOCUS SCANNING...';
      playServoWhir();
    }, [], 1.6);

    // Scan line sweeps through center
    tl.to(scanLine, { opacity: 0.4, duration: 0.15 }, 1.6);
    tl.fromTo(scanLine, { y: -55 }, { y: 55, duration: 0.7, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 1.6);
    tl.to(scanLine, { opacity: 0, duration: 0.15 }, 3.0);

    // Focus brackets oscillate (seeking)
    tl.to(bk, {
      offset: 18, duration: 0.35, yoyo: true, repeat: 3,
      ease: 'power2.inOut', onUpdate: updateBrackets,
    }, 1.6);

    // Focus ring rotates (lens element seeking)
    tl.to(focusRing, { rotation: 140, duration: 1.4, ease: 'power1.inOut' }, 1.6);

    // Lens breathing — iris subtly shifts
    tl.to(bladeGroups, { rotation: 46, duration: 0.45, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.8);

    // Second servo whir
    tl.call(() => playServoWhir(), [], 2.3);

    // ───────── PHASE 4: FOCUS LOCK (3.0 — 3.5s) ─────────
    tl.call(() => {
      statusEl.textContent = 'FOCUS LOCKED';
      statusEl.style.color = '#D4AF37';
      brackets.forEach(b => {
        b.style.borderColor = '#D4AF37';
        b.style.boxShadow = '0 0 8px rgba(212,175,55,0.3)';
      });
      playFocusBeep();
    }, [], 3.0);

    // Brackets snap to tight lock
    tl.to(bk, { offset: 6, duration: 0.22, ease: 'power3.out', onUpdate: updateBrackets }, 3.0);

    // Lock confirmation indicator
    tl.to(lockEl, { opacity: 1, duration: 0.15 }, 3.1);

    // Brief hold
    tl.call(() => { statusEl.textContent = 'READY TO CAPTURE'; }, [], 3.4);

    // ───────── PHASE 5: SHUTTER CAPTURE (3.6 — 4.3s) ─────────
    // Everything fades rapidly
    tl.to([hud, statusEl, lockEl, sensorDot], { opacity: 0, duration: 0.12, ease: 'power2.in' }, 3.6);
    tl.to(brackets, { opacity: 0, duration: 0.1 }, 3.6);

    // IRIS BLADES CLOSE — the defining moment
    tl.to(bladeGroups, {
      rotation: 0, duration: 0.28, ease: 'power3.in', stagger: 0.008,
    }, 3.65);

    // Shutter CLICK
    tl.call(() => playShutterClick(), [], 3.85);

    // White FLASH
    tl.to(flashEl, { opacity: 1, duration: 0.05, ease: 'power4.in' }, 3.87);
    tl.to(flashEl, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 3.92);

    // Signal completion
    tl.call(() => onLoadingComplete(), [], 4.15);

    // Cleanup
    return () => {
      tl.kill();
      try { audioCtx?.close(); } catch {}
      audioCtx = null;
    };
  }, [started, onLoadingComplete, bladeData]);

  // ═══════════════════════════════════════════════════════
  // RENDER — Static DOM structure, animated by GSAP
  // ═══════════════════════════════════════════════════════
  const bracketBorder = '2px solid rgba(255,255,255,0.5)';
  const bSize = 22;

  // ─── CLICK-TO-ENTER GATE ───
  if (!started) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
        style={{ background: '#050709' }}
        onClick={handleStart}
      >
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Pulsing aperture icon */}
        <div className="relative mb-8" style={{ animation: 'ldEnterPulse 2.5s ease-in-out infinite' }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
            <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.15"
              style={{ animation: 'ldRingSpin 8s linear infinite' }} />
            {/* Simplified iris blades */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <line key={i}
                x1="50" y1="50"
                x2={50 + Math.cos(deg * Math.PI / 180) * 26}
                y2={50 + Math.sin(deg * Math.PI / 180) * 26}
                stroke="#D4AF37" strokeWidth="0.5" opacity="0.25"
              />
            ))}
            <circle cx="50" cy="50" r="4" fill="#D4AF37" opacity="0.5" />
            <circle cx="50" cy="50" r="8" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        {/* Brand name */}
        <h1 className="font-serif text-3xl md:text-4xl text-white/90 tracking-tight mb-2">
          Studio<span style={{ color: '#D4AF37' }}>Live</span>
        </h1>
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mb-10">
          Cinematic Wedding Cinematography
        </p>

        {/* Enter prompt */}
        <div className="flex flex-col items-center gap-3">
          <div className="px-8 py-3 border border-[#D4AF37]/25 rounded-full text-[#D4AF37]/80 text-[11px] font-mono tracking-[0.25em] uppercase hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/40 transition-all duration-300"
            style={{ animation: 'ldEnterGlow 2s ease-in-out infinite' }}>
            Enter Experience
          </div>
          <span className="text-[8px] font-mono tracking-[0.2em] text-white/15 uppercase">
            Click anywhere · Sound on recommended
          </span>
        </div>

        <style>{`
          @keyframes ldEnterPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes ldEnterGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(212,175,55,0.05); }
            50% { box-shadow: 0 0 25px rgba(212,175,55,0.12); }
          }
          @keyframes ldRingSpin {
            to { transform-origin: center; transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ─── MAIN LOADER (after click) ───
  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] select-none pointer-events-none overflow-hidden" style={{ background: '#050709' }}>

      {/* ═══ FILM GRAIN ═══ */}
      <div className="ld-grain absolute inset-0" style={{
        zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: '150px', mixBlendMode: 'overlay',
        animation: 'ldGrain 0.4s steps(3) infinite',
      }} />

      {/* ═══ SVG IRIS DIAPHRAGM ═══ */}
      <svg viewBox={`0 0 ${S} ${S}`} preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
        <defs>
          {bladeData.map((_, i) => (
            <linearGradient key={i} id={`bg${i}`}
              x1="0%" y1="0%" x2="100%" y2="100%"
              gradientTransform={`rotate(${i * 45})`}>
              <stop offset="0%" stopColor="#0E1422" />
              <stop offset="45%" stopColor="#141C2C" />
              <stop offset="100%" stopColor="#0A0F18" />
            </linearGradient>
          ))}
        </defs>

        {bladeData.map(({ d }, i) => (
          <g key={i} className="ld-blade" style={{ willChange: 'transform' }}>
            <path d={d} fill={`url(#bg${i})`} stroke="rgba(212,175,55,0.12)" strokeWidth="0.7" />
          </g>
        ))}

        {/* Outer lens barrel ring */}
        <circle cx={CX} cy={CY} r={R * 0.93} fill="none"
          stroke="#D4AF37" strokeWidth="1.2" opacity="0.08" />
        <circle cx={CX} cy={CY} r={R * 0.95} fill="none"
          stroke="#fff" strokeWidth="0.4" opacity="0.03" />
      </svg>

      {/* ═══ SENSOR GLOW DOT ═══ */}
      <div className="ld-sensor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
        width: 5, height: 5, borderRadius: '50%', background: '#D4AF37', zIndex: 5,
        boxShadow: '0 0 18px 6px rgba(212,175,55,0.35), 0 0 50px 18px rgba(212,175,55,0.12)',
      }} />

      {/* ═══ CAMERA HUD ═══ */}
      <div className="ld-hud absolute inset-0 font-mono text-white" style={{ zIndex: 10 }}>

        {/* ── TOP BAR (RED Cinema inspired) ── */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-5 text-[9px] md:text-[10px] tracking-[0.15em]">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-[7px] h-[7px] rounded-full bg-red-600" style={{ animation: 'ldPulse 1.2s ease-in-out infinite' }} />
              <span className="text-red-400 font-bold">REC</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white/45">8K</span>
            <span className="text-white/25">24.00</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-white/25">
            <span>REDCODE RAW</span>
            <span className="text-white/40 tabular-nums v-tc">00:00:00:00</span>
          </div>
        </div>

        {/* ── BOTTOM BAR (Exposure readouts) ── */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-5 md:gap-8 px-6 py-5 text-[9px] tracking-[0.1em]">
          {[
            { label: 'ISO', cls: 'v-iso', init: '100' },
            { label: 'SHUTTER', cls: 'v-ss', init: '1/30' },
            { label: 'APERTURE', cls: 'v-f', init: 'f/2.8' },
            { label: 'WB', cls: 'v-wb', init: '4200K' },
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && <div className="w-[1px] h-3.5 bg-white/8" />}
              <div className="flex flex-col items-center">
                <span className="text-white/20 text-[7px] md:text-[8px] uppercase mb-0.5">{item.label}</span>
                <span className={`${item.cls} tabular-nums font-bold text-white/55`}>{item.init}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ── LEFT: Histogram ── */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1">
          <span className="text-[7px] text-white/15 tracking-wider">HISTOGRAM</span>
          <div className="flex items-end gap-[2px] h-7">
            {Array.from({ length: 14 }, (_, i) => {
              const h = Math.sin((i / 13) * Math.PI) * 22 + 5;
              const c = i < 5 ? 'rgba(100,140,255,0.35)' : i < 9 ? 'rgba(200,200,200,0.25)' : 'rgba(255,140,80,0.35)';
              return <div key={i} className="w-[2.5px] rounded-sm" style={{ height: h, background: c }} />;
            })}
          </div>
        </div>

        {/* ── RIGHT: Lens info ── */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-1 text-[8px] text-white/20">
          <span>LENS 50mm</span>
          <span>T1.5 PRIME</span>
          <span className="text-[#D4AF37]/25">S35 SENSOR</span>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-[7px]">BAT</span>
            <div className="w-7 h-1.5 border border-white/12 rounded-sm overflow-hidden">
              <div className="h-full bg-green-500/35 rounded-sm" style={{ width: '82%' }} />
            </div>
          </div>
        </div>

        {/* ── CENTER: Focus system ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

          {/* Focus ring (rotating dashed circle) */}
          <div className="ld-ring absolute border-[1.5px] border-dashed border-white/10 rounded-full"
            style={{ width: 160, height: 160, left: -80, top: -80 }} />

          {/* Rule of thirds grid */}
          <div className="absolute" style={{ width: 180, height: 180, left: -90, top: -90, opacity: 0.04 }}>
            <div className="absolute left-[33%] top-0 bottom-0 w-[0.5px] bg-white" />
            <div className="absolute left-[66%] top-0 bottom-0 w-[0.5px] bg-white" />
            <div className="absolute top-[33%] left-0 right-0 h-[0.5px] bg-white" />
            <div className="absolute top-[66%] left-0 right-0 h-[0.5px] bg-white" />
          </div>

          {/* Scan line (sweeps during AF) */}
          <div className="ld-scanline absolute h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ width: 120, left: -60, top: 0 }} />

          {/* Focus brackets — 4 corners */}
          <div className="ld-bracket absolute" style={{ width: bSize, height: bSize, borderTop: bracketBorder, borderLeft: bracketBorder, top: -45, left: -45, transition: 'border-color 0.25s, box-shadow 0.25s' }} />
          <div className="ld-bracket absolute" style={{ width: bSize, height: bSize, borderTop: bracketBorder, borderRight: bracketBorder, top: -45, right: -45, transition: 'border-color 0.25s, box-shadow 0.25s' }} />
          <div className="ld-bracket absolute" style={{ width: bSize, height: bSize, borderBottom: bracketBorder, borderLeft: bracketBorder, bottom: -45, left: -45, transition: 'border-color 0.25s, box-shadow 0.25s' }} />
          <div className="ld-bracket absolute" style={{ width: bSize, height: bSize, borderBottom: bracketBorder, borderRight: bracketBorder, bottom: -45, right: -45, transition: 'border-color 0.25s, box-shadow 0.25s' }} />

          {/* Crosshair reticle */}
          <div className="absolute w-5 h-[1px] -left-2.5 top-[-0.5px] bg-white/15" />
          <div className="absolute h-5 w-[1px] left-[-0.5px] -top-2.5 bg-white/15" />
          <div className="absolute w-2.5 h-2.5 -left-[5px] -top-[5px] border border-white/10 rounded-full" />
        </div>
      </div>

      {/* ═══ STATUS TEXT ═══ */}
      <div className="ld-status absolute font-mono text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/40"
        style={{ bottom: 72, left: '50%', transform: 'translateX(-50%)', zIndex: 15, whiteSpace: 'nowrap' }} />

      {/* ═══ LOCK INDICATOR ═══ */}
      <div className="ld-lock absolute flex items-center gap-1.5 font-mono"
        style={{ bottom: 56, left: '50%', transform: 'translateX(-50%)', zIndex: 15 }}>
        <span className="w-[5px] h-[5px] rounded-full bg-[#D4AF37]" style={{ animation: 'ldPulse 0.8s ease-in-out infinite' }} />
        <span className="text-[7px] text-[#D4AF37]/50 tracking-[0.2em]">CONFIRMED</span>
      </div>

      {/* ═══ WHITE FLASH ═══ */}
      <div className="ld-flash absolute inset-0 bg-white" style={{ zIndex: 50 }} />

      {/* ═══ INLINE KEYFRAMES ═══ */}
      <style>{`
        @keyframes ldGrain {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(-1.5%, 1.5%); }
          66%  { transform: translate(1.5%, -1%); }
          100% { transform: translate(0, 0); }
        }
        @keyframes ldPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
