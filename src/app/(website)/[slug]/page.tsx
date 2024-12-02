import type { Metadata } from 'next'

import config from '@payload-config';
import { getPayload } from 'payload'
import React, { cache } from 'react';

import type { Page as PageType } from '../../../payload-types';

import { RenderBlocks } from '@/utils/RenderBlocks'
import { notFound } from 'next/navigation';

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})


export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'index'
    })
    .map(({ slug }) => ({
      params: {slug}
    }))
}


export default async function Page({ params: { slug = 'index' } }) {
  let page: PageType | null

  page = await queryPageBySlug({
    slug
  })

  if (!page) {
    return notFound()
  }

  return (
    <div className="pb-24">
      <RenderBlocks blocks={page.layout} />
    </div>
  )
}