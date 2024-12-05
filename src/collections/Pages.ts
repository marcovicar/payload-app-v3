import { CollectionConfig } from 'payload';
import { Cover } from '@/blocks/cover/schema';
import { RichText } from '@/blocks/richText/schema';
import { Image } from '@/blocks/image/schema';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      unique: true,
      required: true,
    },
    {
      name: 'pageType',
      label: 'Page Type',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Product', value: 'product' },
      ],
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [
        Cover,
        RichText,
        Image,
      ],
      required: true,
      localized: true,
    },
  ]
}