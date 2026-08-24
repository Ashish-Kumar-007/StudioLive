"use client";

import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";

export function AppDownloadBanner() {
  return (
    <section className="py-24 px-4 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        <div className="text-primary-foreground max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wider uppercase mb-6 shadow-lg">
            <Smartphone className="w-4 h-4" />
            Download the App
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Book your session in seconds.
          </h2>
          <p className="text-lg md:text-xl font-light text-primary-foreground/80 mb-8 leading-relaxed">
            Get the StudioLive app for instant booking, live chat, and a seamless digital gallery experience. Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">APP15</span> for 15% off your first booking.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href="#"
              className="flex items-center gap-3 bg-zinc-950 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-white/50">Download on the</div>
                <div className="font-bold leading-none">App Store</div>
              </div>
            </a>
            <a 
              href="#"
              className="flex items-center gap-3 bg-zinc-950 text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-white/50">GET IT ON</div>
                <div className="font-bold leading-none">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-64 md:w-80 aspect-[9/19] bg-zinc-950 rounded-[3rem] border-[8px] border-zinc-900 shadow-2xl flex flex-col justify-center items-center text-center p-6"
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-900 rounded-b-xl" />
          <div className="font-heading text-3xl font-bold text-white mb-2">StudioLive</div>
          <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-8">Booking App</div>
          <div className="w-full h-12 rounded-full bg-white/10 animate-pulse mb-4" />
          <div className="w-3/4 h-8 rounded-full bg-white/10 animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
}
