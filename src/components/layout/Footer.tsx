import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Top Section - Large CTA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-white/10 pb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
              Let's capture your <span className="text-primary italic">story.</span>
            </h2>
            <p className="text-xl text-white/60 font-light max-w-md">
              We are currently accepting bookings for the upcoming wedding season.
            </p>
          </div>
          <div>
            <Button size="lg" className="h-16 px-10 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:scale-105 transition-transform group" asChild>
              <Link href="/book">
                Inquire Now
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-24">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-heading text-2xl font-bold tracking-widest uppercase mb-6">StudioLive</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-8">
              A premium photography collective dedicated to capturing authentic emotions, cinematic moments, and timeless stories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors">
                <Instagram className="w-4 h-4 text-white/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors">
                <Facebook className="w-4 h-4 text-white/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors">
                <Twitter className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Selected Projects</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Pricing & Packages</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Print Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Studio</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About the Team</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">Client Love</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-medium text-white/40 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} StudioLive Collective. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed for timelessness.</p>
        </div>

      </div>
    </footer>
  );
}
