"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Play, Sparkles, Calendar, CreditCard, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "package",
    title: "1. Choose Your Story",
    description: "Start by selecting the photography package that fits your needs. See clear, upfront pricing with no hidden fees.",
  },
  {
    id: "addons",
    title: "2. Make It Yours",
    description: "Add a second shooter, drone footage, or extra hours with a simple tap. Instantly see how it updates your total.",
  },
  {
    id: "date",
    title: "3. Lock in the Date",
    description: "Browse our live calendar to see our real-time availability and select the perfect time for your session.",
  },
  {
    id: "checkout",
    title: "4. Secure Your Spot",
    description: "Confirm your booking with a secure deposit using Apple Pay, Google Pay, or any major credit card.",
  }
];

export function AppBookingFlowSection() {
  const [activeStep, setActiveStep] = useState<string>("package");

  return (
    <section className="bg-zinc-950 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row">
        
        {/* Mobile Mockup (Sticky on Mobile too, or just hidden) */}
        <div className="md:hidden sticky top-20 z-20 py-10 flex justify-center bg-zinc-950/90 backdrop-blur-md">
           <div className="text-primary font-heading text-2xl font-bold italic">Instantly</div>
        </div>

        {/* Left Side: Scrolling Text */}
        <div className="w-full md:w-1/2 py-[10vh] md:py-[30vh]">
          <div className="mb-[20vh] md:mb-[50vh]">
             <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
               Booking, <br/>beautifully simplified.
             </h2>
             <p className="text-xl text-white/50 font-light max-w-md">
               Scroll to see exactly how you'll book your session using our custom platform.
             </p>
          </div>

          <div className="space-y-[50vh] pb-[30vh]">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                onViewportEnter={() => setActiveStep(step.id)}
                viewport={{ margin: "-50% 0px -50% 0px" }}
                className="max-w-md"
              >
                <div className={`transition-all duration-500 ${activeStep === step.id ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Sticky Mockup */}
        <div className="hidden md:flex w-full md:w-1/2 sticky top-0 h-screen items-center justify-center">
          <div className="relative w-full max-w-[320px] aspect-[9/19] bg-zinc-950 rounded-[3rem] border-[8px] border-zinc-900 shadow-2xl shadow-primary/10 overflow-hidden flex flex-col">
            
            {/* Dynamic App Screens */}
            <AnimatePresence mode="wait">
              
              {activeStep === "package" && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/50 p-6 flex flex-col pt-12">
                  <div className="text-xl font-heading font-bold text-white mb-6">Select Package</div>
                  <div className="space-y-4">
                    <div className="bg-primary/20 border border-primary/50 p-4 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
                      <div className="font-bold text-white mb-1">Premium Wedding</div>
                      <div className="text-xs text-white/60 mb-3">10 Hours • 2 Photographers</div>
                      <div className="font-bold text-primary">₹3,75,000</div>
                    </div>
                    <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl">
                      <div className="font-bold text-white mb-1">Intimate Wedding</div>
                      <div className="text-xs text-white/60 mb-3">6 Hours • 1 Photographer</div>
                      <div className="font-bold text-white/80">₹2,30,000</div>
                    </div>
                    <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl">
                      <div className="font-bold text-white mb-1">Elopement</div>
                      <div className="text-xs text-white/60 mb-3">3 Hours • 1 Photographer</div>
                      <div className="font-bold text-white/80">₹1,25,000</div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full bg-primary text-black py-3 rounded-xl text-center font-bold text-sm">Continue</div>
                  </div>
                </motion.div>
              )}

              {activeStep === "addons" && (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/50 p-6 flex flex-col pt-12">
                  <div className="text-xl font-heading font-bold text-white mb-6">Enhancements</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><Play className="w-4 h-4 text-white" /></div>
                        <div>
                          <div className="text-sm font-bold text-white">Drone Video</div>
                          <div className="text-xs text-primary">+₹40,000</div>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
                        <div>
                          <div className="text-sm font-bold text-white">Express Edit</div>
                          <div className="text-xs text-primary">+₹20,000</div>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-white/5 rounded-2xl opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                        <div>
                          <div className="text-sm font-bold text-white">2nd Shooter</div>
                          <div className="text-xs text-white/50">Included</div>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-zinc-700 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-zinc-500 rounded-full" /></div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/50 text-sm">Total</span>
                      <span className="text-xl font-bold text-white">₹4,35,000</span>
                    </div>
                    <div className="w-full bg-primary text-black py-3 rounded-xl text-center font-bold text-sm">Select Date</div>
                  </div>
                </motion.div>
              )}

              {activeStep === "date" && (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/50 p-6 flex flex-col pt-12">
                  <div className="text-xl font-heading font-bold text-white mb-6">Select Date</div>
                  <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-white">August 2026</span>
                      <div className="flex gap-2 text-white/50"><ChevronRight className="w-4 h-4 rotate-180"/><ChevronRight className="w-4 h-4"/></div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/50 mb-2">
                      <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                      {/* Empty slots */}
                      <div/><div/><div/><div/>
                      <div className="text-white/30">1</div><div className="text-white/30">2</div><div className="text-white/30">3</div>
                      <div className="text-white">4</div><div className="text-white">5</div><div className="text-white">6</div><div className="text-white">7</div><div className="text-white">8</div><div className="text-white">9</div><div className="text-white">10</div>
                      <div className="text-white">11</div><div className="text-white">12</div><div className="text-white">13</div><div className="text-white">14</div><div className="text-white">15</div><div className="text-white">16</div><div className="text-white">17</div>
                      <div className="text-white">18</div><div className="text-white">19</div><div className="bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(212,175,55,0.5)]">20</div><div className="text-white">21</div><div className="text-white">22</div><div className="text-white">23</div><div className="text-white">24</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Available Times</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-800/50 border border-white/5 py-2 text-center text-sm rounded-lg text-white">10:00 AM</div>
                      <div className="bg-primary border border-primary text-black font-bold py-2 text-center text-sm rounded-lg shadow-[0_0_10px_rgba(212,175,55,0.2)]">1:00 PM</div>
                    </div>
                  </div>
                  <div className="mt-auto">
                     <div className="w-full bg-primary text-black py-3 rounded-xl text-center font-bold text-sm">Review & Pay</div>
                  </div>
                </motion.div>
              )}

              {activeStep === "checkout" && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/50 p-6 flex flex-col pt-12">
                  <div className="text-xl font-heading font-bold text-white mb-6">Checkout</div>
                  <div className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl mb-6 text-sm">
                    <div className="flex items-center gap-3 text-white mb-4 pb-4 border-b border-white/10">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                         <div className="font-bold">Aug 20, 2026 • 1:00 PM</div>
                         <div className="text-xs text-white/50">Premium Wedding</div>
                      </div>
                    </div>
                    <div className="flex justify-between mb-2"><span className="text-white/50">Total</span><span className="text-white">₹4,35,000</span></div>
                    <div className="flex justify-between mb-2"><span className="text-white/50">Deposit Due</span><span className="text-white font-bold">₹80,000</span></div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Payment Method</div>
                    <div className="bg-white text-black p-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-white/90">
                      <Apple className="w-5 h-5" /> <span className="font-bold text-lg">Pay</span>
                    </div>
                    <div className="flex items-center gap-3 my-4">
                      <div className="h-px bg-white/10 flex-1" />
                      <div className="text-xs text-white/30">OR</div>
                      <div className="h-px bg-white/10 flex-1" />
                    </div>
                    <div className="bg-zinc-800/50 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-white/50" />
                        <span className="text-sm text-white/80">•••• 4242</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full bg-primary text-black py-3 rounded-xl text-center font-bold text-sm">Confirm Booking</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
