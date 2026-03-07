export const homepage = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'backgroundText', title: 'Background Text', type: 'text' },
        { name: 'heroImage', title: 'Hero Image', type: 'image' },
        { name: 'overlayText', title: 'Overlay Text', type: 'string' },
      ],
    },
    {
      name: 'featuredSection',
      title: 'Featured Programs Section',
      type: 'object',
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'titleRegular', title: 'Title (Regular)', type: 'string' },
        { name: 'titleItalic', title: 'Title (Italic)', type: 'string' },
      ],
    },
  ],
};
