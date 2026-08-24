"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function AppIntroSection() {
  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Column */}
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-6xl font-bold mb-6"
          >
            Your Photography Experience Doesn't End at Booking.
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-primary italic font-heading mb-8"
          >
            Meet Instantly by StudioLive.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 font-light mb-10 leading-relaxed"
          >
            We've completely reimagined how you interact with your photography studio. 
            From booking your session in a blink, to customizing your package and selecting your favorite edits—everything is connected in one seamless digital experience.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4 text-sm font-semibold tracking-wider uppercase text-white/80"
          >
            {['Services', 'Bookings', 'Payments', 'Gallery', 'Favorites', 'Orders'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* UI Mockup Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative w-full max-w-sm aspect-[9/19] bg-zinc-900 rounded-[2.5rem] border-[8px] border-zinc-800 shadow-2xl shadow-primary/20 overflow-hidden flex flex-col"
          >
            {/* Mockup Header */}
            <div className="pt-12 pb-6 px-6 bg-zinc-950 border-b border-white/5">
              <div className="text-center font-playfair text-xl font-bold tracking-wider">StudioLive</div>
            </div>
            {/* Mockup Body */}
            <div className="p-6 flex-1 bg-zinc-900/50 space-y-6">
              <div>
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-3">Upcoming Shoot</h4>
                <div className="bg-zinc-800/80 p-5 rounded-2xl border border-white/5">
                  <div className="font-playfair font-bold text-lg mb-1">Wedding Photography</div>
                  <div className="text-primary text-sm font-semibold mb-4">25 Aug • 10:00 AM</div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Lead Photographer</span>
                    <span className="flex items-center gap-1 text-green-400"><CheckCircle2 className="w-3 h-3"/> Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground text-center py-3 rounded-full text-sm font-semibold cursor-pointer shadow-lg shadow-primary/20">
                View Booking Details
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
