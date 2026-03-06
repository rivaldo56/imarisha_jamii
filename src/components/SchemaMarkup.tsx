import { siteConfig, contactConfig, programsConfig } from '../config';

export function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.brandName,
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`, // Assuming a logo.png exists in public
    "description": siteConfig.siteDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactConfig.info.location,
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactConfig.info.phone,
      "contactType": "admissions",
      "email": contactConfig.info.email
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AdultEducationCenter",
    "name": siteConfig.brandName,
    "image": `${window.location.origin}/hero_main_portrait.jpg`,
    "@id": window.location.origin,
    "url": window.location.origin,
    "telephone": contactConfig.info.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactConfig.info.location,
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": contactConfig.info.coordinates.lat,
      "longitude": contactConfig.info.coordinates.lng
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "21:00" // Reflecting evening classes
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": programsConfig.programs.map((program, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": program.title,
        "description": program.overview,
        "provider": {
          "@type": "Organization",
          "name": siteConfig.brandName,
          "sameAs": window.location.origin
        }
      }
    }))
  };

  const schemas = [organizationSchema, localBusinessSchema, courseSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
