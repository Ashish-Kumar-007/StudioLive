"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-32 px-4 bg-muted/30 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Not Ready to Book? Soft CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="font-playfair text-3xl font-bold mb-4">Still Exploring?</h2>
          <p className="text-xl text-muted-foreground mb-8">That's okay. Take a look around.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Explore Projects', href: '/portfolio' },
              { label: 'View Services', href: '/services' },
              { label: 'Meet the Team', href: '/about' },
              { label: 'Read FAQs', href: '/faq' },
              { label: 'Contact Us', href: '/contact' }
            ].map(link => (
              <Button key={link.label} variant="outline" className="rounded-full bg-background" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary/10 border border-primary/20 p-12 rounded-[3rem]"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to Create Something Worth Remembering?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground" asChild>
              <Link href="/book">Check Availability</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/20" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Have questions? <Link href="/contact" className="text-primary hover:underline">Talk to the Studio</Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
