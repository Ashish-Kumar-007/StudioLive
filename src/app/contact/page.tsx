import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Contact StudioLive | Book a Photographer in Your City",
  description: "Get in touch with StudioLive to book your professional photography session. Serving clients with top-tier wedding, portrait, and event photography.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
        Ready to capture your special moments? Reach out to us for bookings, inquiries, and custom packages.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium">Interested Service</label>
              <Input id="service" placeholder="e.g., Wedding Photography" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Tell us about your event or photoshoot needs..."
              />
            </div>
            <Button type="button" className="w-full">Send Inquiry</Button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Studio Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Address:</strong><br />
                [Studio Address Line 1]<br />
                [City], [State] [Zip]
              </p>
              <p>
                <strong className="text-foreground">Phone:</strong><br />
                [Phone Number Placeholder]
              </p>
              <p>
                <strong className="text-foreground">Email:</strong><br />
                hello@studiolive.example.com
              </p>
            </div>
          </div>
          
          <div className="bg-muted aspect-video rounded-lg flex items-center justify-center border">
            {/* Lazy-loaded map placeholder */}
            <p className="text-muted-foreground">[Google Map Embed Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
