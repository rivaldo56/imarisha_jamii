import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqConfig } from '../config';
import { useSanityData, QUERIES } from '../lib/useSanityData';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { data: homeFaqData } = useSanityData<any>(QUERIES.homeFaq, {}, null);

  // Merge Sanity data with fallback config
  const subtitle = homeFaqData?.subtitle || faqConfig.subtitle;
  const titleRegular = homeFaqData?.titleRegular || faqConfig.titleRegular;
  const titleItalic = homeFaqData?.titleItalic || faqConfig.titleItalic;
  const ctaText = homeFaqData?.ctaText || faqConfig.ctaText;
  const ctaButtonText = homeFaqData?.ctaButtonText || faqConfig.ctaButtonText;
  const ctaHref = homeFaqData?.ctaHref || faqConfig.ctaHref;

  const faqs = homeFaqData?.steps?.length > 0
    ? homeFaqData.steps.map((s: any, i: number) => ({
        id: s._key || `step-${i}`,
        question: s.question,
        answer: s.answer,
      }))
    : faqConfig.faqs;

  if (!titleRegular && faqs.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — slide up
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Accordion items — staggered slide up
      ScrollTrigger.create({
        trigger: accordionRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = accordionRef.current?.querySelectorAll('[data-faq-item]');
          if (items) {
            gsap.fromTo(
              items,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.08,
              }
            );
          }
        },
        once: true,
      });

      // CTA — fade up
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-forest-dark"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
          {subtitle && (
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight">
            {titleRegular} <span className="font-serif italic font-normal text-white/80">{titleItalic}</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq: any) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                data-faq-item
                className="opacity-0 border-0 bg-forest-mid/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-forest-mid/80 transition-colors duration-300 group">
                  <span className="text-left font-sans font-medium text-white text-base md:text-lg pr-4 group-hover:text-white/90">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-white/60 font-body text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        {(ctaText || ctaButtonText) && (
          <div ref={ctaRef} className="mt-16 text-center opacity-0">
            {ctaText && (
              <p className="text-white/50 font-body text-sm mb-4">
                {ctaText}
              </p>
            )}
            {ctaButtonText && (
              <a
                href={ctaHref || '#contact'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-dark font-sans font-semibold text-sm rounded-full hover:bg-offwhite transition-all duration-500 ease-out shadow-lg hover:scale-105"
              >
                {ctaButtonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
