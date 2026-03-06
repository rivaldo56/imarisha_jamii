import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { applicationConfig } from '../config';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, BookOpen, FileText, ChevronRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

export default function Apply() {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.apply-hero-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const nextStep = () => {
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { step: step, action: 'next' });
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    trackEvent(ANALYTICS_EVENTS.SUBMIT_APPLICATION, data);

    try {
      // Robust simulation of a submission pipeline
      console.log('Submitting application:', data);
      
      // Simulating a fetch call to a webhook/backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      alert('There was a problem submitting your application. Please try again or call us.');
    }
  };


  const steps = [
    { id: 1, name: 'Personal', icon: User },
    { id: 2, name: 'Academic', icon: BookOpen },
    { id: 3, name: 'Program', icon: FileText },
  ];

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="pt-44 pb-20 bg-forest-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="apply-hero-content max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-sans font-extrabold mb-6 tracking-tight uppercase leading-tight">
              {applicationConfig.hero.title}
            </h1>
            <p className="text-xl font-body text-white/60 leading-relaxed">
              Start your journey today. Fill out our simplified application form to secure your place for the next semester.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="flex justify-between mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-softblack/5 -translate-y-1/2 z-0" />
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step >= s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? 'bg-bronze text-white shadow-lg scale-110' : 'bg-altwhite text-softblack/30'
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

          <div className="bg-altwhite p-8 md:p-16 rounded-3xl shadow-sm border border-softblack/5">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Personal Details</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Full Name</label>
                      <input required type="text" name="full_name" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Phone Number</label>
                      <input required type="tel" name="phone" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>

                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Email Address (Optional)</label>
                      <input type="email" name="email" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Age</label>
                      <input required type="number" name="age" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Location / Estate</label>
                    <input required type="text" name="location" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                  </div>

                  <div className="flex justify-end">
                    <button type="button" onClick={nextStep} className="bg-bronze text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2">
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Academic History */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Academic History</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Last Grade Attained</label>
                      <input required type="text" name="last_grade" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Year of KCPE (or Primary Exam)</label>
                      <input required type="number" name="kcpe_year" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Previous School Attended</label>
                    <input required type="text" name="previous_school" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack" />
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
              )}

              {/* Step 3: Program & Finalize */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-sans font-bold text-softblack border-b border-softblack/10 pb-4">Finalize Application</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Selected Program</label>
                      <select name="program" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                        <option value="kcse">KCSE Compilation (Adult High School)</option>
                        <option value="post_literacy">Post Literacy (Primary Completion)</option>
                        <option value="languages">Languages (Communication Skills)</option>
                        <option value="computer">Computer Packages (Digital Literacy)</option>
                        <option value="beginner">Literacy Beginner (Foundation)</option>
                        <option value="bridging">KCSE Bridging (Subject Upgrading)</option>
                        <option value="tuition">Tuition & Lab Sessions</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-softblack/40">Preferred Learning Mode</label>
                      <select name="learning_mode" className="w-full bg-offwhite border-b-2 border-softblack/10 focus:border-bronze outline-none py-3 px-1 transition-colors font-body text-softblack appearance-none">
                        <option>Physical Classes (In-person)</option>
                        <option>Virtual / Online (Evening Only)</option>
                        <option>Hybrid (Mixed)</option>
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
                      {isSubmitting ? 'Starting My Application...' : 'Start My Application'} <CheckCircle2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
