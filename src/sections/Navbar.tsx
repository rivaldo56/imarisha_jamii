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

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-offwhite/95 backdrop-blur-md py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className={`text-xl font-sans font-bold tracking-tight transition-colors duration-300 ${
            isScrolled || !isHome ? 'text-softblack' : 'text-white'
          }`}
        >
          {siteConfig.brandName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-body font-medium transition-colors duration-300 hover:text-bronze ${
                isScrolled || !isHome ? 'text-softblack/80' : 'text-white/80'
              }`}
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
          className={`md:hidden p-2 transition-colors ${
            isScrolled || !isHome ? 'text-softblack' : 'text-white'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-offwhite z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 p-2 text-softblack"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {mainNavLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-2xl font-sans font-bold text-softblack hover:text-bronze transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/apply"
          className="bg-bronze text-white px-8 py-4 rounded-full text-lg font-bold shadow-md"
        >
          Apply Now
        </Link>
      </div>
    </nav>
  );
}
