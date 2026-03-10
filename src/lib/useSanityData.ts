import { useState, useEffect } from 'react';
import { client } from './sanity';

export function useSanityData<T>(query: string, params = {}, initialData: T): { data: T; loading: boolean; error: any } {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const result = await client.fetch(query, params);
        if (mounted && result) {
          setData(result);
        }
      } catch (err) {
        console.error('Sanity fetch error:', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

// Common queries
export const QUERIES = {
  allPrograms: `*[_type == "program"] | order(name asc)`,
  programById: `*[_type == "program" && _id == $id][0]`,
  activeAnnouncements: `*[_type == "announcement" && active == true] | order(startDate desc)`,
  homepage: `*[_type == "homepage"][0]`,
  settings: `*[_type == "settings"][0]`,
  testimonials: `*[_type == "testimonial"] | order(year desc)`,
  aboutPage: `*[_type == "aboutPage"][0]`,
  studentLife: `*[_type == "studentLife"][0]`,
  faqs: `*[_type == "faq"] | order(order asc)`,
};
