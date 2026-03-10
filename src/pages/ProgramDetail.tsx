import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { programsConfig } from '../config';
import { ArrowLeft, ArrowRight, Clock, Calendar, GraduationCap, CheckCircle2 } from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { urlFor } from '../lib/sanity';

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  // Check static config
  const staticProgram = programsConfig.programs.find(p => p.id === id);

  // Fetch from Sanity
  const { data: sanityProgram, loading: sanityLoading } = useSanityData<any>(
    QUERIES.programById,
    { id: id },
    null
  );

  const program = staticProgram || (sanityProgram ? {
    id: sanityProgram._id,
    title: sanityProgram.name || sanityProgram.title,
    overview: sanityProgram.overview || sanityProgram.description,
    duration: sanityProgram.duration,
    requirements: sanityProgram.requirements,
    image: sanityProgram.image ? urlFor(sanityProgram.image).url() : '/programs_left_portrait.jpg',
    whoItIsFor: sanityProgram.whoItIsFor,
    schedule: sanityProgram.schedule,
    longDescription: sanityProgram.longDescription
  } : null);

  useEffect(() => {
    if (!sanityLoading && !program) {
      navigate('/programs');
      return;
    }

    if (!program) return;

    const ctx = gsap.context(() => {
      gsap.from('.detail-fade-in', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.detail-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [program, sanityLoading, navigate]);

  if (sanityLoading && !staticProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="w-12 h-12 border-4 border-bronze/20 border-t-bronze rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!program) return null;

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-44 pb-32 bg-forest-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <Link 
            to="/programs" 
            className="detail-fade-in inline-flex items-center gap-2 text-bronze font-bold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={20} /> Back to All Programs
          </Link>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="detail-fade-in text-4xl md:text-6xl font-sans font-extrabold mb-8 tracking-tight uppercase leading-[0.9]">
                {program.title}
              </h1>
              <p className="detail-fade-in text-xl md:text-2xl font-body text-white/80 max-w-xl leading-relaxed mb-12">
                {program.overview}
              </p>
              <div className="detail-fade-in flex flex-wrap gap-6">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                  <Clock className="text-bronze" size={24} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 leading-none mb-1">Duration</p>
                    <p className="font-bold text-sm">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                  <Calendar className="text-bronze" size={24} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 leading-none mb-1">Schedule</p>
                    <p className="font-bold text-sm">{program.schedule}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 detail-image">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bronze/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Content */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-16">
            <div className="detail-fade-in">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-softblack mb-8 flex items-center gap-4">
                <span className="w-12 h-1 bg-bronze rounded-full" /> Detailed Overview
              </h2>
              <p className="text-xl md:text-2xl font-body text-softblack/80 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-bronze first-letter:mr-3 first-letter:float-left">
                {program.longDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 detail-fade-in">
              <div className="bg-altwhite p-10 rounded-2xl border border-softblack/5 shadow-sm">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-6">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold text-softblack mb-4 uppercase tracking-wider">Who it's for</h3>
                <p className="text-softblack/70 font-body leading-relaxed">
                  {program.whoItIsFor}
                </p>
              </div>
              <div className="bg-altwhite p-10 rounded-2xl border border-softblack/5 shadow-sm">
                <div className="w-12 h-12 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-6">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-softblack mb-4 uppercase tracking-wider">Requirements</h3>
                <p className="text-softblack/70 font-body leading-relaxed">
                  {program.requirements}
                </p>
              </div>
            </div>

            <div className="detail-fade-in text-center pt-12">
              <Link 
                to="/apply"
                className="inline-flex items-center gap-4 bg-bronze text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-bronze/90 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Enroll in {program.title} <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EmotionalCTA 
        title="Still have questions about this program?"
        subtitle="Our admissions team is ready to help you find the right path."
        ctaText="Talk to Admissions"
        ctaHref="/contact"
      />
    </div>
  );
}
