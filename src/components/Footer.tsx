
interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-surface py-16 px-6 border-t border-surface-light mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="text-2xl mb-4">
            <span className="logo-studio text-white font-extrabold bg-primary px-2 py-1 rounded-l-md">STUDIO</span>
            <span className="logo-live text-primary font-extrabold bg-background px-2 py-1 rounded-r-md">LIVE</span>
          </div>
          <p className="text-dim max-w-sm">Premium photography and videography for life's greatest moments.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-primary mb-4">Services</h4>
          <ul className="space-y-2 text-dim">
            <li>
              <button onClick={() => onNavigate('events')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Weddings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('events')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Corporate
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('events')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Pre-Weddings
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-primary mb-4">Company</h4>
          <ul className="space-y-2 text-dim">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Our Story
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('team')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Our Team
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer">
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-surface-light text-center text-sm text-dim">
        <p>&copy; 2026 StudioLive. All rights reserved.</p>
      </div>
    </footer>
  );
}
