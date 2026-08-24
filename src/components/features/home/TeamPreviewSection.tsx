"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TeamPreviewSection() {
  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl md:text-5xl font-bold mb-6"
        >
          The People Behind Your Memories
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground font-light mb-16 max-w-2xl mx-auto"
        >
          Meet our collective of award-winning visual artists.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {['Alex Mercer', 'Jordan Lee', 'Taylor Reed'].map((name, i) => (
            <motion.div 
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden mb-6 relative">
                 <div className="absolute inset-0 bg-cover bg-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" style={{ backgroundImage: `url('/mock-images/p${i+1}-1.jpg')` }} />
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-1">{name}</h3>
              <p className="text-primary text-sm uppercase tracking-wider font-semibold">
                {i === 0 ? 'Lead Photographer' : 'Senior Photographer'}
              </p>
            </motion.div>
          ))}
        </div>

        <Button size="lg" variant="outline" asChild>
          <Link href="/about">Meet the Full Team</Link>
        </Button>
      </div>
    </section>
  );
}
