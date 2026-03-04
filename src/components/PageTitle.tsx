import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config';

export function PageTitle() {
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
