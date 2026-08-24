"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image (Slow Zoom Effect) */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/mock-images/hero-cinematic.jpg')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
      />
      
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Welcome to StudioLive
          </h1>
          <h2 className="font-playfair text-2xl md:text-3xl text-primary italic mb-8">
            Photography, from the first idea to the final frame.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our photography experiences, explore real projects, choose your package, book your shoot, and receive your memories through one connected experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="#how-it-works">Explore the Studio</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md" asChild>
              <Link href="/book">Book a Shoot</Link>
            </Button>
          </div>

          {/* Sub-nav indicator */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm uppercase tracking-[0.2em] text-white/50 font-semibold">
             <span>Photography</span>
             <span className="hidden md:inline">•</span>
             <span>Booking</span>
             <span className="hidden md:inline">•</span>
             <span>Private Galleries</span>
             <span className="hidden md:inline">•</span>
             <span>Photo Products</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
