import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, X, Heart, MessageCircle, Send, MapPin } from 'lucide-react';

interface ShortReel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  location: string;
  couple: string;
  likes: string;
}

const shortReelsData: ShortReel[] = [
  {
    id: 'reel-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-bride-with-makeup-posing-in-traditional-dress-41583-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=400',
    title: 'The Golden Dupatta Sweep',
    location: 'Amer Fort, Jaipur',
    couple: 'Aditi & Rahul',
    likes: '4.2k'
  },
  {
    id: 'reel-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-bride-walking-in-a-classic-hallway-40155-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400',
    title: 'Corridor Whispers',
    location: 'City Palace, Udaipur',
    couple: 'Meera & Kabir',
    likes: '5.8k'
  },
  {
    id: 'reel-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-bride-and-groom-40156-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400',
    title: 'The Midnight Phere Spark',
    location: 'Leela Palace, Udaipur',
    couple: 'Anjali & Rohit',
    likes: '3.9k'
  },
  {
    id: 'reel-4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-in-a-beautiful-traditional-dress-41584-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=400',
    title: 'The Lake Shore Gaze',
    location: 'Jagmandir Palace, Udaipur',
    couple: 'Priya & Siddharth',
    likes: '6.1k'
  }
];

export const ReelShorts: React.FC = () => {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleOpenReel = (id: string) => {
    setActiveReelId(id);
    setIsMuted(false); // Unmute when explicitly opened fullscreen
  };

  const handleCloseReel = () => {
    setActiveReelId(null);
  };

  const handlePlayHover = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleLeaveHover = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="py-24 px-[5%] max-w-[1300px] mx-auto relative z-20 text-left" id="showroom">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Social Storytelling
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Cinematic Wedding Reels
          </h2>
          <p className="text-textDim text-sm md:text-base max-w-xl leading-relaxed">
            Our micro-narratives styled like high-fashion vertical reels. Tap any preview to launch the full-screen cinematic sound experience.
          </p>
        </div>

        {/* Reels Horizontal Flex Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {shortReelsData.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel.id)}
              onMouseEnter={() => handlePlayHover(reel.id)}
              onMouseLeave={() => handleLeaveHover(reel.id)}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-surfaceDark/40 group shadow-2xl transition-all duration-500 hover:border-goldPrimary/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.08)]"
              data-cursor="play"
            >
              {/* Static Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover desaturate-sweep group-hover:opacity-0 transition-opacity duration-500 z-1 pointer-events-none"
              />

              {/* Looping video on hover */}
              <video
                ref={(el) => (videoRefs.current[reel.id] = el)}
                src={reel.videoUrl}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-2 pointer-events-none"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/20 to-transparent opacity-80 z-3 pointer-events-none" />

              {/* Front labels */}
              <div className="absolute inset-x-6 bottom-6 z-4 flex flex-col justify-end pointer-events-none text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[9px] font-mono tracking-widest text-saffronPrimary uppercase font-bold mb-1.5 flex items-center gap-1.5">
                  <MapPin size={10} /> {reel.location}
                </span>
                <h3 className="font-serif text-xl text-white font-semibold leading-tight mb-2">
                  {reel.title}
                </h3>
                <p className="text-textDim text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Featuring {reel.couple}
                </p>
              </div>

              {/* Small play indicator */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-bgDark/80 border border-white/10 flex items-center justify-center text-goldPrimary opacity-60 group-hover:opacity-100 transition-all duration-300 z-4">
                <Play size={12} className="translate-x-0.5" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Looping Reels Lightbox overlay */}
      {activeReelId !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-bgDark/98 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 animate-fadeIn"
          onClick={handleCloseReel}
        >
          {/* Close button */}
          <button
            onClick={handleCloseReel}
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-goldPrimary hover:border-goldPrimary hover:bg-goldPrimary/10 active:scale-95 transition-all duration-300 z-[10000]"
          >
            <X size={20} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute top-6 left-6 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-goldPrimary hover:border-goldPrimary hover:bg-goldPrimary/10 active:scale-95 transition-all duration-300 z-[10000]"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* Vertical Reel Stage */}
          {shortReelsData.filter(r => r.id === activeReelId).map((reel) => (
            <div
              key={reel.id}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full h-full md:h-[90vh] md:rounded-[36px] overflow-hidden border border-white/15 bg-black flex items-center justify-center shadow-2xl animate-scaleUp"
            >
              <video
                src={reel.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Instagram-style floating action buttons on side */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-10 text-white select-none">
                
                {/* Heart */}
                <div className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform">
                  <div className="w-11 h-11 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:text-rose-500 hover:border-rose-500/40 transition-colors">
                    <Heart size={18} className="fill-rose-500 text-rose-500" />
                  </div>
                  <span className="text-[10px] font-mono mt-1">{reel.likes}</span>
                </div>

                {/* Comment */}
                <div className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform">
                  <div className="w-11 h-11 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:text-goldPrimary transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-[10px] font-mono mt-1">45</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform">
                  <div className="w-11 h-11 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:text-goldPrimary transition-colors">
                    <Send size={18} />
                  </div>
                  <span className="text-[10px] font-mono mt-1">Share</span>
                </div>

              </div>

              {/* Text Info overlay inside Reel */}
              <div className="absolute inset-x-6 bottom-8 z-10 text-left text-white pointer-events-none flex flex-col justify-end">
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full border border-goldPrimary/40 bg-goldPrimary/10 flex items-center justify-center font-bold text-xs text-goldPrimary">SL</div>
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-1.5">
                      StudioLive <span className="text-[10px] font-normal text-textDim font-mono">• Following</span>
                    </h4>
                    <span className="text-[10px] text-textDim flex items-center gap-1 font-mono"><MapPin size={9} /> {reel.location}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {reel.title}
                </h3>
                <p className="text-textDim text-xs leading-relaxed max-w-[80%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Capturing {reel.couple}'s royal vows under the Rajasthan twilight fire glow.
                </p>

              </div>

              {/* Perforated vertical timeline */}
              <div className="absolute top-4 inset-x-4 h-[2px] bg-white/20 rounded-full overflow-hidden z-10 pointer-events-none">
                <div className="h-full bg-goldPrimary animate-progressWidth" style={{ animationDuration: '15s', animationIterationCount: 'infinite' }} />
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};
