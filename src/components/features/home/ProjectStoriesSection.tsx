"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/mock-data";

export function ProjectStoriesSection() {
  const featuredProjects = portfolio.slice(0, 3);

  return (
    <section className="py-32 px-4 bg-muted/20 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-6"
          >
            See What We Create
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A celebration captured through candid moments, portraits, and cinematic details.
          </motion.p>
        </div>

        <div className="space-y-32">
          {featuredProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-3/5 group">
                <Link href={`/portfolio/${project.slug}`}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.images[0] || '/mock-images/p1-1.jpg'})` }}
                    />
                  </div>
                </Link>
              </div>

              {/* Text Side (Project -> Service Connection) */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center px-4 lg:px-12">
                <div className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
                  {project.category}
                </div>
                <h3 className="font-playfair text-4xl font-bold mb-6">
                  {project.title}
                </h3>
                <p className="text-xl text-muted-foreground font-light mb-8 leading-relaxed">
                  {project.description || "A celebration captured through candid moments, portraits, and cinematic details."}
                </p>
                
                <div className="flex flex-col gap-6 mt-4">
                  <div className="p-6 bg-card border border-white/5 rounded-2xl">
                    <h4 className="text-lg font-bold mb-2">Want something like this?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This project was created using our {project.category} packages.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="default" asChild>
                        <Link href={`/services/${(project.category || 'general').toLowerCase().replace(' ', '-')}`}>Explore Service</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/packages">View Packages</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-32">
           <Button size="lg" variant="link" className="text-xl text-primary" asChild>
             <Link href="/portfolio">View All Stories →</Link>
           </Button>
        </div>
      </div>
    </section>
  );
}
