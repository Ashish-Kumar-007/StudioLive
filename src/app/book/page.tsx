import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Book Your Photography Session | StudioLive",
  description: "Check availability and book your photography session with StudioLive.",
  robots: { index: false, follow: true }, // Usually noindex for booking pages as per SEO review
};

export default function BookPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Book Your Shoot</h1>
        <p className="text-muted-foreground">Fill out the details below to check availability and start your booking process.</p>
      </div>

      <div className="bg-card border rounded-lg p-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium">Select Service</label>
            <select id="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>Wedding Photography</option>
              <option>Pre-Wedding Shoot</option>
              <option>Portrait Photography</option>
              <option>Event Photography</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Preferred Date</label>
            <Input id="date" type="date" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
            <textarea 
              id="notes" 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="Any specific locations, themes, or requests..."
            />
          </div>

          <Button type="button" className="w-full" size="lg">Submit Booking Request</Button>
        </form>
      </div>
    </div>
  );
}
