import React from 'react'
import { serializeLexical } from '@/utils/serialize'

export default function RichTextBlockServer({content}: {content: any}) {
  return (
    <div className={"my-16"}>
      <div className={"richText max-w-5xl mx-auto"}>
        {serializeLexical({nodes: content.root.children})}
      </div>
    </div>
  )
}