'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { cartStore } from '@/zustand/cart-store'
import { currencyStore } from '@/zustand/currency-store'
import { ChevronRight, ShoppingBasketIcon, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ModalCartItem } from './modal-cart-item'

export const ModalCart = () => {
  const { currency, currencyValue } = currencyStore()
  const { cartItem, totalPrice, totalQuntity, postCart } = cartStore()
  const format = currencySimvol.find((obj) => obj.name === currencyValue)?.format
  const [disabled, isDisabled] = useState(false)
  const { data: session } = useSession()

  const deleteItem = (id: number, size: number) => {
    isDisabled(true)
    postCart(id, size).then(() => isDisabled(false))
  }

  return (
    <Sheet>
      <SheetTrigger className="px-2 transition-all rounded-md hover:bg-accent h-8 relative z-0">
        <ShoppingBasketIcon strokeWidth={1.5} />
        {totalQuntity > 0 && (
          <div className="absolute top-0 -right-2 bg-white rounded-full text-black text-xs w-[18px] h-[18px] flex justify-center items-center">
            <h2>{totalQuntity}</h2>
          </div>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[440px] max-sm:min-w-full flex flex-col overflow-auto scroll__hidden pb-0">
        <SheetHeader>
          <SheetTitle>
            Корзина{' '}
            {cartItem.length > 0 && <span className="text-neutral-400">{totalQuntity || ''}</span>}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col mt-3">
          {cartItem.map((obj, i) => (
            <ModalCartItem
              key={i}
              obj={obj}
              format={format}
              currency={currency}
              currencyValue={currencyValue}
              disabled={disabled}
              deleteItem={(n, s) => deleteItem(n, s)}
            />
          ))}
        </div>
        {cartItem.length > 0 ? (
          <div style={{ backgroundColor: 'rgb(10, 10, 10)' }} className="sticky bottom-0 pb-4">
            <div className="mt-4 border w-full flex flex-col rounded-lg">
              {totalQuntity ? (
                <div className="py-5 px-4 max-sm:py-3">
                  <div className="flex justify-between gap-2">
                    <h1 className="text-lg">Итого</h1>
                    <div className="border-b flex-1"></div>
                    <h2>
                      {numberReplace(
                        Math.round((totalPrice * (currency[currencyValue] as number)) / 10) * 10,
                      )}{' '}
                      {format}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="mt-2"></div>
              )}
              <Link href="/cart" className="flex">
                <SheetClose className="py-2 mb-2 mx-2 max-sm:py-1 max-sm:mb-1 max-sm:mx-1 grow justify-center text-sm rounded-md hover:bg-accent transition-all flex gap-1 items-center">
                  Перейти в корзину <ChevronRight size={18} />
                </SheetClose>
              </Link>
            </div>
          </div>
        ) : (
          <div className="my-auto flex-col items-center flex gap-1 pb-16">
            <div className="flex gap-1 items-center">
              <ShoppingCart size={18} />| Корзина пуста
            </div>
            {!session && (
              <span className="text-neutral-400 text-sm text-center">
                Наполняли корзину при прошлом визите? Авторизуйтесь и добавленные товары появятся на
                странице
              </span>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
