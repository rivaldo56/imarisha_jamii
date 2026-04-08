export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
    {
      name: 'pages',
      title: 'Display on Pages',
      description: 'Select which pages this FAQ should appear on',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About Us', value: 'about' },
          { title: 'Programs', value: 'programs' },
          { title: 'Student Life', value: 'student-life' },
          { title: 'Contact', value: 'contact' },
        ],
      },
    },
  ],
};
