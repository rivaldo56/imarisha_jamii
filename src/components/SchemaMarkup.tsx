import { siteConfig, contactConfig, programsConfig } from '../config';
import { useSanityData, QUERIES } from '../lib/useSanityData';
import { urlFor } from '../lib/sanity';

const SITE_URL = "https://imarishajamiicentre.co.ke";

export function SchemaMarkup() {
  const { data: sanityPrograms } = useSanityData<any[]>(QUERIES.allPrograms, {}, []);
  
  const programs = sanityPrograms?.length > 0 
    ? sanityPrograms.map(p => ({
        id: p._id,
        title: p.name,
        overview: p.description,
        image: p.image ? urlFor(p.image).url() : '',
      }))
    : programsConfig.programs;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteConfig.brandName,
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`, // Assuming a logo.png exists in public/images
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
    "image": `${SITE_URL}/hero_main_portrait.jpg`,
    "@id": SITE_URL,
    "url": SITE_URL,
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
    "itemListElement": programs.map((program, index) => {
      const courseItem: any = {
        "@type": "Course",
        "name": program.title,
        "description": program.overview,
        "url": `${SITE_URL}/programs/${program.id}`,
        "provider": {
          "@type": "Organization",
          "name": siteConfig.brandName,
          "sameAs": SITE_URL
        }
      };

      if (program.image) {
        courseItem.image = program.image;
      }

      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `${SITE_URL}/programs/${program.id}`,
        "item": courseItem
      };
    })
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
