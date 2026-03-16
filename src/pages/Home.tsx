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
