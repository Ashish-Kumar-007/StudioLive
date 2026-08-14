import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">StudioLive</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/services"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Portfolio
            </Link>
            <Link
              href="/packages"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Packages
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
