import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface ApertureLoaderProps {
  onLoadingComplete: () => void;
}

const photoData = [
  { img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=300", label: "Bridal Heritage" },
  { img: "https://images.unsplash.com/photo-1595878715977-2e8f8df6392e?q=80&w=300", label: "Royal Groom" },
  { img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300", label: "Sangeet Beats" },
  { img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=300", label: "Mehendi Art" },
  { img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300", label: "Golden Hour" },
  { img: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=300", label: "Palace Arches" },
  { img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300", label: "Mandap Decor" },
  { img: "https://images.unsplash.com/photo-1505232458627-5671a58a7043?q=80&w=300", label: "Festive Lights" },
  { img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", label: "Cinematic Lens" },
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300", label: "Production Set" },
  { img: "https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=300", label: "Soul Connections" },
  { img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=300", label: "Rose Petals" },
  { img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=300", label: "Celebration Sparks" },
  { img: "https://images.unsplash.com/photo-1507504038482-762143725b7a?q=80&w=300", label: "Vibrant Drapes" },
  { img: "https://images.unsplash.com/photo-1621600411688-50d5026b36c2?q=80&w=300", label: "Palace Walk" },
  { img: "https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?q=80&w=300", label: "Jaipur Legacy" },
  { img: "https://images.unsplash.com/photo-1519225495810-7512c696af05?q=80&w=300", label: "Joyful Dance" },
  { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300", label: "Palace Colors" },
  { img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=300", label: "Ballroom Magic" },
  { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=300", label: "Night Glances" },
  { img: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=300", label: "Grand Sparklers" },
  { img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=300", label: "Laughter Always" }
];

const randomRotations = [-25, -15, -8, 5, 12, 18, -20, 15, -5, 22, -12, 8, -18, 10, -22, 14, -6, 25, -10, 16, -15, 20];

const positions = [
  { top: '10%', left: '8%' },
  { top: '15%', left: '74%' },
  { top: '45%', left: '5%' },
  { top: '68%', left: '78%' },
  { top: '8%', left: '42%' },
  { top: '70%', left: '15%' },
  { top: '35%', left: '80%' },
  { top: '55%', left: '68%' },
  { top: '22%', left: '25%' },
  { top: '74%', left: '48%' },
  { top: '12%', left: '58%' },
  { top: '48%', left: '40%' },
  { top: '38%', left: '18%' },
  { top: '80%', left: '30%' },
  { top: '52%', left: '84%' },
  { top: '30%', left: '50%' },
  { top: '65%', left: '32%' },
  { top: '20%', left: '88%' },
  { top: '82%', left: '8%' },
  { top: '42%', left: '60%' },
  { top: '5%', left: '22%' },
  { top: '85%', left: '62%' }
];

export const ApertureLoader: React.FC<ApertureLoaderProps> = ({ onLoadingComplete }) => {
  const [photosMounted, setPhotosMounted] = useState(true);

  useEffect(() => {
    // 1. Staggered Polaroids deal-out cascade
    const tl = gsap.timeline();

    tl.fromTo(".polaroid-card", {
      scale: 0.15,
      opacity: 0,
      y: 400,
      rotation: () => (Math.random() - 0.5) * 120
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      rotation: (i) => randomRotations[i],
      stagger: 0.11,
      duration: 0.85,
      ease: "back.out(1.5)"
    });

    // 2. Gravitational pull suck-in to center ring
    tl.to(".polaroid-card", {
      scale: 0,
      opacity: 0,
      x: (i, target: any) => {
        const rect = target.getBoundingClientRect();
        return window.innerWidth / 2 - rect.left - rect.width / 2;
      },
      y: (i, target: any) => {
        const rect = target.getBoundingClientRect();
        return window.innerHeight / 2 - rect.top - rect.height / 2;
      },
      rotation: () => (Math.random() - 0.5) * 180,
      stagger: 0.035,
      duration: 0.8,
      ease: "power3.in",
      delay: 0.8,
      onComplete: () => {
        setPhotosMounted(false);
        onLoadingComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div className="aperture-overlay pointer-events-none">
      
      {/* 22 Cascading Polaroid Memories */}
      {photosMounted && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
          {photoData.map((photo, i) => (
            <div
              key={i}
              className="polaroid-card absolute pointer-events-none w-[160px] md:w-[210px] bg-white border border-goldPrimary/20 p-2 pb-6 rounded shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              style={{
                top: positions[i].top,
                left: positions[i].left,
                transformOrigin: 'center center'
              }}
            >
              <div className="w-full h-[120px] md:h-[155px] overflow-hidden bg-bgDark rounded-sm">
                <img
                  src={photo.img}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-[10px] md:text-xs text-[#5C4033] mt-3.5 text-center tracking-[0.05em] uppercase font-bold italic">
                {photo.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Central Breathing Ring */}
      <div className="aperture-ring z-20" />

    </div>
  );
};
