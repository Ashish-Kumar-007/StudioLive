import React, { useState, useMemo } from 'react';
import { Lightbox } from './Lightbox';
import { Search, SlidersHorizontal, Image as ImageIcon, Film } from 'lucide-react';

interface PortfolioItem {
  img: string;
  videoUrl?: string;
  title: string;
  desc: string;
  category: string;
  tags: string[];
  spanClass: string;
  specs: {
    camera: string;
    lens: string;
    aperture: string;
    location: string;
  };
}

const portfolioData: PortfolioItem[] = [
  {
    img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200",
    title: "The Regal Veil",
    desc: "A stunning editorial portrait capturing a traditional Indian bride through delicate light refractions, set against the historic arches of Udaipur City Palace.",
    category: "Weddings",
    tags: ["bride", "veil", "palace", "udaipur", "gold", "emotional", "traditional"],
    spanClass: "masonry-span-2 masonry-col-2",
    specs: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 110mm f/2 R LM WR",
      aperture: "f/2.0, 1/250s, ISO 160",
      location: "City Palace, Udaipur"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1595878715977-2e8f8df6392e?q=80&w=1200",
    title: "Symphony in Silk",
    desc: "A high-fashion luxury editorial depicting cascading flows of raw crimson silk against matte black basalt textures. Inspired by A24 mood elements.",
    category: "Fashion",
    tags: ["fashion", "silk", "red", "basalt", "mood", "cinematic", "texture"],
    spanClass: "masonry-span-2",
    specs: {
      camera: "Hasselblad H6D-100c",
      lens: "HC 80mm f/2.8",
      aperture: "f/4.0, 1/160s, ISO 64",
      location: "Basalt Cliffs, India"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800",
    title: "The Royal Custodian",
    desc: "A solemn, cinematic portrait of the palace groom, captured with harsh side-spotlighting mimicking classical oil paintings.",
    category: "Cinematic Portraits",
    tags: ["portrait", "groom", "palace", "traditional", "shadow", "oilpainting"],
    spanClass: "",
    specs: {
      camera: "Sony A7R V",
      lens: "FE 85mm f/1.2 GM",
      aperture: "f/1.2, 1/320s, ISO 100",
      location: "Jagmandir Island, Udaipur"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    title: "The Palace Mandap",
    desc: "Volumetric light beams splitting through marigold arches as a midnight sacred union proceeds under Rajasthan twilight skies.",
    category: "Weddings",
    tags: ["mandap", "night", "twilight", "marigold", "beams", "sacred", "union"],
    spanClass: "",
    specs: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 45-100mm f/4",
      aperture: "f/4.0, 1/30s, ISO 800",
      location: "Leela Palace, Udaipur"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
    title: "Virtual Sets Lab",
    desc: "A behind-the-scenes glimpse at our physical-virtual hybrid studio camera setup blending virtual Unreal Engine projection walls with real props.",
    category: "Commercial Shoots",
    tags: ["studio", "virtual", "camera", "behind-the-scenes", "lighting", "unreal"],
    spanClass: "masonry-col-2",
    specs: {
      camera: "ARRI Alexa Mini LF",
      lens: "Signature Prime 35mm",
      aperture: "T1.8, 1/48s, ISO 800",
      location: "Studio 1, Udaipur"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1200",
    title: "The Thar Caravan",
    desc: "Deep gold sand dunes during golden hour as a camel caravan cuts a silhouette across the Jaisalmer horizon, captured for our luxury travel reel.",
    category: "Travel Films",
    tags: ["desert", "caravan", "silhouette", "sunset", "gold", "travel", "jaisalmer"],
    spanClass: "masonry-span-2",
    specs: {
      camera: "RED V-Raptor 8K",
      lens: "Zeiss Supreme Prime 50mm",
      aperture: "T2.0, 1/96s, ISO 250",
      location: "Sam Sand Dunes, Jaisalmer"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
    title: "Grand Sparkler Entrance",
    desc: "A massive slow-motion sparkler crossfire as the newlywed couple enters the palace ballroom, creating sparkling emotional reflections.",
    category: "Luxury Events",
    tags: ["sparklers", "ballroom", "reflections", "reception", "emotional", "palace"],
    spanClass: "",
    specs: {
      camera: "Sony A7S III",
      lens: "FE 24-70mm f/2.8 GM II",
      aperture: "f/2.8, 1/200s, ISO 1600",
      location: "Rambagh Palace, Jaipur"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1597157639073-69284ac0f8b2?q=80&w=800",
    title: "Golden Hour Glow",
    desc: "A natural light close-up capturing dust motes floating in sun shafts illuminating heritage jewelry during Jaipur pre-wedding chapters.",
    category: "Cinematic Portraits",
    tags: ["portrait", "jewelry", "gold", "sunshafts", "dust", "jaipur"],
    spanClass: "",
    specs: {
      camera: "Sony A7R V",
      lens: "FE 50mm f/1.2 GM",
      aperture: "f/1.2, 1/500s, ISO 100",
      location: "Amer Fort, Jaipur"
    }
  }
];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Weddings', 'Fashion', 'Cinematic Portraits', 'Commercial Shoots', 'Travel Films', 'Luxury Events'];

  // AI-Search & Category Filters Logic
  const filteredData = useMemo(() => {
    return portfolioData.filter(item => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      
      const cleanQuery = searchQuery.toLowerCase().trim();
      if (!cleanQuery) return categoryMatch;

      // Match against titles, categories, descriptions, or tags
      const tagMatch = item.tags.some(tag => tag.includes(cleanQuery));
      const titleMatch = item.title.toLowerCase().includes(cleanQuery);
      const descMatch = item.desc.toLowerCase().includes(cleanQuery);
      const catMatch = item.category.toLowerCase().includes(cleanQuery);

      return categoryMatch && (tagMatch || titleMatch || descMatch || catMatch);
    });
  }, [selectedCategory, searchQuery]);

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredData.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredData.length) % filteredData.length);
  };

  return (
    <section className="content-section min-h-screen py-24 px-[5%] max-w-[1400px] mx-auto relative z-20" id="portfolio">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Portfolio Reels
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Curated Visual Chapters
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16 w-full glass-panel p-6 rounded-2xl">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 max-md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-goldPrimary text-bgDark shadow-goldGlow font-bold'
                    : 'bg-white/5 text-textDim hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* AI Search input */}
          <div className="relative w-full lg:max-w-xs flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="AI Tag Search (e.g. gold, emotional, palace...)"
              className="w-full bg-bgDark/80 border border-goldPrimary/15 rounded-full py-3 pl-11 pr-5 text-sm text-textLight placeholder-textDim/50 focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
            />
            <Search size={16} className="absolute left-4 text-goldPrimary/60" />
          </div>

        </div>

        {/* Masonry Grid */}
        {filteredData.length > 0 ? (
          <div className="masonry-grid w-full">
            {filteredData.map((item, index) => (
              <div
                key={item.title}
                onClick={() => setActiveLightboxIndex(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-surfaceDark/40 transition-all duration-500 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)] ${item.spanClass}`}
                data-cursor="view"
              >
                {/* Image */}
                <div className="w-full h-full min-h-[280px] overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover desaturate-sweep"
                    loading="lazy"
                  />
                  
                  {/* Cinematic black overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Overlay Meta Details */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-bold tracking-widest text-saffronPrimary uppercase mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-2 leading-tight group-hover:text-goldPrimary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-textDim text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-[90%]">
                      {item.desc.length > 110 ? `${item.desc.substring(0, 110)}...` : item.desc}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4 text-[10px] font-mono text-goldPrimary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span>{item.specs.location}</span>
                      <span>•</span>
                      <span>{item.specs.camera.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Indicator Icon */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-bgDark/80 border border-white/10 flex items-center justify-center text-goldPrimary opacity-60 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl">
                    {item.videoUrl ? <Film size={14} /> : <ImageIcon size={14} />}
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 text-center glass-panel rounded-3xl">
            <SlidersHorizontal size={36} className="mx-auto mb-4 text-goldPrimary/40 animate-bounce" />
            <p className="font-serif text-2xl text-white mb-2">No Visual Reels Found</p>
            <p className="text-textDim text-sm max-w-md mx-auto">
              Our intelligence database could not find shots matching "{searchQuery}". Try searching for tags like "gold", "palace", "veil", or "emotional".
            </p>
          </div>
        )}

      </div>

      {/* Embedded Lightbox */}
      {activeLightboxIndex !== null && filteredData[activeLightboxIndex] && (
        <Lightbox
          item={filteredData[activeLightboxIndex]}
          onClose={() => setActiveLightboxIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
};
