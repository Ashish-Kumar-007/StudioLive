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
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/mock-images/hero-cinematic.jpg')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
      />
      
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-sm bg-black/30 border border-white/10 p-8 md:p-12 rounded-3xl max-w-4xl"
        >
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Immortalize <br />
            <span className="text-primary italic">Your Legacy</span>
          </h1>
          <p className="font-sans text-lg md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
            Cinematic wedding, pre-wedding, and portrait photography in the heart of your city. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/book">Reserve Your Date</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md" asChild>
              <Link href="/portfolio">Explore Portfolio</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 z-20 text-white/50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
