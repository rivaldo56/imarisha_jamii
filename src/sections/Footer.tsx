import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { footerConfig, siteConfig, contactConfig } from '../config';
import { Link } from 'react-router-dom';
import { useSanityData, QUERIES } from '../lib/useSanityData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: settingsData } = useSanityData<any>(QUERIES.settings, {}, null);
  
  const contact = settingsData?.contactInfo || {
    phone: contactConfig.info.phone,
    email: footerConfig.email,
    address: footerConfig.locationText,
  };

  const logoText = settingsData?.siteTitle || footerConfig.logoText;

  if (!logoText && !contact.email && footerConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo — scale up + fade
      ScrollTrigger.create({
        trigger: logoRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            logoRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Content — fade up
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          );
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full bg-offwhite pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Massive Logo */}
        {footerConfig.logoText && (
          <div ref={logoRef} className="opacity-0 mb-16 md:mb-24 px-4 md:px-0">
            <svg
              viewBox="0 0 1000 100"
              className="w-full h-auto max-h-[15vh] md:max-h-[20vh]"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-softblack font-sans font-extrabold"
                style={{
                  fontSize: '80px',
                  letterSpacing: '-0.03em',
                }}
              >
                {logoText}
              </text>
            </svg>
          </div>
        )}

        {/* Footer Content */}
        <div ref={contentRef} className="opacity-0">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
            {/* Contact Info */}
            <div>
              {footerConfig.contactLabel && (
                <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                  {footerConfig.contactLabel}
                </p>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xl md:text-2xl font-sans font-semibold text-softblack hover:text-softblack/70 transition-colors duration-300"
                >
                  {contact.email}
                </a>
              )}
              {contact.address && (
                <p className="mt-4 text-softblack/60 font-body text-sm whitespace-pre-line">
                  {contact.address}
                </p>
              )}
              <Link
                to="/apply"
                className="inline-flex mt-8 bg-bronze text-white px-8 py-3 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-all duration-500 ease-out"
              >
                Apply Now
              </Link>

            </div>

            {/* Navigation */}
            {footerConfig.navLinks.length > 0 && (
              <div>
                {footerConfig.navigationLabel && (
                  <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                    {footerConfig.navigationLabel}
                  </p>
                )}
                <nav className="space-y-3">
                  {footerConfig.navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            {/* Social Links */}
            <div>
              {footerConfig.socialLabel && (
                <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
                  {footerConfig.socialLabel}
                </p>
              )}
              {footerConfig.socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {footerConfig.socialLinks.map((social) => {
                    const Icon = iconMap[social.iconName] || Mail;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-altwhite flex items-center justify-center text-softblack/70 hover:bg-forest-dark hover:text-white transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </a>
                    );
                  })}
                </div>
              )}
              {footerConfig.tagline && (
                <p className="mt-6 text-softblack/40 font-body text-sm whitespace-pre-line">
                  {footerConfig.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-softblack/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-softblack/40 font-body text-sm text-center md:text-left">
              © {new Date().getFullYear()} {siteConfig.siteTitle}. All rights reserved.
            </p>
            {footerConfig.bottomLinks && footerConfig.bottomLinks.length > 0 && (
              <div className="flex items-center gap-6 text-softblack/40 font-body text-sm">
                {footerConfig.bottomLinks.map((link) => (
                  <Link key={link.label} to={link.href} className="hover:text-softblack transition-colors duration-300">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-offwhite to-transparent pointer-events-none" />
    </footer>
  );
}
