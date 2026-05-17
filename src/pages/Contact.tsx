import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    type: '',
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate successful API booking lead submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        date: '',
        type: '',
        details: '',
      });
    }, 1200);
  };

  return (
    <div className="page-content py-24 px-6 max-w-3xl mx-auto" id="booking">
      <div className="glass rounded-3xl p-10 md:p-16 shadow-xl reveal">
        {status === 'success' ? (
          <div className="text-center py-12 animate-fadeIn">
            <CheckCircle className="w-20 h-20 text-[#25D366] mx-auto mb-6 animate-bounce" />
            <h2 className="text-editorial text-4xl text-primary mb-4">Request Received!</h2>
            <p className="text-dim text-lg max-w-md mx-auto mb-8">
              Thank you for sharing your story request with us! Our creative booking director will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setStatus('idle')} 
              className="btn-primary border-0 cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h2 className="text-editorial text-4xl md:text-5xl text-primary mb-4">Book Your Session</h2>
              <p className="text-dim text-lg">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-bold text-dim uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors" 
                  placeholder="John & Jane Doe" 
                  required 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-dim uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors" 
                  placeholder="hello@example.com" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-sm font-bold text-dim uppercase tracking-wider">Event Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors" 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="type" className="text-sm font-bold text-dim uppercase tracking-wider">Event Type</label>
                  <select 
                    id="type" 
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors" 
                    required
                  >
                    <option value="">Select an event...</option>
                    <option value="wedding">Wedding</option>
                    <option value="prewedding">Pre-Wedding Shoot</option>
                    <option value="corporate">Corporate Function</option>
                    <option value="party">Private Party</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="details" className="text-sm font-bold text-dim uppercase tracking-wider">Tell us about your event</label>
                <textarea 
                  id="details" 
                  rows={5} 
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full bg-background border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors resize-none" 
                  placeholder="Venue, guest count, special requests..."
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full py-4 text-lg border-0 cursor-pointer flex justify-center items-center gap-2"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Submitting Request...' : 'Submit Request'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
