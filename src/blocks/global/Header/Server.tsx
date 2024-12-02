import React from "react";
// import { getPayload } from '@payloadcms/next/utilities';
import config from '@payload-config';
import Image from 'next/image'
import { getPayload } from 'payload'
import Link from 'next/link'

export default async function HeaderServer() {

  const payload = await getPayload({config});
  const header = await payload.findGlobal({
    slug: 'header',
  });

  return (
    <div className={"bg-blue-500"}>
      <div className={"py-12 max-w-5xl mx-auto flex justify-between w-full items-center"}>
        <div className={"relative w-64 h-20"}>
          <Image
            src={typeof header.logo === "string" ? "" : header.logo?.url || ""}
            alt={typeof header.logo === "string" ? "" : header.logo?.alt}
            fill
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
      </div>
    </div>
  )
}