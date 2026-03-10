export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Student Name',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimonial Text',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Student Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role/Achievement',
      type: 'string',
    },
  ],
};
