import React from 'react';
import { Calendar } from 'lucide-react';

interface StoryProps {
  onChangePage: (pageId: string) => void;
}

export const Story: React.FC<StoryProps> = ({ onChangePage }) => {
  return (
    <div className="w-full">
      <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-[80px]">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Born out of Love
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
            Our Story & Heritage
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        {/* Row 1 */}
        <div className="story-row flex gap-[80px] items-center mb-[80px] max-lg:flex-col max-lg:gap-10">
          <div className="story-text flex-[1.2]">
            <h3 className="font-serif text-4xl mb-5 text-goldPrimary">
              Philosophy of Light
            </h3>
            <p className="text-textDim text-base leading-relaxed mb-6">
              Founded along the banks of Udaipur, StudioLive was built to redefine wedding cinematography. Indian weddings aren't just events; they are beautiful, multi-generation tapestries of colors, rituals, and emotional ties. We approach every wedding with deep cultural reverence.
            </p>
            <p className="text-textDim text-base leading-relaxed mb-6">
              Our creative team is composed of photographers, lighting scientists, and Hollywood-grade editors who understand how to harness natural Indian golden hours, dynamic lighting, and unprompted candid tears.
            </p>
          </div>
          <div className="story-visual flex-[0.8] h-[480px] max-md:h-[300px] bg-surfaceDark/65 border border-goldPrimary/12 rounded-[30px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" 
              alt="Camera lens refraction" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="story-row flex flex-row-reverse gap-[80px] items-center max-lg:flex-col max-lg:gap-10">
          <div className="story-text flex-[1.2]">
            <h3 className="font-serif text-4xl mb-5 text-goldPrimary">
              The Virtual Production Standard
            </h3>
            <p className="text-textDim text-base leading-relaxed mb-6">
              We are pioneers in virtual production pipelines, combining realistic physical sets with 3D projection rendering. This unique fusion allows us to craft fine-art creative portraits that look like epic cinematic paintings, and ensure that your legacy lives on inside flawless, handcrafted Italian photobooks.
            </p>
          </div>
          <div className="story-visual flex-[0.8] h-[480px] max-md:h-[300px] bg-surfaceDark/65 border border-goldPrimary/12 rounded-[30px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" 
              alt="Immersive setup" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="cta-sec py-[120px] text-center px-[5%] relative">
        <div className="cta-wrap max-w-[800px] mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-8 leading-tight">
            Ready to tell your story?
          </h2>
          <button 
            onClick={() => onChangePage('book')}
            className="btn-gold"
          >
            Inquire Availability <Calendar size={16} />
          </button>
        </div>
      </section>

    </div>
  );
};
