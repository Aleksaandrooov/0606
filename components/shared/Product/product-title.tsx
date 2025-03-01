'use client'

import { Button } from '@/components/ui/button'
import { WbIcon } from '@/lib/Components/wb'
import { Characteristics, Product } from '@prisma/client'
import React from 'react'
import { ModalProductDescription } from '../Modal/modal-product-description'
import { ProductCurrency } from './product-currency'
import { AddProductButton } from '@/lib/Components/add-product-button'
import Link from 'next/link'

export const ProductTitle = ({
  title,
  price,
  oldPrice,
  article,
  id,
  quntity,
  characteristics,
  description,
}: Product & { characteristics: Characteristics[] }) => {
  const charact = characteristics.map((obj) => {
    const name = obj.title
    const type = obj.text
    return {
      name,
      type,
    }
  })

  const findCharact = charact.find((obj) => obj)
  return (
    <div className="lg:w-[480px] lg:text-end max-lg:w-full">
      <div className="lg:border-l lg:pl-16 py-5 max-lg:pt-0">
        <h1 className="text-xl max-lg:text-lg">{title}</h1>
        {findCharact && (
          <span className="text-neutral-400 text-sm">
            {findCharact?.name}: {findCharact?.type}
          </span>
        )}
        <ModalProductDescription
          Characteristics={charact}
          description={description}
          price={price}
          count={quntity}
          id={id}
        />
        <ProductCurrency
          oldPrice={oldPrice}
          price={price}
          className="mb-2 max-lg:flex-row-reverse"
        />
        <div className="flex items-center gap-2 lg:justify-end">
          <AddProductButton count={quntity} id={id} className="w-[180px]" />
          {article && (
            <Link href={'https://www.wildberries.ru/catalog/' + article + '/detail.aspx'}>
              <Button variant="outline">
                <WbIcon />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
