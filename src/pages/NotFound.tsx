import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Background 404 animation
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      );

      // Main content stagger animation
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.2, 
          ease: 'power3.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[70vh] bg-offwhite flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Large Ghosted "404" Background - Brand Matched */}
      <div 
        ref={bgRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-0"
      >
        <span className="text-[40vw] font-bold text-softblack/5 leading-none tracking-tight">
          404
        </span>
      </div>

      <main 
        className="relative z-10 w-full max-w-4xl px-4 text-center"
      >
        {/* Text Content */}
        <h1 
          ref={el => { itemsRef.current[0] = el; }} 
          className="text-[2.75rem] md:text-6xl font-serif font-bold text-softblack mb-6 tracking-tight opacity-0"
        >
          Wrong Page. <span className="text-bronze italic">Right Place.</span>
        </h1>
        
        <p 
          ref={el => { itemsRef.current[1] = el; }} 
          className="text-softblack/60 text-lg md:text-xl mb-12 leading-relaxed max-w-md mx-auto opacity-0"
        >
          Looks like this page took a different path.<br />
          Let's help you get back on track.
        </p>

        {/* Action Buttons */}
        <div 
          ref={el => { itemsRef.current[2] = el; }} 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0"
        >
          <Link 
            to="/" 
            className="bg-softblack text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-lg shadow-softblack/10"
          >
            Go Home
          </Link>
          <Link 
            to="/apply" 
            className="bg-bronze text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-lg shadow-bronze/10"
          >
            Apply Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
