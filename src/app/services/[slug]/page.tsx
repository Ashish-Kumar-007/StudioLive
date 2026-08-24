import { Metadata } from "next";
import { services, portfolio } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} in Your City | StudioLive`,
    description: service.description,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  // Find related portfolio projects
  const relatedProjects = portfolio.slice(0, 3); // Mocking related projects

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "StudioLive"
    },
    "areaServed": {
      "@type": "City",
      "name": "Your City"
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "price": "500.00",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is included in the ${service.title} package?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our packages typically include pre-consultation, hours of coverage, professionally edited high-resolution images, and a private online gallery."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to receive the photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can expect to receive your fully edited gallery within 4-6 weeks after the shoot."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-10 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg" asChild>
              <Link href="/book">Request Availability</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included & Process */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8">What You Receive</h2>
          <ul className="space-y-6">
            {['Initial Consultation & Planning', 'Professional Lighting & Equipment', 'High-Resolution Edited Images', 'Private Online Gallery for 1 Year', 'Print & Sharing Rights'].map((item, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-primary mr-4 shrink-0" />
                <span className="text-lg text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-muted p-10 rounded-2xl border border-white/5">
          <h2 className="font-playfair text-3xl font-bold mb-8">Our Process</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-2">1. The Vision</h4>
              <p className="text-muted-foreground">We meet to discuss your ideas, locations, and the story you want to tell.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">2. The Shoot</h4>
              <p className="text-muted-foreground">A relaxed, guided session focusing on authentic moments.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">3. The Delivery</h4>
              <p className="text-muted-foreground">Meticulous post-production color grading and retouching before final delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Portfolio */}
      <section className="py-24 px-4 bg-muted/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4">Recent {service.title} Stories</h2>
            <p className="text-muted-foreground">Browse our latest work in this category.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map(project => (
              <Link href={`/portfolio/${project.slug}`} key={project.id} className="group block">
                <div className="aspect-[4/5] bg-muted relative rounded-xl overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${project.images[0] || '/mock-images/p1-1.jpg'})` }} />
                </div>
                <h3 className="font-playfair text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <h2 className="font-playfair text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border border-white/10 rounded-xl p-6 bg-card">
            <h4 className="text-xl font-semibold mb-3">What is included in the {service.title} package?</h4>
            <p className="text-muted-foreground">Our packages typically include pre-consultation, hours of coverage, professionally edited high-resolution images, and a private online gallery.</p>
          </div>
          <div className="border border-white/10 rounded-xl p-6 bg-card">
            <h4 className="text-xl font-semibold mb-3">How long does it take to receive the photos?</h4>
            <p className="text-muted-foreground">You can expect to receive your fully edited gallery within 4-6 weeks after the shoot. Sneak peeks are provided within 48 hours.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold mb-6">Let's Tell Your Story</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Dates fill up quickly. Reach out today to secure your session and begin the planning process.</p>
        <Button size="lg" className="h-14 px-10 text-lg" asChild>
          <Link href="/book">Book Now</Link>
        </Button>
      </section>
    </div>
  );
}
