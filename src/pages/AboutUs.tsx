import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import * as Icons from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.about-hero-text', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Mission block animation
      gsap.from('.mission-content', {
        scrollTrigger: {
          trigger: '.mission-section',
          start: 'top 80%',
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Pillars animation
      gsap.from('.pillar-card', {
        scrollTrigger: {
          trigger: '.pillars-section',
          start: 'top 80%',
        },
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
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-forest-dark/80 z-10" />
          <img 
            src={aboutConfig.hero.image} 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
          <h1 className="about-hero-text text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold mb-6 tracking-tight max-w-3xl leading-tight">
            {aboutConfig.hero.title}
          </h1>
          <p className="about-hero-text text-xl md:text-2xl font-body text-white/90 max-w-2xl leading-relaxed">
            {aboutConfig.hero.subtext}
          </p>
        </div>
      </section>

      {/* Mission Block - Split Layout */}
      <section className="mission-section py-24 md:py-32 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutConfig.mission.image} 
                  alt="Mission" 
                  className="w-full h-auto aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 mission-content">
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack mb-8 leading-tight">
                {aboutConfig.mission.title}
              </h2>
              <div className="prose prose-lg text-softblack/80 font-body leading-relaxed max-w-xl">
                {aboutConfig.mission.description}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different - 4 Pillars */}
      <section className="pillars-section py-24 md:py-32 bg-altwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack tracking-tight">
              What Makes Us Different
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutConfig.pillars.map((pillar, idx) => {
              const Icon = (Icons as any)[pillar.iconName] || Icons.Zap;
              return (
                <div key={idx} className="pillar-card bg-offwhite p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out group">
                  <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-softblack mb-4 relative inline-block">
                    {pillar.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bronze group-hover:w-full transition-all duration-500 ease-out" />
                  </h3>
                  <p className="text-softblack/70 font-body leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="bg-forest-dark py-16 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between gap-12">
          {aboutConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex-1 min-w-[200px] text-center md:text-left">
              <div className="text-4xl md:text-5xl font-sans font-extrabold text-bronze mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm font-body uppercase tracking-widest text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <EmotionalCTA 
        title="Ready to rewrite your future?"
        subtitle="Your comeback is waiting"
        ctaText="See Program Details"
        ctaHref="/programs"
      />
    </div>
  );
}
