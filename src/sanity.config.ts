import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Imarisha Jamii Admin',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id', 
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/admin',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
