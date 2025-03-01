'use client'

import { Button } from '@/components/ui/button'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { Order } from '@prisma/client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { OrderOpen } from './order-open'
import { orderStatus } from '@/lib/Array/order-status'
import { cn } from '@/lib/utils'

export const OrderItems = ({
  token,
  createdAt,
  totalAmount,
  status,
  paymentUrl,
  track,
  currency,
  number,
  items,
  address,
  type,
  tariff_name,
  period_min,
  period_max,
  delivery_sum,
}: Order & { i: number }) => {
  const delivery = {
    address,
    type,
    tariff_name,
    period_min,
    period_max,
    delivery_sum,
  }
  const data = new Date()
  const [open, isOpen] = useState(false)
  return (
    <div className="mb-3 border rounded-lg max-w-[1000px] mx-auto overflow-hidden">
      <div
        onClick={() => isOpen((prev) => !prev)}
        className="flex cursor-pointer gap-2 items-end p-5 max-md:p-3"
      >
        <h1 className="flex gap-2 items-center max-sm:text-sm max-sm:gap-1">
          <div
            style={{ backgroundColor: orderStatus.find((obj) => obj.name === status)?.color }}
            className="h-4 w-4 max-sm:h-3 max-sm:w-3 rounded-full"
          ></div>
          {orderStatus.find((obj) => obj.name === status)?.text}
        </h1>
        <h2 className="text-neutral-400 text-sm">
          {createdAt.getDate() + 1 === data.getDate()
            ? 'Вчера '
            : createdAt.getDate() === data.getDate()
              ? 'Сегодня '
              : createdAt.getDate() +
                '.' +
                (createdAt.getMonth() + 1 < 10 ? 0 : '') +
                '' +
                (createdAt.getMonth() + 1 + '.' + createdAt.getFullYear()) +
                ' '}
          <span className="max-md:hidden">
            {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? 0 : ''}
            {createdAt.getMinutes()}
          </span>
        </h2>
        <div className="ml-auto flex gap-2 max-sm:gap-1">
          <h1>
            <span className="text-sm text-neutral-400 max-sm:hidden">на сумму:</span>{' '}
            {numberReplace(totalAmount)}{' '}
            {currencySimvol.find((obj) => obj.name === currency)?.format}
          </h1>
          <Button variant="ghost" className="h-6 w-6 max-sm:h-5 max-sm:w-5" size="icon">
            <ChevronDown size={18} className={cn('transition-all', open ? 'rotate-180' : '')} />
          </Button>
        </div>
      </div>
      <OrderOpen
        items={items}
        paymentUrl={paymentUrl}
        open={open}
        token={token}
        number={number}
        track={track}
        delivery={delivery}
        currency={currency!}
      />
    </div>
  )
}
