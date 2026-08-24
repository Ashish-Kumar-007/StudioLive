"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "How does booking work?", a: "You can explore our packages, check real-time availability, and secure your date entirely through our online booking system." },
  { q: "Can I customize a package?", a: "Yes. All our base packages can be customized in the app with add-ons like extra hours, second photographers, and drone coverage." },
  { q: "How do I receive my photos?", a: "Your high-resolution edited images are delivered through a beautifully designed, private digital gallery where you can download, share, and order prints." }
];

export function HomeFAQSection() {
  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-6 mb-16">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-card border border-white/5 rounded-2xl"
            >
              <h4 className="text-xl font-semibold mb-2">{faq.q}</h4>
              <p className="text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="link" className="text-primary text-lg" asChild>
            <Link href="/faq">Read all FAQs →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
