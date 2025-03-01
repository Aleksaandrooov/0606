'use client'

import React from 'react'
import { Item } from './item'
import { currencyStore } from '@/zustand/currency-store'
import { cartStore } from '@/zustand/cart-store'
import { words } from '@/lib/word-cals'
import { CartAmountNull } from './cartAmountNull'

export const CartItems = () => {
  const { currency, currencyValue } = currencyStore()
  const { cartItem, postCart, patchCart, totalQuntity, loading } = cartStore()
  if (!cartItem.length && !loading) {
    return <CartAmountNull />
  }
  return (
    <div className="flex-1 p-5 max-md:p-0">
      <div className="">
        <h1 className="text-2xl">Корзина</h1>
        {totalQuntity !== 0 && (
          <span className="text-sm text-neutral-400">
            {totalQuntity} {words(totalQuntity, ['товар', 'товара', 'товаров'])}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {cartItem.map((obj, i) => (
          <Item
            currency={currency}
            currencyValue={currencyValue}
            deleteCart={postCart}
            updateCart={patchCart}
            key={i}
            {...obj}
          />
        ))}
      </div>
    </div>
  )
}
