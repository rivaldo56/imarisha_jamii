import { useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactConfig } from '../config';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // In a real app, you would use formData here
    const formData = new FormData(formRef.current!);
    
    trackEvent(ANALYTICS_EVENTS.CONTACT_INQUIRY, { 
      subject: formData.get('subject') as string 
    });

    // Mock submission
    setTimeout(() => {
      setFormStatus('success');
      formRef.current?.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-offwhite py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Contact Details */}
          <div>
            <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-softblack mb-8 tracking-tight">
              {contactConfig.hero.title}
            </h1>
            <p className="text-softblack/70 font-body text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
              Whether you have questions about our KCSE classes or need advice on which program is right for you, we're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-1">Call or WhatsApp</p>
                  <p className="text-xl font-sans font-bold text-softblack">{contactConfig.info.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-sans font-bold text-softblack">{contactConfig.info.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-1">Office Hours</p>
                  <p className="text-xl font-sans font-bold text-softblack">{contactConfig.info.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-1">Our Location</p>
                  <p className="text-xl font-sans font-bold text-softblack">{contactConfig.info.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-softblack/5 border border-softblack/5 h-fit">
            {formStatus === 'success' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-sans font-bold text-softblack mb-4">Message Sent!</h3>
                <p className="text-softblack/60 font-body mb-8">
                  Thank you for your inquiry. A member of our admissions team will contact you within 24 hours.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-bronze font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-sans font-bold text-softblack mb-8">Send us a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="full-name" className="text-sm font-bold text-softblack/70 ml-1">Full Name</label>
                      <input
                        id="full-name"
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        autoComplete="name"
                        className="w-full bg-offwhite border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-softblack/70 ml-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        className="w-full bg-offwhite border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-softblack/70 ml-1">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      className="w-full bg-offwhite border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-softblack/70 ml-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your goals..."
                      rows={5}
                      className="w-full bg-offwhite border-0 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack resize-none"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-bronze text-white font-bold py-5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 ease-out flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-bronze/20"
                  >
                    {formStatus === 'submitting' ? (
                      <>Sending Inquiry...</>
                    ) : (
                      <>Send My Inquiry <Send size={20} /></>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
