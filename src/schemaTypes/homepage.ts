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
    {
      name: 'intro',
      title: 'Intro Grid Section',
      type: 'object',
      fields: [
        { name: 'titleLine1', title: 'Title Line 1', type: 'string' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'portfolioImages',
          title: 'Portfolio Images',
          type: 'array',
          of: [{ type: 'image', fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }],
        },
      ],
    },
    {
      name: 'whyChooseMe',
      title: 'Why Choose Me Section',
      type: 'object',
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'titleRegular', title: 'Title (Regular)', type: 'string' },
        { name: 'titleItalic', title: 'Title (Italic)', type: 'string' },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'number' },
                { name: 'suffix', title: 'Suffix', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'featureCards',
          title: 'Feature Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
                { name: 'image', title: 'Image', type: 'image' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
