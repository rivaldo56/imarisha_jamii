import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studentLifeConfig, testimonialsConfig } from '../config';
import { Heart, Users, Sparkles, BookOpen } from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';
import { TestimonialsSection } from '../components/ui/testimonial-v2';

gsap.registerPlugin(ScrollTrigger);

export default function StudentLife() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.student-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Masonry grid items
      gsap.from('.masonry-item', {
        scrollTrigger: {
          trigger: '.masonry-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Testimonials
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 80%',
        },
        scale: 0.9,
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
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-forest-dark/40 z-10" />
        <img 
          src="/hero_tertiary_portrait.jpg" 
          alt="Student Life Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center student-hero-content text-white">
          <h1 className="text-4xl md:text-7xl font-sans font-extrabold mb-8 uppercase tracking-tighter leading-none">
            {studentLifeConfig.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-body max-w-2xl mx-auto opacity-90 leading-relaxed">
            {studentLifeConfig.hero.subtext}
          </p>
        </div>
      </section>

      {/* Community Values Strip */}
      <section className="bg-altwhite py-8 border-y border-softblack/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-8 md:gap-16">
          {studentLifeConfig.values.map((value, idx) => (
            <div key={idx} className="flex items-center gap-3 text-softblack/40 font-sans font-bold uppercase tracking-[0.2em] text-sm">
              <span className="w-1.5 h-1.5 bg-bronze rounded-full" />
              {value}
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Masonry Grid */}
      <section className="masonry-grid py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-8 mb-16 items-end justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-softblack mb-4">A Space for Grown-up Ambition</h2>
              <p className="text-softblack/60 font-body text-lg">We've built an environment that respects your time and reflects your maturity.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Item 1 - Large */}
            <div className="masonry-item lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-2xl bg-forest-mid shadow-lg">
              <img src="/programs_thumb_1.jpg" alt="Evening Classes" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20">
                <Users className="text-bronze mb-4" size={32} />
                <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-4">Evening Togetherness</h3>
                <p className="text-white/70 max-w-md font-body">Our evening classes are more than just lessons—they're a community of peers supporting each other through the final stretch.</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark to-transparent opacity-60" />
            </div>

            {/* Item 2 */}
            <div className="masonry-item relative group overflow-hidden rounded-2xl bg-bronze shadow-lg">
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <Heart className="text-white" size={32} />
                <div>
                  <h3 className="text-xl font-sans font-bold text-white mb-2">Mentor Support</h3>
                  <p className="text-white/80 text-sm font-body">One-on-one guidance from teachers who understand the unique challenges of adult learners.</p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="masonry-item relative group overflow-hidden rounded-2xl bg-altwhite border border-softblack/5 shadow-lg">
              <img src="/programs_thumb_2.jpg" alt="Group Study" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex flex-col gap-4">
                  <Sparkles className="text-bronze" size={32} />
                  <h3 className="text-xl font-sans font-bold text-softblack mb-2">Weekend Workshops</h3>
                </div>
                <p className="text-softblack/60 text-sm font-body">Intensive skill-building sessions designed to fit into your busy life.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="masonry-item relative group overflow-hidden rounded-2xl bg-forest-light lg:col-span-2 shadow-lg">
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center z-20">
                <div className="flex items-center gap-6">
                  <BookOpen className="text-bronze flex-shrink-0" size={48} />
                  <div>
                    <h3 className="text-2xl font-sans font-bold text-white mb-2">The Library Lounge</h3>
                    <p className="text-white/60 font-body">A quiet, premium space designed for focused study before or after your shift.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Slider (Dynamic Scrolling) */}
      <TestimonialsSection 
        title="Voices of Growth"
        subtitle="Real stories from our alumni"
        testimonials={testimonialsConfig.testimonials.map(t => ({
          text: t.quote,
          image: t.image,
          name: t.name,
          role: t.role
        }))}
      />

      <EmotionalCTA 
        title="Your community is waiting."
        subtitle="Join Imarisha Jamii"
        ctaText="Start My Application"
        ctaHref="/apply"
      />
    </div>
  );
}
