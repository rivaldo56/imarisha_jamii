import { useRef, useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink, MessageCircle, CheckCircle2 } from 'lucide-react';
import { contactConfig } from '../config';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import { PageTitle } from '../components/PageTitle';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from '../components/ui/map';
import gsap from 'gsap';
import { PageFAQ } from '../sections/PageFAQ';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState('Teachers conduct');

  const formRef = useRef<HTMLFormElement>(null);
  const feedbackFormRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { data: settingsData } = useSanityData<any>(QUERIES.settings, {}, null);
  
  const contactInfo = settingsData?.contactInfo || {
    phone: contactConfig.info.phone,
    email: contactConfig.info.email,
    address: contactConfig.info.location,
    hours: contactConfig.info.hours,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(formRef.current!);
    
    trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT || 'contact_form_submit', { 
      name: formData.get('name'),
      email: formData.get('email')
    });

    // Mock submission
    setTimeout(() => {
      setFormStatus('success');
      formRef.current?.reset();
    }, 1500);
  };

  // FEEDBACK FORM LOGIC
  const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfY2ymSH78EHEEWpRX8uWsIhW0xVE2GRYgz_1nnQ_ZvXQ1ukQ/formResponse";
  const FEEDBACK_FORM_ENTRIES = {
    message:   "entry.521826196",    // Message / Feedback
    category:  "entry.965276845",    // Category
    name:      "entry.708882392",    // name
    contact:   "entry.1375990561",   // Phone/Email
    anonymous: "entry.415299389",    // Anonymous
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus('submitting');

    const formData = new FormData(feedbackFormRef.current!);
    const data = new URLSearchParams();

    // Mapping fields
    data.append(FEEDBACK_FORM_ENTRIES.message, formData.get('message') as string);
    data.append(FEEDBACK_FORM_ENTRIES.category, feedbackCategory);
    data.append(FEEDBACK_FORM_ENTRIES.name, isAnonymous ? "" : (formData.get('name') as string || ""));
    data.append(FEEDBACK_FORM_ENTRIES.contact, isAnonymous ? "" : (formData.get('contact') as string || ""));
    data.append(FEEDBACK_FORM_ENTRIES.anonymous, isAnonymous ? "yes" : "No");

    trackEvent('feedback_form_submit', { category: feedbackCategory });

    try {
      await fetch(FEEDBACK_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      setFeedbackStatus('success');
      feedbackFormRef.current?.reset();
    } catch (err) {
      console.error('Feedback submission error:', err);
      // As per instructions: "On any response (including network error), navigate to success state — do not block the user."
      setFeedbackStatus('success');
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite">
      <PageTitle />
      
      {/* Hero Section */}
      <section className="relative pt-44 pb-24 bg-forest-dark text-white overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <h1 className="text-5xl md:text-7xl font-sans font-extrabold mb-8 tracking-tight uppercase leading-[0.9]">
            {contactConfig.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-body text-white/80 max-w-2xl mx-auto leading-relaxed">
            {contactConfig.hero.subtext}
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
            {/* Call Card */}
            <a 
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              onClick={() => trackEvent('contact_phone_click')}
              className="contact-card bg-altwhite p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-softblack/5 group"
            >
              <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-2 font-sans">Call Us</p>
              <h3 className="text-3xl font-sans font-extrabold text-softblack mb-4">
                {contactInfo.phone}
              </h3>
              <p className="text-softblack/60 font-body">We pick up. Come talk to a person.</p>
            </a>

            {/* Email Card */}
            <a 
              href={`mailto:${contactInfo.email}`}
              onClick={() => trackEvent('contact_email_click')}
              className="contact-card bg-altwhite p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-softblack/5 group"
            >
              <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-2 font-sans">Email Us</p>
              <h3 className="text-2xl font-sans font-extrabold text-softblack mb-4 break-all">
                {contactInfo.email}
              </h3>
              <p className="text-softblack/60 font-body">We respond within 24 hours.</p>
            </a>

            {/* WhatsApp Card */}
            <a 
              href={`https://wa.me/${contactInfo.phone.replace(/\s/g, '').replace(/^0/, '254')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('contact_whatsapp_click')}
              className="contact-card bg-altwhite p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-softblack/5 group"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-2 font-sans">WhatsApp Us</p>
              <h3 className="text-3xl font-sans font-extrabold text-softblack mb-4">
                Chat Now
              </h3>
              <p className="text-softblack/60 font-body">Message us for a quick response on WhatsApp.</p>
            </a>

            {/* Visit Card */}
            <div className="contact-card bg-altwhite p-10 rounded-2xl shadow-xl transition-all duration-500 border border-softblack/5 group">
              <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-2 font-sans">Find Us</p>
              <h3 className="text-2xl font-sans font-extrabold text-softblack mb-4">
                Umoja Innercore
              </h3>
              <p className="text-softblack/60 font-body">{contactInfo.address}</p>
            </div>
          </div>

          <div className="mt-24 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Form */}
            <div className="bg-altwhite p-8 md:p-12 rounded-2xl shadow-sm border border-softblack/5 h-fit">
              {formStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-sans font-bold text-softblack mb-4">Inquiry Received!</h3>
                  <p className="text-softblack/60 font-body mb-8">
                    We've got your message. Our team will guide you from here.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-bronze font-bold hover:underline"
                  >
                    Send another question
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-3xl font-sans font-bold text-softblack mb-4">Send Us a Message</h2>
                    <p className="text-softblack/60 font-body">Tell us what you're looking for. We'll guide you from there.</p>
                  </div>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="full-name" className="text-sm font-bold text-softblack/70 ml-1">Full Name</label>
                      <input
                        id="full-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        autoComplete="name"
                        className="w-full bg-offwhite border border-softblack/5 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-softblack/70 ml-1">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="e.g. 0712 345 678"
                          autoComplete="tel"
                          className="w-full bg-offwhite border border-softblack/5 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-softblack/70 ml-1">Email Address (Optional)</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          className="w-full bg-offwhite border border-softblack/5 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-softblack/70 ml-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="What would you like to know about our programs?"
                        rows={4}
                        className="w-full bg-offwhite border border-softblack/5 rounded-xl px-6 py-4 focus:ring-2 focus:ring-bronze outline-none transition-all font-body text-softblack resize-none"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-bronze text-white font-bold py-5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 ease-out flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                    >
                      {formStatus === 'submitting' ? "Sending Inquiry..." : "Send My Inquiry"} <ArrowRight size={20} />
                    </button>
                    <p className="text-center text-xs text-softblack/40 font-body italic">
                      🔒 Your information is private and only used for admissions contact.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Address & Hours */}
            <div className="space-y-12">
              <div className="bg-altwhite p-8 md:p-12 rounded-2xl border border-softblack/5 shadow-sm">
                <h3 className="text-2xl font-sans font-bold text-softblack mb-6">Address</h3>
                <div className="text-softblack/70 font-body leading-relaxed space-y-4 text-sm">
                  <p className="font-bold text-softblack">Imarisha Jamii Centre C.B.O</p>
                  <p>Umoja Innercore<br />Opposite Chiefs Camp<br />Within Friends Church Compound<br />Nairobi, Kenya</p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${contactConfig.info.coordinates.lat},${contactConfig.info.coordinates.lng}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-bronze font-bold hover:underline mt-4 group"
                  >
                    Get Directions <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="bg-altwhite p-8 md:p-12 rounded-2xl border border-softblack/5 shadow-sm overflow-hidden text-sm">
                <h3 className="text-2xl font-sans font-bold text-softblack mb-8 flex items-center gap-3">
                  <Clock size={24} className="text-bronze" /> Office Hours
                </h3>
                <table className="w-full text-left font-body">
                  <tbody className="divide-y divide-softblack/5">
                    <tr>
                      <td className="py-4 font-bold">Monday – Friday</td>
                      <td className="py-4 text-softblack/60">{contactInfo.hours?.weekday || contactConfig.info.hours.weekday}</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Saturday</td>
                      <td className="py-4 text-softblack/60">{contactInfo.hours?.saturday || contactConfig.info.hours.saturday}</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Sunday</td>
                      <td className="py-4 text-softblack/60 italic">{contactInfo.hours?.sunday || contactConfig.info.hours.sunday}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feedback & Reporting Section */}
      <section className="py-24 md:py-32 bg-offwhite border-t border-softblack/5">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-softblack/40 uppercase tracking-widest mb-4">FEEDBACK & REPORTING</p>
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-softblack mb-4 tracking-tight">Something to say? We're listening.</h2>
            <p className="text-softblack/60 font-body">All feedback is confidential and reviewed by admin only.</p>
          </div>

          <div className="bg-altwhite p-8 md:p-12 rounded-2xl border border-softblack/5 shadow-sm">
            {feedbackStatus === 'success' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-sans font-bold text-softblack mb-4">Feedback Received!</h3>
                <p className="text-softblack/60 font-body">
                  Thank you. Your feedback has been received and will be reviewed.
                </p>
                <button 
                  onClick={() => setFeedbackStatus('idle')}
                  className="mt-8 text-bronze font-bold hover:underline"
                >
                  Send more feedback
                </button>
              </div>
            ) : (
              <form ref={feedbackFormRef} onSubmit={handleFeedbackSubmit} className="space-y-8">
                {/* Message / Feedback */}
                <div className="space-y-2">
                  <label htmlFor="feedback-message" className="text-xs font-bold uppercase tracking-widest text-softblack/40">Message / Feedback *</label>
                  <textarea
                    id="feedback-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={500}
                    rows={4}
                    placeholder="Your message here (max 500 chars)"
                    className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack resize-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label htmlFor="feedback-category" className="text-xs font-bold uppercase tracking-widest text-softblack/40">Category *</label>
                  <select
                    id="feedback-category"
                    name="category"
                    required
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none"
                  >
                    <option value="Teachers conduct">Teachers conduct</option>
                    <option value="School services">School services</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Anonymous Toggle */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 rounded border-softblack/10 text-bronze focus:ring-bronze"
                    />
                    <span className="text-sm font-bold text-softblack/70 group-hover:text-softblack transition-colors">Submit anonymously</span>
                  </label>

                  {/* Collapsible Name/Contact Fields */}
                  <div 
                    className={`grid transition-all duration-500 ease-out ${isAnonymous ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}
                  >
                    <div className="overflow-hidden space-y-8">
                      <div className="grid md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-2">
                          <label htmlFor="feedback-name" className="text-xs font-bold uppercase tracking-widest text-softblack/40">Name</label>
                          <input
                            id="feedback-name"
                            type="text"
                            name="name"
                            disabled={isAnonymous}
                            placeholder="Your name"
                            className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="feedback-contact" className="text-xs font-bold uppercase tracking-widest text-softblack/40">Phone or Email</label>
                          <input
                            id="feedback-contact"
                            type="text"
                            name="contact"
                            disabled={isAnonymous}
                            placeholder="your@email.com or 07xx..."
                            className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isAnonymous && (
                    <p className="text-xs text-softblack/40 font-body italic text-center animate-in fade-in duration-500">
                      "Your identity will not be included in this submission."
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <button 
                    type="submit"
                    disabled={feedbackStatus === 'submitting'}
                    className="bg-bronze text-white font-bold py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all duration-500 ease-out disabled:opacity-50 shadow-lg flex items-center gap-3"
                  >
                    {feedbackStatus === 'submitting' ? "Sending..." : "Send My Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-altwhite rounded-3xl border border-softblack/5 shadow-xl overflow-hidden h-[500px] md:h-[600px] relative">
            <Map 
              center={[contactConfig.info.coordinates.lng, contactConfig.info.coordinates.lat]} 
              zoom={15}
              attributionControl={{ compact: true }}
            >
              <MapControls position="bottom-right" showZoom showLocate showFullscreen />
              <MapMarker 
                longitude={contactConfig.info.coordinates.lng} 
                latitude={contactConfig.info.coordinates.lat}
              >
                <MarkerContent>
                  <div className="relative group/marker">
                    <div className="w-12 h-12 bg-bronze rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white group-hover/marker:scale-110 transition-transform duration-300">
                      <MapPin size={24} />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-softblack text-white text-xs py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none font-bold">
                      Imarisha Jamii Centre
                    </div>
                  </div>
                </MarkerContent>
                <MarkerPopup closeButton className="max-w-[220px]">
                  <h4 className="font-sans font-bold text-softblack text-base mb-1">Imarisha Jamii Centre</h4>
                  <p className="text-xs text-softblack/60 font-body leading-tight">
                    Umoja Innercore, Within Friends Church Compound. Nairobi.
                  </p>
                </MarkerPopup>
              </MapMarker>
            </Map>
          </div>
        </div>
      </section>

      {/* Page FAQ */}
      <PageFAQ page="contact" title="Contact — FAQs" />

      {/* Soft Close */}
      <section className="pb-32 text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-2xl md:text-3xl font-sans font-bold text-softblack leading-tight">
            Not sure where to start? That's okay. <br />
            Call us and we'll figure it out together.
          </p>
          <a 
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="text-4xl md:text-6xl font-sans font-extrabold text-bronze hover:scale-105 transition-transform inline-block"
          >
            {contactInfo.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
