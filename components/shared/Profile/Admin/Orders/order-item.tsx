import { Order } from '@prisma/client'
import React from 'react'
import { StatusOrder } from './status'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { Info, PackageSearch, Truck } from 'lucide-react'
import { OrderProducts } from './order-products'
import { OrderItemSelect } from './order-item-select'
import { OrderAddress } from './order-address'

export interface deliveryInter {
  address: string
  type: string
  tariff_name: string | null
  period_min: number | null
  period_max: number | null
  delivery_sum: number | null
}

export const OrderItem = ({
  status,
  id,
  totalAmount,
  currency,
  createdAt,
  address,
  surname,
  name,
  items,
  track,
  patronymic,
  number,
  type,
  tariff_name,
  period_max,
  period_min,
  delivery_sum,
}: Order) => {
  const newDate = new Date()
  const delivery = {
    address,
    type,
    tariff_name,
    period_min,
    period_max,
    delivery_sum,
  }

  return (
    <div className="md:border rounded-md md:p-5 sticky top-16 mb-5">
      <div className="flex items-center gap-2 max-md:items-end max-md:gap-1 text-lg">
        <StatusOrder status={status} type={true} />
        <p className="text-neutral-400 max-md:text-base">№{id}</p>
        <p className="ml-auto">
          <span className="text-neutral-400 mr-1 max-md:text-sm">
            {createdAt.getDate() === newDate.getDate()
              ? 'Сегодня'
              : createdAt.getDate() + 1 === newDate.getDate()
                ? 'Вчера'
                : ''}{' '}
            {createdAt.getHours() < 10 ? 0 : ''}
            {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? 0 : ''}
            {createdAt.getMinutes()}
          </span>
          <span className="max-md:text-sm">
            {createdAt.getDate() < 10 ? 0 : ''}
            {createdAt.getDate()}.{createdAt.getMonth() < 10 ? 0 : ''}
            {createdAt.getMonth() + 1}.{createdAt.getFullYear()}
          </span>
        </p>
      </div>
      <div className="flex mt-2 gap-2 md:items-center max-md:flex-col max-md:mb-4 max-md:gap-4">
        <p className="text-lg max-md:text-base">
          <span className="text-base text-neutral-400">Итого:</span> {numberReplace(totalAmount)}{' '}
          {currencySimvol.find((obj) => obj.name === currency)?.format}
        </p>
        <OrderItemSelect id={id} status={status} track={track} />
      </div>
      <div className="mt-2 border-b pb-3">
        <p className="flex items-center gap-1">
          Информация <Info size={18} />
        </p>
        <div className="max-md:flex mt-2 justify-between">
          <div className="grid grid-cols-4 max-md:text-sm max-md:grid-cols-1 text-neutral-400 text-sm max-md:gap-1">
            <p>Фамилия</p>
            <p>Имя</p>
            <p>Отчество</p>
            <p>Номер телефона</p>
          </div>
          <div className="grid grid-cols-4 max-md:text-sm max-md:grid-cols-1 max-md:text-end max-md:gap-1">
            <p className="max-md:order-3">{surname}</p>
            <p className="max-md:order-4 max-md:ml-auto">{name}</p>
            <p className="max-md:order-7">{patronymic}</p>
            {number.length === 9 ? (
              <h3 className="max-md:order-8 max-md:ml-auto">
                +375 {number.slice(0, 2)} {number.slice(2, 5)} {number.slice(5, 7)}{' '}
                {number.slice(7, 9)}
              </h3>
            ) : (
              <h3 className="max-md:order-8 max-md:ml-auto">
                +7 ({number.slice(0, 3)}) {number.slice(3, 6)} {number.slice(6, 8)}{' '}
                {number.slice(8, 10)}
              </h3>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 border-b pb-3">
        <p className="flex items-center gap-1">
          Доставка <Truck size={18} /> <span className="text-neutral-400">({type})</span>
        </p>
        <OrderAddress currency={currency} {...delivery} />
      </div>
      <div className="mt-3">
        <p className="flex items-center gap-1">
          Товары <PackageSearch size={18} />
        </p>
        <OrderProducts currency={currency} items={items} />
      </div>
    </div>
  )
}
