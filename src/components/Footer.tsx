import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onChangePage: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangePage }) => {
  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onChangePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-goldPrimary/8 py-[100px] px-[5%] bg-[#04060A] relative z-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-[60px] max-lg:grid-cols-2 max-md:grid-cols-1">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-5">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-serif text-2xl font-bold text-goldPrimary tracking-[0.1em] flex items-center gap-2.5"
          >
            STUDIOLIVE
            <div className="w-2.5 h-2.5 rounded-full bg-saffronPrimary shadow-[0_0_10px_#FF7E36]" />
          </a>
          <p className="text-textDim text-sm max-w-[300px]">
            Immersive WebGL particle production and heritage cinematography capturing the soul of Indian visual art celebrations.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-goldPrimary tracking-[0.1em] uppercase mb-[25px]">
            Explore
          </h3>
          <ul className="list-none flex flex-col gap-3">
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#story" onClick={(e) => handleLinkClick(e, 'story')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Our Story
              </a>
            </li>
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Events
              </a>
            </li>
            <li>
              <a href="#team" onClick={(e) => handleLinkClick(e, 'team')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Our Team
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-goldPrimary tracking-[0.1em] uppercase mb-[25px]">
            Events
          </h3>
          <ul className="list-none flex flex-col gap-3">
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Royal Weddings
              </a>
            </li>
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Pre-Wedding Shoots
              </a>
            </li>
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Fashion Portfolios
              </a>
            </li>
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')} className="text-sm text-textDim hover:text-goldPrimary transition-colors duration-300">
                Cinematic Films
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-goldPrimary tracking-[0.1em] uppercase mb-[25px]">
            Studio Contact
          </h3>
          <ul className="list-none flex flex-col gap-[15px]">
            <li className="text-sm text-textDim flex items-center gap-2.5">
              <MapPin size={18} className="text-saffronPrimary" />
              <span>Udaipur Palace St, Rajasthan, IN</span>
            </li>
            <li className="text-sm text-textDim flex items-center gap-2.5">
              <Mail size={18} className="text-saffronPrimary" />
              <span>heritage@studiolive.com</span>
            </li>
            <li className="text-sm text-textDim flex items-center gap-2.5">
              <Phone size={18} className="text-saffronPrimary" />
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-[1200px] mx-auto border-t border-white/5 mt-[80px] pt-10 flex justify-between items-center text-xs text-textDim max-md:flex-col max-md:gap-4 max-md:text-center">
        <p>&copy; 2026 StudioLive Production. Crafted with React, Three.js & GSAP.</p>
        <p>Indian Visual Arts Studio Heritage.</p>
      </div>

    </footer>
  );
};
