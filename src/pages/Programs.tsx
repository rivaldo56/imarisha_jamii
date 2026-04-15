import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { programsConfig } from '../config';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

export default function Programs() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const { data: sanityPrograms } = useSanityData<any[]>(QUERIES.allPrograms, {}, []);
  const { data: homepageData } = useSanityData<any>(QUERIES.homepage, {}, null);
  const { data: sanityFaqs } = useSanityData<any[]>(QUERIES.faqsByPage, { page: 'programs' }, []);

  const hero = homepageData?.hero || programsConfig.hero;
  const programs = sanityPrograms?.length > 0 
    ? sanityPrograms.map(p => ({
        id: p._id,
        title: p.name,
        overview: p.description,
        duration: p.duration,
        requirements: p.requirements,
        image: p.image ? urlFor(p.image).url() : '',
        whoItIsFor: p.whoItIsFor,
        schedule: p.schedule,
        longDescription: p.longDescription,
        certification: p.certification || (p.name?.toLowerCase().includes('kcse') || p.name?.toLowerCase().includes('bridging') ? 'KCSE Certificate' : 'Certificate'),
      }))
    : programsConfig.programs;
  
  const faqs = sanityFaqs?.length > 0
    ? sanityFaqs.map(f => ({ id: f._id, question: f.question, answer: f.answer }))
    : programsConfig.faqs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.programs-hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });


      // Detailed sections alternating
      const sections = gsap.utils.toArray('.detail-section');
      sections.forEach((section: any, i: number) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-44 pb-32 bg-forest-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="programs-hero-text text-4xl md:text-6xl font-sans font-extrabold mb-8 tracking-tight uppercase leading-[0.9]">
            {hero.title || hero.backgroundText}
          </h1>
          <p className="programs-hero-text text-xl md:text-2xl font-body text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
            {hero.subtext || hero.overlayText}
          </p>
          <div className="programs-hero-text animate-bounce">
            <ChevronDown size={32} className="mx-auto text-bronze" />
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-bronze/5 skew-x-[-20deg] translate-x-1/2" />
      </section>


      {/* Detailed Breakdown Sections */}
      {programs.map((program, idx) => (
        <section 
          key={program.id} 
          id={program.id}
          className={`detail-section py-24 md:py-32 ${idx % 2 === 1 ? 'bg-altwhite' : 'bg-offwhite'}`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative group">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 border-[15px] border-white/10 m-4 pointer-events-none" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack mb-8 leading-tight">
                  {program.title}
                </h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-bronze font-bold uppercase tracking-widest text-sm mb-2">Who It's For</h4>
                    <p className="text-softblack/80 font-body leading-relaxed">{program.whoItIsFor}</p>
                  </div>
                  <div>
                    <h4 className="text-bronze font-bold uppercase tracking-widest text-sm mb-2">Requirements</h4>
                    <p className="text-softblack/80 font-body leading-relaxed">{program.requirements}</p>
                  </div>
                  <div>
                    <h4 className="text-bronze font-bold uppercase tracking-widest text-sm mb-2">Schedule</h4>
                    <p className="text-softblack/80 font-body leading-relaxed">{program.schedule}</p>
                  </div>
                  <Link 
                    to={`/programs/${program.id}`}
                    className="inline-flex items-center gap-3 bg-bronze text-white px-8 py-4 rounded-full font-bold hover:bg-bronze/90 transition-all duration-500 ease-out shadow-lg"
                  >
                    Read More About {program.title} <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section className="py-24 md:py-32 bg-forest-dark text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4 tracking-tight">Program Breakdown</h2>
            <p className="text-white/60 font-body">Compare our offerings side-by-side</p>
          </div>
          
          <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-6 font-sans font-bold uppercase tracking-wider text-bronze">Program</th>
                  <th className="p-6 font-sans font-bold uppercase tracking-wider text-bronze">Duration</th>
                  <th className="p-6 font-sans font-bold uppercase tracking-wider text-bronze">Schedule</th>
                  <th className="p-6 font-sans font-bold uppercase tracking-wider text-bronze">Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold">{p.title}</td>
                    <td className="p-6">{p.duration}</td>
                    <td className="p-6">{p.schedule}</td>
                    <td className="p-6">{p.certification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view of table */}
          <div className="md:hidden space-y-4">
            {programs.map((p) => (
              <div key={p.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-xl font-bold mb-4 text-bronze">{p.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="opacity-50">Duration</span><span>{p.duration}</span></div>
                  <div className="flex justify-between"><span className="opacity-50">Schedule</span><span>{p.schedule}</span></div>
                  <div className="flex justify-between"><span className="opacity-50">Certification</span><span className="text-bronze font-medium">{p.certification}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="py-24 md:py-32 bg-offwhite">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-softblack text-center mb-12">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-altwhite rounded-xl overflow-hidden cursor-pointer border border-softblack/5"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="font-sans font-bold text-softblack">{faq.question}</h3>
                  {openFaq === faq.id ? <ChevronUp className="text-bronze" /> : <ChevronDown className="text-softblack/40" />}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-softblack/70 font-body leading-relaxed border-t border-softblack/5">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmotionalCTA 
        title="Ready to rewrite your future?"
        subtitle="Your comeback is waiting"
        ctaText="Start My Application"
        ctaHref="/apply"
      />
    </div>
  );
}
