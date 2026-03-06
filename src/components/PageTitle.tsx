import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig, programsConfig, contactConfig } from '../config';

export function PageTitle() {
  const location = useLocation();
  
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': siteConfig.siteTitle,
      '/about': `About Us | ${siteConfig.brandName}`,
      '/programs': `Adult KCSE Completion Programs | ${siteConfig.brandName}`,
      '/student-life': `Student Life | ${siteConfig.brandName}`,
      '/contact': `Contact ${siteConfig.brandName} | Adult Education Nairobi`,
      '/apply': `Application Form | ${siteConfig.brandName}`,
      '/thank-you': `Application Received | ${siteConfig.brandName}`,
    };

    const descriptions: Record<string, string> = {
      '/': siteConfig.siteDescription,
      '/programs': programsConfig.metaDescription || siteConfig.siteDescription,
      '/contact': contactConfig.metaDescription || siteConfig.siteDescription,
    };

    const keywords: Record<string, string> = {
      '/': siteConfig.keywords || "",
      '/programs': programsConfig.keywords || siteConfig.keywords || "",
      '/contact': contactConfig.keywords || siteConfig.keywords || "",
    };
    
    // Update Title
    document.title = titles[location.pathname] || siteConfig.siteTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[location.pathname] || siteConfig.siteDescription);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords[location.pathname] || siteConfig.keywords || "");

  }, [location]);

  return null;
}

