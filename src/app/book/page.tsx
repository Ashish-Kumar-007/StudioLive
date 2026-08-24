import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Book Your Photography Session | StudioLive",
  description: "Check availability and book your photography session with StudioLive.",
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center py-20 px-4">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      
      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden border border-white/10">
        
        {/* Left Side: Editorial Image/Text */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-muted relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
            style={{ backgroundImage: "url('/mock-images/portrait.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10">
            <h2 className="font-playfair text-4xl text-white font-bold mb-4">Let's Create Magic</h2>
            <p className="text-white/80">We only take a limited number of commissions each year to ensure the highest quality for our clients.</p>
          </div>
          <div className="relative z-10 mt-20">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm">StudioLive</p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-card p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 lg:hidden">
            <h1 className="font-playfair text-4xl font-bold mb-2">Let's Create Magic</h1>
            <p className="text-muted-foreground">Reserve your date with StudioLive.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 hidden lg:block">Reservation Request</h2>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="service" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Service</label>
              <select id="service" className="flex h-12 w-full rounded-none border-b border-white/20 bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-primary transition-colors">
                <option className="bg-background">Wedding Photography</option>
                <option className="bg-background">Pre-Wedding Shoot</option>
                <option className="bg-background">Portrait Photography</option>
                <option className="bg-background">Event Photography</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Preferred Date</label>
              <Input id="date" type="date" className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Full Name</label>
                <Input id="name" placeholder="John Doe" className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Button type="button" className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all hover:scale-[1.02]">
                Request Availability
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
