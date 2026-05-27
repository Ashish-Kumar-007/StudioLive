import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'heritage-wedding',
    date: '',
    palace: 'udaipur-city-palace',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate luxury API response cadence delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Clear form after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: 'heritage-wedding',
          date: '',
          palace: 'udaipur-city-palace',
          message: ''
        });
      }, 4000);
    }, 1500);
  };

  // WhatsApp bypass message builder
  const getWhatsAppLink = () => {
    const palaceNames: Record<string, string> = {
      'udaipur-city-palace': 'Udaipur City Palace',
      'jagmandir-island': 'Jagmandir Island Palace',
      'leela-palace': 'The Leela Palace Udaipur',
      'rambagh-palace': 'Rambagh Palace Jaipur',
      'umaid-bhawan': 'Umaid Bhawan Palace Jodhpur',
      'suryagarh-jaisalmer': 'Suryagarh Jaisalmer',
      'falaknuma-palace': 'Taj Falaknuma Palace Hyderabad',
      'other': 'Other Heritage Site'
    };

    const eventNames: Record<string, string> = {
      'heritage-wedding': 'Regal Palace Wedding',
      'pre-wedding': 'Sunset Pre-Wedding Film',
      'fashion-editorial': 'High-Fashion Editorial',
      'commercial-reel': 'Cinematic Commercial Film'
    };

    const messageText = `Hello StudioLive Elite, I would like to check availability for our special Shubh Muhurat day!
    
*Details:*
- Name: ${formData.name || 'Inquirer'}
- Event: ${eventNames[formData.eventType]}
- Location: ${palaceNames[formData.palace]}
- Date: ${formData.date || 'TBD'}
- Notes: ${formData.message || 'Looking for custom visual storytelling.'}`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <section className="content-section min-h-screen py-24 px-[5%] max-w-[1200px] mx-auto relative z-20" id="booking">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Secure Shubh Muhurat Dates
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Inquire Palace Availability
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-stretch w-full text-left">
          
          {/* Left Column: Studio Info */}
          <div className="flex-[0.8] flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-goldPrimary mb-6 tracking-wide">
                Reserve Your Shubh Muhurat Date
              </h3>
              <p className="text-textDim text-sm md:text-base leading-relaxed mb-10">
                To guarantee our signature artistic focus and Hollywood-grade color grading, our master directors only accept **15 high-end palace wedding projects** each year. 
              </p>

              <p className="text-textDim text-sm md:text-base leading-relaxed mb-12">
                Submit your project parameters in the commission form, or bypass the queue by initiating an instant WhatsApp Shubh Muhurat consultation directly with our studio leads.
              </p>
            </div>

            {/* Info Deck */}
            <div className="glass-panel p-8 rounded-3xl border border-goldPrimary/10 flex flex-col gap-6 w-full">
              <h4 className="font-serif text-xl text-goldPrimary tracking-wide border-b border-white/5 pb-3">
                Studio Headquarters
              </h4>
              
              <div className="flex items-center gap-4 text-xs md:text-sm text-textDim">
                <MapPin size={18} className="text-saffronPrimary shrink-0" />
                <span>Udaipur Palace St, Rajasthan, IN</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs md:text-sm text-textDim">
                <Mail size={18} className="text-saffronPrimary shrink-0" />
                <span>heritage@studiolive.com</span>
              </div>

              <div className="flex items-center gap-4 text-xs md:text-sm text-textDim">
                <Phone size={18} className="text-saffronPrimary shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Form */}
          <div className="flex-[1.2] w-full">
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 md:p-12 rounded-[40px] border border-goldPrimary/15 flex flex-col gap-6 shadow-2xl bg-surfaceDark/50 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full name */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Maharani Singhania"
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight placeholder-textDim/30 focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@heritage.com"
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight placeholder-textDim/30 focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Phone */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight placeholder-textDim/30 focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  />
                </div>

                {/* Event Type */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Event Genre
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  >
                    <option value="heritage-wedding">Regal Palace Wedding</option>
                    <option value="pre-wedding">Sunset Pre-Wedding Film</option>
                    <option value="fashion-editorial">High-Fashion Editorial</option>
                    <option value="commercial-reel">Cinematic Commercial Film</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Desired Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Shubh Muhurat / Auspicious Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  />
                </div>

                {/* Palace Selector */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                    Heritage Palace / Venue
                  </label>
                  <select
                    value={formData.palace}
                    onChange={(e) => setFormData({ ...formData, palace: e.target.value })}
                    className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3 px-4 text-sm text-textLight focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300"
                  >
                    <option value="udaipur-city-palace">Udaipur City Palace</option>
                    <option value="jagmandir-island">Jagmandir Island Palace</option>
                    <option value="leela-palace">The Leela Palace Udaipur</option>
                    <option value="rambagh-palace">Rambagh Palace Jaipur</option>
                    <option value="umaid-bhawan">Umaid Bhawan Palace Jodhpur</option>
                    <option value="suryagarh-jaisalmer">Suryagarh Jaisalmer</option>
                    <option value="falaknuma-palace">Taj Falaknuma Palace Hyderabad</option>
                    <option value="other">Other Exclusive Venue</option>
                  </select>
                </div>

              </div>

              {/* Message Details */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-goldPrimary">
                  Visual Ambience & Traditions (Sangeet, Phere...)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your lighting, heritage style preferences, or creative mood boards..."
                  className="bg-bgDark/80 border border-goldPrimary/15 rounded-xl py-3.5 px-4 text-sm text-textLight placeholder-textDim/30 focus:outline-none focus:border-goldPrimary focus:shadow-goldGlow transition-all duration-300 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                
                {/* Form submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="flex-1 btn-gold justify-center py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-goldGlow"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Checking Shubh Muhurat...</span>
                  ) : submitted ? (
                    <span>✓ Inquiry Dispatched</span>
                  ) : (
                    <span className="flex items-center gap-2">Submit Commission Request <Send size={14} /></span>
                  )}
                </button>

                {/* WhatsApp Bypass */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 py-4 rounded-full text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
                >
                  WhatsApp Shubh Muhurat Check <MessageSquare size={14} />
                </a>

              </div>

              {/* Success Banner */}
              {submitted && (
                <div className="bg-goldPrimary/10 border border-goldPrimary/30 text-goldPrimary p-4 rounded-xl text-center text-xs font-semibold tracking-widest uppercase animate-fadeIn mt-4">
                  ✓ Royal consultation scheduled. An art director will contact you within 24 hours.
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
