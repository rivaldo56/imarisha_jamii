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
        { name: 'title', type: 'string' },
        { name: 'subtext', type: 'text' },
        { name: 'image', type: 'image' },
      ]
    },
    {
      name: 'values',
      title: 'Community Values',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
};
