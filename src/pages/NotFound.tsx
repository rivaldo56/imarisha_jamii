import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-[70vh] bg-offwhite flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Large Ghosted "404" Background - Brand Matched */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[40vw] font-bold text-softblack/5 leading-none tracking-tight">
          404
        </span>
      </motion.div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl px-4 text-center"
      >
        {/* Text Content */}
        <motion.h1 variants={itemVariants} className="text-[2.75rem] md:text-6xl font-serif font-bold text-softblack mb-6 tracking-tight">
          Wrong Page. <span className="text-bronze italic">Right Place.</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-softblack/60 text-lg md:text-xl mb-12 leading-relaxed max-w-md mx-auto">
          Looks like this page took a different path.<br />
          Let's help you get back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
        </motion.div>
      </motion.main>
    </div>
  );
};

export default NotFound;
