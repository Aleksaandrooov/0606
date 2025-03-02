'use client'

import { Button } from '@/components/ui/button'
import { AddProductButton } from '@/lib/Components/add-product-button'
import { CurrencyToPrice } from '@/lib/currency-to-price'
import { WbIcon } from '@/lib/Components/wb'
import { Product } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export const ProductItem = ({ title, image, price, id, article, quntity, oldPrice }: Product) => {
  return (
    <div className="h-[380px] py-2 group flex flex-col">
      <Link href={'/catalog/product/' + id} className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-[200px]">
          <img
            className="max-h-full px-4 group-hover:scale-[1.03] transition-all"
            alt={title}
            src={'https://0606.store/' + image[0]}
          />
        </div>
        <h1 className="mt-4 flex-1 text-center px-4 max-md:px-0 line-clamp-3 overflow-hidden max-md:text-sm">
          {title}
        </h1>
        <span className="text-center max-md:text-base text-lg font-medium">
          <CurrencyToPrice oldPrice={oldPrice} price={price} />
        </span>
      </Link>
      <div className="flex justify-center mt-2 gap-2">
        <AddProductButton
          count={quntity}
          id={id}
          className="w-[120px] max-md:w-[100px] max-md:text-xs text-sm"
          reduction={true}
        />
        {article && (
          <Link href={'https://www.wildberries.ru/catalog/' + article + '/detail.aspx'}>
            <Button className="px-2" variant="outline">
              <WbIcon />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
