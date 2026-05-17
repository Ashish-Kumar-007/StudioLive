import { useRef, useState } from 'react';
import { Calendar, Video, Camera, BookOpen, Quote } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  isPrimary?: boolean;
  floatClass: string;
}

// 3D Parallax Testimonial Card with Organic Auto-Bobbing Drift
function TestimonialCard({ quote, author, location, isPrimary = false, floatClass }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setIsHovered(true);
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Responsive 3D tilt tracking the mouse
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`testimonial-card-3d rounded-3xl p-8 relative text-left select-none origin-center ${
        isHovered ? '' : floatClass
      } ${
        isPrimary
          ? 'bg-primary text-white shadow-2xl border border-white/10'
          : 'bg-background text-primary border border-surface-light hover:border-primary/20 shadow-lg'
      }`}
      style={{
        transform: isHovered ? transformStyle : undefined,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        willChange: 'transform'
      }}
    >
      {/* 3D Depth Parallax Content Layer */}
      <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        <Quote className={`w-8 h-8 mb-6 ${isPrimary ? 'text-white/20' : 'text-primary/20'}`} />
        <p className={`text-editorial text-xl leading-relaxed mb-8 ${isPrimary ? 'text-white' : 'text-primary'}`}>
          {quote}
        </p>
        <p className={`font-bold tracking-widest uppercase text-xs ${isPrimary ? 'text-white/70' : 'text-dim'}`}>
          {author}<br />
          <span className={`font-normal text-xs ${isPrimary ? 'text-white/50' : 'text-primary/60'}`}>
            {location}
          </span>
        </p>
      </div>
    </div>
  );
}

interface LoveStoryCardProps {
  img: string;
  title: string;
  desc: string;
  onClick: () => void;
}

// Peak 3D Parallax Love Story Card with Depth Shifting Holographic Parallax
function LoveStoryCard({ img, title, desc, onClick }: LoveStoryCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [imgStyle, setImgStyle] = useState<string>('scale(1.05) translate3d(0,0,0)');

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    setIsHovered(true);
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Card frame rotations (max 10 degrees)
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Image offset parallax shifts (opposite of mouse tilt to give volumetric 3D look!)
    const imgX = ((centerX - x) / centerX) * 8;
    const imgY = ((centerY - y) / centerY) * 8;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setImgStyle(`scale(1.15) translate3d(${imgX}px, ${imgY}px, 0px)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('');
    setImgStyle('scale(1.05) translate3d(0,0,0)');
  };

  return (
    <button
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group rounded-3xl overflow-hidden relative border-0 p-0 text-left cursor-pointer w-full shadow-lg aspect-[4/3] transition-all duration-300"
      style={{
        transform: isHovered ? transformStyle : undefined,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
        boxShadow: isHovered ? '0 25px 50px -12px rgba(48, 54, 79, 0.4)' : '0 10px 15px -3px rgba(48, 54, 79, 0.1)',
        willChange: 'transform'
      }}
    >
      {/* 3D Depth Shrunk Parallax Image Frame */}
      <div className="absolute inset-0 overflow-hidden" style={{ transform: 'translateZ(-12px)' }}>
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover" 
          style={{
            transform: imgStyle,
            transition: isHovered ? 'none' : 'transform 0.5s ease-out',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Glossy Spot Flare Sweep Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
          transform: isHovered ? 'translateZ(10px)' : undefined
        }}
      />

      {/* Floating Card Content Layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent flex flex-col justify-end p-8 z-20"
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
      >
        <h3 className="text-editorial text-white text-3xl mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
        <p className="text-white/80 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{desc}</p>
      </div>
    </button>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-content">
      {/* Full Bleed Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
        <div className="absolute inset-0 z-0">
          <img src="/wedding-hero.png" alt="Cinematic Wedding Photography" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="reveal">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
              Capturing Life's Best Moments
            </div>
            <h1 className="text-editorial text-5xl md:text-7xl lg:text-8xl text-primary mb-6 leading-tight">
              Capturing Love<br />& Timeless Moments.
            </h1>
            <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto mb-10">
              StudioLive provides premium, candid photography and cinematic films for your special days. Relive your magic over and over.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigate('contact')} 
                className="btn-primary border-0 cursor-pointer"
              >
                Check Availability <Calendar className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('events')} 
                className="px-8 py-3 rounded-full border border-primary/30 font-semibold bg-transparent text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The StudioLive Experience */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-6">The StudioLive Experience</h2>
        <p className="text-dim text-lg max-w-3xl mx-auto mb-16">
          We don't just take pictures; we tell your story. Our unobtrusive approach ensures we capture genuine, candid emotions while you simply live in the moment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 rounded-2xl reveal flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cinematic Films</h3>
            <p className="text-dim">Breathtaking storytelling that looks like a Hollywood movie.</p>
          </div>
          
          <div className="glass p-10 rounded-2xl reveal flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Candid Moments</h3>
            <p className="text-dim">Unscripted smiles, laughter, and tears preserved forever.</p>
          </div>
          
          <div className="glass p-10 rounded-2xl reveal flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fine-Art Albums</h3>
            <p className="text-dim">Premium Italian-crafted photobooks delivered to your door.</p>
          </div>
        </div>
      </section>

      {/* 3D Ribbon Infinite Scrolling Marquee */}
      <section className="py-16 md:py-20 border-y border-surface-light bg-surface/10 marquee-3d-viewport reveal">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-dim uppercase">As Featured In & Trusted By</p>
        </div>
        <div className="marquee-3d-ribbon py-4 md:py-6 bg-primary text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="marquee-track flex gap-12 md:gap-24 items-center whitespace-nowrap">
            {/* Set 1 */}
            <span className="text-xl md:text-3xl font-serif font-bold tracking-tighter">VOGUE</span>
            <span className="text-lg md:text-2xl font-sans font-extrabold tracking-widest">WedMeGood</span>
            <span className="text-xl md:text-3xl font-serif italic">The Knot</span>
            <span className="text-lg md:text-2xl font-sans font-bold uppercase tracking-widest">Harper's</span>
            <span className="text-xl md:text-3xl font-serif">ShaadiSaga</span>
            
            {/* Set 2 */}
            <span className="text-xl md:text-3xl font-serif font-bold tracking-tighter">VOGUE</span>
            <span className="text-lg md:text-2xl font-sans font-extrabold tracking-widest">WedMeGood</span>
            <span className="text-xl md:text-3xl font-serif italic">The Knot</span>
            <span className="text-lg md:text-2xl font-sans font-bold uppercase tracking-widest">Harper's</span>
            <span className="text-xl md:text-3xl font-serif">ShaadiSaga</span>

            {/* Set 3 */}
            <span className="text-xl md:text-3xl font-serif font-bold tracking-tighter">VOGUE</span>
            <span className="text-lg md:text-2xl font-sans font-extrabold tracking-widest">WedMeGood</span>
            <span className="text-xl md:text-3xl font-serif italic">The Knot</span>
            <span className="text-lg md:text-2xl font-sans font-bold uppercase tracking-widest">Harper's</span>
            <span className="text-xl md:text-3xl font-serif">ShaadiSaga</span>
          </div>
        </div>
      </section>

      {/* Editorial Grid Gallery with Holographic 3D Parallax */}
      <section className="bg-surface py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-4">Featured Love Stories</h2>
            <p className="text-dim text-lg">A glimpse into the magical moments we've captured.</p>
          </div>
          
          {/* Perfectly Aligned 3D Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
            <LoveStoryCard 
              img="/cat-wedding.png" 
              title="Riya & Vikram" 
              desc="Royal Jaipur Wedding" 
              onClick={() => onNavigate('events')} 
            />
            
            <LoveStoryCard 
              img="/cat-prewedding.png" 
              title="Ananya & Rahul" 
              desc="Goa Pre-Wedding" 
              onClick={() => onNavigate('events')} 
            />
            
            <LoveStoryCard 
              img="/cat-party.png" 
              title="Sangeet Night" 
              desc="Candid Expressions" 
              onClick={() => onNavigate('events')} 
            />
            
            <LoveStoryCard 
              img="/our-story.png" 
              title="Pooja & Karan" 
              desc="Intimate Portraits" 
              onClick={() => onNavigate('events')} 
            />
          </div>
          
          <div className="text-center mt-16">
            <button onClick={() => onNavigate('events')} className="btn-primary border-0 cursor-pointer">View Full Gallery</button>
          </div>
        </div>
      </section>

      {/* Words of Love (Testimonials) in Dynamic 3D with Organic Auto-Bobbing */}
      <section className="testimonials-section-3d py-32 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-20 reveal">Words of Love</h2>
        
        {/* 3D Perspective container wrapper */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch"
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          <TestimonialCard 
            quote="&quot;StudioLive captured the soul of our wedding. We didn't even notice them half the time, yet they managed to photograph the most intimate, breathtaking candid moments.&quot;"
            author="Neha & Siddharth"
            location="Mumbai"
            floatClass="float-3d-card-1"
          />
          
          <TestimonialCard 
            quote="&quot;The cinematic film made our entire family cry. It felt like watching a Hollywood movie of our own life. Absolute perfection from the team!&quot;"
            author="Pooja & Karan"
            location="Udaipur"
            isPrimary={true}
            floatClass="float-3d-card-2"
          />
          
          <TestimonialCard 
            quote="&quot;Their energy, professionalism, and eye for detail is unmatched. The Italian photobook they delivered is a piece of art that sits perfectly in our living room.&quot;"
            author="Riya & Vikram"
            location="Jaipur"
            floatClass="float-3d-card-3"
          />
        </div>
      </section>

      {/* Massive Footer CTA */}
      <section className="bg-primary text-white py-32 px-6 text-center relative overflow-hidden reveal">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-editorial text-5xl md:text-6xl mb-6">Ready to tell your story?</h2>
          <p className="text-xl text-white/80 mb-12">
            We take a limited number of weddings each year to ensure the highest quality of work and personal attention to our couples.
          </p>
          <button 
            onClick={() => onNavigate('contact')} 
            className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-full text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-0 cursor-pointer"
          >
            Check Our Availability
          </button>
        </div>
      </section>
    </div>
  );
}
