import React from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

export const Team: React.FC = () => {
  const members = [
    {
      name: "Ashish Kumar",
      role: "Principal Cinematographer",
      bio: "An award-winning visual director with 12+ years of experience capturing epic heritage films in Jaipur and Udaipur palaces.",
      icon: <Camera size={32} />
    },
    {
      name: "Vikram Rathore",
      role: "Lighting & 3D VFX Director",
      bio: "A lighting scientist leading our virtual production pipeline, ensuring breathtaking ambient blending on set.",
      icon: <Sparkles size={32} />
    },
    {
      name: "Priya Sharma",
      role: "Chief Candid Storyteller",
      bio: "Specializing in capturing intimate glances, tearful laughter, and silent glances without direct prompting.",
      icon: <Heart size={32} />
    }
  ];

  return (
    <div className="w-full">
      <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-[80px]">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            The Visionaries
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
            Our Creative Leaders
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        <p className="text-center text-textDim text-lg max-w-[700px] mx-auto mb-[80px] leading-relaxed">
          Behind every visual record is an elite squad of cinematographers, color scientists, and candid specialists committed to turning your special day into a living heritage showreel.
        </p>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1">
          {members.map((member, i) => (
            <div 
              key={i}
              className="bg-surfaceDark/65 border border-goldPrimary/12 backdrop-blur-md rounded-2xl p-[40px] text-center transition-all duration-300 hover:-translate-y-2 hover:border-goldPrimary/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)] group"
            >
              <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-bgDark to-goldPrimary/20 border-2 border-goldPrimary shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center justify-center text-goldPrimary mx-auto mb-[25px] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                {member.icon}
              </div>
              <h3 className="font-serif text-2xl text-textLight mb-2">
                {member.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffronPrimary mb-[15px]">
                {member.role}
              </p>
              <p className="text-textDim text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};
