import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig, mainNavLinks } from '../config';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);




  // Body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`w-full transition-all duration-500 border-b border-transparent ${
        isScrolled 
          ? 'bg-offwhite/80 backdrop-blur-lg py-3 shadow-md border-softblack/5' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 transition-colors duration-300 group"
        >
          <img
            src="/images/logo.png"
            alt={siteConfig.brandName}
            className="h-10 w-auto transition-all duration-300"
          />
          <span className={`text-lg sm:text-xl font-sans font-bold tracking-tight transition-colors duration-300 text-softblack`}>
            Imarisha Jamii Centre
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-body font-medium transition-colors duration-300 hover:text-bronze text-softblack/80`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/apply"
            className="bg-bronze text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-all duration-500 ease-out"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors text-softblack`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-offwhite z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 p-2 text-softblack hover:rotate-90 transition-transform duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {mainNavLinks.map((link, index) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-2xl font-sans font-bold text-softblack hover:text-bronze transition-all hover:scale-110"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/apply"
          className="bg-bronze text-white px-8 py-4 rounded-full text-lg font-bold shadow-md hover:scale-105 transition-transform"
        >
          Apply Now
        </Link>
      </div>
    </nav>
  );
}
