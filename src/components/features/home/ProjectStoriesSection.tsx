"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { portfolio } from "@/lib/mock-data";

export function ProjectStoriesSection() {
  const featuredProjects = portfolio.slice(0, 7);

  return (
    <section className="py-32 px-4 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Featured Stories
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-6 grid-flow-dense">
          {featuredProjects.map((project, idx) => {
            const spanPatterns = [
              "md:col-span-2 md:row-span-2",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-2",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-1",
              "md:col-span-1 md:row-span-2"
            ];
            const spanClass = spanPatterns[idx % spanPatterns.length];
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
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
                  {idx !== 2 && ( // Hide description on the smallest tile to keep it clean
                    <p className="text-white/70 text-sm font-light line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
