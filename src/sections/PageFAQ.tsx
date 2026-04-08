import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PageFAQProps {
  page: string;
  title?: string;
  subtitle?: string;
  /** Dark variant for use on dark-bg pages */
  variant?: 'light' | 'dark';
}

const defaultFaqs: Record<string, Array<{ id: string; question: string; answer: string }>> = {
  about: [
    { id: 'a1', question: 'What age groups do you accept?', answer: 'We welcome adults of all ages — from young adults to retirees. There is no upper age limit for enrollment at Imarisha Jamii Centre.' },
    { id: 'a2', question: 'Is Imarisha Jamii a registered institution?', answer: 'Yes. Imarisha Jamii Centre C.B.O is a registered community-based organization operating in Umoja Innercore, Nairobi.' },
    { id: 'a3', question: 'Do you offer career counselling?', answer: 'We provide guidance on academic paths and connect students with opportunities aligned with their goals, including university placements and skills development.' },
  ],
  programs: [
    { id: 'p1', question: 'Can I study while working a full-time job?', answer: 'Absolutely. 90% of our students are working adults. Our classes are intentionally scheduled at 6:00 PM and on Saturdays.' },
    { id: 'p2', question: 'What is the age limit for enrollment?', answer: 'There is no upper age limit. We welcome everyone from young adults to retirees.' },
    { id: 'p3', question: 'How long does it take to complete the KCSE program?', answer: 'Our condensed KCSE curriculum takes 1-2 years depending on your entry level and the number of subjects you are taking.' },
  ],
  'student-life': [
    { id: 's1', question: 'Are there study spaces available on campus?', answer: 'Yes! Our Library Lounge is a quiet, premium study space available before and after classes — perfect for studying before or after your shift.' },
    { id: 's2', question: 'Do you have weekend classes?', answer: 'Yes. Saturday classes run from 9:00 AM to 4:00 PM for most programs, and we also offer intensive weekend workshops.' },
    { id: 's3', question: 'Is there a community of students I can connect with?', answer: 'Absolutely. Our students form a tight-knit community of mature learners who support each other through study groups, events, and shared experience.' },
  ],
  contact: [
    { id: 'c1', question: 'What are your office hours?', answer: 'Our office is open Monday–Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays.' },
    { id: 'c2', question: 'Can I visit the campus before enrolling?', answer: 'Of course! Walk-ins are welcome during office hours. We are located at Umoja Innercore, Opposite Chiefs Camp, within Friends Church Compound.' },
    { id: 'c3', question: 'How quickly will you respond to my inquiry?', answer: 'We respond to all email and WhatsApp inquiries within 24 hours. For immediate assistance, call us directly at 0791 925 619.' },
  ],
};

export function PageFAQ({ page, title, subtitle, variant = 'light' }: PageFAQProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const { data: sanityFaqs } = useSanityData<any[]>(QUERIES.faqsByPage, { page }, []);

  const faqs = sanityFaqs && sanityFaqs.length > 0
    ? sanityFaqs.map(f => ({ id: f._id, question: f.question, answer: f.answer }))
    : defaultFaqs[page] || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
          },
          once: true,
        });
      }

      if (itemsRef.current) {
        ScrollTrigger.create({
          trigger: itemsRef.current,
          start: 'top 80%',
          onEnter: () => {
            const items = itemsRef.current?.querySelectorAll('[data-faq-item]');
            if (items) {
              gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 });
            }
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (faqs.length === 0) return null;

  const isDark = variant === 'dark';

  return (
    <section
      ref={sectionRef}
      className={`py-24 md:py-32 ${isDark ? 'bg-forest-dark' : 'bg-altwhite'}`}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle size={20} className={`${isDark ? 'text-bronze' : 'text-bronze'}`} />
            <p className={`text-sm font-sans font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-softblack/40'}`}>
              {subtitle || 'Frequently Asked Questions'}
            </p>
          </div>
          <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight ${isDark ? 'text-white' : 'text-softblack'}`}>
            {title || 'Common Questions'}
          </h2>
        </div>

        {/* FAQ Items */}
        <div ref={itemsRef} className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              data-faq-item
              className={`opacity-0 rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                isDark
                  ? 'bg-forest-mid/50 border-white/5 hover:bg-forest-mid/80'
                  : 'bg-offwhite border-softblack/5 hover:shadow-md'
              }`}
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
            >
              <div className="p-6 flex items-center justify-between">
                <h3 className={`font-sans font-bold text-base md:text-lg pr-4 ${isDark ? 'text-white' : 'text-softblack'}`}>
                  {faq.question}
                </h3>
                {openFaq === faq.id
                  ? <ChevronUp className="text-bronze flex-shrink-0" size={20} />
                  : <ChevronDown className={`flex-shrink-0 ${isDark ? 'text-white/30' : 'text-softblack/30'}`} size={20} />
                }
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-96' : 'max-h-0'}`}>
                <div className={`p-6 pt-0 font-body leading-relaxed border-t ${
                  isDark ? 'text-white/60 border-white/5' : 'text-softblack/70 border-softblack/5'
                }`}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
