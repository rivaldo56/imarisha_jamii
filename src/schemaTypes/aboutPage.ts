export const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtext', type: 'text' },
        { name: 'ctaText', type: 'string' },
        { name: 'ctaHref', type: 'string' },
      ]
    },
    {
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        { name: 'pullQuote', type: 'text', title: 'Pull Quote' },
        { name: 'body', type: 'text', title: 'Main Body Text' },
      ]
    },
    {
      name: 'visionMissionMotto',
      title: 'Vision, Mission & Motto',
      type: 'object',
      fields: [
        {
          name: 'vision',
          type: 'object',
          fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }]
        },
        {
          name: 'mission',
          type: 'object',
          fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }]
        },
        {
          name: 'motto',
          type: 'object',
          fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }]
        },
      ]
    },
    {
      name: 'pillars',
      title: 'Pillars/Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'iconName', type: 'string', description: 'Lucide icon name (e.g., Clock, Users, ShieldCheck)' }
        ]
      }]
    }
  ],
};
