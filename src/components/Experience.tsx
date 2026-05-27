import React, { useEffect, useState, useRef } from 'react';
import { Film, PenTool, Tv, ShieldCheck } from 'lucide-react';

interface StatItemProps {
  endValue: number;
  suffix?: string;
  label: string;
  duration?: number;
}

// Custom hook to animate numbers ticking up smoothly
const AnimatedStat: React.FC<StatItemProps> = ({ endValue, suffix = '', label, duration = 1500 }) => {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;

    const run = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * endValue));

      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        setValue(endValue);
      }
    };

    requestAnimationFrame(run);
  }, [hasStarted, endValue, duration]);

  return (
    <div ref={elementRef} className="glass-panel p-8 rounded-3xl text-center flex-1 min-w-[200px] border border-goldPrimary/10">
      <div className="text-4xl md:text-5xl font-bold font-serif text-gold-gradient mb-2">
        {value}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-textDim font-sans">
        {label}
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const steps = [
    {
      phase: "Phase I",
      title: "The Scripting Session",
      desc: "Every great visual record starts with a script. We conduct absolute alignment consultations to map your aesthetic preferences, palace geography, and design unique narrative boards that capture your emotional character.",
      icon: <PenTool size={24} className="text-goldPrimary" />
    },
    {
      phase: "Phase II",
      title: "The Directing Phase",
      desc: "Our principal crew controls set elements dynamically, utilizing Hollywood-grade lighting setups and cinema camera rigs. We capture candidate moments, emotional tears, and majestic movements without awkward staging.",
      icon: <Film size={24} className="text-goldPrimary" />
    },
    {
      phase: "Phase III",
      title: "The Grading Lab",
      desc: "In our editing laboratory, our technicians apply desaturated warm grading, clean transitions, and custom-composed orchestral soundtracks. Your memories are textured with subtle film grains for that timeless legacy look.",
      icon: <Tv size={24} className="text-goldPrimary" />
    },
    {
      phase: "Phase IV",
      title: "The Premiere",
      desc: "Your films and collections are projected in our private proofing portal. Then, we deliver physical handcrafted heirlooms—fine-art albums bound in premium Italian leathers, ensuring your history survives for generations.",
      icon: <ShieldCheck size={24} className="text-goldPrimary" />
    }
  ];

  return (
    <section className="content-section min-h-screen py-24 px-[5%] max-w-[1200px] mx-auto relative z-20" id="experience">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Elite Process
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            The Production Journey
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="relative border-l border-goldPrimary/15 ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-16 mb-24 text-left">
          
          {/* Central neon vertical wire */}
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-goldPrimary via-saffronPrimary to-transparent shadow-[0_0_8px_#D4AF37]" />

          {steps.map((step, i) => (
            <div key={i} className="relative group">
              
              {/* Outer pulsing timeline bead */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-bgDark border-2 border-goldPrimary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <div className="w-2 h-2 rounded-full bg-saffronPrimary" />
              </div>

              {/* Step Card */}
              <div className="glass-panel p-8 md:p-10 rounded-[30px] border border-white/5 transition-all duration-500 hover:border-goldPrimary/30 hover:shadow-[0_15px_45px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-6 items-start">
                
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 shadow-lg">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2.5">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-saffronPrimary uppercase">
                      {step.phase}
                    </span>
                    <span className="text-white/20">|</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-textDim text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Animated Statistics Ribbon */}
        <div className="w-full flex flex-wrap gap-6 justify-center">
          <AnimatedStat endValue={120} suffix="+" label="Heritage Weddings" />
          <AnimatedStat endValue={15} suffix="+" label="Cinematic Awards" />
          <AnimatedStat endValue={8} suffix="K" label="HDR Resolution" />
          <AnimatedStat endValue={24} suffix="hr" label="Response Cadence" />
        </div>

      </div>
    </section>
  );
};
