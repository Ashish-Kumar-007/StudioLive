import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface PackageTier {
  title: string;
  price: string;
  rawPrice: number;
  badge?: string;
  desc: string;
  features: string[];
  isPopular?: boolean;
}

const pricingTiers: PackageTier[] = [
  {
    title: "The Editorial Chapter",
    price: "₹1,50,000",
    rawPrice: 150000,
    desc: "Designed for premium fashion styling, individual portfolios, and creative brand campaigns in traditional landmarks.",
    features: [
      "1 Day Palace / Exterior Shoot",
      "Principal Photographer",
      "Creative Portrait Lighting Setup",
      "40 High-Res Cinematic Color-Graded Plates",
      "Online Private Proofing Gallery",
      "Standard Delivery (3 Weeks)"
    ]
  },
  {
    title: "The Heritage Film",
    price: "₹3,50,000",
    rawPrice: 350000,
    badge: "Most Requested",
    desc: "Our signature high-end offering designed to document grand multi-day wedding celebrations with complete cultural reverence.",
    features: [
      "3 Days Comprehensive palace coverage",
      "1 Principal Photographer + 1 Candid Specialist",
      "1 Principal Cinematographer",
      "4K HDR Narrative Cinematic Film (5-7 Mins)",
      "120 Premium Heirlooms & Retouched Prints",
      "Handcrafted Italian Linen Fine-Art Photobook",
      "Standard Grading Lab Queue (4 Weeks)"
    ],
    isPopular: true
  },
  {
    title: "The Royal Legacy",
    price: "₹7,50,000",
    rawPrice: 750000,
    badge: "Elite Masterpiece",
    desc: "An absolute visual legacy masterpiece incorporating virtual sets pipelines and cinematic drone fleets for royal unions.",
    features: [
      "Up to 5 Days Unlimited palaces access",
      "Lead Artist Ashish Kumar + Elite Crew",
      "Dual Cinema Cameras (ARRI/RED 8K arrays)",
      "Cinematic Drone Squadron (Twilight Aerials)",
      "Unreal Engine 3D Studio Portrait Session",
      "8K HDR Theatrical Showcase Movie (15-20 Mins)",
      "Custom Italian-Leather Heirloom Series Albums",
      "Expedited Grading Lab Priority (10 Days)"
    ]
  }
];

interface AddOnItem {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const addOnItems: AddOnItem[] = [
  { id: 'drone', name: 'Twilight Cinema Drone Array', price: 35000, desc: 'Breathtaking 8K drone shots captured during twilight and golden hours' },
  { id: 'album', name: 'Handcrafted Italian Leather Album Series', price: 50000, desc: 'Exquisite, hand-bound albums delivered in a custom walnut display case' },
  { id: 'prewed', name: 'Sunset Pre-Wedding Film Chapter', price: 75000, desc: 'A dedicated 2-minute cinematic music video showreel shot in landmark destinations' },
  { id: 'sound', name: 'Bespoke Studio Orchestral Score', price: 40000, desc: 'A custom, royalty-free soundtrack composed exclusively for your heritage film' }
];

export const Pricing: React.FC = () => {
  const [selectedBasePrice, setSelectedBasePrice] = useState<number>(350000);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const currentTotal = selectedBasePrice + addOnItems
    .filter(item => selectedAddOns.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(currentTotal);

  return (
    <section className="content-section min-h-screen py-24 px-[5%] max-w-[1300px] mx-auto relative z-20" id="pricing">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Luxury Offerings
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Signature Investment Packages
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24 w-full text-left">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              onClick={() => setSelectedBasePrice(tier.rawPrice)}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col justify-between border cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                tier.isPopular
                  ? 'bg-surfaceDark/80 border-goldPrimary/60 shadow-[0_20px_50px_rgba(212,175,55,0.18)] scale-[1.03] lg:scale-[1.05] z-10'
                  : 'bg-surfaceDark/40 border-white/5 shadow-2xl hover:border-goldPrimary/30'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <span className="absolute -top-3.5 left-8 bg-gradient-to-r from-goldPrimary to-saffronPrimary text-bgDark text-[9px] font-bold font-mono tracking-widest uppercase py-1.5 px-4 rounded-full shadow-[0_5px_15px_rgba(212,175,55,0.4)]">
                  {tier.badge}
                </span>
              )}

              <div>
                {/* Header */}
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 tracking-wide mt-2">
                  {tier.title}
                </h3>
                <p className="text-textDim text-xs leading-relaxed mb-6">
                  {tier.desc}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-6">
                  <span className="text-3xl md:text-4xl font-serif text-gold-gradient font-bold">{tier.price}</span>
                  <span className="text-[10px] uppercase tracking-wider text-textDim font-mono">Investment Base</span>
                </div>

                {/* Features list */}
                <ul className="list-none flex flex-col gap-4 mb-8">
                  {tier.features.map((feat, index) => (
                    <li key={index} className="flex gap-3 text-xs md:text-sm text-textLight leading-snug">
                      <CheckCircle2 size={16} className="text-goldPrimary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Select State Indicator */}
              <button
                className={`w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  selectedBasePrice === tier.rawPrice
                    ? 'bg-goldPrimary text-bgDark border-goldPrimary font-black shadow-goldGlow'
                    : 'bg-transparent text-textLight border-white/10 hover:border-goldPrimary hover:text-goldPrimary'
                }`}
              >
                {selectedBasePrice === tier.rawPrice ? 'Selected Tier' : 'Select This Tier'}
                <ChevronRight size={14} />
              </button>

            </div>
          ))}
        </div>

        {/* Dynamic Add-Ons Custom Estimator */}
        <div className="glass-panel p-8 md:p-12 rounded-[40px] border border-goldPrimary/15 w-full flex flex-col lg:flex-row gap-10 items-stretch text-left shadow-2xl">
          
          {/* Left Column: Selector */}
          <div className="flex-[1.2] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-saffronPrimary uppercase mb-2 block">
                Interactive Customizer
              </span>
              <h3 className="font-serif text-3xl text-white mb-4 leading-tight">
                Luxury Commission Architect
              </h3>
              <p className="text-textDim text-sm mb-8 leading-relaxed">
                Add ultra-premium creative layers to your customized package. Selected items dynamically update your digital investment summary shown in the right panel.
              </p>
            </div>

            {/* Checkbox grid */}
            <div className="flex flex-col gap-4">
              {addOnItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddOnToggle(item.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 select-none ${
                    selectedAddOns.includes(item.id)
                      ? 'bg-goldPrimary/8 border-goldPrimary/60 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                      : 'bg-white/3 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold transition-colors duration-300 ${selectedAddOns.includes(item.id) ? 'text-goldPrimary' : 'text-textLight'}`}>
                      {item.name}
                    </h4>
                    <p className="text-textDim text-xs mt-1 leading-snug">{item.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-serif text-gold-gradient font-bold">+₹{(item.price / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Total Estimate HUD */}
          <div className="flex-[0.8] bg-bgDark/60 border border-goldPrimary/10 rounded-[30px] p-8 md:p-10 flex flex-col justify-between items-center text-center shadow-inner relative overflow-hidden">
            
            {/* Top faded geometric elements */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-goldPrimary/40 to-transparent" />
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-goldPrimary/5 blur-2xl" />

            <div className="w-full">
              <span className="text-[9px] font-bold tracking-widest text-textDim uppercase font-mono mb-4 block">
                Visual Investment Statement
              </span>
              
              <div className="border-b border-white/5 pb-4 mb-6 text-left w-full">
                <span className="text-xs text-textDim block">Base Selection</span>
                <span className="text-sm text-textLight font-semibold">
                  {pricingTiers.find(t => t.rawPrice === selectedBasePrice)?.title}
                </span>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="border-b border-white/5 pb-4 mb-6 text-left w-full">
                  <span className="text-xs text-textDim block mb-1">Creative Layer Add-ons</span>
                  <div className="flex flex-col gap-1.5">
                    {addOnItems.filter(a => selectedAddOns.includes(a.id)).map(a => (
                      <div key={a.id} className="flex justify-between items-center text-xs">
                        <span className="text-textLight">{a.name.split(' ').slice(0, 3).join(' ')}</span>
                        <span className="text-goldPrimary font-mono">+₹{(a.price/1000).toFixed(0)}k</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full mt-6">
              <span className="text-xs text-textDim uppercase tracking-wider block mb-1">Commission Grand Total</span>
              <div className="text-3xl md:text-4xl font-serif text-gold-gradient font-black tracking-tight mb-8">
                {formattedTotal}
              </div>

              <a
                href="#booking"
                className="btn-gold justify-center w-full py-4 text-xs font-bold font-sans tracking-widest uppercase shadow-goldGlow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Check Script Availability <Calendar size={14} />
              </a>

              <p className="text-[10px] text-textDim/50 mt-4 leading-normal">
                *Prices exclude dynamic palace location permits where applicable. Custom quotes verified by direct artists within 24 hours.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
