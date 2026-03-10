import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studentLifeConfig, testimonialsConfig } from '../config';
import { Heart, Users, Sparkles, BookOpen } from 'lucide-react';
import { EmotionalCTA } from '../sections/EmotionalCTA';
import { TestimonialsSection } from '../components/ui/testimonial-v2';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const successImageAnimConfigs = [
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: 0, parallax: [0, 0], delay: 0 },
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: -1.5, parallax: [-4, 4], delay: 0.1 },
  { clipFrom: 'inset(0% 0% 100% 0%)', rotation: 1.2, parallax: [-3, 6], delay: 0.15 },
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: -1, parallax: [-5, 5], delay: 0.2 },
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: 1.5, parallax: [-4, 8], delay: 0.25 },
];

export default function StudentLife() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { data: pageData } = useSanityData<any>(QUERIES.studentLife, {}, null);
  const { data: sanityTestimonials } = useSanityData<any[]>(QUERIES.testimonials, {}, []);

  const content = pageData || studentLifeConfig;
  const heroImage = content.hero?.image?.asset ? urlFor(content.hero.image).url() : "/student_life_hero.png";
  const testimonials = (sanityTestimonials && sanityTestimonials.length > 0)
    ? sanityTestimonials.map(t => ({
        name: t.name || t.studentName || 'Anonymous',
        role: t.role || 'Former Student',
        text: t.quote || t.message || '',
        image: t.image?.asset ? urlFor(t.image).url() : (t.photo?.asset ? urlFor(t.photo).url() : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name || t.studentName || 'A')}`),
      }))
    : testimonialsConfig.testimonials.map(t => ({
        name: t.name,
        role: t.role,
        text: t.quote,
        image: t.image
      }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.student-hero-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      // Hero Parallax
      gsap.to('.student-hero-image', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.student-hero-image-wrap',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.student-hero-content', {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.student-hero-image-wrap', // Stable trigger
          start: 'top top',
          end: '40% top',
          scrub: 1,
        },
      });

      // Masonry grid items
      gsap.from('.masonry-item', {
        scrollTrigger: {
          trigger: '.masonry-grid',
          start: 'top 100%',
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
      // ── Success Titles: mask-reveal ──
      ScrollTrigger.create({
        trigger: '#success-gallery',
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.success-title-line', {
            yPercent: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.15,
          });
        },
        once: true,
      });

      // ── Success Items: premium intro-grid features ──
      const successItems = document.querySelectorAll('.success-masonry-item');
      successItems.forEach((item, i) => {
        const img = item.querySelector('img');
        const cfg = successImageAnimConfigs[i];
        if (!cfg) return;

        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          onEnter: () => {
            gsap.set(item, { opacity: 1 });
            gsap.fromTo(
              item,
              { clipPath: cfg.clipFrom },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.5,
                ease: 'power4.inOut',
                delay: cfg.delay,
              }
            );

            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.4, rotate: cfg.rotation },
                {
                  scale: 1.1,
                  rotate: 0,
                  duration: 2,
                  ease: 'power3.out',
                  delay: cfg.delay,
                }
              );
            }
          },
          once: true,
        });

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: cfg.parallax[0] },
            {
              yPercent: cfg.parallax[1],
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, pageRef);



    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-forest-dark">
        <div className="absolute inset-0 bg-forest-dark/50 z-10" />
        {/* Navbar Contrast Overlay: Dark gradient from top */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 top-0 student-hero-image-wrap">
          <img 
            src={heroImage} 
            alt="Student Life Hero" 
            className="w-full h-full object-cover student-hero-image scale-110"
          />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center student-hero-content text-white">
          <h1 className="text-4xl md:text-7xl font-sans font-extrabold mb-8 uppercase tracking-tighter leading-none">
            {content.hero?.title || studentLifeConfig.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-body max-w-2xl mx-auto opacity-90 leading-relaxed mb-10">
            {content.hero?.subtext || studentLifeConfig.hero.subtext}
          </p>
          <div className="flex justify-center">
            <a 
              href="/apply"
              className="bg-bronze text-white px-8 py-4 rounded-full font-bold hover:bg-bronze/90 transition-all duration-500 ease-out shadow-lg hover:scale-105"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Community Values Strip */}
      <section className="bg-altwhite py-8 border-y border-softblack/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-8 md:gap-16">
          {(content.values || studentLifeConfig.values).map((value: string, idx: number) => (
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

      {/* Success Testimonials Masonry Grid */}
      <section className="py-24 md:py-32 bg-forest-dark text-white overflow-hidden" id="success-gallery">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* ── Title with split-line mask reveal ── */}
          <div className="text-center mb-16 md:mb-24">
            <div className="overflow-hidden mb-4">
              <h2 className="success-title-line text-3xl md:text-5xl font-sans font-bold tracking-tight uppercase translate-y-[110%]">
                Success in Motion
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="success-title-line text-white/60 font-body translate-y-[110%] italic">
                Witness the growth of our graduates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[280px] success-grid">
            {/* Column 1: Graduate Paragraph */}
            <div className="success-masonry-item lg:col-start-1 lg:row-span-2 flex flex-col justify-center py-8 opacity-0">
              <p className="text-white/80 font-body leading-relaxed text-base md:text-lg italic">
                "The journey at Imarisha Jamii has been transformative. Every graduate represented here is a story of persistence, balancing adult responsibilities with a fierce commitment to growth. We are proud to showcase our community's success."
              </p>
            </div>

            {/* Column 2: Tall Image 1 */}
            <div className="success-masonry-item lg:col-start-2 lg:row-span-2 relative overflow-hidden rounded-lg shadow-2xl group cursor-pointer opacity-0">
              <img 
                src="/success_testimonial_1.jpg" 
                alt="Alumni Success 1" 
                className="w-full h-full object-cover will-change-transform" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
            </div>

            {/* Column 3 - Item 1 (Top) */}
            <div className="success-masonry-item lg:col-start-3 lg:row-start-1 relative overflow-hidden rounded-lg shadow-xl group cursor-pointer opacity-0">
              <img 
                src="/success_testimonial_2.jpg" 
                alt="Alumni Success 2" 
                className="w-full h-full object-cover will-change-transform" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
            </div>

            {/* Column 3 - Item 2 (Bottom) */}
            <div className="success-masonry-item lg:col-start-3 lg:row-start-2 relative overflow-hidden rounded-lg shadow-xl group cursor-pointer opacity-0">
              <img 
                src="/success_top_left.jpg" 
                alt="Alumni Success 3" 
                className="w-full h-full object-cover will-change-transform" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
            </div>

            {/* Column 4: Tall Image (Far Right) */}
            <div className="success-masonry-item lg:col-start-4 lg:row-span-2 relative overflow-hidden rounded-lg shadow-xl group cursor-pointer opacity-0">
              <img 
                src="/success_testimonial_3.jpg" 
                alt="Alumni Success 4" 
                className="w-full h-full object-cover will-change-transform" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500" />
            </div>
          </div>





        </div>
      </section>


      {/* Success Stories Slider (Dynamic Scrolling) */}

      <TestimonialsSection 
        title="Voices of Growth"
        subtitle="Real stories from our alumni"
        testimonials={testimonials}
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
