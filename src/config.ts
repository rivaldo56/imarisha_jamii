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
  text: "March 2026 Intake is Now Open — Secure your spot today!",
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
  keywords: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Imarisha Jamii Centre | Adult School in Nairobi",
  siteDescription: "Flexible adult education programs in Nairobi including KCSE completion and bridging courses. Apply today.",
  brandName: "Imarisha Jamii Centre",
  keywords: "adult school Nairobi, KCSE completion for adults, adult education Kenya, evening classes Nairobi, second chance education Kenya",
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
  heroImage: "",
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
      body: "First class adult education centre committed to excellence performance.",
    },
    mission: {
      title: "Our Mission",
      body: "To provide quality adult education aiming at impacting world class knowledge to adult education seekers in order to enable them realize their fore gone dreams.",
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
  longDescription: string;
  certification: string;
}

export interface ProgramsConfig {
  hero: {
    title: string;
    subtext: string;
    backgroundText: string;
    heroImage: string;
    heroImageAlt: string;
    overlayText: string;
  };
  metaDescription?: string;
  keywords?: string;
  programs: ProgramItem[];
  faqs: FAQItem[];
}

export const programsConfig: ProgramsConfig = {
  hero: {
    title: "Choose Your Path Forward",
    subtext: "From completing your KCSE to gaining new professional skills, we have a program tailored for your next step.",
    backgroundText: "DREAM,\nCHOOSE,\nACHIEVE",
    heroImage: "",
    heroImageAlt: "Adult student looking at programs list",
    overlayText: "Your Path to Progress",
  },
  metaDescription: "Explore our flexible adult school programs in Nairobi. We offer KCSE completion, bridging courses, and professional skills training.",
  keywords: "KCSE completion, bridging courses Nairobi, adult education programs, professional skills Kenya",
  programs: [
    {
      id: "high_school",
      title: "KCSE Compilation",
      overview: "Complete your Kenya Certificate of Secondary Education with a flexible, condensed curriculum tailored for adults.",
      duration: "1–2 Years",
      requirements: "KCPE results or partial high school transcripts.",
      image: "",
      whoItIsFor: "Adults who did not finish high school and wish to qualify for college or professional career growth.",
      schedule: "Evenings (6-9 PM) & Saturdays (9-4 PM)",
      longDescription: "Our KCSE Compilation program is specifically designed for adult learners who are returning to school after a break. We understand that your time is valuable, which is why we've condensed the curriculum to focus on essential concepts and effective exam preparation for the KCSE. Our instructors are experienced in working with adults, providing a supportive environment where you can learn at your own pace while balancing work and family responsibilities. This program is your bridge to higher education—opening doors to university degrees, diplomas, and enhanced career opportunities that once seemed out of reach.",
      certification: "KCSE Certificate",
    },
    {
      id: "post_literacy",
      title: "Post Literacy (Primary)",
      overview: "A foundational program for adults seeking to complete their primary level education or improve core literacy skills.",
      duration: "1 Year",
      requirements: "Open enrollment; diagnostic assessment provided.",
      image: "",
      whoItIsFor: "Adults starting their educational journey or returning after a long break.",
      schedule: "Morning or Evening sessions available",
      longDescription: "The Post Literacy program, focusing on the primary level, is a foundation for lifelong learning. It is tailored for adults who may have missed out on basic education or wish to refresh their fundamental skills in literacy and numeracy. We provide a gentle, non-judgmental atmosphere where you can gain the confidence needed to transition into secondary education. By focusing on practical, everyday application of knowledge, we ensure that every lesson you attend translates into immediate empowerment in your personal and professional life.",
      certification: "Certificate",
    },
    {
      id: "languages",
      title: "Languages",
      overview: "Become proficient in new languages with our intensive speaking and writing modules.",
      duration: "4–6 Months",
      requirements: "Passion for communication; beginner friendly.",
      image: "",
      whoItIsFor: "Individuals looking to boost their local or international communication skills.",
      schedule: "Flexible weekday options",
      longDescription: "Our Language programs are intensive and immersive, designed to make you proficient in a new language in a short amount of time. Whether you're learning for business, travel, or personal growth, our speaking and writing modules focus on real-world communication. We offer various languages suited for the Nairobi business environment and international opportunities. Small class sizes ensure that you get personalized attention from our expert linguists, helping you master pronunciation and grammar with ease.",
      certification: "Certificate",
    },
    {
      id: "computer",
      title: "Computer Packages",
      overview: "Comprehensive training in essential digital tools including MS Office, Internet, and Basic IT.",
      duration: "3 Months",
      requirements: "No prior experience needed.",
      image: "",
      whoItIsFor: "Anyone looking to gain competitive digital skills for the modern workplace.",
      schedule: "Daily or Weekend Intensive",
      longDescription: "In today's digital age, computer literacy is no longer optional—it's essential. Our Computer Packages program offers a comprehensive 3-month journey through the most critical tools in the modern office. From mastering Microsoft Office (Word, Excel, PowerPoint) to understanding internet security and basic IT troubleshooting, we ensure you leave with the skills that employers are looking for. Our lab-based learning approach means you'll spend less time listening and more time doing, with hands-on practice on modern machines.",
      certification: "Certificate",
    },
    {
      id: "beginner",
      title: "Literacy Beginner",
      overview: "A gentle introduction to formal education for those with little to no previous schooling.",
      duration: "4 Months",
      requirements: "Open to all.",
      image: "",
      whoItIsFor: "Adults taking their very first step towards formal literacy and numeracy.",
      schedule: "Morning or Evening options",
      longDescription: "The Beginner program is a specially crafted entry point for those with little to no previous formal schooling. We start from the very basics, building a strong core in reading, writing, and basic arithmetic in a way that respects your life experience as an adult. Our instructors are patient and empathetic, ensuring that you feel comfortable and challenged in equal measure. This is where many of our most successful students started their journey before progressing to High School and beyond.",
      certification: "Certificate",
    },
    {
      id: "bridging",
      title: "KCSE Bridging",
      overview: "Targeted subject recovery to help you meet university entry requirements for specific degrees.",
      duration: "3–6 Months",
      requirements: "Current KCSE certificate with specific grade revision needs.",
      image: "",
      whoItIsFor: "KCSE graduates looking to improve their grades in specific subjects.",
      schedule: "Flexible Morning or Evening Options",
      longDescription: "Our KCSE Bridging courses are designed for students who have already completed their secondary education but need to upgrade their grades in specific subjects to qualify for their desired university or college placement. We offer targeted, high-impact tutorials in Mathematics, English, and Sciences, focusing on exam techniques and deep subject mastery. With flexible scheduling, you can focus on building the academic foundation you need to pursue your dream career in medicine, engineering, or business.",
      certification: "KCSE Certificate",
    },
    {
      id: "tuition",
      title: "Tuition & Lab Sessions",
      overview: "Personalized academic support and practical science/IT sessions to reinforce classroom learning.",
      duration: "Flexible",
      requirements: "Currently enrolled in any academic program.",
      image: "",
      whoItIsFor: "Students needing extra help or hands-on practical experience in science/computers.",
      schedule: "By appointment / Scheduled Lab times",
      longDescription: "Tuition and Lab Sessions provide that extra layer of support that makes all the difference in student success. These are personalized academic coaching sessions where you can dive deeper into difficult topics or get hands-on experience in our science and computer labs. Whether you're conducting experiments for your biology coursework or practicing advanced software techniques, our labs are equipped and our tutors are ready to help you bridge the gap between theory and practice.",
      certification: "Certificate",
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
  metaDescription?: string;
  keywords?: string;
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
  metaDescription: "Contact Imarisha Jamii Centre in Umoja, Nairobi. Reach us via phone, email, or WhatsApp for adult education inquiries.",
  keywords: "contact imarisha jamii, adult education nairobi location, umoja adult school, whatsapp adult classes",
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
    title: "Apply for March Intake",
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
  accentText: "EST. 2011 • NAIROBI",
  galleryImages: [],
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export const servicesConfig = {
  subtitle: "OUR SERVICES",
  titleLine1: "A bridge to your",
  titleLine2Italic: "future success.",
  description: "Whether you need to finish your High School education, learn a new language, or gain computer skills, our programs are designed for adult success.",
  services: [
    {
      iconName: "HighSchool",
      title: "KCSE Compilation",
      description: "Condensed 1-2 year curriculum focused on core subjects and exam preparation.",
    },
    {
      iconName: "BookOpen",
      title: "Post Literacy",
      description: "Foundational primary level education for adults returning to school.",
    },
    {
      iconName: "Languages",
      title: "Languages",
      description: "Proficiency modules in various languages to boost communication.",
    },
    {
      iconName: "Monitor",
      title: "Computer Packages",
      description: "Essential 3-month digital literacy and office application training.",
    },
  ],
};

// Featured Projects (Programs Overview)
export const featuredProjectsConfig = {
  subtitle: "OUR PROGRAMS",
  titleRegular: "Programs built for",
  titleItalic: "real progress.",
  viewAllText: "View All Programs",
  viewAllHref: "/programs",
  viewProjectText: "See Program Details",
  projects: [
    {
      id: 1,
      title: "KCSE Compilation",
      category: "Academic",
      year: "1-2 years",
      image: "",
      description: "Intensive classes covering the full high school syllabus at a pace that respects your adult life.",
    },
    {
      id: 2,
      title: "Post Literacy",
      category: "Primary",
      year: "1 year",
      image: "",
      description: "Foundational learning for adults who need a strong primary-level base for future growth.",
    },
    {
      id: 3,
      title: "Computer Packages",
      category: "Professional",
      year: "3 months",
      image: "",
      description: "Master the digital tools used in every modern workplace in just 12 weeks.",
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

export const whyChooseUsConfig = {
  subtitle: "WHY IMARISHA JAMII",
  titleRegular: "Built for adults—",
  titleItalic: "not the other way around.",
  statsLabel: "By The Numbers",
  stats: aboutConfig.stats,
  featureCards: [
    {
      image: "",
      imageAlt: "Teacher mentoring student",
      title: "Supportive Teachers",
      description: "Our educators understand adult learners and provide patient, respectful guidance.",
    },
    {
      image: "",
      imageAlt: "Student taking notes",
      title: "Flexible Schedules",
      description: "Evening and weekend classes that work around your job and family commitments.",
    },
  ],
  wideImage: "",
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
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
