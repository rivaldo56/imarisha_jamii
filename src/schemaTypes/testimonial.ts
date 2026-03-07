export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Testimonial Text',
      type: 'text',
    },
    {
      name: 'photo',
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
