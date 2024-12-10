// storage-adapter-import-placeholder
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from '@/collections/Products'
import { Pages } from '@/collections/Pages'
import { Header } from '@/globals/Header'
import { Footer } from '@/globals/Footer'
import { seoPlugin } from '@payloadcms/plugin-seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      {
        code: 'en',
        label: {
          en: 'English',
          da: 'Engelsk',
          sv: 'Engelska',
        },
      },
      {
        code: 'da',
        label: {
          en: 'Danish',
          da: 'Dansk',
          sv: 'Danska',
        },
      },
      {
        code: 'sv',
        label: {
          en: 'Swedish',
          da: 'Svensk',
          sv: 'Svenska',
        },
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    Users,
    Media,
    Products,
    Pages,
  ],
  globals: [
    Header,
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder
    // s3Storage({
    //   collections: {
    //     'media': {
    //       prefix: 'media',
    //     },
    //     bucket: process.env.S3_BUCKET || '',
    //     config: {
    //       credential: {
    //         accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    //         secreteAccessKey: process.env.S3_SECRETE_ACCESS_KEY || '',
    //       },
    //       region: process.env_S3_REGION || '',
    //       endpoint: process.env.S3_ENDPOINT || '',
    //       forcePathStyle: true,
    //       // ... Other S3 configuration
    //     },
    //   },
    // }),
    s3Storage({
      collections: {
        'media': {
          prefix: "media",
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    seoPlugin({
      collections: [
        'pages',
      ],
    }),
  ],
})
