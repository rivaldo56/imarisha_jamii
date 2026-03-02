import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { Layout } from './sections/Layout';
import { siteConfig } from './config';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Programs = lazy(() => import('./pages/Programs'));
const StudentLife = lazy(() => import('./pages/StudentLife'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

function PageTitle() {
  const location = useLocation();
  
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': `Home | ${siteConfig.brandName}`,
      '/about': `About Us | ${siteConfig.brandName}`,
      '/programs': `Our Programs | KCSE & Bridging`,
      '/student-life': `Student Life | Join Our Community`,
      '/contact': `Contact Us | Get in Touch`,
      '/apply': `Enrollment Application | ${siteConfig.brandName}`,
      '/thank-you': `Application Received`,
    };
    
    document.title = titles[location.pathname] || siteConfig.siteTitle;
  }, [location]);

  return null;
}

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-offwhite">
      <div className="w-12 h-12 border-4 border-bronze/20 border-t-bronze rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  useLenis();

  useEffect(() => {
    document.documentElement.lang = siteConfig.language;
  }, []);

  return (
    <Router>
      <PageTitle />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
