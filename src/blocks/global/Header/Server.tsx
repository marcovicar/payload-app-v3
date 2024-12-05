import React from "react";
import config from '@payload-config';
import Image from 'next/image'
import { getPayload } from 'payload'
import Link from 'next/link'
import LanguageSelector from '@/blocks/global/LanguageSelector/Client'

export default async function HeaderServer() {

  const payload = await getPayload({config});
  const header = await payload.findGlobal({
    slug: 'header',
  });

  const availableLocales = (
    payload.config.localization && 'locales' in payload.config.localization
      ? payload.config.localization.locales
      : []
  ).map((locale) => ({
    code: locale.code,
    label: typeof locale.label === 'string' ? { en: locale.label } : locale.label,
  }));

  const defaultLocale = payload.config.localization && 'defaultLocale' in payload.config.localization
    ? payload.config.localization.defaultLocale
    : 'en';

  return (
    <div className={"bg-blue-500"}>
      <div className={"py-12 max-w-5xl mx-auto flex justify-between w-full items-center"}>
        <div className={"relative w-64 h-20"}>
          <Image
            src={typeof header.logo === "object" && header.logo?.url ? header.logo.url : ""}
            alt={typeof header.logo === "object" && header.logo?.alt ? header.logo.alt : ""}
            fill
            priority
            className={"object-contain"}
          />
        </div>
        <div>
          {header.nav.map((item, index) => {
            return (
              <Link key={index} href={item.link || ""} className={"text-lg mx-4"}>
                {item.label}
              </Link>
            )
          })}
        </div>
        <div>
          <LanguageSelector
            availableLocales={availableLocales}
            defaultLocale={defaultLocale}
          />
        </div>
      </div>
    </div>
  )
}