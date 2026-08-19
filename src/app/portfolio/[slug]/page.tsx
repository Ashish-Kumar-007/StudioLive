import { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolio } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | StudioLive Portfolio`,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-20 px-4 max-w-5xl">
      <div className="mb-12">
        <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-6">
          ← Back to Portfolio
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="bg-muted px-3 py-1 rounded-full">{project.location}</span>
          <span className="bg-muted px-3 py-1 rounded-full">{new Date(project.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
        <p className="text-xl">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.images.map((img, idx) => (
          <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center border">
             {/* Placeholder for Next/Image */}
             <span className="text-muted-foreground text-sm">Image {idx + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t pt-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Love this style?</h2>
        <Button size="lg" asChild>
          <Link href="/book">Book Your Shoot</Link>
        </Button>
      </div>
    </div>
  );
}
