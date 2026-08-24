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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {portfolio.map((project, index) => {
          // Create an asymmetric grid feel by varying aspect ratios based on index
          const isTall = index % 3 === 0;
          return (
            <motion.div key={project.id} variants={itemVariants}>
              <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
                  
                  <div className={`relative w-full overflow-hidden ${isTall ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <div 
                      className="absolute inset-0 bg-muted bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.images[0] || '/mock-images/p1-1.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white border border-white/50 backdrop-blur-sm px-6 py-2 rounded-full font-medium tracking-wide">
                        View Story
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <div className="flex justify-between items-center text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                      <span>{project.location}</span>
                      <span className="text-primary">{new Date(project.date).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </Link>
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
