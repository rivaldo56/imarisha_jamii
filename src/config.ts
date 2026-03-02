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
  siteTitle: "Imarisha Daima Adult High School",
  siteDescription: "Flexible adult high school programs designed to help you finish strong. Evening & weekend classes for working adults in Nairobi.",
  brandName: "Imarisha Daima",
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
    image: string;
  };
  mission: {
    title: string;
    description: string;
    image: string;
  };
  pillars: PillarItem[];
  stats: StatItem[];
}

export const aboutConfig: AboutConfig = {
  hero: {
    title: "Education for Every Stage of Life",
    subtext: "We believe that it is never too late to finish what you started. Our adult high school is designed for those balancing work, family, and ambition.",
    image: "/hero_secondary_portrait.jpg",
  },
  mission: {
    title: "Our Mission & Philosophy",
    description: "Imarisha Daima exists to provide a bridge for adults who stepped away from formal education. Our philosophy centers on respect, patience, and the belief that life experience is an asset in the classroom. We don't just teach subjects; we empower individuals to rewrite their futures.",
    image: "/hero_tertiary_portrait.jpg",
  },
  pillars: [
    {
      iconName: "Clock",
      title: "Built for Your Schedule",
      description: "Evening and weekend classes that respect your 9-to-5 commitments.",
    },
    {
      iconName: "Heart",
      title: "Non-Judgmental Space",
      description: "Learn alongside peers who share your journey in a supportive community.",
    },
    {
      iconName: "Target",
      title: "Results-Oriented",
      description: "Curriculum focused on KCSE success and practical career skills.",
    },
    {
      iconName: "ShieldCheck",
      title: "Accredited Excellence",
      description: "Quality education that is recognized and respected by employers and colleges.",
    },
  ],
  stats: [
    { value: 15, suffix: "+", label: "Years of Operation" },
    { value: 5000, suffix: "+", label: "Total Graduates" },
    { value: 7, suffix: "", label: "Days a Week Support" },
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
    subtext: "At Imarisha Daima, you're not just a student—you're part of a community that supports your ambition.",
  },
  values: ["Respect", "Support", "Flexibility", "Growth"],
};

// Contact Page
export interface ContactConfig {
  hero: {
    title: string;
  };
  info: {
    phone: string;
    whatsapp: string;
    email: string;
    hours: string;
    location: string;
  };
}

export const contactConfig: ContactConfig = {
  hero: {
    title: "Let's Talk About Your Goals",
  },
  info: {
    phone: "+254 700 000 000",
    whatsapp: "+254 700 000 000",
    email: "hello@imarishadaima.ac.ke",
    hours: "Mon-Fri: 9AM - 9PM, Sat: 9AM - 4PM",
    location: "Nairobi CBD, Kenya",
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

// Why Choose Me Section (Why Imarisha Daima)
export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export const whyChooseMeConfig = {
  subtitle: "WHY IMARISHA DAIMA",
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
      image: "/success_testimonial_1.jpg",
      quote: "I thought it was too late. It wasn't. The evening classes fit perfectly with my work schedule, and the teachers never made me feel out of place.",
    },
    {
      id: 2,
      name: "James O.",
      role: "Bridging Graduate",
      image: "/success_testimonial_2.jpg",
      quote: "Evening classes fit my job perfectly. I was able to upgrade my qualifications without taking time off work. The support was incredible.",
    },
    {
      id: 3,
      name: "Grace N.",
      role: "Skills Program",
      image: "/success_testimonial_3.jpg",
      quote: "The teachers treated us with respect. They understood we had families and jobs, and they worked with us every step of the way.",
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
  copyright: "© Imarisha Daima Adult High School. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
