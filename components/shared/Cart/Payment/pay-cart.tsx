'use client'

import React from 'react'
import { CurrencyToPrice } from '@/lib/currency-to-price'
import { ProductCurrency } from '../../Product/product-currency'
import { Button } from '@/components/ui/button'
import { CreditCard, Package } from 'lucide-react'
import { cartType } from '@/app/services/dto/cartTypes'
import { deliveryInteface } from './state/payment-state'
import { numberReplace } from '@/lib/numberReplace'
import { CurrencyName } from '@prisma/client'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { words } from '@/lib/word-cals'

export const PayCart = ({
  price,
  items,
  loading,
  delivery,
  currencyValue,
  currency,
}: {
  price: number
  items: cartType['items'][]
  loading: boolean
  delivery?: deliveryInteface
  currencyValue: CurrencyName
  currency: {
    KZT: number | null
    BYN: number | null
    RUB: number
  }
}) => {
  const currencyType = currencySimvol.find((obj) => obj.name === currencyValue)
  const deliveryPrice = delivery?.delivery_sum ? Number(delivery?.delivery_sum) : 0
  const oldPrice = items.reduce((sum, acc) => {
    return acc.productItem.oldPrice
      ? sum + acc.productItem.quntity > 0
        ? acc.productItem.oldPrice * acc.quantity
        : 0
      : sum + 0
  }, 0)

  return (
    <div className="w-[350px] shrink-0 max-xl:mb-10 max-md:w-full flex flex-col gap-3 max-xl:mx-auto max-xl:w-[400px]">
      <div className="rounded-xl bg-accent/50 px-4 py-2">
        {items
          .filter((obj) => obj.productItem.quntity)
          .map((obj) => (
            <div key={obj.id} className="h-[60px] flex gap-2 items-center">
              <div className="max-w-[60px] mr-1">
                <img
                  className="max-h-[50px]"
                  src={'https://0606.store/' + obj.productItem.image[0]}
                />
              </div>
              <h2 className="text-xs line-clamp-3 flex-1">{obj.productItem.title}</h2>
              <div className="text-end flex items-center gap-1">
                <CurrencyToPrice
                  className="text-sm text-nowrap"
                  oldPrice={null}
                  price={obj.productItem.price}
                />
                {obj.quantity > 1 ? (
                  <span className="text-xs text-neutral-400">(x{obj.quantity})</span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
      </div>
      {delivery && (
        <div className="rounded-xl bg-accent/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h2 className="max-sm:text-sm">
                {delivery?.type === 'PVZ'
                  ? 'Пункт выдачи'
                  : delivery?.type === 'POSTAMAT'
                    ? 'Постамат'
                    : 'Доставка курьером'}
              </h2>
              <Package strokeWidth={1.5} className="max-sm:size-5" />
            </div>
            <h2 className="text-nowrap">
              {delivery?.delivery_sum
                ? numberReplace(
                    Math.round((delivery.delivery_sum * (currency[currencyValue] as number)) / 10) *
                      10,
                  )
                : ''}{' '}
              {delivery?.delivery_sum ? currencyType?.format : ''}
            </h2>
          </div>
          <div className="flex items-center mt-2 justify-between text-sm">
            <h2 className="text-neutral-400">{delivery?.tariff_name}</h2>
            <span className="text-neutral-400">
              {delivery.period_min}
              {delivery.period_min === delivery.period_max ? '' : '-' + delivery.period_max}{' '}
              {delivery.period_max && words(delivery.period_max, ['день', 'дня', 'дней'])}
            </span>
          </div>
        </div>
      )}
      <div className="rounded-xl bg-accent/50 p-5 flex flex-col gap-3">
        {oldPrice !== price && (
          <div className="flex justify-between items-center text-sm">
            <h2>Цена без скидки</h2>
            <CurrencyToPrice
              className="line-through text-neutral-500"
              oldPrice={null}
              price={oldPrice + deliveryPrice}
            />
          </div>
        )}
        <div className="border-b"></div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg max-sm:text-base">Итого</h2>
          <ProductCurrency
            oldPrice={null}
            price={price + deliveryPrice}
            className="sm:text-base max-sm:text-base"
          />
        </div>
        <Button form="form1" loading={loading} variant="secondary" className="mt-3 w-full">
          Перейти к оплате <CreditCard size={20} />
        </Button>
      </div>
    </div>
  )
}
