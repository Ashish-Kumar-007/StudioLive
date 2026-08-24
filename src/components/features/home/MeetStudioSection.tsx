"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MeetStudioSection() {
  return (
    <section className="py-32 px-4 bg-muted/30 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">Meet StudioLive</h2>
          <p className="text-xl text-muted-foreground font-light mb-8 leading-relaxed">
            We are a collective of visual artists dedicated to documenting life's most profound moments. 
            Located in the heart of Your City, we blend editorial elegance with authentic photojournalism.
          </p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex items-center text-muted-foreground">
              <span className="text-primary mr-4 text-xl">✦</span> 10+ Years Experience
            </li>
            <li className="flex items-center text-muted-foreground">
              <span className="text-primary mr-4 text-xl">✦</span> Wedding & Portrait Specialization
            </li>
            <li className="flex items-center text-muted-foreground">
              <span className="text-primary mr-4 text-xl">✦</span> Award-Winning Team
            </li>
          </ul>

          <div className="flex gap-4">
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20" asChild>
              <Link href="/about">Meet the Team</Link>
            </Button>
            <Button size="lg" variant="link" className="h-14 px-8 text-primary" asChild>
              <Link href="/about">About the Studio →</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/mock-images/portrait.jpg')" }} />
        </motion.div>
      </div>
    </section>
  );
}
