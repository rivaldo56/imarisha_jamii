import { X } from 'lucide-react';
import { intakeRibbonConfig } from '../config';
import { Link } from 'react-router-dom';

interface IntakeRibbonProps {
  onClose: () => void;
}

export function IntakeRibbon({ onClose }: IntakeRibbonProps) {
  return (
    <div className="bg-bronze backdrop-blur-md text-white py-2.5 px-4 relative flex items-center justify-center border-b border-white/10 overflow-hidden transition-all duration-500">
      <div className="flex items-center gap-3 md:gap-6 max-w-7xl w-full justify-center pr-8 md:pr-0">
        <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {intakeRibbonConfig.text}
        </span>
        <Link 
          to={intakeRibbonConfig.ctaHref}
          className="bg-white text-bronze px-3 md:px-5 py-1 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all duration-500 ease-out hover:scale-105 shadow-sm shrink-0 uppercase tracking-wider"
        >
          {intakeRibbonConfig.ctaText}
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
