"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PortfolioGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-6 max-w-6xl mx-auto grid-flow-dense"
      >
        {portfolio.map((project, index) => {
          // Asymmetric mapping that loops nicely for any number of items
          const spanPatterns = [
            "md:col-span-2 md:row-span-2", // Large square
            "md:col-span-2 md:row-span-1", // Wide rectangle
            "md:col-span-1 md:row-span-2", // Tall rectangle
            "md:col-span-1 md:row-span-1", // Small square
            "md:col-span-2 md:row-span-2", // Large square
            "md:col-span-1 md:row-span-1", // Small square
            "md:col-span-1 md:row-span-1", // Small square
            "md:col-span-2 md:row-span-1", // Wide rectangle
          ];
          const spanClass = spanPatterns[index % spanPatterns.length];
          
          return (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className={`group rounded-[2rem] border border-white/5 bg-zinc-900 relative overflow-hidden flex flex-col justify-end ${spanClass}`}
            >
              <Link href={`/portfolio/${project.slug}`} className="absolute inset-0 z-20" />
              
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.images[0]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              <div className="relative z-10 p-6 md:p-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 drop-shadow-md">
                  {project.category}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
                  {project.title}
                </h3>
                {index !== 3 && (
                  <p className="text-white/70 text-sm font-light line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-32 text-center"
      >
        <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Ready to create your own story?</h3>
        <Button size="lg" className="h-14 px-10 text-lg" asChild>
          <Link href="/book">Reserve Your Session</Link>
        </Button>
      </motion.div>
    </>
  );
}
