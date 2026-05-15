import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Imarisha Jamii Admin',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id', 
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
