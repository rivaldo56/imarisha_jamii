import { useState } from 'react';
import { X } from 'lucide-react';
import { intakeRibbonConfig } from '../config';
import { Link } from 'react-router-dom';

export function IntakeRibbon() {
  const [isVisible, setIsVisible] = useState(intakeRibbonConfig.isVisible);

  if (!isVisible) return null;

  return (
    <div className="bg-bronze/95 backdrop-blur-md text-white py-3 px-4 relative z-50 flex items-center justify-center text-sm md:text-base font-body border-b border-white/10">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
        <span className="font-medium">{intakeRibbonConfig.text}</span>
        <Link 
          to={intakeRibbonConfig.ctaHref}
          className="bg-white text-bronze px-5 py-1.5 rounded-full font-bold hover:bg-white/90 transition-all duration-500 ease-out hover:scale-105 shadow-sm"
        >
          {intakeRibbonConfig.ctaText}
        </Link>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:opacity-70 transition-opacity"
        aria-label="Close intake ribbon"
      >
        <X size={18} />
      </button>
    </div>
  );
}
