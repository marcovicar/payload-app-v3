import React from "react";
// import { getPayload } from '@payloadcms/next/utilities';
import config from '@payload-config';
import Image from 'next/image'
import { getPayload } from 'payload'
import Link from 'next/link'

export default async function FooterServer() {

  const payload = await getPayload({config});
  const footer = await payload.findGlobal({
    slug: 'footer',
  });

  return (
    <div className={"bg-blue-400 border-t-2 border-t-blue-500"}>
      <div className={"py-12 max-w-5xl mx-auto flex justify-between w-full items-center"}>
        <div className={"relative w-64 h-20"}>
          <Image
            src={typeof footer.logo === "string" ? "" : footer.logo?.url || ""}
            alt={typeof footer.logo === "string" ? "" : footer.logo?.alt}
            fill
            className={"object-contain"}
          />
        </div>
        <div>
          {footer.copyrightNotice}
        </div>
        <div>
          {footer.nav.map((item, index) => {
            return (
              <Link key={index} href={item.link || ""} className={"text-lg mx-4"}>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}