import { X } from 'lucide-react';
import { intakeRibbonConfig } from '../config';
import { Link } from 'react-router-dom';
import { useSanityData, QUERIES } from '../lib/useSanityData';

interface IntakeRibbonProps {
  onClose: () => void;
}

interface Announcement {
  title: string;
  message: string;
  ctaText: string;
  ctaHref: string;
  active: boolean;
}

export function IntakeRibbon({ onClose }: IntakeRibbonProps) {
  const { data: announcements } = useSanityData<Announcement[]>(
    QUERIES.activeAnnouncements,
    {},
    []
  );

  // Use Sanity announcement if available, otherwise fallback to config
  const activeAnnouncement = announcements.length > 0 
    ? {
        text: announcements[0].message || announcements[0].title,
        ctaText: announcements[0].ctaText || intakeRibbonConfig.ctaText,
        ctaHref: announcements[0].ctaHref || intakeRibbonConfig.ctaHref,
      }
    : intakeRibbonConfig;

  // if (loading) return null; // Removed to load immediately with rest

  return (
    <div className="sticky top-0 z-[60] bg-bronze backdrop-blur-md text-white py-2 px-4 relative flex items-center justify-center border-b border-white/10 overflow-hidden transition-all duration-500">
      <div className="flex items-center gap-4 max-w-7xl w-full justify-center pr-8 md:pr-0 overflow-hidden">
        <div className="flex-1 overflow-hidden relative h-6 flex items-center">
          <div className="whitespace-nowrap animate-marquee absolute">
            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight mx-4">
              {activeAnnouncement.text}
            </span>
            {/* Duplicate for seamless loop */}
            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight mx-4">
              {activeAnnouncement.text}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight mx-4">
              {activeAnnouncement.text}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight mx-4">
              {activeAnnouncement.text}
            </span>
          </div>
        </div>
        <Link 
          to={activeAnnouncement.ctaHref}
          className="bg-white text-bronze px-4 md:px-6 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all duration-500 ease-out hover:scale-110 shadow-md shrink-0 uppercase tracking-wider animate-bounce-subtle"
        >
          {activeAnnouncement.ctaText}
        </Link>
      </div>
      <button 
        onClick={onClose}
        className="absolute right-3 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close intake ribbon"
      >
        <X size={16} />
      </button>
    </div>
  );
}
