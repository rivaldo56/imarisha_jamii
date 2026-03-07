import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Imarisha Jamii Admin',

  projectId: 'your-project-id', 
  dataset: 'production',
  basePath: '/admin',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
