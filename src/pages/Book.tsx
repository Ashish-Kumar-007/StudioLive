import React, { useState } from 'react';
import { Calendar, Mail, MapPin, Phone, Send } from 'lucide-react';

export const Book: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'wedding',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', eventType: 'wedding', date: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full">
      <section className="py-[120px] px-[5%] max-w-[1200px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-[80px]">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Secure Your Dates
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-textLight mb-6">
            Inquire Availability
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        <div className="book-row flex gap-[80px] max-lg:flex-col max-lg:gap-10">
          
          {/* Column 1: Info Card */}
          <div className="book-info-col flex-[0.8] flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-3xl text-goldPrimary mb-5">
                Reserve Your Heritage Film
              </h3>
              <p className="text-textDim text-base leading-relaxed mb-10">
                Our national creative leads only take a limited number of high-end wedding projects every year to ensure elite visual focus and flawless Hollywood-grade editing. Submit your details, and we'll reach out to schedule an initial visual consultation within 24 hours.
              </p>
            </div>

            <div className="book-contact-card bg-surfaceDark/65 border border-goldPrimary/12 backdrop-blur-md p-[40px] rounded-2xl flex flex-col gap-[25px]">
              <h4 className="font-serif text-xl text-goldPrimary">
                Studio Headquarters
              </h4>
              <p className="text-sm text-textDim flex items-center gap-3">
                <MapPin size={18} className="text-saffronPrimary" />
                <span>Udaipur Palace St, Rajasthan, IN</span>
              </p>
              <p className="text-sm text-textDim flex items-center gap-3">
                <Mail size={18} className="text-saffronPrimary" />
                <span>heritage@studiolive.com</span>
              </p>
              <p className="text-sm text-textDim flex items-center gap-3">
                <Phone size={18} className="text-saffronPrimary" />
                <span>+91 98765 43210</span>
              </p>
            </div>
          </div>

          {/* Column 2: Request Form */}
          <div className="book-form-col flex-[1.2]">
            <form 
              onSubmit={handleSubmit}
              className="booking-form bg-surfaceDark/65 border border-goldPrimary/12 backdrop-blur-md p-[50px] max-md:p-[30px] rounded-[30px] flex flex-col gap-6"
            >
              <div className="flex gap-[30px] max-md:flex-col max-md:gap-0">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2 max-md:mt-6">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex gap-[30px] max-md:flex-col max-md:gap-0">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300"
                    placeholder="+91 99999 99999"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2 max-md:mt-6">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                    Event Type
                  </label>
                  <select 
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300"
                  >
                    <option value="wedding">Regal Wedding</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="portfolio">Visual Portfolio</option>
                    <option value="commercial">Cinematic Film</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                  Desired Date
                </label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-goldPrimary">
                  Event Details & Ambience
                </label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-bgDark/60 border border-goldPrimary/12 rounded-xl p-3.5 text-textLight text-sm focus:outline-none focus:border-goldPrimary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all duration-300 resize-none"
                  placeholder="Share details about your palace, heritage preferences, or visual styling ideas..."
                />
              </div>

              {submitted ? (
                <div className="bg-saffronPrimary/10 border border-saffronPrimary/40 text-saffronPrimary p-4 rounded-xl text-center text-sm font-semibold tracking-wider animate-pulse">
                  ✓ Inquiry Received! Our principal leads will call you shortly.
                </div>
              ) : (
                <button 
                  type="submit"
                  className="btn-gold justify-center mt-3"
                >
                  Submit Booking Inquiry <Send size={16} />
                </button>
              )}

            </form>
          </div>

        </div>

      </section>
    </div>
  );
};
