import { HeroSection } from "@/components/features/HeroSection";
import { OrientationSection } from "@/components/features/home/OrientationSection";
import { MeetStudioSection } from "@/components/features/home/MeetStudioSection";
import { ServicesSection } from "@/components/features/ServicesSection";
import { ProjectStoriesSection } from "@/components/features/home/ProjectStoriesSection";
import { AppIntroSection } from "@/components/features/home/AppIntroSection";
import { AppBenefitsSection } from "@/components/features/home/AppBenefitsSection";
import { EcosystemTimelineSection } from "@/components/features/home/EcosystemTimelineSection";
import { PackagesPreviewSection } from "@/components/features/home/PackagesPreviewSection";
import { TeamPreviewSection } from "@/components/features/home/TeamPreviewSection";
import { GalleryShopPreviewSection } from "@/components/features/home/GalleryShopPreviewSection";
import { HomeFAQSection } from "@/components/features/home/HomeFAQSection";
import { FinalCTASection } from "@/components/features/home/FinalCTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      
      {/* 1. Welcome to the Studio */}
      <HeroSection />
      
      {/* 2. New Here? */}
      <OrientationSection />
      
      {/* 3. Meet the Studio */}
      <MeetStudioSection />
      
      {/* 4. What We Create */}
      <ServicesSection />
      
      {/* 5. Our Projects */}
      <ProjectStoriesSection />
      
      {/* 6. The App */}
      <AppIntroSection />
      
      {/* 7 & 8. Why Use It? / How it Works */}
      <AppBenefitsSection />
      <EcosystemTimelineSection />
      
      {/* 9 & 10. Packages & Builder */}
      <PackagesPreviewSection />
      
      {/* 11. The People */}
      <TeamPreviewSection />
      
      {/* 12 & 13. Gallery & Shop */}
      <GalleryShopPreviewSection />
      
      {/* 14. Trust (Reviews & Local SEO) */}
      <section className="relative py-32 px-4 overflow-hidden border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4">Can I trust you?</h2>
            <p className="text-muted-foreground text-xl">See what our clients have to say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-20">
            {[
              { text: "Absolutely stunning photography. The team made us feel so comfortable and the final edits were breathtaking. Highly recommend!", author: "Sarah & James" },
              { text: "They captured my senior portraits perfectly. They knew exactly how to use the natural light to make the photos look ethereal.", author: "Emily R." },
              { text: "We book them every year for our family portraits. Always professional, always incredible results.", author: "The Thompson Family" }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-card rounded-2xl border border-white/5 shadow-lg">
                <div className="flex text-primary mb-4">{"★★★★★"}</div>
                <p className="text-muted-foreground italic mb-6">"{review.text}"</p>
                <div className="font-semibold">{review.author}</div>
              </div>
            ))}
            <div className="col-span-1 md:col-span-3 text-center mt-4">
              <Button variant="link" className="text-primary text-lg" asChild>
                 <Link href="/reviews">Read all reviews →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <HomeFAQSection />
      
      {/* 16. Final CTA */}
      <FinalCTASection />
      
    </div>
  );
}
