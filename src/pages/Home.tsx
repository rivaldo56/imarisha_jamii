import { SEO } from '../components/SEO';
import { Hero } from '../sections/Hero';
import { IntroGrid } from '../sections/IntroGrid';
import { Services } from '../sections/Services';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { ProgramsSection } from '../sections/ProgramsSection';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';
import { EmotionalCTA } from '../sections/EmotionalCTA';

export default function Home() {
  return (
    <>
      <SEO
        title="Imarisha Jamii Centre | Adult Education & KCSE in Nairobi"
        description="Imarisha Jamii Centre empowers adult learners in Nairobi with flexible KCSE completion, computer packages, and professional skills programs. Enrol today and transform your future."
        keywords="adult education Nairobi, KCSE completion, adult learning Kenya, evening classes Nairobi, Imarisha Jamii Centre"
        canonicalUrl="/"
      />

      {/* Hero Section - Parallax Layering */}
      <Hero />

      {/* Intro & Masonry Grid - White Section */}
      <IntroGrid />

      {/* Services - Dark Section */}
      <Services />

      {/* Why Choose Us & Stats - White Section */}
      <WhyChooseUs />

      {/* Programs Section - Dark Section */}
      <ProgramsSection />

      {/* Testimonials Carousel - White Section */}
      <Testimonials />

      {/* FAQ Accordion - Dark Section */}
      <FAQ />

      {/* Final Emotional CTA - White Section */}
      <EmotionalCTA 
        title="Ready to finish strong?"
        subtitle="Your comeback starts with one step"
        ctaText="Start My Application"
        ctaHref="/apply"
      />
    </>
  );
}

