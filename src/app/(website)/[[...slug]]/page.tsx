import type { Metadata } from 'next'

import { cookies } from 'next/headers';
import config from '@payload-config';
import { getPayload } from 'payload'
import React, { cache } from 'react';

import type { Page as PageType } from '../../../payload-types';

import { RenderBlocks } from '@/utils/RenderBlocks';
import { notFound } from 'next/navigation'
type LocaleType = 'en' | 'da' | 'sv' | 'all';

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: LocaleType }) => {
  const parsedSlug = decodeURIComponent(slug);

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    locale: locale,
    fallbackLocale: false,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  });

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => ({
      params: {slug}
    }))
}

export async function generateMetadata({ params }: { params: any }): Promise<{
  title: any;
  description: any;
}> {
  const langCookie = (await cookies()).get('language');
  const locale = langCookie ? langCookie.value : 'en';
  const slug = params.slug || 'home'; // Default 'home'

  const page = await queryPageBySlug({
    slug,
    locale: locale as LocaleType,
  });

  if (!page) {
    return {
      title: 'Page not found',
      description: 'This page was not found',
    };
  }

  const { meta } = page;
  return {
    title: meta?.title || 'Default Title',
    description: meta?.description || 'Default Description',
  };
}

export default async function Page({ params }: { params: any }) {
  let page: PageType | null;
  const slug = params.slug || 'home'; // Default 'home'

  const langCookie = (await cookies()).get('language');
  const locale = langCookie ? langCookie.value : 'en';

  page = await queryPageBySlug({
    slug,
    locale: locale as LocaleType,
  });

  if (!page) {
    return notFound();
  }

  return (
    <div className="pb-24">
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
