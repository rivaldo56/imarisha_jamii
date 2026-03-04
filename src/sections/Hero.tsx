import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { heroConfig } from '../config';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  if (!heroConfig.backgroundText && !heroConfig.heroImage && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Store ScrollTrigger instances for cleanup
      const triggers: ScrollTrigger[] = [];

      // Parallax effect for main text
      const textTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (textRef.current) {
            gsap.set(textRef.current, { yPercent: self.progress * 50 });
          }
        },
      });
      triggers.push(textTrigger);

      // Parallax effect for model (slower movement = appears closer)
      const modelTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (modelRef.current) {
            gsap.set(modelRef.current, { yPercent: self.progress * 20 });
          }
        },
      });
      triggers.push(modelTrigger);

      // Fade out overlay text faster
      const overlayTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: 1,
        onUpdate: (self) => {
          if (overlayTextRef.current) {
            gsap.set(overlayTextRef.current, { opacity: 1 - self.progress });
          }
        },
      });
      triggers.push(overlayTrigger);

      // Cleanup function
      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[600px] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-forest-dark"
    >
      {/* Layer 1: Background gradient */}
      <div 
        className="absolute inset-0" 
        style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #16263F 100%)' }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 2: Big Text (Decorative) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-start justify-start pt-[15vh] md:justify-center md:pt-0 z-10 will-change-transform px-[4%] md:px-[4%]"
        aria-hidden="true"
      >
        {heroConfig.backgroundText.split('\n').map((line, index) => (
          <div 
            key={index}
            className="text-[12vw] md:text-[8vw] lg:text-[8.5vw] font-sans font-extrabold text-white tracking-tighter leading-[0.8] select-none text-left uppercase"
          >
            {line}
          </div>
        ))}
      </div>

      {/* Layer 3: Hero Model Image (Cutout) */}
      {heroConfig.heroImage && (
        <div
          ref={modelRef}
          className="absolute inset-0 flex items-end justify-end z-20 will-change-transform pr-0"
        >
          <div className="relative w-[65vw] md:w-[50vw] lg:w-[40vw] max-w-[700px]">
            <img
              src={heroConfig.heroImage}
              alt={heroConfig.heroImageAlt}
              className="w-full h-auto object-contain"
              loading="eager"
            />
            {/* Gradient fade at bottom for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#16263F] to-transparent" />
          </div>
        </div>
      )}

      {/* Layer 4: Overlay Text & CTAs */}
      <div
        ref={overlayTextRef}
        className="absolute bottom-[10%] sm:bottom-[15%] md:bottom-[20%] left-[6%] md:left-[12%] z-30 will-change-transform max-w-xl pr-6"
      >
        <h1 className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-white/90 tracking-wide mb-8 leading-tight">
          {heroConfig.overlayText}
        </h1>
        
        <div className="flex flex-wrap gap-4 md:gap-6">
          <Link
            to="/apply"
            onClick={() => trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'hero', action: 'apply_now' })}
            className="bg-bronze text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold shadow-xl hover:scale-105 transition-all duration-500 ease-out flex items-center gap-2"
          >
            Apply Now
          </Link>
          <Link
            to="/programs"
            onClick={() => trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'hero', action: 'explore_programs' })}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold hover:bg-white/20 transition-all duration-500 ease-out"
          >
            Explore Programs
          </Link>
        </div>
      </div>

    </section>
  );
}
