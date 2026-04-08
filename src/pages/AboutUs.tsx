import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import * as Icons from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';
import { PageFAQ } from '../sections/PageFAQ';
import { PageTitle } from '../components/PageTitle';
import { trackEvent } from '../utils/analytics';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

import { useSanityData, QUERIES } from '../lib/useSanityData';

export default function AboutUs() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: aboutData } = useSanityData<any>(QUERIES.aboutPage, {}, null);
  
  const content = aboutData || aboutConfig;

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

      // Pull quote animation
      gsap.from('.pull-quote', {
        scrollTrigger: {
          trigger: '.who-we-are',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Pillars/Cards animation
      gsap.from('.pillar-card', {
        scrollTrigger: {
          trigger: '.about-cards-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Motto animation (Spotlight)
      gsap.fromTo('.motto-spotlight', 
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: '.motto-section',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out',
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      <PageTitle />
      
      {/* Hero Section - Matching Home/Programs Hero Pattern */}
      <section className="relative pt-44 pb-32 bg-forest-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="about-hero-text text-4xl md:text-6xl font-sans font-extrabold mb-8 tracking-tight uppercase leading-[0.9] max-w-4xl mx-auto">
            {content.hero?.title || aboutConfig.hero.title}
          </h1>
          <p className="about-hero-text text-xl md:text-2xl font-body text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
            {content.hero?.subtext || aboutConfig.hero.subtext}
          </p>
          <div className="about-hero-text">
            <Link 
              to={content.hero?.ctaHref || aboutConfig.hero.ctaHref}
              onClick={() => trackEvent('about_hero_cta_click')}
              className="inline-flex items-center gap-3 bg-bronze text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-all duration-500 ease-out shadow-lg"
            >
              {content.hero?.ctaText || aboutConfig.hero.ctaText}
            </Link>
          </div>
        </div>
        {/* Abstract shapes for visual depth */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-bronze/5 skew-x-[-20deg] translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 skew-x-[15deg] -translate-x-1/2" />
      </section>

      {/* Who We Are - Two Column Layout */}
      <section className="who-we-are py-24 md:py-32 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="w-full lg:w-1/3">
              <div className="pull-quote relative p-8 md:p-12 bg-altwhite rounded-2xl border-l-8 border-bronze shadow-sm">
                <Icons.Quote className="absolute top-6 right-6 text-bronze/10" size={64} />
                <p className="text-2xl md:text-3xl font-sans font-bold text-softblack italic leading-tight relative z-10">
                  {content.whoWeAre?.pullQuote || aboutConfig.whoWeAre.pullQuote}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="prose prose-xl text-softblack/80 font-body leading-relaxed whitespace-pre-wrap">
                {content.whoWeAre?.body || aboutConfig.whoWeAre.body}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Motto Spotlight */}
      <section className="motto-section py-24 md:py-40 bg-offwhite border-y border-softblack/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="motto-spotlight opacity-0 inline-block py-2 px-6 rounded-full border border-bronze/20 bg-bronze/5 mb-8">
            <span className="text-bronze font-sans font-bold tracking-[0.3em] uppercase text-[10px]">The Imarisha Promise</span>
          </div>
          <h2 className="motto-spotlight opacity-0 text-[5.8vw] xs:text-[6.2vw] sm:text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold text-softblack tracking-tighter leading-tight mb-4 uppercase whitespace-nowrap">
            "You <span className="text-bronze">Can</span> Dream Again."
          </h2>
          <div className="motto-spotlight opacity-0 w-24 h-1 bg-bronze mx-auto mt-12 opacity-50" />
        </div>
      </section>

      {/* Vision / Mission / Motto Cards */}
      <section className="about-cards-section py-24 md:py-32 bg-altwhite border-y border-softblack/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="pillar-card bg-offwhite p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out group border border-softblack/5">
              <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Icons.Eye size={28} />
              </div>
              <h3 className="text-2xl font-sans font-bold text-softblack mb-4">
                {content.visionMissionMotto.vision.title}
              </h3>
              <p className="text-softblack/70 font-body leading-relaxed">
                {content.visionMissionMotto.vision.body}
              </p>
            </div>

            {/* Mission */}
            <div className="pillar-card bg-offwhite p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out group border border-softblack/5">
              <div className="w-14 h-14 bg-bronze/10 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Icons.Target size={28} />
              </div>
              <h3 className="text-2xl font-sans font-bold text-softblack mb-4">
                {content.visionMissionMotto.mission.title}
              </h3>
              <p className="text-softblack/70 font-body leading-relaxed">
                {content.visionMissionMotto.mission.body}
              </p>
            </div>

            {/* Motto */}
            <div className="pillar-card bg-forest-dark p-10 rounded-2xl shadow-xl transition-all duration-500 ease-out group border border-white/5">
              <div className="w-14 h-14 bg-bronze/20 rounded-xl flex items-center justify-center text-bronze mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Icons.Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-sans font-bold text-white mb-4">
                {content.visionMissionMotto?.motto?.title || aboutConfig.visionMissionMotto.motto.title}
              </h3>
              <p className="text-white/80 font-sans font-bold text-xl italic leading-relaxed">
                {content.visionMissionMotto?.motto?.body || aboutConfig.visionMissionMotto.motto.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Imarisha - Dark Grid Style */}
      <section className="py-24 md:py-32 bg-forest-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight">
              Why Our Students Choose Us — And Stay.
            </h2>
            <div className="w-24 h-1 bg-bronze mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {content.pillars.map((pillar: any, idx: number) => {
              const Icon = (Icons as any)[pillar.iconName] || Icons.CheckCircle2;
              return (
                <div key={idx} className="service-card group bg-forest-dark p-8 md:p-10 transition-all duration-500 hover:bg-forest-mid cursor-pointer group">
                  <div className="mb-6">
                    <Icon className="w-10 h-10 text-white/50 group-hover:text-bronze transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-sans font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {pillar.title}
                  </h4>
                  <p className="text-base text-white/40 font-body leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {pillar.description}
                  </p>
                  
                  {/* Subtle indicator from Services pattern */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Icons.ArrowRight size={20} className="text-bronze" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Page FAQ */}
      <PageFAQ page="about" title="About Imarisha — FAQs" />

      {/* Bottom CTA */}
      <EmotionalCTA 
        title="Your Dream Has Been Patient Long Enough."
        subtitle="Applications are open. Classes are forming. All it takes is one decision."
        ctaText="Start My Application"
        ctaHref="/apply"
      />
    </div>
  );
}
