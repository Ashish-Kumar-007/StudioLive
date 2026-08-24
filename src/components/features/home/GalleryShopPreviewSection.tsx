"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GalleryShopPreviewSection() {
  return (
    <section className="py-32 px-4 bg-muted/20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Story Continues <br/>
              <span className="text-primary italic">After the Shoot.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-8 leading-relaxed">
              Your photographs aren't simply sent as a folder. They become a private, interactive digital experience. 
              View, favorite, share, and effortlessly order premium albums and fine-art prints directly from your gallery.
            </p>
            
            <ul className="space-y-4 mb-10 text-muted-foreground">
              <li className="flex gap-4">
                <span className="text-primary font-bold">01</span> View your private gallery
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">02</span> Select & favorite your best moments
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">03</span> Download in high-resolution
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">04</span> Design your heirloom album
              </li>
            </ul>

            <Button size="lg" className="h-14 px-8" asChild>
              <Link href="/shop">Explore Print Shop</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 relative"
          >
            {/* Collage of products/gallery */}
            <div className="space-y-4 mt-12">
              <div className="aspect-square bg-card rounded-2xl border border-white/5 overflow-hidden relative shadow-xl">
                 <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/mock-images/portrait.jpg')" }} />
              </div>
              <div className="aspect-[4/5] bg-card rounded-2xl border border-white/5 overflow-hidden relative shadow-xl">
                 <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/mock-images/p1-1.jpg')" }} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-card rounded-2xl border border-white/5 overflow-hidden relative shadow-xl">
                 <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/mock-images/p2-1.jpg')" }} />
              </div>
              <div className="aspect-square bg-card rounded-2xl border border-white/5 p-6 flex flex-col justify-center items-center text-center shadow-xl">
                <div className="font-playfair text-2xl font-bold mb-2">Premium Albums</div>
                <div className="text-sm text-primary uppercase tracking-widest">Available in App</div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
