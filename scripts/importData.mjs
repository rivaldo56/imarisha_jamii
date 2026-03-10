import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env.local') });

import { createReadStream } from 'fs';
import { basename } from 'path';

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Requires a token with write access
  apiVersion: '2024-03-08',
});

async function uploadImage(filePath) {
  try {
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: basename(filePath)
    });
    return asset._id;
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err);
    return null;
  }
}

const programs = [
  {
    _id: "program-high-school",
    _type: "program",
    name: "KCSE Compilation",
    overview: "Complete your Kenya Certificate of Secondary Education with a flexible, condensed curriculum tailored for adults.",
    duration: "1–2 Years",
    requirements: "KCPE results or partial high school transcripts.",
    whoItIsFor: "Adults who did not finish high school and wish to qualify for college or professional career growth.",
    schedule: "Evenings (6-9 PM) & Saturdays (9-4 PM)",
    longDescription: "Our KCSE Compilation program is specifically designed for adult learners who are returning to school after a break. We understand that your time is valuable, which is why we've condensed the curriculum to focus on essential concepts and effective exam preparation for the KCSE. Our instructors are experienced in working with adults, providing a supportive environment where you can learn at your own pace while balancing work and family responsibilities. This program is your bridge to higher education—opening doors to university degrees, diplomas, and enhanced career opportunities that once seemed out of reach."
  },
  {
    _id: "program-post-literacy",
    _type: "program",
    name: "Post Literacy (Primary)",
    overview: "A foundational program for adults seeking to complete their primary level education or improve core literacy skills.",
    duration: "1 Year",
    requirements: "Open enrollment; diagnostic assessment provided.",
    whoItIsFor: "Adults starting their educational journey or returning after a long break.",
    schedule: "Morning or Evening sessions available",
    longDescription: "The Post Literacy program, focusing on the primary level, is a foundation for lifelong learning. It is tailored for adults who may have missed out on basic education or wish to refresh their fundamental skills in literacy and numeracy. We provide a gentle, non-judgmental atmosphere where you can gain the confidence needed to transition into secondary education. By focusing on practical, everyday application of knowledge, we ensure that every lesson you attend translates into immediate empowerment in your personal and professional life."
  },
  {
    _id: "program-languages",
    _type: "program",
    name: "Languages",
    overview: "Become proficient in new languages with our intensive speaking and writing modules.",
    duration: "4–6 Months",
    requirements: "Passion for communication; beginner friendly.",
    whoItIsFor: "Individuals looking to boost their local or international communication skills.",
    schedule: "Flexible weekday options",
    longDescription: "Our Language programs are intensive and immersive, designed to make you proficient in a new language in a short amount of time. Whether you're learning for business, travel, or personal growth, our speaking and writing modules focus on real-world communication. We offer various languages suited for the Nairobi business environment and international opportunities. Small class sizes ensure that you get personalized attention from our expert linguists, helping you master pronunciation and grammar with ease."
  },
  {
    _id: "program-computer",
    _type: "program",
    name: "Computer Packages",
    overview: "Comprehensive training in essential digital tools including MS Office, Internet, and Basic IT.",
    duration: "3 Months",
    requirements: "No prior experience needed.",
    whoItIsFor: "Anyone looking to gain competitive digital skills for the modern workplace.",
    schedule: "Daily or Weekend Intensive",
    longDescription: "In today's digital age, computer literacy is no longer optional—it's essential. Our Computer Packages program offers a comprehensive 3-month journey through the most critical tools in the modern office. From mastering Microsoft Office (Word, Excel, PowerPoint) to understanding internet security and basic IT troubleshooting, we ensure you leave with the skills that employers are looking for. Our lab-based learning approach means you'll spend less time listening and more time doing, with hands-on practice on modern machines."
  },
  {
    _id: "program-beginner",
    _type: "program",
    name: "Literacy Beginner",
    overview: "A gentle introduction to formal education for those with little to no previous schooling.",
    duration: "4 Months",
    requirements: "Open to all.",
    whoItIsFor: "Adults taking their very first step towards formal literacy and numeracy.",
    schedule: "Morning or Evening options",
    longDescription: "The Beginner program is a specially crafted entry point for those with little to no previous formal schooling. We start from the very basics, building a strong core in reading, writing, and basic arithmetic in a way that respects your life experience as an adult. Our instructors are patient and empathetic, ensuring that you feel comfortable and challenged in equal measure. This is where many of our most successful students started their journey before progressing to High School and beyond."
  },
  {
    _id: "program-bridging",
    _type: "program",
    name: "KCSE Bridging",
    overview: "Targeted subject recovery to help you meet university entry requirements for specific degrees.",
    duration: "3–6 Months",
    requirements: "Current KCSE certificate with specific grade revision needs.",
    whoItIsFor: "KCSE graduates looking to improve their grades in specific subjects.",
    schedule: "Flexible Morning or Evening Options",
    longDescription: "Our KCSE Bridging courses are designed for students who have already completed their secondary education but need to upgrade their grades in specific subjects to qualify for their desired university or college placement. We offer targeted, high-impact tutorials in Mathematics, English, and Sciences, focusing on exam techniques and deep subject mastery. With flexible scheduling, you can focus on building the academic foundation you need to pursue your dream career in medicine, engineering, or business."
  },
  {
    _id: "program-tuition",
    _type: "program",
    name: "Tuition & Lab Sessions",
    overview: "Personalized academic support and practical science/IT sessions to reinforce classroom learning.",
    duration: "Flexible",
    requirements: "Currently enrolled in any academic program.",
    whoItIsFor: "Students needing extra help or hands-on practical experience in science/computers.",
    schedule: "By appointment / Scheduled Lab times",
    longDescription: "Tuition and Lab Sessions provide that extra layer of support that makes all the difference in student success. These are personalized academic coaching sessions where you can dive deeper into difficult topics or get hands-on experience in our science and computer labs. Whether you're conducting experiments for your biology coursework or practicing advanced software techniques, our labs are equipped and our tutors are ready to help you bridge the gap between theory and practice."
  }
];

const testimonials = [
  {
    _id: "testimonial-mary",
    _type: "testimonial",
    name: "Mary K.",
    role: "KCSE Graduate",
    quote: "I thought it was too late. It wasn't. The evening classes fit perfectly with my work schedule, and the teachers never made me feel out of place.",
    year: 2023
  },
  {
    _id: "testimonial-james",
    _type: "testimonial",
    name: "James O.",
    role: "Bridging Graduate",
    quote: "Evening classes fit my job perfectly. I was able to upgrade my qualifications without taking time off work. The support was incredible.",
    year: 2023
  },
  {
    _id: "testimonial-grace",
    _type: "testimonial",
    name: "Grace N.",
    role: "Skills Program",
    quote: "The teachers treated us with respect. They understood we had families and jobs, and they worked with us every step of the way.",
    year: 2022
  }
];

const siteSettings = {
  _id: "settings",
  _type: "settings",
  siteTitle: "Imarisha Jamii Centre",
  metaDescription: "Flexible adult education programs in Nairobi including KCSE completion and bridging courses. Apply today.",
  contactInfo: {
    phone: "0791 925 619",
    email: "imarishajamii@yahoo.com",
    address: "Umoja Innercore, Opposite Chiefs Camp. Within Friends Church Compound, Nairobi",
    hours: {
      weekday: "8:00 AM – 6:00 PM",
      saturday: "9:00 AM – 2:00 PM",
      sunday: "Closed"
    }
  }
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  hero: {
    title: "You Were Never Behind. You Were Just Waiting For The Right Door.",
    subtext: "Imarisha Jamii Centre exists for every adult who thought their moment had passed. It hasn't. We built this place for you.",
    ctaText: "See Our Programs →",
    ctaHref: "/programs"
  },
  whoWeAre: {
    pullQuote: "We don't treat our students like children. We treat them like the adults they are — with real lives, real goals, and real potential.",
    body: "Imarisha Jamii Centre C.B.O is a community-based adult education institution in Umoja Innercore, Nairobi. We were built from one simple belief: it is never too late to learn.\n\nOur students are parents, workers, grandparents, and dreamers. They come carrying years of life experience and a hunger to finally finish what they started. We meet them exactly where they are.\n\nFlexible schedules. Experienced instructors. A space built for adults. Not just a classroom — a launch pad."
  },
  visionMissionMotto: {
    vision: { title: "Our Vision", body: "First class adult education centre committed to excellence performance." },
    mission: { title: "Our Mission", body: "To provide quality adult education aiming at impacting world class knowledge to adult education seekers in order to enable them realize their fore gone dreams." },
    motto: { title: "Our Motto", body: "\"You Can Dream Again.\"" }
  },
  pillars: [
    { title: "Built Around Your Life", description: "Evening and weekend classes — because you have responsibilities, and so do we.", iconName: "Clock" },
    { title: "Teachers Who Get It", description: "Qualified instructors trained for adult learners. Progress without condescension.", iconName: "Users" },
    { title: "A Space That Feels Safe", description: "Located within Friends Church Compound, Umoja. A community within a community.", iconName: "ShieldCheck" },
    { title: "Real Outcomes. Real Credentials.", description: "From High School completion to Computer Skills — programs that open actual doors.", iconName: "Award" }
  ]
};

const studentLife = {
  _id: "studentLife",
  _type: "studentLife",
  hero: {
    title: "Learning Together. Growing Together.",
    subtext: "At Imarisha Jamii, you're not just a student—you're part of a community that supports your ambition."
  },
  values: ["Respect", "Support", "Flexibility", "Growth"]
};

const homepage = {
  _id: "homepage",
  _type: "homepage",
  hero: {
    backgroundText: "Your Education,\nyour pace,\nyour comeback",
    overlayText: "Your Comeback Starts Here",
    // heroImage: { _type: 'image', asset: { _ref: '...' } } - omit for now or use placeholder if possible
  },
  featuredSection: {
    subtitle: "OUR CORE PROGRAMS",
    titleRegular: "Programs built for",
    titleItalic: "career growth"
  },
  intro: {
    titleLine1: "Flexible learning for",
    titleLine2: "your busy life.",
    description: "We provide the environment, resources, and support you need to complete your high school education while managing your work and family commitments.",
    portfolioImages: [
      { _type: 'image', asset: { _type: 'reference', _ref: 'image-focused-learner' }, alt: "Focused adult learner" },
      { _type: 'image', asset: { _type: 'reference', _ref: 'image-discussion' }, alt: "Small group discussion" },
      { _type: 'image', asset: { _type: 'reference', _ref: 'image-mentorship' }, alt: "One-on-one mentorship" },
      { _type: 'image', asset: { _type: 'reference', _ref: 'image-evening-class' }, alt: "Evening class session" },
      { _type: 'image', asset: { _type: 'reference', _ref: 'image-supportive-community' }, alt: "Supportive community" }
    ]
  },
  whyChooseMe: {
    subtitle: "WHY IMARISHA JAMII",
    titleRegular: "Built for adults—",
    titleItalic: "not the other way around.",
    stats: [
      { value: 15, suffix: "+", label: "Years of Excellence" },
      { value: 5000, suffix: "+", label: "Graduates Reached" },
      { value: 100, suffix: "%", label: "Adult Focused" }
    ],
    featureCards: [
      {
        title: "Supportive Teachers",
        description: "Our educators understand adult learners and provide patient, respectful guidance.",
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-mentoring' } }
      },
      {
        title: "Flexible Schedules",
        description: "Evening and weekend classes that work around your job and family commitments.",
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-notes' } }
      }
    ]
  }
};

const faqs = [
  { _id: "faq-1", _type: "faq", question: "Can I study while working a full-time job?", answer: "Absolutely. 90% of our students are working adults. Our classes are intentionally scheduled at 6:00 PM and on Saturdays.", order: 1 },
  { _id: "faq-2", _type: "faq", question: "What is the age limit for enrollment?", answer: "There is no upper age limit. We welcome everyone from young adults to retirees.", order: 2 }
];

async function importData() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("Error: SANITY_API_TOKEN is missing in .env.local");
    console.log("Please create a token with 'Write' permissions in Sanity Manage (API tab).");
    process.exit(1);
  }

  console.log("Starting migration...");

  try {
    const publicPath = resolve(__dirname, '../public');

    // ── Upload Homepage Assets ──
    console.log("Uploading homepage assets...");
    const heroImageId = await uploadImage(resolve(publicPath, 'hero_main_portrait.jpg'));
    
    // Intro Grid Assets
    const introImageIds = await Promise.all([
      uploadImage(resolve(publicPath, 'hero_main_portrait.jpg')),
      uploadImage(resolve(publicPath, 'hero_secondary_portrait.jpg')),
      uploadImage(resolve(publicPath, 'hero_tertiary_portrait.jpg')),
      uploadImage(resolve(publicPath, 'programs_left_portrait.jpg')),
      uploadImage(resolve(publicPath, 'life_top_left.jpg'))
    ]);

    // Why Choose Me Assets
    const whyCardImageIds = await Promise.all([
      uploadImage(resolve(publicPath, 'why_right_portrait.jpg')),
      uploadImage(resolve(publicPath, 'why_bottom_small.jpg'))
    ]);
    const wideImageId = await uploadImage(resolve(publicPath, 'success_top_left.jpg'));

    // Update Homepage references
    if (heroImageId) homepage.hero.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: heroImageId } };
    
    homepage.intro.portfolioImages = homepage.intro.portfolioImages.map((img, i) => {
      if (introImageIds[i]) {
        return { ...img, asset: { _type: 'reference', _ref: introImageIds[i] } };
      }
      return img;
    });

    homepage.whyChooseMe.featureCards = homepage.whyChooseMe.featureCards.map((card, i) => {
      if (whyCardImageIds[i]) {
        return { ...card, image: { _type: 'image', asset: { _type: 'reference', _ref: whyCardImageIds[i] } } };
      }
      return card;
    });

    if (wideImageId) {
      homepage.whyChooseMe.wideImage = { _type: 'image', asset: { _type: 'reference', _ref: wideImageId } };
    }

    // 1. Create Site Settings
    console.log("Importing Site Settings...");
    await client.createOrReplace(siteSettings);

    // 2. Create Homepage
    console.log("Importing Homepage...");
    await client.createOrReplace(homepage);

    // 3. Create About Page
    console.log("Importing About Page...");
    await client.createOrReplace(aboutPage);

    // 3. Create Student Life Page
    console.log("Importing Student Life Page...");
    await client.createOrReplace(studentLife);

    // 4. Create FAQs
    console.log(`Importing ${faqs.length} FAQs...`);
    for (const faq of faqs) {
      await client.createOrReplace(faq);
    }

    // 5. Create Programs
    console.log(`Importing ${programs.length} Programs...`);
    for (const program of programs) {
      await client.createOrReplace(program);
    }

    // 6. Create Testimonials
    console.log(`Importing ${testimonials.length} Testimonials...`);
    for (const testimonial of testimonials) {
      await client.createOrReplace(testimonial);
    }

    console.log("✅ Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

importData();
