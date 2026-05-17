import { Calendar, Video, Camera, BookOpen, Quote } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-content">
      {/* Full Bleed Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
        <div className="absolute inset-0 z-0">
          <img src="/wedding_hero_1779003385496.png" alt="Cinematic Wedding Photography" className="w-full h-full object-cover opacity-20" />
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

      {/* Featured In / Our Clients */}
      <section className="py-20 border-t border-surface-light reveal bg-surface/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-dim uppercase mb-10">As Featured In & Trusted By</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-3xl font-serif font-bold text-primary tracking-tighter">VOGUE</div>
            <div className="text-2xl font-sans font-extrabold text-primary tracking-widest">WedMeGood</div>
            <div className="text-3xl font-serif italic text-primary">The Knot</div>
            <div className="text-2xl font-sans font-bold text-primary uppercase tracking-widest">Harper's</div>
            <div className="text-3xl font-serif text-primary">ShaadiSaga</div>
          </div>
        </div>
      </section>

      {/* Masonry Portfolio Grid */}
      <section className="bg-surface py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-4">Featured Love Stories</h2>
            <p className="text-dim text-lg">A glimpse into the magical moments we've captured.</p>
          </div>
          
          <div className="masonry-grid reveal">
            <button onClick={() => onNavigate('events')} className="masonry-item group rounded-xl overflow-hidden relative border-0 p-0 text-left cursor-pointer w-full">
              <img src="/cat_wedding_1779003426108.png" alt="Wedding Portrait" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-editorial text-white text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Riya & Vikram</h3>
                <p className="text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Royal Jaipur Wedding</p>
              </div>
            </button>
            
            <button onClick={() => onNavigate('events')} className="masonry-item group rounded-xl overflow-hidden relative border-0 p-0 text-left cursor-pointer w-full">
              <img src="/cat_prewedding_1779003441441.png" alt="Pre Wedding" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-editorial text-white text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Ananya & Rahul</h3>
                <p className="text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Goa Pre-Wedding</p>
              </div>
            </button>
            
            <button onClick={() => onNavigate('events')} className="masonry-item group rounded-xl overflow-hidden relative border-0 p-0 text-left cursor-pointer w-full">
              <img src="/cat_party_1779003482789.png" alt="Party" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-editorial text-white text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Sangeet Night</h3>
                <p className="text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Candid Expressions</p>
              </div>
            </button>
            
            <button onClick={() => onNavigate('events')} className="masonry-item group rounded-xl overflow-hidden relative border-0 p-0 text-left cursor-pointer w-full">
              <img src="/our_story_1779003402621.png" alt="Couple" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-editorial text-white text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Pooja & Karan</h3>
                <p className="text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">Intimate Portraits</p>
              </div>
            </button>
          </div>
          
          <div className="text-center mt-16">
            <button onClick={() => onNavigate('events')} className="btn-primary border-0 cursor-pointer">View Full Gallery</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center reveal">
        <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-16">Words of Love</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-3xl p-8 shadow-lg relative text-left">
            <Quote className="w-8 h-8 text-primary/20 mb-6" />
            <p className="text-editorial text-xl text-primary leading-relaxed mb-8">
              "StudioLive captured the soul of our wedding. We didn't even notice them half the time, yet they managed to photograph the most intimate, breathtaking candid moments."
            </p>
            <p className="font-bold tracking-widest uppercase text-xs text-dim">
              Neha & Siddharth<br /><span className="font-normal text-primary/60">Mumbai</span>
            </p>
          </div>
          
          <div className="bg-primary rounded-3xl p-8 shadow-xl relative text-left transform md:-translate-y-4">
            <Quote className="w-8 h-8 text-white/20 mb-6" />
            <p className="text-editorial text-xl text-white leading-relaxed mb-8">
              "The cinematic film made our entire family cry. It felt like watching a Hollywood movie of our own life. Absolute perfection from the team!"
            </p>
            <p className="font-bold tracking-widest uppercase text-xs text-white/70">
              Pooja & Karan<br /><span className="font-normal text-white/50">Udaipur</span>
            </p>
          </div>
          
          <div className="bg-background rounded-3xl p-8 shadow-lg relative text-left">
            <Quote className="w-8 h-8 text-primary/20 mb-6" />
            <p className="text-editorial text-xl text-primary leading-relaxed mb-8">
              "Their energy, professionalism, and eye for detail is unmatched. The Italian photobook they delivered is a piece of art that sits perfectly in our living room."
            </p>
            <p className="font-bold tracking-widest uppercase text-xs text-dim">
              Riya & Vikram<br /><span className="font-normal text-primary/60">Jaipur</span>
            </p>
          </div>
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
