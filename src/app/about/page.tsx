import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About StudioLive | Our Story & Team",
  description: "Learn about StudioLive's photography philosophy, our experienced team of photographers, and our commitment to capturing authentic moments.",
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About StudioLive",
  "description": "Learn about StudioLive's photography philosophy, our experienced team of photographers, and our commitment to capturing authentic moments.",
  "mainEntity": {
    "@type": "Organization",
    "name": "StudioLive",
    "foundingDate": "2015",
    "founders": [
      {
        "@type": "Person",
        "name": "Alex Mercer"
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-32 pb-20 px-4">
      <JsonLd data={aboutSchema} />
      
      <div className="max-w-4xl mx-auto text-center mb-24">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">Our Philosophy</h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
          We don't just take pictures; we document legacies. StudioLive was founded on the belief that every person, every couple, and every family has a story worthy of being told with cinematic elegance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden relative grayscale opacity-80">
           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/mock-images/portrait.jpg')" }} />
        </div>
        <div>
          <h2 className="font-playfair text-4xl font-bold mb-6">10 Years of Excellence</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Since 2015, StudioLive has been at the forefront of contemporary photography in Your City. What started as a small passion project by lead photographer Alex Mercer has grown into a collective of visual artists dedicated to their craft.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Our approach blends photojournalism with fine-art editorial styles. We look for the in-between moments—the unscripted laughs, the quiet glances, the raw emotion—and capture them beautifully.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="font-playfair text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Weddings Captured</div>
            </div>
            <div>
              <div className="font-playfair text-5xl font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Industry Awards</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Team */}
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-4xl font-bold mb-12 text-center">Meet the Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {['Alex Mercer', 'Jordan Lee', 'Taylor Reed'].map((name, i) => (
            <div key={i} className="text-center group">
              <div className="aspect-square bg-muted rounded-full overflow-hidden mb-6 mx-auto w-64 h-64 relative border border-white/10 group-hover:border-primary transition-colors">
                 <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url('/mock-images/p${i+1}-1.jpg')` }} />
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-2">{name}</h3>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">
                {i === 0 ? 'Founder & Lead Photographer' : 'Senior Photographer'}
              </p>
              <p className="text-muted-foreground">Specializing in capturing authentic emotion through a cinematic lens.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
