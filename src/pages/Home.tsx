import React from 'react';
import gsap from 'gsap';
import { ArrowRight, PlayCircle, Image, Video, Sparkles, Camera, Users, Calendar } from 'lucide-react';

interface HomeProps {
  onChangePage: (pageId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  
  const stories = [
    {
      title: "Ananya & Kabir",
      desc: "An elegant 3-day royal heritage wedding inside Jaipur's historic palace halls, captured in vibrant cinematic clarity.",
      tag: "Royal Palace",
      linkText: "View Film",
      icon: <PlayCircle size={18} />,
      img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Riya & Dev",
      desc: "A dreamy sun-kissed twilight pre-wedding showreel capturing intimate whispers along Udaipur's serene lakes.",
      tag: "Lakeside Dream",
      linkText: "View Gallery",
      icon: <Image size={18} />,
      img: "https://images.unsplash.com/photo-1595878715977-2e8f8df6392e?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Meera & Rohan",
      desc: "High-octane dance choreographies, dynamic strobe lighting, and candid moments frozen inside a lively ballroom.",
      tag: "Sangeet Beats",
      linkText: "View Gallery",
      icon: <Image size={18} />,
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const features = [
    {
      title: "8K Cinematography",
      desc: "Hollywood-grade camera setups, premium lens sweeps, and theatrical grading.",
      icon: <Video size={24} />
    },
    {
      title: "Virtual Projection",
      desc: "Immersive custom 3D backdrops and ambient light integration on set.",
      icon: <Sparkles size={24} />
    },
    {
      title: "Fine-Art Books",
      desc: "Premium handcrafted leather-bound wedding albums made in Italy.",
      icon: <Camera size={24} />
    },
    {
      title: "Direction Free",
      desc: "Silent, non-intrusive lenses capturing real tearful, joyous glances.",
      icon: <Users size={24} />
    }
  ];

  // Real-time Interactive 3D Card Parallax Tilt Event Handlers
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
      
      {/* HERO SECTION */}
      <section className="hero-sec h-screen flex items-center justify-center text-center pt-[85px] relative">
        <div className="max-w-[900px] px-5 z-10 flex flex-col items-center">
          <p className="text-sm font-semibold tracking-[0.4em] uppercase text-goldPrimary mb-5">
            A Heritage of Love & Light
          </p>
          <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] text-textLight mb-6">
            Capturing Indian Weddings<br />& Cinematic Stories.
          </h1>
          <p className="text-textDim text-lg max-w-[600px] mb-10 leading-relaxed">
            Breathtaking virtual production, candid photography, and fine art documentation tailored to celebrate your legacy.
          </p>
          <button 
            onClick={() => onChangePage('book')}
            className="btn-gold"
          >
            Begin Your Story <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* FEATURED LOVE STORIES */}
      <section className="reveal-section reveal stories-sec-bg py-[120px] px-[5%] relative">
        <div className="reveal-content w-full flex flex-col">
          <div className="text-center mb-[80px] max-w-[1200px] mx-auto w-full">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
              Cinematic Highlights
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
              Featured Love Stories
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
          </div>
          
          <div className="stories-grid grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-[1200px] mx-auto w-full">
            {stories.map((story, i) => (
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
                    src={story.img} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgDark/95" />
                  <span className="absolute top-5 left-5 bg-saffronPrimary/15 border border-saffronPrimary text-saffronPrimary py-1 px-3 rounded-xl text-[11px] font-semibold tracking-[0.1em] uppercase">
                    {story.tag}
                  </span>
                </div>
                <div className="p-[30px] pointer-events-none">
                  <h3 className="font-serif text-2xl text-textLight mb-3">
                    {story.title}
                  </h3>
                  <p className="text-textDim text-sm mb-5 leading-relaxed">
                    {story.desc}
                  </p>
                  <div className="text-[12px] font-semibold uppercase text-goldPrimary flex items-center gap-1.5 tracking-[0.1em]">
                    {story.linkText} {story.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="pub-ribbon border-y border-goldPrimary/10 py-[60px] px-[5%] bg-surfaceDark/40 relative">
        <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-textDim mb-10">
          As Featured In & Trusted By
        </p>
        <div className="flex justify-around items-center flex-wrap gap-10 max-w-[1200px] mx-auto opacity-60">
          <div className="font-serif text-2xl font-bold tracking-[0.05em] text-textLight">VOGUE INDIA</div>
          <div className="font-serif text-2xl font-bold tracking-[0.05em] text-textLight">WEDMEGOOD</div>
          <div className="font-serif text-2xl font-bold tracking-[0.05em] text-textLight">THE KNOT</div>
          <div className="font-serif text-2xl font-bold tracking-[0.05em] text-textLight">BRIDES OF INDIA</div>
        </div>
      </section>

      {/* STUDIOLIVE EXPERIENCE */}
      <section className="reveal-section reveal experience-sec-bg py-[120px] px-[5%] relative">
        <div className="reveal-content w-full">
          <div className="exp-row flex gap-[80px] max-lg:flex-col max-lg:gap-10 max-w-[1200px] mx-auto items-center justify-between">
            
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-goldPrimary mb-4">
                The Art of Storytelling
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.2] text-textLight">
                The StudioLive<br />Experience
              </h2>
              <p className="text-textDim text-base mb-10 leading-relaxed">
                We blend state-of-the-art virtual production, multi-camera cinematography, and unobtrusive fine-art photography to document your celebrations. We don't direct; we capture authentic emotions as they unfold naturally.
              </p>
              <div className="flex gap-10">
                <div className="stat-item">
                  <h4 className="font-serif text-4xl text-goldPrimary mb-1">350+</h4>
                  <p className="text-xs uppercase tracking-[0.1em] text-textLight">Weddings Told</p>
                </div>
                <div className="stat-item">
                  <h4 className="font-serif text-4xl text-goldPrimary mb-1">15+</h4>
                  <p className="text-xs uppercase tracking-[0.1em] text-textLight">Global Awards</p>
                </div>
                <div className="stat-item">
                  <h4 className="font-serif text-4xl text-goldPrimary mb-1">100%</h4>
                  <p className="text-xs uppercase tracking-[0.1em] text-textLight">Candid Emotion</p>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-5 w-full">
              {features.map((feat, i) => (
                <div 
                  key={i}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="exp-box group"
                >
                  <div className="exp-box-icon pointer-events-none">
                    {feat.icon}
                  </div>
                  <h3 className="exp-box-title pointer-events-none">
                    {feat.title}
                  </h3>
                  <p className="exp-box-desc pointer-events-none">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="reveal-section testimonials-sec py-[120px] px-[5%] bg-surfaceDark/30 relative">
        <div className="reveal-content w-full flex flex-col">
          <div className="text-center mb-[80px] max-w-[1200px] mx-auto w-full">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
              Words of Love
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
              Loved by Generations
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
          </div>
          
          <div className="testi-card max-w-[800px] mx-auto bg-surfaceDark/65 border border-goldPrimary/12 backdrop-blur-md p-[60px] rounded-[30px] text-center relative w-full">
            <div className="quote-icon font-serif text-[80px] text-goldPrimary opacity-15 absolute top-5 left-10 leading-none">“</div>
            <p className="testi-quote font-serif text-2xl md:text-3xl italic leading-[1.5] mb-[30px] text-textLight">
              "StudioLive turned our Jaipur wedding into a cinematic masterpiece. Looking at the gallery and videos, we were transported back to the sounds of the shehnai and the warmth of the palace. Absolutely elite craftsmanship!"
            </p>
            <div className="testi-author text-base font-semibold text-goldPrimary tracking-[0.1em] uppercase">
              Aishwarya & Ritvik
            </div>
            <div className="testi-loc text-xs text-textDim mt-1">
              Jaipur Royal Palace
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) */}
      <section className="reveal-section cta-sec cta-sec-bg py-[160px] px-[5%] text-center relative">
        <div className="reveal-content w-full">
          <div className="cta-wrap max-w-[800px] mx-auto flex flex-col items-center">
            <h2 className="font-serif text-5xl md:text-6xl text-textLight mb-6 leading-tight">
              Let's craft your heritage film together.
            </h2>
            <p className="text-textDim text-lg mb-10 max-w-[600px] leading-relaxed">
              Our booking calendars fill up quickly. Secure your special dates with our national creative leads today.
            </p>
            <button 
              onClick={() => onChangePage('book')}
              className="btn-gold"
            >
              Check Availability <Calendar size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
