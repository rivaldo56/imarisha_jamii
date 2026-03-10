import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Terminal, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  UserPlus, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  LifeBuoy,
  Phone,
  MessageCircle,
  Building2,
  ArrowDown,
  User,
  BookOpen,
  FileText,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { useSanityData, QUERIES } from '../lib/useSanityData';

// Google Form Entry IDs for headless submission
const GOOGLE_FORM_ENTRIES = {
  fullName: 'entry.87824769',
  phone: 'entry.1205564995',
  email: 'entry.654765305',
  age: 'entry.1372965812',
  location: 'entry.189271865',
  lastGrade: 'entry.1875280849',
  kcpeYear: 'entry.1281371902',
  previousSchool: 'entry.889077615',
  program: 'entry.1177752645',
  learningMode: 'entry.830234381'
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeLrj2fC0PHNQL_TFlDVmyQrDOome3tUpl0j0jivtWSwcmEgQ/formResponse";

export default function Apply() {
  const pageRef = useRef<HTMLDivElement>(null);
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = new URLSearchParams();
    
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });

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
    { id: 1, name: 'Personal', icon: User },
    { id: 2, name: 'Academic', icon: BookOpen },
    { id: 3, name: 'Program', icon: FileText },
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

      {/* 2. PROGRAM BENEFITS SECTION */}
      <section className="apply-section py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack mb-4">Why Train With Us?</h2>
            <div className="w-20 h-1.5 bg-bronze mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Terminal,
                title: "Practical Skills Training",
                desc: "Hands-on training designed to prepare you for real jobs."
              },
              {
                icon: Briefcase,
                title: "Industry-Relevant Curriculum",
                desc: "Learn skills that employers and businesses actually need."
              },
              {
                icon: TrendingUp,
                title: "Career Opportunities",
                desc: "Build a foundation for employment, freelancing, or entrepreneurship."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-altwhite p-10 rounded-3xl border border-softblack/5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-16 h-16 bg-bronze/10 rounded-2xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-2xl font-sans font-bold text-softblack mb-4">{benefit.title}</h3>
                <p className="text-softblack/60 leading-relaxed font-body">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO CAN APPLY SECTION */}
      <section className="apply-section py-24 md:py-32 bg-altwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack mb-8 leading-tight">
                Empowering the Next Generation of <span className="text-bronze italic">Doers</span>.
              </h2>
              <p className="text-lg text-softblack/70 mb-10 leading-relaxed">
                Our programs are specifically designed for motivated individuals who want to bridge the skills gap and take control of their career path.
              </p>
              
              <div className="space-y-4">
                {[
                  "Youth and young professionals",
                  "Beginners interested in digital skills",
                  "Entrepreneurs who want to grow their business",
                  "Anyone motivated to learn practical skills"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-softblack/5 shadow-sm">
                    <div className="w-8 h-8 bg-bronze text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="font-bold text-softblack/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="aspect-square relative flex items-center justify-center">
                <div className="absolute inset-0 bg-bronze/5 rounded-[40px] rotate-3 scale-95" />
                <div className="bg-forest-dark text-white p-12 rounded-[40px] shadow-2xl relative z-10 w-full">
                  <h3 className="text-3xl font-sans font-bold mb-8">What we look for:</h3>
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: Users, label: "Community Mindset" },
                      { icon: Lightbulb, label: "Creative Drive" },
                      { icon: UserPlus, label: "Growth Potential" },
                      { icon: ShieldCheck, label: "Integrity" }
                    ].map((val, i) => (
                      <div key={i} className="space-y-3">
                        <div className="text-bronze"><val.icon size={28} /></div>
                        <p className="font-bold text-sm tracking-wide uppercase">{val.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAM HIGHLIGHTS */}
      <section className="apply-section py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Duration",
                val: "4–12 weeks depending on program"
              },
              {
                icon: Users,
                title: "Learning Mode",
                val: "In-person training"
              },
              {
                icon: MapPin,
                title: "Location",
                val: "Imarisha Jamii Training Center"
              },
              {
                icon: LifeBuoy,
                title: "Support",
                val: "Mentorship and project-based learning"
              }
            ].map((highlight, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-3xl border border-softblack/5 shadow-sm flex flex-col items-center">
                <div className="text-bronze mb-6">
                  <highlight.icon size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-softblack/30 mb-2">{highlight.title}</h4>
                <p className="text-lg font-sans font-bold text-softblack leading-tight">{highlight.val}</p>
              </div>
            ))}
          </div>
        </div>
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
                onSubmit={handleCustomSubmit}
                className="space-y-12"
              >
                {/* Step 1: Personal Details */}
                <div className={`${step === 1 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                    <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Personal Details</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Full Name</label>
                        <input required type="text" name={GOOGLE_FORM_ENTRIES.fullName} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Your Full Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Phone Number</label>
                        <input required type="tel" name={GOOGLE_FORM_ENTRIES.phone} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="e.g. 0700 000 000" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Email Address (Optional)</label>
                        <input type="email" name={GOOGLE_FORM_ENTRIES.email} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Age</label>
                        <input required type="number" name={GOOGLE_FORM_ENTRIES.age} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Your Age" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Location / Estate</label>
                      <input required type="text" name={GOOGLE_FORM_ENTRIES.location} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Where do you live?" />
                    </div>

                    <div className="flex justify-end">
                      <button type="button" onClick={nextStep} className="bg-bronze text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2">
                        Next Step <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                {/* Step 2: Academic History */}
                <div className={`${step === 2 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                    <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Academic History</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Last Grade Attained</label>
                        <input required type="text" name={GOOGLE_FORM_ENTRIES.lastGrade} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="e.g. Form 4, Grade 8" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Year of KCPE (or Primary Exam)</label>
                        <input required type="number" name={GOOGLE_FORM_ENTRIES.kcpeYear} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Year completed" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Previous School Attended</label>
                      <input required type="text" name={GOOGLE_FORM_ENTRIES.previousSchool} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" placeholder="Name of school" />
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

                {/* Step 3: Program & Finalize */}
                <div className={`${step === 3 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'} space-y-8`}>
                    <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Finalize Application</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Selected Program</label>
                        <select required name={GOOGLE_FORM_ENTRIES.program} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                          <option value="KCSE Compilation">KCSE Compilation (Adult High School)</option>
                          <option value="Post Literacy(Primary)">Post Literacy (Primary Completion)</option>
                          <option value="Languages">Languages (Communication Skills)</option>
                          <option value="Computer Packages">Computer Packages (Digital Literacy)</option>
                          <option value="Literacy Beginner">Literacy Beginner (Foundation)</option>
                          <option value="KCSE Bridging">KCSE Bridging (Subject Upgrading)</option>
                          <option value="Tuition & Lab Session">Tuition & Lab Sessions</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Preferred Learning Mode</label>
                        <select required name={GOOGLE_FORM_ENTRIES.learningMode} className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                          <option value="Phycical Classes">Physical Classes (In-person)</option>
                          <option value="Virtual/Online(Evening Classes)">Virtual / Online (Evening Only)</option>
                          <option value="Hybrid (Mix)">Hybrid (Mixed)</option>
                        </select>
                      </div>
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
                        {isSubmitting ? 'Submitting Application...' : 'Start My Application'} <CheckCircle2 size={20} />
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
              href="tel:+254700000000" 
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-5 rounded-full font-bold transition-all border border-white/10"
            >
              <Phone size={20} className="text-bronze" /> Call Us
            </a>
            <a 
              href="https://wa.me/254700000000" 
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
