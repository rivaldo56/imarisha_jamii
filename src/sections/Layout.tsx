import { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { IntakeRibbon } from './IntakeRibbon';
import { ScrollToTop } from '../components/ScrollToTop.tsx';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <IntakeRibbon />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
