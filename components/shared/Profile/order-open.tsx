import { cartType } from '@/app/services/dto/cartTypes'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { cn } from '@/lib/utils'
import { words } from '@/lib/word-cals'
import { currencyFormat, currencyStore } from '@/zustand/currency-store'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { deliveryInter } from './Admin/Orders/order-item'
import { JsonValue } from '@prisma/client/runtime/library'

interface Props {
  open: boolean
  items: JsonValue
  token: string
  number: string
  delivery: deliveryInter
  currency: currencyFormat
  track: string | null
  paymentUrl: string | null
}

export const OrderOpen: React.FC<Props> = ({
  open,
  items: jsonItems,
  token,
  number,
  delivery,
  currency: type,
  track,
  paymentUrl,
}) => {
  const { currency } = currencyStore()
  const formt = currencySimvol.find((obj) => obj.name === type)?.format
  const priceToFormat = (price: number) => {
    return Math.round((price * (currency[type] as number)) / 10) * 10
  }

  const items = Object.values(jsonItems as string) as unknown as cartType['items'][]

  return (
    <div
      className={cn(
        'mx-5 mb-3 h-0 md:transition-all md:duration-300 flex-col flex',
        open ? 'h-[300px]' : 'mb-0',
      )}
    >
      <div className="flex justify-between">
        <h1>№{token.slice(0, 8)}</h1>
        <div className="">
          {paymentUrl ? (
            <Link className="flex gap-1 items-center" href={paymentUrl}>
              Оплатить заказ <SquareArrowOutUpRight size={18} />
            </Link>
          ) : number.length === 9 ? (
            <h3 className="ml-auto">
              +375 {number.slice(0, 2)} {number.slice(2, 5)} {number.slice(5, 7)}{' '}
              {number.slice(7, 9)}
            </h3>
          ) : (
            <h3 className="ml-auto">
              +7 ({number.slice(0, 3)}) {number.slice(3, 6)} {number.slice(6, 8)}{' '}
              {number.slice(8, 10)}
            </h3>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-1 items-center">
        <div className="text-neutral-400 max-sm:text-sm">{delivery.type}</div>
        <h1 className="text-neutral-400 text-sm max-sm:text-xs text-end">
          {track && 'Трек-код:' + ' '}
          {track || delivery.address}
        </h1>
      </div>
      <div className="flex justify-between mt-1 pb-5">
        <div className="max-sm:text-xs text-sm">{delivery.tariff_name}</div>
        <h1 className="text-sm max-sm:text-xs text-end text-nowrap">
          <span className="text-neutral-400">
            ({delivery.period_min}
            {delivery.period_min === delivery.period_max ? '' : '-' + delivery.period_max}{' '}
            {delivery.period_max && words(delivery.period_max, ['день', 'дня', 'дней'])}){' '}
          </span>
          {delivery.delivery_sum && numberReplace(priceToFormat(delivery.delivery_sum))} ₽
        </h1>
      </div>
      <div className="mt-auto overflow-auto scroll__hidden">
        <h1 className="">Товары</h1>
        <div className="flex flex-col">
          <div className="flex gap-2 sticky top-0 pb-1 text-neutral-400 text-sm bg-zinc-950">
            <h1 className="ml-[88px] flex-1">Название</h1>
            <h2>Кол-во</h2>
            <h3 className="ml-5 mr-3">Цена</h3>
          </div>
          {items.map((obj, i) => (
            <div className="h-[80px] flex gap-2 items-center max-sm:text-sm" key={i}>
              <div className="w-[80px] max-sm:w-[70px]">
                <img className="max-h-[80px]" src={'/' + obj.productItem.image[0]} />
              </div>
              <h1 className="flex-1 line-clamp-2">
                {obj.productItem.title} &quot;{obj.productSize.title}&quot;
              </h1>
              <h2>x {obj.quantity}</h2>
              <h3 className="ml-6">
                {numberReplace(priceToFormat(obj.productItem.price) * obj.quantity)} {formt}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
