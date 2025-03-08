'use client'

import React, { useState } from 'react'
import { Image } from './image'
import { Button } from '@/components/ui/button'

interface Props {
  Images: string[]
}

export const ProductImages: React.FC<Props> = ({ Images }) => {
  const [index, setIndex] = useState(1)

  return (
    <div className="">
      <div className="lg:min-h-[60vh] my-4 flex items-center">
        {Images.map((obj, i) => (
          <Image url={obj} key={i} i={i + 1} index={index} />
        ))}
      </div>
      <div className="flex flex-wrap gap-1 mb-10 justify-center">
        {Images.map((_, i) => (
          <Button
            key={i}
            onClick={() => setIndex(i + 1)}
            size="sm"
            variant={index == i + 1 ? 'secondary' : 'outline'}
            className="border"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
