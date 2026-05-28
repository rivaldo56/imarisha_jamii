import { useEffect } from 'react';
import { siteConfig } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEO({ 
  title = siteConfig.siteTitle, 
  description = siteConfig.siteDescription,
  keywords = siteConfig.keywords,
  canonicalUrl = "", 
  ogImage = "/images/logo.png" 
}: SEOProps) {
  const swahiliKeywords = "elimu ya watu wazima, kujiendeleza, kurudia KCSE Nairobi, shule ya watu wazima";
  const finalKeywords = keywords.includes(swahiliKeywords) ? keywords : `${keywords}, ${swahiliKeywords}`;

  const siteUrl = "https://imarishajamiicentre.co.ke";
  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // 1. Update the document title
    document.title = title;

    // Helper to find or create a meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to find or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary Meta Tags
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', finalKeywords);
    setLinkTag('canonical', fullUrl);

    // Open Graph / Facebook / WhatsApp
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullOgImage);

    // Twitter
    setMetaTag('property', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:url', fullUrl);
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:image', fullOgImage);

  }, [title, description, keywords, fullUrl, fullOgImage]);

  return null; // This component operates strictly via head side-effects
}
