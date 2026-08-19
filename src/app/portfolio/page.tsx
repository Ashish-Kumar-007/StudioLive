import { Metadata } from "next";
import { portfolio } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Photography Portfolio | StudioLive",
  description: "Explore our recent photography projects, including weddings, pre-wedding shoots, and portrait sessions.",
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-xl text-muted-foreground">Stories told through our lenses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolio.map((project) => (
          <Link href={`/portfolio/${project.slug}`} key={project.id} className="group block">
            <div className="bg-card border rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                   View Gallery
                 </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{project.location}</span>
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to create your own story?</h3>
        <Button size="lg" asChild>
          <Link href="/book">Book a Session</Link>
        </Button>
      </div>
    </div>
  );
}
