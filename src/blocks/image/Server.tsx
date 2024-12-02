import React from 'react';
import Image from 'next/image'

export default function ImageBlockServer({ image }: {image: {url: string, alt: string}}) {
  return (
    <div className={"flex justify-center my-16"}>
      <Image src={image.url} alt={image.alt} width={500} height={500} />
    </div>
  )
}