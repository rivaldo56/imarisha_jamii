export const settings = {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'address', title: 'School Address', type: 'text' },
        {
          name: 'hours',
          title: 'Opening Hours',
          type: 'object',
          fields: [
            { name: 'weekday', title: 'Weekday', type: 'string' },
            { name: 'saturday', title: 'Saturday', type: 'string' },
            { name: 'sunday', title: 'Sunday', type: 'string' },
          ],
        },
      ],
    },
  ],
};
