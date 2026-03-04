// Multi-page Support
export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Student Life", href: "/student-life" },
  { label: "Contact", href: "/contact" },
];

export const intakeRibbonConfig = {
  text: "January 2026 Intake is Now Open — Secure your spot today!",
  ctaText: "Apply Now",
  ctaHref: "/apply",
  isVisible: true,
};

// Site Configuration
export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Imarisha Jamii Centre for Adult Education",
  siteDescription: "Flexible adult education programs designed to help you finish strong. Evening & weekend classes for working adults in Nairobi.",
  brandName: "Imarisha Jamii Centre",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  navLinks: NavLink[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "Your Education,\nyour pace,\nyour comeback",
  heroImage: "/hero_main_portrait.jpg",
  heroImageAlt: "Adult learner in classroom setting",
  overlayText: "Your Comeback Starts Here",
  navLinks: mainNavLinks,
};

// About Us Page
export interface PillarItem {
  iconName: string;
  title: string;
  description: string;
}

export interface AboutConfig {
  hero: {
    title: string;
    subtext: string;
    ctaText: string;
    ctaHref: string;
  };
  whoWeAre: {
    pullQuote: string;
    body: string;
  };
  visionMissionMotto: {
    vision: { title: string; body: string };
    mission: { title: string; body: string };
    motto: { title: string; body: string };
  };
  pillars: PillarItem[];
  stats: StatItem[];
}

export const aboutConfig: AboutConfig = {
  hero: {
    title: "You Were Never Behind. You Were Just Waiting For The Right Door.",
    subtext: "Imarisha Jamii Centre exists for every adult who thought their moment had passed. It hasn't. We built this place for you.",
    ctaText: "See Our Programs →",
    ctaHref: "/programs",
  },
  whoWeAre: {
    pullQuote: "We don't treat our students like children. We treat them like the adults they are — with real lives, real goals, and real potential.",
    body: `Imarisha Jamii Centre C.B.O is a community-based adult education institution in Umoja Innercore, Nairobi. We were built from one simple belief: it is never too late to learn. 

Our students are parents, workers, grandparents, and dreamers. They come carrying years of life experience and a hunger to finally finish what they started. We meet them exactly where they are. 

Flexible schedules. Experienced instructors. A space built for adults. Not just a classroom — a launch pad.`,
  },
  visionMissionMotto: {
    vision: {
      title: "Our Vision",
      body: "A first class adult education centre — committed to excellence, built for people the world once overlooked.",
    },
    mission: {
      title: "Our Mission",
      body: "To provide quality adult education that unlocks world class knowledge and hands it to every adult learner ready to reach for their foregone dreams.",
    },
    motto: {
      title: "Our Motto",
      body: '"You Can Dream Again."',
    },
  },
  pillars: [
    {
      iconName: "Clock",
      title: "Built Around Your Life",
      description: "Evening and weekend classes — because you have responsibilities, and so do we.",
    },
    {
      iconName: "Users",
      title: "Teachers Who Get It",
      description: "Qualified instructors trained for adult learners. Progress without condescension.",
    },
    {
      iconName: "ShieldCheck",
      title: "A Space That Feels Safe",
      description: "Located within Friends Church Compound, Umoja. A community within a community.",
    },
    {
      iconName: "Award",
      title: "Real Outcomes. Real Credentials.",
      description: "From High School completion to Computer Skills — programs that open actual doors.",
    },
  ],
  stats: [
    { value: 15, suffix: "+", label: "Years of Excellence" },
    { value: 5000, suffix: "+", label: "Graduates Reached" },
    { value: 100, suffix: "%", label: "Adult Focused" },
  ],
};

// Programs Page
export interface ProgramItem {
  id: string;
  title: string;
  overview: string;
  duration: string;
  requirements: string;
  image: string;
  whoItIsFor: string;
  schedule: string;
}

export interface ProgramsConfig {
  hero: {
    title: string;
    subtext: string;
  };
  programs: ProgramItem[];
  faqs: FAQItem[];
}

export const programsConfig: ProgramsConfig = {
  hero: {
    title: "Choose Your Path Forward",
    subtext: "From completing your KCSE to gaining new professional skills, we have a program tailored for your next step.",
  },
  programs: [
    {
      id: "kcse",
      title: "KCSE Completion",
      overview: "Complete your Kenya Certificate of Secondary Education with a flexible, condensed curriculum.",
      duration: "6–18 Months",
      requirements: "Previous Primary (KCPE) results or partial high school transcripts.",
      image: "/programs_left_portrait.jpg",
      whoItIsFor: "Adults who did not finish high school and wish to qualify for college or better jobs.",
      schedule: "Evenings (6-9 PM) & Saturdays (9-4 PM)",
    },
    {
      id: "bridging",
      title: "Bridging Courses",
      overview: "Strengthen your grades in specific subjects like Mathematics, English, or Sciences.",
      duration: "3–6 Months",
      requirements: "Current KCSE certificate with specific grade revision needs.",
      image: "/life_top_left.jpg",
      whoItIsFor: "Graduates seeking to meet university entry requirements for specific degrees.",
      schedule: "Flexible Morning or Evening Options",
    },
    {
      id: "skills",
      title: "Short Skills Programs",
      overview: "Intensive training in Computer Literacy, Basic Accounting, and Communication.",
      duration: "1–3 Months",
      requirements: "Open enrollment; passion for learning new skills.",
      image: "/life_bottom_left.jpg",
      whoItIsFor: "Working adults looking to boost their employability in the modern office.",
      schedule: "Weekend Intensives",
    },
  ],
  faqs: [
    {
      id: "p1",
      question: "Can I study while working a full-time job?",
      answer: "Absolutely. 90% of our students are working adults. Our classes are intentionally scheduled at 6:00 PM and on Saturdays.",
    },
    {
      id: "p2",
      question: "What is the age limit for enrollment?",
      answer: "There is no upper age limit. We welcome everyone from young adults to retirees.",
    },
  ],
};

// Student Life Page
export interface StudentLifeConfig {
  hero: {
    title: string;
    subtext: string;
  };
  values: string[];
}

export const studentLifeConfig: StudentLifeConfig = {
  hero: {
    title: "Learning Together. Growing Together.",
    subtext: "At Imarisha Jamii, you're not just a student—you're part of a community that supports your ambition.",
  },
  values: ["Respect", "Support", "Flexibility", "Growth"],
};

// Contact Page
export interface ContactConfig {
  hero: {
    title: string;
    subtext: string;
  };
  info: {
    phone: string;
    email: string;
    location: string;
    hours: {
      weekday: string;
      saturday: string;
      sunday: string;
    };
    coordinates: { lat: number; lng: number };
  };
}

export const contactConfig: ContactConfig = {
  hero: {
    title: "We're Here. Ask Us Anything.",
    subtext: "No long forms. No waiting weeks. Call, email, or stop by — we'd love to meet you.",
  },
  info: {
    phone: "0791 925 619",
    email: "imarishajamii@yahoo.com",
    location: "Umoja Innercore, Opposite Chiefs Camp. Within Friends Church Compound, Nairobi",
    hours: {
      weekday: "8:00 AM – 6:00 PM",
      saturday: "9:00 AM – 2:00 PM",
      sunday: "Closed",
    },
    coordinates: { lat: -1.2808887, lng: 36.8933803 },
  },
};

// Application
export const applicationConfig = {
  hero: {
    title: "Apply for January Intake",
  },
};

// Re-using existing types for consistency
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Intro Grid (Masonry)
export const introGridConfig = {
  titleLine1: "Flexible learning for",
  titleLine2: "your busy life.",
  description: "We provide the environment, resources, and support you need to complete your high school education while managing your work and family commitments.",
  accentText: "EST. 2011 • NAIROBI CBD",
  portfolioImages: [
    { src: "/hero_main_portrait.jpg", alt: "Focused adult learner" },
    { src: "/hero_secondary_portrait.jpg", alt: "Small group discussion" },
    { src: "/hero_tertiary_portrait.jpg", alt: "One-on-one mentorship" },
    { src: "/programs_left_portrait.jpg", alt: "Evening class session" },
    { src: "/life_top_left.jpg", alt: "Supportive community" },
  ],
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export const servicesConfig = {
  subtitle: "OUR PROGRAMS",
  titleLine1: "A bridge to your",
  titleLine2Italic: "future success.",
  description: "Whether you need to finish your KCSE or build specific skills, our programs are designed to be efficient, effective, and adult-friendly.",
  services: [
    {
      iconName: "Diamond",
      title: "KCSE Completion",
      description: "Condensed high school curriculum focused on core subjects and exam preparation.",
    },
    {
      iconName: "Users",
      title: "Bridging Courses",
      description: "Upgrade your grades in specific subjects to meet college entry requirements.",
    },
    {
      iconName: "Sparkles",
      title: "Skills Development",
      description: "Short courses in digital literacy, communication, and business basics.",
    },
    {
      iconName: "Camera",
      title: "Career Guidance",
      description: "Personalized advice to help you transition from education to employment.",
    },
  ],
};

// Featured Projects (Programs Overview)
export const featuredProjectsConfig = {
  subtitle: "FEATURED PATHS",
  titleRegular: "Programs built for",
  titleItalic: "real progress.",
  viewAllText: "View All Programs",
  viewAllHref: "/programs",
  viewProjectText: "See Program Details",
  projects: [
    {
      id: 1,
      title: "Evening KCSE Program",
      category: "Academic",
      year: "6-18 months",
      image: "/programs_left_portrait.jpg",
      description: "Intensive evening classes covering the full high school syllabus at a pace that respects your daytime job.",
    },
    {
      id: 2,
      title: "Bridging Courses",
      category: "Academic",
      year: "3-6 months",
      image: "/life_top_left.jpg",
      description: "Targeted subject recovery to help you unlock higher education opportunities and degree placements.",
    },
    {
      id: 3,
      title: "Skills Programs",
      category: "Professional",
      year: "1-3 months",
      image: "/life_bottom_left.jpg",
      description: "Short courses in computers, business basics, communication skills, and more to boost your career prospects.",
    },
  ],
};

// Why Choose Me Section (Why Imarisha Jamii)
export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export const whyChooseMeConfig = {
  subtitle: "WHY IMARISHA JAMII",
  titleRegular: "Built for adults—",
  titleItalic: "not the other way around.",
  statsLabel: "By The Numbers",
  stats: aboutConfig.stats,
  featureCards: [
    {
      image: "/why_right_portrait.jpg",
      imageAlt: "Teacher mentoring student",
      title: "Supportive Teachers",
      description: "Our educators understand adult learners and provide patient, respectful guidance.",
    },
    {
      image: "/why_bottom_small.jpg",
      imageAlt: "Student taking notes",
      title: "Flexible Schedules",
      description: "Evening and weekend classes that work around your job and family commitments.",
    },
  ],
  wideImage: "/success_top_left.jpg",
  wideImageAlt: "Graduate with certificate",
  wideTitle: "Your Success Matters",
  wideDescription: "We measure our success by the achievements of our students. Every graduation is a celebration of determination and growth.",
};

// Testimonials Section
export const testimonialsConfig = {
  subtitle: "SUCCESS STORIES",
  titleRegular: "They came back.",
  titleItalic: "They finished.",
  testimonials: [
    {
      id: 1,
      name: "Mary K.",
      role: "KCSE Graduate",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "I thought it was too late. It wasn't. The evening classes fit perfectly with my work schedule, and the teachers never made me feel out of place.",
    },
    {
      id: 2,
      name: "James O.",
      role: "Bridging Graduate",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "Evening classes fit my job perfectly. I was able to upgrade my qualifications without taking time off work. The support was incredible.",
    },
    {
      id: 3,
      name: "Grace N.",
      role: "Skills Program",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "The teachers treated us with respect. They understood we had families and jobs, and they worked with us every step of the way.",
    },
    {
      id: 4,
      name: "Samuel M.",
      role: "Class of '22",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "The library lounge became my second home. Having a quiet place to study before my night shift made all the difference in my grades.",
    },
    {
      id: 5,
      name: "Phyllis W.",
      role: "Computer Literacy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "I came for the skills, but I found a community. We all have busy lives, but here, we are all dreamers together. It's truly life-changing.",
    },
    {
      id: 6,
      name: "David K.",
      role: "KCSE Candidate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "The flexible schedule allowed me to be a present father while still chasing my high school diploma. I'm finally finishing what I started.",
    },
  ],
};

// FAQ Section
export const faqConfig = {
  subtitle: "HOW TO JOIN",
  titleRegular: "Three steps to",
  titleItalic: "your comeback.",
  ctaText: "Ready to start your journey?",
  ctaButtonText: "Start My Application",
  ctaHref: "/apply",
  faqs: [
    {
      id: "1",
      question: "01. Apply online or visit us",
      answer: "Fill out our simple application form online or visit our campus in Nairobi. Our admissions team will guide you through the process.",
    },
    {
      id: "2",
      question: "02. Get a free placement interview",
      answer: "We'll assess your current academic level and recommend the best program for your goals.",
    },
    {
      id: "3",
      question: "03. Start classes",
      answer: "Join our welcoming community of adult learners and begin your journey to success.",
    },
  ],
};

// Footer Config remains largely the same but uses mainNavLinks
export const footerConfig = {
  logoText: siteConfig.brandName,
  contactLabel: "Get in Touch",
  email: contactConfig.info.email,
  locationText: contactConfig.info.location,
  navigationLabel: "Navigation",
  navLinks: mainNavLinks,
  socialLabel: "Follow Along",
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
    { iconName: "Linkedin", href: "#", label: "LinkedIn" },
    { iconName: "Mail", href: `mailto:${contactConfig.info.email}`, label: "Email" },
  ],
  tagline: "Your education. Your pace.\nYour comeback.",
  copyright: "© Imarisha Jamii Centre for Adult Education. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
