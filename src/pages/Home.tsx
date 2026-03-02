import { Hero } from '../sections/Hero';
import { IntroGrid } from '../sections/IntroGrid';
import { Services } from '../sections/Services';
import { WhyChooseMe } from '../sections/WhyChooseMe';
import { FeaturedProjects } from '../sections/FeaturedProjects';
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

      {/* Why Choose Me & Stats - White Section */}
      <WhyChooseMe />

      {/* Featured Projects - Dark Section */}
      <FeaturedProjects />

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
