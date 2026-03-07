export const program = {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Program Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'requirements',
      title: 'Entry Requirements',
      type: 'text',
    },
    {
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Program Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'whoItIsFor',
      title: 'Who It Is For',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'academic' },
          { title: 'Primary', value: 'primary' },
          { title: 'Professional', value: 'professional' },
          { title: 'Communication', value: 'communication' },
        ],
      },
    },
  ],
};
