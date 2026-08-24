import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-2xl font-bold tracking-wider">StudioLive</span>
          </Link>
          <nav className="hidden lg:flex gap-8">
            {[
              { label: "Studio", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/portfolio" },
              { label: "Packages", href: "/packages" },
              { label: "Shop", href: "/shop" },
              { label: "How It Works", href: "/#how-it-works" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hidden md:block text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <Button className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold tracking-wide" asChild>
            <Link href="/book">Book a Shoot</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
