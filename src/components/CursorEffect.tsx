import React, { useEffect, useState, useRef } from 'react';

/**
 * CursorEffect Component
 * Renders a premium, smooth-trailing cinematic mouse cursor that reacts to interactive elements.
 * Displays descriptive helper words ("PLAY", "VIEW", "CLOSE") based on element `data-cursor` values.
 */
export const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState<'default' | 'pointer' | 'play' | 'view' | 'close'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const trailRef = useRef({ x: -100, y: -100 });
  const reqAnimFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Check if user is on mobile/touch screen (hide cursor overlay)
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // 2. Mouse Move Tracker
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Look up target to see if we are hovering over specific visual elements
      let target = e.target as HTMLElement | null;
      let foundCursorType: typeof hoverType = 'default';
      
      while (target) {
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('cursor-pointer')) {
          foundCursorType = 'pointer';
        }
        const customCursor = target.getAttribute('data-cursor');
        if (customCursor) {
          foundCursorType = customCursor as any;
          break;
        }
        target = target.parentElement;
      }
      
      setHoverType(foundCursorType);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3. Smooth Spring Latency Render Loop
    const updateTrail = () => {
      const ease = 0.15; // Speed multiplier for trailing circles
      const diffX = position.x - trailRef.current.x;
      const diffY = position.y - trailRef.current.y;
      
      trailRef.current.x += diffX * ease;
      trailRef.current.y += diffY * ease;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      reqAnimFrameRef.current = requestAnimationFrame(updateTrail);
    };
    reqAnimFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (reqAnimFrameRef.current) cancelAnimationFrame(reqAnimFrameRef.current);
    };
  }, [position, isMobile]);

  if (isMobile || !isVisible) return null;

  // Compute cursor size and styles based on active hover type
  const getCursorStyles = () => {
    switch (hoverType) {
      case 'play':
        return {
          width: '72px',
          height: '72px',
          backgroundColor: 'rgba(212, 175, 55, 0.95)',
          borderColor: '#D4AF37',
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)',
          color: '#07090E',
        };
      case 'view':
        return {
          width: '72px',
          height: '72px',
          backgroundColor: 'rgba(240, 244, 248, 0.95)',
          borderColor: '#F0F4F8',
          boxShadow: '0 0 25px rgba(240, 244, 248, 0.25)',
          color: '#07090E',
        };
      case 'close':
        return {
          width: '72px',
          height: '72px',
          backgroundColor: 'rgba(255, 126, 54, 0.95)',
          borderColor: '#FF7E36',
          boxShadow: '0 0 25px rgba(255, 126, 54, 0.45)',
          color: '#07090E',
        };
      case 'pointer':
        return {
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderColor: '#D4AF37',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
          color: 'transparent',
        };
      default:
        return {
          width: '18px',
          height: '18px',
          backgroundColor: 'transparent',
          borderColor: '#D4AF37',
          color: 'transparent',
        };
    }
  };

  const cursorStyles = getCursorStyles();

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        className="fixed pointer-events-none rounded-full z-[99999] mix-blend-difference bg-white transition-transform duration-100 ease-out"
        style={{
          width: '6px',
          height: '6px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Trailing Luxury Orbital Ring */}
      <div
        className="fixed pointer-events-none rounded-full z-[99998] border flex items-center justify-center font-mono font-bold text-[9px] tracking-widest text-center select-none uppercase overflow-hidden transition-all duration-350 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: 'translate(-50%, -50%)',
          ...cursorStyles,
        }}
      >
        {hoverType === 'play' && <span>PLAY</span>}
        {hoverType === 'view' && <span>VIEW</span>}
        {hoverType === 'close' && <span>CLOSE</span>}
      </div>
    </>
  );
};
