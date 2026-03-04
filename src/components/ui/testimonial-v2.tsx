import React from 'react';
import { motion } from "framer-motion";
import { Quote } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={cn("flex flex-col gap-6", props.className)}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 rounded-2xl border border-softblack/5 shadow-sm max-w-sm w-full bg-altwhite transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-bronze/30" 
                >
                  <blockquote className="m-0 p-0 relative">
                    <Quote className="absolute -top-4 -right-4 text-bronze/10" size={32} />
                    <p className="text-softblack/70 leading-relaxed font-body text-sm mb-6">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-4">
                      <img
                        width={48}
                        height={48}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-bronze/10 group-hover:ring-bronze/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col text-left">
                        <cite className="font-sans font-bold not-italic tracking-tight leading-none text-softblack">
                          {name}
                        </cite>
                        <span className="text-xs leading-none tracking-tight text-softblack/40 mt-1 uppercase font-bold">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title: string;
  subtitle: string;
}

export const TestimonialsSection = ({ testimonials, title, subtitle }: TestimonialsSectionProps) => {
  // Split testimonials into columns for the scrolling effect
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(testimonials.length / 3) * 2);
  const thirdColumn = testimonials.slice(Math.ceil(testimonials.length / 3) * 2);

  // If we have few testimonials, we might need to duplicate to avoid gaps
  const column1 = firstColumn.length > 0 ? firstColumn : testimonials;
  const column2 = secondColumn.length > 0 ? secondColumn : testimonials;
  const column3 = thirdColumn.length > 0 ? thirdColumn : testimonials;

  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 md:py-32 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl px-6 md:px-12 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 md:mb-24 text-center">
          <div className="inline-block border border-bronze/20 py-1 px-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-bronze bg-bronze/5 mb-6">
            {subtitle}
          </div>

          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-softblack">
            {title}
          </h2>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={column1} duration={25} />
          <TestimonialsColumn testimonials={column2} className="hidden md:flex" duration={35} />
          <TestimonialsColumn testimonials={column3} className="hidden lg:flex" duration={30} />
        </div>
      </motion.div>
    </section>
  );
};
