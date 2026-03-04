import { type ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { IntakeRibbon } from './IntakeRibbon';
import { ScrollToTop } from '../components/ScrollToTop.tsx';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isRibbonVisible, setIsRibbonVisible] = useState(true);

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <div className="sticky top-0 z-50 w-full transition-all duration-300">
        {isRibbonVisible && <IntakeRibbon onClose={() => setIsRibbonVisible(false)} />}
        <Navbar />
      </div>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
