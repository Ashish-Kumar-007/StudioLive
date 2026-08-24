"use client";

import { motion } from "framer-motion";
import { Search, CalendarDays, Settings, Image as ImageIcon, CreditCard } from "lucide-react";

export function AppBenefitsSection() {
  return (
    <section className="py-32 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Why the App Exists (The Problem) */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-6"
          >
            Photography shouldn't be complicated.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 max-w-4xl mx-auto text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-muted/30 border border-white/5 opacity-60"
            >
              <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-muted-foreground">The Old Way</h4>
              <ul className="space-y-4 text-sm text-muted-foreground line-through decoration-white/20">
                <li>Search & Message multiple times</li>
                <li>Wait for pricing & availability PDFs</li>
                <li>Back-and-forth emails to confirm</li>
                <li>Manual bank transfers</li>
                <li>Wait months for a USB or zip file</li>
                <li>Struggle to order prints separately</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-primary/5 border border-primary/20 relative"
            >
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg shadow-primary/20">
                The StudioLive Way
              </div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-primary">Everything Connected</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-3"><Search className="w-4 h-4 text-primary" /> Explore & Choose online</li>
                <li className="flex items-center gap-3"><Settings className="w-4 h-4 text-primary" /> Customize packages instantly</li>
                <li className="flex items-center gap-3"><CalendarDays className="w-4 h-4 text-primary" /> Check live availability & Book</li>
                <li className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-primary" /> Secure online payments</li>
                <li className="flex items-center gap-3"><ImageIcon className="w-4 h-4 text-primary" /> Private Digital Gallery</li>
                <li className="flex items-center gap-3">Select & order prints in one click</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Visual Benefits */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Everything You Need. One Place.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Discover", desc: "Explore services, projects and packages." },
            { title: "Book", desc: "Check availability and book online instantly." },
            { title: "Customize", desc: "Add photographers, video, albums and more." },
            { title: "Manage", desc: "Keep your booking details in one secure place." },
            { title: "Relive", desc: "Access your private, beautifully designed photography gallery." },
            { title: "Create", desc: "Turn your favorite photographs into albums, prints and gifts." }
          ].map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-card border border-white/5 rounded-3xl group hover:border-primary/50 transition-colors"
            >
              <h4 className="text-xl font-bold mb-3 text-primary">{benefit.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
