import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEO({ 
  title = siteConfig.name, 
  description = "A center for adult education...", 
  keywords = "adult education, KCSE, computer packages, learning",
  canonicalUrl = "", 
  ogImage = "/images/logo.png" 
}: SEOProps) {
  
  // Ensure the full URL is correct
  const siteUrl = "https://imarishajamiicentre.co.ke";
  const fullUrl = `${siteUrl}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
    </Helmet>
  );
}
