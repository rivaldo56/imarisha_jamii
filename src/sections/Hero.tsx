import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { heroConfig } from '../config';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  const { data: homepageData } = useSanityData<any>(QUERIES.homepage, {}, null);
  
  const hero = homepageData?.hero || heroConfig;

  // Extract Sanity images if they exist
  let sliderImages: string[] = [];
  if (hero.heroImages && Array.isArray(hero.heroImages) && hero.heroImages.length > 0) {
    sliderImages = hero.heroImages.map((img: any) => {
      if (img?.asset || img?.asset?._ref) {
        return urlFor(img).url();
      }
      return '';
    }).filter(Boolean);
  }

  // Fallback to config's sliderImages
  if (sliderImages.length === 0) {
    sliderImages = hero.sliderImages || heroConfig.sliderImages || [];
  }

  const interval = hero.sliderInterval || heroConfig.sliderInterval || 3000;
  const backgroundLines = (hero.backgroundText || heroConfig.backgroundText || "").split('\n');

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [sliderImages.length, interval]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[85vh] min-h-[650px] md:min-h-screen w-full flex items-center justify-start overflow-hidden bg-zinc-950"
    >
      {/* Layer 1: Background sliding carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / (sliderImages.length || 1))}%)`,
            width: `${(sliderImages.length || 1) * 100}%`
          }}
        >
          {sliderImages.map((imgUrl, index) => (
            <div 
              key={index} 
              className="h-full relative select-none"
              style={{ width: `${100 / (sliderImages.length || 1)}%` }}
            >
              <img
                src={imgUrl}
                alt={`School background ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navbar Contrast Overlay: Dark gradient from top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 3: Massive Watermark Text (Moved 10% to the top) */}
      <div
        ref={textRef}
        className="absolute inset-x-0 top-[10%] sm:top-[12%] md:top-[14%] flex flex-col items-start justify-start z-10 will-change-transform px-[4%] pointer-events-none"
        aria-hidden="true"
      >
        {backgroundLines.map((line: string, index: number) => (
          <div 
            key={index}
            className="text-[12vw] md:text-[8vw] lg:text-[8.5vw] font-sans font-extrabold text-black/85 tracking-tighter leading-[0.8] select-none text-left uppercase"
          >
            {line}
          </div>
        ))}
      </div>

      {/* Layer 4: Centered CTA text and buttons (Moved to bottom of the hero) */}
      <div
        ref={overlayTextRef}
        className="absolute bottom-[6%] sm:bottom-[8%] md:bottom-[10%] left-1/2 -translate-x-1/2 z-30 will-change-transform w-full max-w-3xl px-6 flex flex-col items-center text-center"
      >
        <h1 className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-white/90 tracking-wide mb-8 leading-tight max-w-2xl">
          {hero.overlayText}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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

      {/* Layer 5: Tiny and Discrete Slider Dot Indicators */}
      {sliderImages.length > 1 && (
        <div className="absolute bottom-[6%] md:bottom-[8%] right-[4%] md:right-[8%] z-30 flex gap-2 pointer-events-auto">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'hero', action: `slide_dot_${idx}` });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-white w-5' : 'bg-white/35 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
