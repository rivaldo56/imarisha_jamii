import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { Layout } from './sections/Layout';
import { PageTitle } from './components/PageTitle';
import { siteConfig } from './config';
import { SchemaMarkup } from './components/SchemaMarkup';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Programs = lazy(() => import('./pages/Programs'));
const StudentLife = lazy(() => import('./pages/StudentLife'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <SchemaMarkup />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            
            {/* Main Application Routes with Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><AboutUs /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/programs/:id" element={<Layout><ProgramDetail /></Layout>} />
            <Route path="/student-life" element={<Layout><StudentLife /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/apply" element={<Layout><Apply /></Layout>} />
            <Route path="/thank-you" element={<Layout><ThankYou /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />

            {/* NotFound Route with Layout */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
