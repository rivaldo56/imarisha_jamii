import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

interface EmotionalCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function EmotionalCTA({ 
  title = "Ready to rewrite your future?", 
  subtitle = "Your comeback is waiting",
  ctaText = "Start My Application",
  ctaHref = "/apply"
}: EmotionalCTAProps) {
  return (
    <section className="py-24 md:py-32 bg-offwhite text-center border-t border-softblack/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="inline-block px-4 py-1 bg-bronze/10 text-bronze text-xs font-bold tracking-widest uppercase rounded-full mb-8">
          {subtitle}
        </div>
        <h2 className="text-4xl md:text-6xl font-sans font-extrabold text-softblack mb-12 tracking-tight leading-tight">
          {title}
        </h2>
        <Link 
          to={ctaHref} 
          onClick={() => trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'emotional_cta', title })}
          className="inline-flex items-center gap-3 bg-bronze text-white px-12 py-6 rounded-full text-xl font-bold shadow-xl hover:scale-105 transition-all duration-500 ease-out"
        >
          {ctaText} <ArrowRight size={24} />
        </Link>
      </div>
    </section>
  );
}
