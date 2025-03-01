'use client'

import { Order } from '@prisma/client'
import React, { useState } from 'react'
import { OrderItem } from './order-item'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ShoppingBasketIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Chat } from './chat'
import { PriceToCurrency } from './priceToCurrency'
import { OrderFilter } from './order-filter'
import { OrderSelect } from './order-select'
import { numberReplace } from '@/lib/numberReplace'

interface Props {
  Orders: Order[]
}

export const OrderAdmin: React.FC<Props> = ({ Orders }) => {
  const [order, setOrder] = useState<number | undefined>()
  const { price, newOrders } = PriceToCurrency(Orders)

  const {
    setItemsFilter,
    itemsFilter,
    isValue,
    value,
    setDelivery,
    delivery,
    orderBy,
    items,
    setOrderBy,
  } = OrderFilter(Orders)

  return (
    <div className="flex gap-3 mt-5">
      <div className={order ? 'w-[300px] max-lg:hidden' : 'flex-1'}>
        <div className="flex gap-2">
          <Button
            onClick={() => setItemsFilter('all')}
            variant={itemsFilter === 'all' ? 'secondary' : 'outline'}
            className="flex-col items-stretch h-auto flex-1 border"
          >
            <div className="flex justify-between">
              <ShoppingBasketIcon size={34} />
              <h1>{Orders.length}</h1>
            </div>
            <h1 className="text-start">Все заказы</h1>
          </Button>
          <Button
            onClick={() => setItemsFilter('pending')}
            variant={itemsFilter === 'all' ? 'outline' : 'secondary'}
            className="flex-col items-stretch h-auto flex-1 border"
          >
            <div className="flex justify-between">
              <h2 className="text-2xl text-neutral-400">+{newOrders.length}</h2>
              <div className="flex flex-col items-end">
                <span className="text-xs text-neutral-400">
                  {numberReplace(price.toFixed(2))} ₽
                </span>
              </div>
            </div>
            <h1 className="text-start">Новые заказы</h1>
          </Button>
        </div>
        <div className="flex gap-2 items-end">
          <Input
            value={value}
            onChange={(e) => isValue(e.target.value)}
            className="mt-2"
            placeholder="Поиск по номеру..."
          />
          <span className="text-sm text-neutral-400 text-nowrap">{items.length} ш.</span>
        </div>
        <OrderSelect
          orderBy={orderBy}
          setOrderBy={(e) => setOrderBy(e)}
          setDelivery={(e) => setDelivery(e)}
          delivery={delivery}
        />
        <div className="flex-col flex mt-3">
          {items.map((obj) => (
            <Chat value={order} changeOrder={(id: number) => setOrder(id)} key={obj.id} {...obj} />
          ))}
        </div>
      </div>
      {order && (
        <div className="flex-1">
          <Button variant="secondary" onClick={() => setOrder(undefined)} className="mb-2">
            <ChevronLeft size={18} /> Назад
          </Button>
          <OrderItem {...Orders.find((obj) => obj.id === order)!} />
        </div>
      )}
    </div>
  )
}
