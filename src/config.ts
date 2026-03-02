// Site Configuration
// Imarisha Daima Adult High School Website

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Imarisha Daima Adult High School",
  siteDescription: "Flexible adult high school programs designed to help you finish strong. Evening & weekend classes for working adults in Nairobi.",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "Your Education,\nyour pace,\nyour comeback",
  heroImage: "/hero_main_portrait.jpg",
  heroImageAlt: "Adult learner in classroom setting",
  overlayText: "Your Comeback Starts Here",
  brandName: "Imarisha Daima",
  navLinks: [
    { label: "Programs", href: "#programs" },
    { label: "Student Life", href: "#student-life" },
    { label: "Why Us", href: "#why-us" },
    { label: "Apply", href: "#apply" },
  ],
};

// Intro Grid Section (About/Mission)
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "Your education.",
  titleLine2: "Your pace. Your comeback.",
  description: "Flexible adult high school programs designed to help you finish strong. Evening & weekend classes for working adults who believe it's never too late to achieve their dreams.",
  portfolioImages: [
    { src: "/hero_secondary_portrait.jpg", alt: "Adult student studying" },
    { src: "/hero_tertiary_portrait.jpg", alt: "Group study session" },
    { src: "/programs_thumb_1.jpg", alt: "Classroom learning" },
    { src: "/programs_thumb_2.jpg", alt: "Computer lab" },
    { src: "/programs_thumb_3.jpg", alt: "Graduation celebration" },
  ],
  accentText: "Nairobi • Flexible Intake • Supportive Environment",
};

// Featured Projects Section (Programs)
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "PROGRAMS",
  titleRegular: "Finish high school—",
  titleItalic: "without putting life on hold.",
  viewAllText: "View All Programs",
  viewAllHref: "#programs",
  viewProjectText: "Learn More",
  projects: [
    {
      id: 1,
      title: "KCSE Completion",
      category: "Core Program",
      year: "6-18 months",
      image: "/programs_left_portrait.jpg",
      description: "Complete your Kenya Certificate of Secondary Education with flexible evening and weekend classes designed for working adults.",
    },
    {
      id: 2,
      title: "Bridging Courses",
      category: "Short Course",
      year: "3-6 months",
      image: "/life_top_left.jpg",
      description: "Strengthen your foundation in key subjects before advancing. Perfect for those who need to refresh their knowledge.",
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

// Services Section (Student Life)
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "STUDENT LIFE",
  titleLine1: "A calm place to learn—",
  titleLine2Italic: "and a community to grow.",
  description: "Study after work, ask questions without judgment, and build friendships that keep you going. Our supportive environment is designed for adult learners.",
  services: [
    {
      iconName: "Users",
      title: "Evening Group Study",
      description: "Collaborative learning sessions after classes to reinforce concepts and build connections.",
    },
    {
      iconName: "Sparkles",
      title: "Mentorship & Counseling",
      description: "One-on-one guidance from experienced educators who understand adult learning needs.",
    },
    {
      iconName: "Camera",
      title: "Workshops & Events",
      description: "Regular career workshops, networking events, and skill-building sessions.",
    },
    {
      iconName: "Diamond",
      title: "Small Friendly Classes",
      description: "Intimate class sizes ensure personalized attention and comfortable learning.",
    },
  ],
};

// Why Choose Me Section (Why Imarisha Daima)
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "WHY IMARISHA DAIMA",
  titleRegular: "Built for adults—",
  titleItalic: "not the other way around.",
  statsLabel: "By The Numbers",
  stats: [
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 5000, suffix: "+", label: "Graduates" },
    { value: 98, suffix: "%", label: "Success Rate" },
  ],
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

// Testimonials Section (Success Stories)
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
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

// FAQ Section (How to Join)
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "HOW TO JOIN",
  titleRegular: "Three steps to",
  titleItalic: "your comeback.",
  ctaText: "Ready to start your journey?",
  ctaButtonText: "Apply Now",
  ctaHref: "#apply",
  faqs: [
    {
      id: "1",
      question: "01. Apply online or visit us",
      answer: "Fill out our simple application form online or visit our campus in Nairobi. Our admissions team will guide you through the process and answer any questions.",
    },
    {
      id: "2",
      question: "02. Get a free placement interview",
      answer: "We'll assess your current academic level and recommend the best program for your goals. This helps us create a personalized learning path for you.",
    },
    {
      id: "3",
      question: "03. Start classes",
      answer: "Once enrolled, you'll receive your schedule and study materials. Join our welcoming community of adult learners and begin your journey to success.",
    },
    {
      id: "4",
      question: "What are the class schedules?",
      answer: "We offer flexible evening classes (6pm-9pm) and weekend sessions (Saturday 9am-4pm). You can choose the schedule that works best for your lifestyle.",
    },
    {
      id: "5",
      question: "How much does it cost?",
      answer: "Our programs are designed to be affordable with flexible payment plans. Contact us for detailed fee structures based on your chosen program.",
    },
  ],
};

// Footer Section (Contact)
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "IMARISHA DAIMA",
  contactLabel: "Get in Touch",
  email: "hello@imarishadaima.ac.ke",
  locationText: "Nairobi, Kenya",
  navigationLabel: "Navigation",
  navLinks: [
    { label: "Programs", href: "#programs" },
    { label: "Student Life", href: "#student-life" },
    { label: "Why Us", href: "#why-us" },
    { label: "Apply", href: "#apply" },
  ],
  socialLabel: "Follow Along",
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
    { iconName: "Linkedin", href: "#", label: "LinkedIn" },
    { iconName: "Mail", href: "mailto:hello@imarishadaima.ac.ke", label: "Email" },
  ],
  tagline: "Your education. Your pace.\nYour comeback.",
  copyright: "© Imarisha Daima Adult High School. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
