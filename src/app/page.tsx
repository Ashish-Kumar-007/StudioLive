import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/mock-data";

export const metadata = {
  title: "Professional Photography Studio in Your City | StudioLive",
  description:
    "StudioLive offers professional wedding, pre-wedding, and portrait photography services. Explore our portfolio and book your session online.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-muted">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Photography Studio
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Capturing your most precious moments with elegance and creativity. Wedding, Pre-Wedding, Portrait, and Event Photography.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book">Check Availability</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-foreground" asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Photography Services</h2>
          <p className="text-muted-foreground">Expert photography tailored to your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group rounded-lg overflow-hidden border bg-card">
              <div className="aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  [Image: {service.title}]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Button variant="link" className="px-0" asChild>
                  <Link href={`/services/${service.slug}`}>Learn More →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Local SEO Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose StudioLive?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We are a leading photography studio dedicated to capturing authentic emotions and stunning visuals. Our team uses state-of-the-art equipment and creative expertise to deliver high-quality photographs that you will cherish forever.
          </p>
          <Button size="lg" asChild>
            <Link href="/about">More About Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
