'use client'

import { Button } from '@/components/ui/button'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { words } from '@/lib/word-cals'
import { cartStore } from '@/zustand/cart-store'
import { currencyStore } from '@/zustand/currency-store'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const CartPayments = () => {
  const { currency, currencyValue } = currencyStore()
  const { totalPrice, totalQuntity, cartItem, loading } = cartStore()
  const format = currencySimvol.find((obj) => obj.name === currencyValue)?.format
  const price = numberReplace(
    Math.round((totalPrice * (currency[currencyValue] as number)) / 10) * 10,
  )

  if (!cartItem.length && !loading) {
    return <></>
  }

  return (
    <div className="w-[350px] max-xl:w-[400px] max-md:w-full md:mx-auto mb-10">
      {totalQuntity !== 0 && (
        <div className="rounded-xl bg-accent/50 px-5 py-4 flex justify-between items-center mb-3">
          <h1 className="text-sm">
            {totalQuntity} {words(totalQuntity, ['товар', 'товара', 'товаров'])} на сумму
          </h1>
          <div className="flex-1 mt-auto"></div>
          <h1>
            {price} {format}
          </h1>
        </div>
      )}
      <div className="rounded-xl bg-accent/50 p-5">
        <span className="text-neutral-400 text-sm">
          Стоимость доставки будет рассчитана на следующем шаге
        </span>
        <div className="flex justify-between items-center my-4 text-lg">
          <h1>Итого</h1>
          <span>
            {price} {format}
          </span>
        </div>
        <Link href="/cart/payment" className={totalQuntity == 0 ? 'pointer-events-none' : ''}>
          <Button className="w-full" disabled={totalQuntity == 0} variant="secondary">
            Перейти к оформлению <CreditCard size={20} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
