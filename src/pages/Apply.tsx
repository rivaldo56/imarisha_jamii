import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2,
  Users,
  ShieldCheck,
  Phone,
  MessageCircle,
  Building2,
  ArrowDown,
  User,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';

// Google Form Entry IDs for headless submission
const GOOGLE_FORM_ENTRIES = {
  // Student
  fullName: 'entry.831866712',
  dob: 'entry.865766690',
  gender: 'entry.975007391',
  admissionNumber: 'entry.310837518',
  classToJoin: 'entry.2078485954',
  previousLevel: 'entry.1125825804',
  idNumber: 'entry.2052566900',
  phone: 'entry.1637443900',
  email: 'entry.1782088536',
  residence: 'entry.298256966',
  
  // Guardian
  guardianName: 'entry.883582360',
  guardianId: 'entry.258784839',
  guardianRelation: 'entry.2066221568',

  // Next of Kin
  kinName: 'entry.867721170',
  kinRelation: 'entry.565499972',
  kinPhone: 'entry.1740552569'
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScL59QAejn_i_3-BW0lK2Vk0RPkPRoySkDl8-5s23WM8Y0avA/formResponse";

export default function Apply() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.apply-hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Section fade-ins
      const sections = gsap.utils.toArray('.apply-section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (formRef.current) {
      const currentStepWrapper = formRef.current.querySelector(`div[data-step="${step}"]`);
      if (currentStepWrapper) {
        const inputs = Array.from(
          currentStepWrapper.querySelectorAll('input, select, textarea')
        ) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];

        const firstInvalid = inputs.find(input => !input.checkValidity());
        if (firstInvalid) {
          firstInvalid.reportValidity();
          return;
        }
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = new URLSearchParams();
    
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });
    
    // For multi-page Google Forms, we must explicitly send pageHistory
    // otherwise fields on pages 2 and 3 (Sections B and C) are ignored by Google Forms
    data.append('pageHistory', '0,1,2');

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
      // no-cors always returns opaque response, so we proceed
      navigate('/thank-you');
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback
      navigate('/thank-you');
    }
  };

  const steps = [
    { id: 1, name: 'Student', icon: User },
    { id: 2, name: 'Guardian', icon: Users },
    { id: 3, name: 'Next of Kin', icon: ShieldCheck },
  ];

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen font-body">
      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-32 bg-forest-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="apply-hero-text text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold mb-8 tracking-tight uppercase leading-[0.9]">
            Start Your Career with <br />
            <span className="text-bronze">Imarisha Jamii</span> Training Programs
          </h1>
          <p className="apply-hero-text text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Gain practical skills in digital technology, entrepreneurship, and career development.
          </p>
          
          <div className="apply-hero-text flex flex-wrap justify-center gap-6 mb-16 text-sm font-bold uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-bronze" /> Hundreds of students trained
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-bronze" /> Industry-relevant skills
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-bronze" /> Hands-on learning
            </span>
          </div>

          <button 
            onClick={scrollToForm}
            className="apply-hero-text inline-flex items-center gap-3 bg-bronze text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-bronze/90 transition-all shadow-xl group"
          >
            Apply for Next Intake <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bronze/5 to-transparent pointer-events-none" />
      </section>


      {/* 5. APPLICATION FORM SECTION - CUSTOM UI */}
      <section id="application-form" className="apply-section py-24 md:py-32 bg-offwhite border-t border-softblack/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-softblack mb-6 uppercase tracking-tight">Apply Now</h2>
            <p className="text-xl text-softblack/60 font-body leading-relaxed">
              Complete the application form below. Our team will review your application and contact you with the next steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="flex justify-between mb-16 relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-softblack/5 -translate-y-1/2 z-0" />
              {steps.map((s) => {
                const Icon = s.icon;
                const isActive = step >= s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-bronze text-white shadow-lg scale-110' : 'bg-white text-softblack/30 border border-softblack/5'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-4 transition-colors ${
                      isActive ? 'text-bronze' : 'text-softblack/30'
                    }`}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-softblack/5 relative overflow-hidden">
              <form 
                ref={formRef}
                onSubmit={handleCustomSubmit}
                className="space-y-12"
              >
                {/* Step 1: Student Details */}
                <div data-step="1" className={`${step === 1 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Student Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Full Name *</label>
                      <input required type="text" name={GOOGLE_FORM_ENTRIES.fullName} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Your Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Date of Birth *</label>
                      <input required type="date" name={GOOGLE_FORM_ENTRIES.dob} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Gender</label>
                      <select name={GOOGLE_FORM_ENTRIES.gender} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Admission Number</label>
                      <input type="text" name={GOOGLE_FORM_ENTRIES.admissionNumber} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Admission Number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Class to Join *</label>
                    <select required name={GOOGLE_FORM_ENTRIES.classToJoin} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                      <option value="">Select a Class</option>
                      <option value="HIGH SCHOOL/KCSE EXAM BOOKING">HIGH SCHOOL/KCSE EXAM BOOKING</option>
                      <option value="KCSE Bridging">KCSE Bridging</option>
                      <option value="Computer Packages/Graphic Design">Computer Packages/Graphic Design</option>
                      <option value="Languages">Languages</option>
                      <option value="Life Skill Development And Teenage Counselling">Life Skill Development And Teenage Counselling</option>
                      <option value="Literacy Beginner">Literacy Beginner</option>
                      <option value="Post Literacy (Primary)">Post Literacy (Primary)</option>
                      <option value="Tuition & Lab Sessions">Tuition & Lab Sessions</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Previous Level of Study</label>
                      <input type="text" name={GOOGLE_FORM_ENTRIES.previousLevel} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Previous Level" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">ID/Passport/Birth Cert Number *</label>
                      <input required type="text" name={GOOGLE_FORM_ENTRIES.idNumber} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="ID/Passport/Birth Cert" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Phone Number *</label>
                      <input required type="tel" name={GOOGLE_FORM_ENTRIES.phone} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="e.g. 0791 925 619" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Email (optional)</label>
                      <input type="email" name={GOOGLE_FORM_ENTRIES.email} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Place Of Residence *</label>
                    <input required type="text" name={GOOGLE_FORM_ENTRIES.residence} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Where do you live?" />
                  </div>

                  <div className="flex justify-end">
                    <button type="button" onClick={nextStep} className="bg-bronze text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2">
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Step 2: Guardian Details */}
                <div data-step="2" className={`${step === 2 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Parent/Guardian</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Name of Parent/Guardian</label>
                      <input type="text" name={GOOGLE_FORM_ENTRIES.guardianName} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Guardian Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">ID/Passport of Parent/Guardian *</label>
                      <input required type="text" name={GOOGLE_FORM_ENTRIES.guardianId} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="ID or Passport" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">How are you related</label>
                    <input type="text" name={GOOGLE_FORM_ENTRIES.guardianRelation} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Relationship" />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="text-softblack font-bold py-4 px-10 rounded-full border border-softblack/10 hover:bg-offwhite transition-all flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="bg-bronze text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2">
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Step 3: Next of Kin */}
                <div data-step="3" className={`${step === 3 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Next of Kin</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Full Name</label>
                      <input type="text" name={GOOGLE_FORM_ENTRIES.kinName} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">How are you related</label>
                      <input type="text" name={GOOGLE_FORM_ENTRIES.kinRelation} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Relationship" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Phone Number</label>
                    <input type="tel" name={GOOGLE_FORM_ENTRIES.kinPhone} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Phone Number" />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex gap-4 text-amber-800">
                    <AlertCircle className="flex-shrink-0" />
                    <p className="text-sm font-body">
                      <strong>Important:</strong> Please bring your original certificates and national ID (or birth certificate) when invited for the placement interview.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="text-softblack font-bold py-4 px-10 rounded-full border border-softblack/10 hover:bg-offwhite transition-all flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-bronze text-white font-bold py-4 px-10 rounded-xl hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Form'} <CheckCircle2 size={20} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="apply-section py-24 md:py-32 bg-forest-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-sans font-extrabold mb-6 tracking-tight uppercase">Have Questions?</h2>
          <p className="text-xl text-white/60 mb-12 font-body max-w-2xl mx-auto">
            Contact us if you need help with your application or want to learn more about our specific courses.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a 
              href="tel:+254791925619" 
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-5 rounded-full font-bold transition-all border border-white/10"
            >
              <Phone size={20} className="text-bronze" /> Call Us
            </a>
            <a 
              href="https://wa.me/254791925619" 
              className="flex items-center gap-3 bg-white text-forest-dark px-8 py-5 rounded-full font-bold hover:bg-bronze hover:text-white transition-all shadow-xl"
            >
              <MessageCircle size={20} className="text-green-600" /> WhatsApp
            </a>
            <a 
              href="/contact" 
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-5 rounded-full font-bold transition-all border border-white/10"
            >
              <Building2 size={20} className="text-bronze" /> Visit Our Center
            </a>
          </div>
        </div>
        
        {/* Subtle decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
      </section>
    </div>
  );
}
