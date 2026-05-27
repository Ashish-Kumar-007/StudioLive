import React from 'react';
import gsap from 'gsap';
import { ArrowRight, Video, Camera, Sparkles, Film } from 'lucide-react';

interface EventsProps {
  onChangePage: (pageId: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onChangePage }) => {
  const events = [
    {
      title: "Regal Weddings",
      desc: "Comprehensive 8K documentation of grand multi-day Indian wedding celebrations, from structural palace rituals to candid emotional sweeps.",
      icon: <Camera size={24} />,
      img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Pre-Wedding Shoots",
      desc: "Cinematic, sun-kissed twilight pre-wedding visual showreels captured in breathtaking geographic landmarks and lakeshores.",
      icon: <Sparkles size={24} />,
      img: "https://images.unsplash.com/photo-1595878715977-2e8f8df6392e?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Creative Portfolios",
      desc: "High-end visual portfolios and fine-art styling shoots combining physical lighting controls and modern virtual sets.",
      icon: <Video size={24} />,
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Cinematic Films",
      desc: "Theatrical editing, bespoke scoring, and narrative-driven storytelling that encapsulates the heart of your heritage.",
      icon: <Film size={24} />,
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop"
    }
  ];

  // Interactive 3D Card Parallax Tilt Event Handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate relative to cursor offset (up to 12 degrees max)
    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.03,
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

  return (
    <div className="w-full">
      <section className="reveal-section py-[120px] px-[5%] max-w-[1200px] mx-auto">
        <div className="reveal-content w-full flex flex-col">
          {/* Title */}
          <div className="text-center mb-[80px] w-full">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
              Visual Offerings
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
              Events We Cover
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
          </div>

          <p className="text-center text-textDim text-lg max-w-[700px] mx-auto mb-[60px] leading-relaxed w-full">
            Whether it is a regal palace union in Rajasthan, an intimate hill station pre-wedding, or high-fashion commercial campaigns, we bring our cinematic lens to your biggest days.
          </p>

          {/* Events Grid */}
          <div className="stories-grid grid grid-cols-2 gap-10 max-md:grid-cols-1 w-full">
            {events.map((evt, i) => (
              <div 
                key={i}
                onClick={() => onChangePage('book')}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-surfaceDark/65 border border-goldPrimary/12 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.12)] group"
              >
                <div className="h-[260px] relative overflow-hidden pointer-events-none">
                  <img 
                    src={evt.img} 
                    alt={evt.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                  <div className="absolute bottom-5 left-5 w-12 h-12 rounded-full bg-saffronPrimary/10 border border-saffronPrimary/35 flex items-center justify-center text-saffronPrimary">
                    {evt.icon}
                  </div>
                </div>
                <div className="p-[30px] pointer-events-none">
                  <h3 className="font-serif text-2xl text-textLight mb-3">
                    {evt.title}
                  </h3>
                  <p className="text-textDim text-sm mb-5 leading-relaxed">
                    {evt.desc}
                  </p>
                  <div className="text-[12px] font-semibold uppercase text-goldPrimary flex items-center gap-1.5 tracking-[0.1em]">
                    Book This Event <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
