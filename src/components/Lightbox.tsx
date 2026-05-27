import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Info, MapPin, Camera } from 'lucide-react';

interface LightboxItem {
  img: string;
  videoUrl?: string;
  title: string;
  desc: string;
  category: string;
  specs?: {
    camera: string;
    lens: string;
    aperture: string;
    location: string;
  };
}

interface LightboxProps {
  item: LightboxItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Lightbox Component
 * A luxurious fullscreen overlay for displaying high-resolution visual stories.
 * Includes complete photo meta tags, keyboard tracking, and tactile closing states.
 */
export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  
  useEffect(() => {
    // 1. Lock document scrolling while lightbox is active
    document.body.classList.add('lenis-stopped');
    
    // 2. Keyboard listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('lenis-stopped');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // Click handler to close when backdrop is selected
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[999] bg-[#07090E]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 select-none animate-fadeIn"
      data-cursor="close"
    >
      
      {/* 🎬 Floating Header Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
        <div className="text-white/40 font-mono text-[10px] tracking-widest uppercase">
          StudioLive Production / {item.category}
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-goldPrimary hover:border-goldPrimary hover:bg-goldPrimary/10 active:scale-95 transition-all duration-300 shadow-2xl"
          title="Close View (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* ⬅ Left Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-6 w-12 h-12 max-md:bottom-6 max-md:left-1/3 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-goldPrimary hover:border-goldPrimary hover:bg-goldPrimary/10 active:scale-90 transition-all duration-300 z-10"
        title="Previous Scene (Left Arrow)"
        data-cursor="default"
      >
        <ChevronLeft size={22} />
      </button>

      {/* ⮕ Right Navigation */}
      <button
        onClick={onNext}
        className="absolute right-6 w-12 h-12 max-md:bottom-6 max-md:right-1/3 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-goldPrimary hover:border-goldPrimary hover:bg-goldPrimary/10 active:scale-90 transition-all duration-300 z-10"
        title="Next Scene (Right Arrow)"
        data-cursor="default"
      >
        <ChevronRight size={22} />
      </button>

      {/* 🎞 Master Media Panel */}
      <div 
        className="relative max-w-5xl w-full h-[75vh] md:h-[80vh] flex flex-col md:flex-row gap-6 items-stretch pointer-events-none z-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Side: Photo / Video Reel Screen */}
        <div className="flex-[1.4] relative rounded-3xl overflow-hidden border border-white/5 bg-black flex items-center justify-center pointer-events-auto shadow-2xl group">
          {item.videoUrl ? (
            <iframe
              src={`${item.videoUrl}?autoplay=1&mute=0&controls=1`}
              title={item.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img
              src={item.img}
              alt={item.title}
              className="max-w-full max-h-full object-contain pointer-events-none"
            />
          )}

          {/* Holographic desaturated sweep overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Right Side: Editorial Metadata Info Card */}
        <div className="flex-[0.6] glass-panel p-8 rounded-3xl flex flex-col justify-between pointer-events-auto text-left shadow-2xl border border-goldPrimary/12">
          
          <div>
            {/* Title & Category */}
            <span className="text-[10px] font-bold tracking-widest text-saffronPrimary uppercase mb-2.5 block">
              {item.category}
            </span>
            <h3 className="font-serif text-3xl text-white mb-4 tracking-wide leading-tight">
              {item.title}
            </h3>
            
            <p className="text-textDim text-sm leading-relaxed mb-6">
              {item.desc}
            </p>
          </div>

          {/* EXIF Photography Metadata Settings */}
          {item.specs && (
            <div className="border-t border-white/5 pt-6 flex flex-col gap-3.5">
              
              <div className="flex items-center gap-3 text-xs text-textLight">
                <MapPin size={15} className="text-goldPrimary" />
                <span className="font-mono tracking-wider">{item.specs.location}</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-textDim">
                <Camera size={15} className="text-goldPrimary" />
                <span className="font-sans">
                  {item.specs.camera} <span className="text-white/20">|</span> {item.specs.lens}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-textDim">
                <Info size={15} className="text-goldPrimary" />
                <span className="font-sans">
                  Exposure: <span className="text-textLight font-mono">{item.specs.aperture}</span>
                </span>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
