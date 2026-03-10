import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { PartyPopper, ArrowLeft, Calendar, MapPin } from 'lucide-react';

export default function ThankYou() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.thank-you-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen flex items-center justify-center py-32 px-6">
      <div className="max-w-3xl w-full thank-you-content text-center">
        <div className="w-24 h-24 bg-bronze/10 text-bronze rounded-full flex items-center justify-center mx-auto mb-12 animate-bounce">
          <PartyPopper size={48} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-softblack mb-6 tracking-tight uppercase leading-tight">
          Application Received!
        </h1>
        
        <p className="text-xl font-body text-softblack/60 mb-12 leading-relaxed max-w-2xl mx-auto">
          Your journey back to education has officially begun. We've received your application and our admissions team is already reviewing it.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16 text-left">
          <div className="bg-altwhite p-8 rounded-2xl border border-softblack/5 shadow-sm">
            <div className="flex items-center gap-4 mb-4 text-bronze">
              <Calendar size={24} />
              <h3 className="font-sans font-bold text-softblack">Next Steps</h3>
            </div>
            <p className="text-sm font-body text-softblack/60">
              Expect a phone call or SMS from our advisors within 24–48 hours to schedule your placement interview.
            </p>
          </div>
          <div className="bg-altwhite p-8 rounded-2xl border border-softblack/5 shadow-sm">
            <div className="flex items-center gap-4 mb-4 text-bronze">
              <MapPin size={24} />
              <h3 className="font-sans font-bold text-softblack">Campus Visit</h3>
            </div>
            <p className="text-sm font-body text-softblack/60">
              You can also visit our Umoja Innercore campus between 9 AM and 4 PM (Mon–Sat) for an immediate consultation.
            </p>
          </div>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-bronze font-bold hover:gap-4 transition-all"
        >
          <ArrowLeft size={20} /> Back to Homepage
        </Link>
      </div>
    </div>
  );
}
