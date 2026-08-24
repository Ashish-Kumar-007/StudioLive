import { HeroSection } from "@/components/features/HeroSection";
import { ServicesSection } from "@/components/features/ServicesSection";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const metadata = {
  title: "Professional Photography Studio in Your City | StudioLive",
  description:
    "StudioLive offers professional wedding, pre-wedding, and portrait photography services. Explore our portfolio and book your session online.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "StudioLive",
  "image": "https://www.studiolive.example.com/mock-images/portrait.jpg",
  "@id": "https://www.studiolive.example.com",
  "url": "https://www.studiolive.example.com",
  "telephone": "+1234567890",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Photography Lane",
    "addressLocality": "Your City",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <JsonLd data={localBusinessSchema} />
      <HeroSection />
      
      <ServicesSection />

      {/* Trust & Local SEO Section */}
      <section className="relative py-32 px-4 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
            Why Choose StudioLive?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light leading-relaxed">
            We are a leading photography studio dedicated to capturing authentic emotions and stunning visuals. Our team uses state-of-the-art equipment and creative expertise to deliver high-quality photographs that you will cherish forever.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg" asChild>
            <Link href="/about">Discover Our Story</Link>
          </Button>
        </div>

        {/* Client Reviews Snippet */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-20">
          {[1, 2, 3].map((review) => (
            <div key={review} className="p-8 bg-card rounded-2xl border border-white/5">
              <div className="flex text-primary mb-4">
                {"★★★★★"}
              </div>
              <p className="text-muted-foreground italic mb-6">"Absolutely stunning photography. The team made us feel so comfortable and the final edits were breathtaking. Highly recommend!"</p>
              <div className="font-semibold">— Happy Client {review}</div>
            </div>
          ))}
          <div className="col-span-1 md:col-span-3 text-center mt-4">
            <Button variant="link" className="text-primary" asChild>
               <Link href="/reviews">Read all reviews →</Link>
            </Button>
          </div>
        </div>

        {/* Local Service Area & Map */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
           <div>
             <h3 className="font-playfair text-3xl font-bold mb-6">Serving Your City & Beyond</h3>
             <p className="text-muted-foreground mb-6">
               Our primary studio is located in the heart of Your City, but we frequently travel to surrounding areas for destination weddings and unique outdoor shoots.
             </p>
             <ul className="space-y-2 mb-8">
               <li className="flex items-center text-muted-foreground">
                 <span className="text-primary mr-2">✓</span> Downtown Your City
               </li>
               <li className="flex items-center text-muted-foreground">
                 <span className="text-primary mr-2">✓</span> Surrounding Suburbs
               </li>
               <li className="flex items-center text-muted-foreground">
                 <span className="text-primary mr-2">✓</span> Available for Destination Travel
               </li>
             </ul>
           </div>
           <div className="bg-muted aspect-video rounded-2xl border border-white/10 flex items-center justify-center">
             <span className="text-muted-foreground">[Interactive Map Placeholder]</span>
           </div>
        </div>
      </section>
    </div>
  );
}
