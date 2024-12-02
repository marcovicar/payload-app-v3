// storage-adapter-import-placeholder
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from '@/collections/Pages'
import { Header } from '@/globals/Header'
import { Footer } from '@/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
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
  ],
})
