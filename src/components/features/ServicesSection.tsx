"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/mock-data";

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-32 px-4 md:px-8 w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
          >
            What would you like us to capture?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Find the experience that fits your story.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="group cursor-pointer">
              <Link href={`/services/${service.slug}`} className="block relative h-[450px] w-full rounded-2xl overflow-hidden">
                {/* Image Placeholder */}
                <div 
                  className="absolute inset-0 bg-muted bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {service.title}
                  </h3>
                  <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-in-out">
                     <p className="text-white/80 text-sm leading-relaxed">
                       {service.description}
                     </p>
                     <span className="inline-block mt-4 text-primary text-sm font-semibold uppercase tracking-widest">
                       Discover →
                     </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
