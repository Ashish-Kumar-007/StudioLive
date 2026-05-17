import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', value: 'home' },
    { name: 'Our Story', value: 'about' },
    { name: 'Events', value: 'events' },
    { name: 'Our Team', value: 'team' },
  ];

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 shadow-md' : 'py-4'} glass`} id="main-nav">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => handleLinkClick('home')} 
          className="text-2xl tracking-tighter hover:opacity-80 transition-opacity flex items-center bg-transparent border-0 p-0"
        >
          <span className="logo-studio text-white font-extrabold bg-primary px-2 py-1 rounded-l-md">STUDIO</span>
          <span className="logo-live text-primary font-extrabold bg-surface px-2 py-1 rounded-r-md">LIVE</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => handleLinkClick(link.value)}
              className={`font-semibold text-sm transition-colors border-0 bg-transparent cursor-pointer ${
                currentPage === link.value ? 'text-primary' : 'text-dim hover:text-primary'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('contact')} 
            className="btn-primary py-2 px-6 text-sm bg-transparent border-0 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-primary p-2 bg-transparent border-0 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass shadow-lg flex flex-col items-center py-6 gap-4 border-t border-surface-light animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => handleLinkClick(link.value)}
              className={`font-semibold text-base py-2 w-full text-center border-0 bg-transparent cursor-pointer ${
                currentPage === link.value ? 'text-primary' : 'text-dim hover:text-primary'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('contact')} 
            className="btn-primary py-2 px-8 text-sm mt-2 border-0 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
