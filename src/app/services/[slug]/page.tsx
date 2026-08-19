import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} in Your City | StudioLive`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-muted">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title} in Your City</h1>
          <p className="text-lg md:text-xl mb-8">{service.description}</p>
          <Button size="lg" asChild>
            <Link href="/book">Check Availability</Link>
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="prose prose-lg dark:prose-invert mx-auto mb-16 text-center">
          <h2>What's Included in {service.title}</h2>
          <p className="text-muted-foreground">
            Our {service.title.toLowerCase()} packages are tailored to meet your unique needs. We provide full coverage, high-resolution edited images, and dedicated support from start to finish.
          </p>
        </div>

        {/* Pricing / Packages CTA */}
        <div className="bg-card border rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">View Our Packages</h3>
          <p className="text-muted-foreground mb-6">Explore our standard options or contact us for a custom quote.</p>
          <Button variant="outline" asChild>
            <Link href="/packages">View Pricing</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
