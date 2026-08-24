"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PackagesPreviewSection() {
  return (
    <section className="py-32 px-4 bg-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-6"
          >
            Find Your Perfect Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-light mb-10 leading-relaxed"
          >
            We offer Essential, Premium, and Luxury collections designed to cover everything from intimate elopements to multi-day celebrations.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/packages">Compare Packages</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/book">Check Availability</Link>
            </Button>
          </div>
        </div>

        {/* Builder Preview */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 font-playfair text-8xl font-bold italic">
              Make It Yours.
            </div>
            
            <div className="relative z-10">
              <h4 className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Wedding Photography</h4>
              <h3 className="text-2xl font-playfair font-bold mb-8">Premium Package</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-muted-foreground">Base Package (8 Hours)</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5 text-primary">
                  <span>+ Extra Photographer</span>
                  <span>Added</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5 text-primary">
                  <span>+ Cinematic Video</span>
                  <span>Added</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5 opacity-50">
                  <span>+ Drone Coverage</span>
                  <span>Optional</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-muted-foreground">Estimated Total:</span>
                <span className="text-3xl font-bold font-playfair text-primary">Custom</span>
              </div>

              <Button className="w-full h-12" variant="secondary">Customize Your Own</Button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
