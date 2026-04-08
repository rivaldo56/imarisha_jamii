export const homeFaq = {
  name: 'homeFaq',
  title: 'Home Page — How to Join Steps',
  type: 'document',
  fields: [
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'Small text above the title (e.g. "HOW TO JOIN")',
      initialValue: 'HOW TO JOIN',
    },
    {
      name: 'titleRegular',
      title: 'Title (Regular)',
      type: 'string',
      description: 'First part of the heading',
      initialValue: 'Three steps to',
    },
    {
      name: 'titleItalic',
      title: 'Title (Italic)',
      type: 'string',
      description: 'Second part of the heading (displayed in italic)',
      initialValue: 'your comeback.',
    },
    {
      name: 'ctaText',
      title: 'CTA Intro Text',
      type: 'string',
      description: 'Text above the CTA button',
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Step Title', type: 'string' },
            { name: 'answer', title: 'Step Description', type: 'text' },
          ],
        },
      ],
    },
  ],
};
