import React from 'react';

export default function CoverBlockServer({ title, subtitle }: {title: string, subtitle: string}) {
  return (
    <div className={"w-full py-32 text-center bg-blue-200"}>
      <h1 className={"text-3xl font-bold"}>
        {title}
      </h1>
      <p className={"text-xl"}>
        {subtitle}
      </p>
    </div>
  )
}