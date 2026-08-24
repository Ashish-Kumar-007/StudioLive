"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    desc: "Explore our photography services, projects and packages."
  },
  {
    number: "02",
    title: "CHOOSE",
    desc: "Find the experience that fits your needs."
  },
  {
    number: "03",
    title: "CUSTOMIZE",
    desc: "Add photographers, albums, video and other options."
  },
  {
    number: "04",
    title: "BOOK",
    desc: "Choose an available date, confirm and pay."
  },
  {
    number: "05",
    title: "RELIVE",
    desc: "Access your private gallery, select your favorite photos and order products."
  }
];

export function OrientationSection() {
  return (
    <section id="how-it-works" className="py-32 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">New here?</h2>
          <h3 className="text-xl md:text-2xl text-primary italic font-playfair">Here's what you can do with StudioLive.</h3>
        </motion.div>

        <div className="flex flex-col items-center max-w-lg mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="bg-muted w-full p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="text-5xl font-playfair font-bold text-white/5 absolute -top-4 -left-2 select-none group-hover:text-primary/10 transition-colors">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold tracking-widest uppercase text-primary mb-3">{step.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="h-16 flex items-center justify-center text-white/20">
                  <ArrowDown className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
