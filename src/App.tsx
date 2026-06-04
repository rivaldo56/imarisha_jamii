import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { useLenis } from './hooks/useLenis';
import { Layout } from './sections/Layout';
import { siteConfig } from './config';
import { SchemaMarkup } from './components/SchemaMarkup';
import { ErrorBoundary } from './components/ErrorBoundary';
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
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-bronze/20 overflow-hidden">
      <div className="w-full h-full bg-bronze animate-yt-loader origin-left"></div>
    </div>
  );
}

function App() {
  useLenis();

  useEffect(() => {
    document.documentElement.lang = siteConfig.language;
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <SchemaMarkup />
        <ErrorBoundary>
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
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
