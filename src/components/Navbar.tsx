import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onChangePage: (pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onChangePage }) => {
  const [mobileActive, setMobileActive] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onChangePage(pageId);
    setMobileActive(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'events', label: 'Events' },
    { id: 'team', label: 'Our Team' },
    { id: 'book', label: 'Book Now' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-[85px] bg-bgDark/70 backdrop-blur-md border-b border-goldPrimary/8 flex items-center justify-between px-[5%] z-50 transition-all duration-300">
      
      {/* Brand Logo */}
      <a 
        href="#home" 
        onClick={(e) => handleLinkClick(e, 'home')}
        className="font-serif text-2xl font-bold text-goldPrimary tracking-[0.1em] flex items-center gap-2.5"
      >
        STUDIOLIVE
        <div className="w-2 h-2 rounded-full bg-saffronPrimary shadow-[0_0_10px_#FF7E36]" />
      </a>

      {/* Navigation Links */}
      <nav>
        <ul className={`
          flex gap-10 list-none transition-all duration-300
          max-md:fixed max-md:top-[85px] max-md:left-0 max-md:w-full max-md:bg-bgDark max-md:flex-col max-md:gap-0 max-md:overflow-hidden max-md:border-b max-md:border-goldPrimary/8
          ${mobileActive ? 'max-md:h-[calc(100vh-85px)] max-md:p-10 max-md:gap-[30px]' : 'max-md:h-0 max-md:p-0'}
        `}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`
                  text-sm font-medium tracking-[0.15em] uppercase text-textDim transition-all duration-300 relative py-2 block
                  hover:text-goldPrimary hover:text-shadow-[0_0_8px_rgba(212,175,55,0.3)]
                  ${activePage === item.id ? 'active text-goldPrimary text-shadow-[0_0_8px_rgba(212,175,55,0.3)]' : ''}
                `}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <div 
        onClick={() => setMobileActive(!mobileActive)}
        className="hidden max-md:flex cursor-pointer text-textLight hover:text-goldPrimary transition-colors duration-300"
      >
        {mobileActive ? <X size={28} /> : <Menu size={28} />}
      </div>

    </header>
  );
};
