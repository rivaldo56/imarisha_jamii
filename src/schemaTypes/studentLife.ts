export const studentLife = {
  name: 'studentLife',
  title: 'Student Life Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Hero Title' },
        { name: 'subtext', type: 'text', title: 'Hero Subtext' },
        {
          name: 'image',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true },
        },
      ]
    },
    {
      name: 'values',
      title: 'Community Values',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'successGallery',
      title: 'Success Gallery (Alumni Photos)',
      description: 'Upload up to 5 alumni or graduation photos. These appear in the "Success in Motion" masonry section.',
      type: 'array',
      validation: (Rule: any) => Rule.max(5),
      of: [
        {
          type: 'object',
          title: 'Gallery Image',
          fields: [
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text (for accessibility)',
              type: 'string',
              description: 'Describe who is in the photo, e.g. "Mary, KCSE graduate 2024"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        }
      ]
    },
  ],
};
