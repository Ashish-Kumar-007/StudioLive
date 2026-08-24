"use client";

import { motion } from "framer-motion";

const timeline = [
  "DISCOVER",
  "BOOK",
  "SHOOT",
  "EDIT",
  "PRIVATE GALLERY",
  "SELECT FAVORITES",
  "ALBUM / PRINT",
  "KEEP FOREVER"
];

export function EcosystemTimelineSection() {
  return (
    <section className="py-32 px-4 bg-black text-white relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black z-0" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl md:text-5xl font-bold mb-16"
        >
          From Your First Booking to Your Final Keepsake.
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />
          
          <div className="flex flex-col gap-12 relative z-10">
            {timeline.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div className="bg-black border border-primary/30 text-primary font-bold tracking-widest uppercase text-sm md:text-base px-8 py-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  {item}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
