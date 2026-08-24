"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-32 px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Not Ready to Book? Soft CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">Still Exploring?</h2>
          <p className="text-xl text-muted-foreground mb-8">That's okay. Take a look around.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Explore Projects', href: '/portfolio' },
              { label: 'View Services', href: '/services' },
              { label: 'Meet the Team', href: '/about' },
              { label: 'Read FAQs', href: '/faq' },
              { label: 'Contact Us', href: '/contact' }
            ].map(link => (
              <Button key={link.label} variant="outline" className="rounded-full bg-transparent border-white/10 hover:border-primary hover:text-primary transition-all duration-300 px-6 py-6" asChild>
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
          className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-3xl border border-white/5 p-16 md:p-24 rounded-[3rem] shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          
          <h2 className="relative z-10 font-heading text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Ready to create something <span className="text-primary italic">worth remembering?</span>
          </h2>
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <Button size="lg" className="h-16 px-12 rounded-full text-lg bg-primary text-primary-foreground hover:scale-105 transition-transform" asChild>
              <Link href="/book">Check Availability</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full text-lg border-white/20 hover:bg-white/5 transition-colors" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
          <p className="relative z-10 mt-10 text-sm text-white/50 tracking-widest uppercase">
            Have questions? <Link href="/contact" className="text-primary hover:underline ml-2">Talk to the Studio</Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
