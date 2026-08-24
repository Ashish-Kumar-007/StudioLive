import { PortfolioGrid } from "@/components/features/PortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Photography Portfolio | StudioLive",
  description: "Explore our recent photography projects, including weddings, pre-wedding shoots, and portrait sessions.",
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-32 px-4 max-w-7xl">
      <div className="text-center mb-24">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">Selected Works</h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
          A curated collection of stories told through our lenses.
        </p>
      </div>

      <PortfolioGrid />
    </div>
  );
}
