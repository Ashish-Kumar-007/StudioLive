import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Photography Blog & Tips | StudioLive",
  description: "Read our latest articles on photography tips, wedding planning advice, and behind-the-scenes stories from StudioLive.",
};

const posts = [
  {
    id: 1,
    title: "5 Tips for a Stress-Free Wedding Day Timeline",
    category: "Wedding Planning",
    date: "2026-08-10",
    excerpt: "Planning your wedding day timeline can be overwhelming. Here are our top tips for ensuring everything runs smoothly.",
  },
  {
    id: 2,
    title: "Best Locations for Pre-Wedding Shoots in the City",
    category: "Locations",
    date: "2026-07-25",
    excerpt: "Discover our favorite hidden gems and iconic spots for stunning pre-wedding photography.",
  },
  {
    id: 3,
    title: "What to Wear for Your Family Portrait Session",
    category: "Style Guide",
    date: "2026-07-05",
    excerpt: "Coordinating outfits for a family portrait doesn't have to be hard. Follow these simple rules for timeless photos.",
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-6">The Studio Journal</h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Insights, tips, and stories from behind the lens.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="group bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-video bg-muted relative overflow-hidden">
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/mock-images/portrait.jpg')" }} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-primary text-xs font-semibold uppercase tracking-wider mb-2">{post.category}</div>
                <h2 className="font-playfair text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                  <Button variant="link" className="px-0">Read More →</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
