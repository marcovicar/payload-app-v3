import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  i18n: {
    locales: ["en", "da", "sv"],
    defaultLocale: "en",
  }
}

export default withPayload(nextConfig)
