import { HeroSection } from "@/components/features/HeroSection";
import { ServicesSection } from "@/components/features/ServicesSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Professional Photography Studio in Your City | StudioLive",
  description:
    "StudioLive offers professional wedding, pre-wedding, and portrait photography services. Explore our portfolio and book your session online.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      
      <ServicesSection />

      {/* Trust & Local SEO Section */}
      <section className="relative py-32 px-4 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
      </section>
    </div>
  );
}
