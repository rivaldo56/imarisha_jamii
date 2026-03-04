import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { Layout } from './sections/Layout';
import { PageTitle } from './components/PageTitle';
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

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-offwhite">
      <div className="w-12 h-12 border-4 border-bronze/20 border-t-bronze rounded-full animate-spin"></div>
    </div>
  );
}

import { ThemeProvider } from 'next-themes';

function App() {
  useLenis();

  useEffect(() => {
    document.documentElement.lang = siteConfig.language;
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
    </ThemeProvider>
  );
}

export default App;
