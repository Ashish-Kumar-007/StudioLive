import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About StudioLive | Professional Photography Team",
  description: "Learn more about StudioLive, our professional photography team, and our commitment to capturing your best moments.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About StudioLive</h1>
      
      <div className="prose prose-lg mx-auto dark:prose-invert">
        <p className="text-xl text-muted-foreground mb-8 text-center">
          We are a team of passionate visual storytellers dedicated to preserving your most precious memories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground">
              Every moment is unique, and so is every client. We approach each project with fresh eyes and a commitment to authenticity. Whether it's a grand wedding or a quiet portrait session, we strive to capture the true essence of the people in front of our lenses.
            </p>
          </div>
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>📸 Specializing in Wedding & Portrait Photography</li>
              <li>🏆 Award-winning creative team</li>
              <li>🌍 Available for local and destination shoots</li>
              <li>💖 Over [Placeholder] happy couples & clients</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
