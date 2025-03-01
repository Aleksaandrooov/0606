import { cartType } from '@/app/services/dto/cartTypes'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { currencyStore } from '@/zustand/currency-store'
import { CurrencyName } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import React from 'react'

interface Props {
  items: JsonValue
  currency: CurrencyName
}

export const OrderProducts: React.FC<Props> = ({ items: jsonItems, currency: type }) => {
  const { currency } = currencyStore()

  const priceToFormat = (price: number) => {
    return Math.round((price * (currency[type] as number)) / 10) * 10
  }

  const items = Object.values(jsonItems as string) as unknown as cartType['items'][]

  return (
    <div className="">
      <div className="grid grid-cols-6 mt-2 gap-2 text-sm max-md:text-xs">
        <h2 className="text-neutral-400">Фото</h2>
        <h2 className="text-neutral-400 col-span-3">Название</h2>
        <h2 className="text-neutral-400">Кол-во</h2>
        <h2 className="text-neutral-400">Цена</h2>
      </div>
      {items?.map((obj) => (
        <div key={obj.id} className="grid grid-cols-6 text-sm gap-2">
          <img className="max-h-[80px]" src={'/' + obj.productItem?.image[0]} />
          <h1 className="my-auto col-span-3 max-md:text-xs">{obj.productItem?.title}</h1>
          <h1 className="my-auto">x {obj.quantity}</h1>
          <h1 className="my-auto">
            {numberReplace(priceToFormat(obj.productItem.price) * obj.quantity)}{' '}
            {currencySimvol.find((obj) => obj.name === type)?.format}
          </h1>
        </div>
      ))}
    </div>
  )
}
