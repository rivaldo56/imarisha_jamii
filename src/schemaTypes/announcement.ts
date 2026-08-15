import type { NumberRule } from 'sanity';

export const announcement = {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Announcement Title',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
    },
    {
      name: 'scrollDurationSeconds',
      title: 'Banner Speed (seconds per loop)',
      type: 'number',
      description: 'Higher values move more slowly. Recommended range: 25–60 seconds.',
      initialValue: 35,
      validation: (rule: NumberRule) => rule.integer().min(10).max(120),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'active',
      title: 'Active Status',
      type: 'boolean',
      initialValue: true,
    },
  ],
};
