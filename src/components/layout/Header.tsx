"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center w-full pt-4 px-4 transition-all duration-500">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-7xl rounded-full border transition-all duration-500 flex items-center justify-between px-6 md:px-8 py-3 ${
          isScrolled 
            ? "bg-background/70 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-heading text-2xl font-bold tracking-widest uppercase transition-colors group-hover:text-primary">
              StudioLive
            </span>
          </Link>
          <nav className="hidden lg:flex gap-8 items-center">
            {[
              { label: "Studio", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/portfolio" },
              { label: "Packages", href: "/packages" },
              { label: "Shop", href: "/shop" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hidden md:block text-xs font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-primary transition-colors">
            Contact
          </Link>
          <Button className="h-10 px-8 rounded-full bg-primary text-primary-foreground font-semibold tracking-wider hover:scale-105 transition-transform" asChild>
            <Link href="/book">Book a Shoot</Link>
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
