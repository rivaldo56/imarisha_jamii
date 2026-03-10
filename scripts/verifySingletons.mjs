import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-08',
});

async function verifySingletons() {
  const queries = {
    homepage: '*[_type == "homepage"][0]',
    aboutPage: '*[_type == "aboutPage"][0]',
    studentLife: '*[_type == "studentLife"][0]',
    settings: '*[_type == "settings"][0]',
  };

  for (const [name, query] of Object.entries(queries)) {
    const data = await client.fetch(query);
    console.log(`${name}: ${data ? '✅ Present' : '❌ MISSING'}`);
    if (data) {
        console.log(`  Keys: ${Object.keys(data).filter(k => !k.startsWith('_')).join(', ')}`);
    }
  }
}

verifySingletons();
