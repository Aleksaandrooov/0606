'use client'

import React, { useEffect } from 'react'
import CDEKWidget, { Lang } from '@cdek-it/widget'
import { deliveryInteface } from './state/payment-state'
import { cartType } from '@/app/services/dto/cartTypes'

interface Props {
  onChange: (data: deliveryInteface) => void
  cartItem: cartType['items'][]
}

export const CdekMap: React.FC<Props> = ({ onChange, cartItem }) => {
  useEffect(() => {
    const { width, height, length, weight } = cartItem.reduce(
      (sum, { productItem: { width, height, lenght, weight } }) => ({
        width: sum.width + width,
        height: sum.height + height,
        length: sum.length + lenght,
        weight: sum.weight + weight,
      }),
      { width: 0, height: 0, length: 0, weight: 0 },
    )

    const timeOut = setTimeout(() => {
      new CDEKWidget({
        from: {
          country_code: 'RU',
          city: 'Новосибирск',
          postal_code: '630009',
          code: 270,
          address: 'ул. Большевистская, д. 101',
        },
        servicePath: 'http://localhost:3000/api/cdek',
        defaultLocation: [37.6173, 55.7558],
        apiKey: 'aeec048c-a096-48fc-b923-e3322f7ffe02',
        lang: 'rus' as Lang,
        offices: null,
        goods: [
          {
            width,
            height,
            length,
            weight,
          },
        ],
        currency: 'RUB',
        root: 'cdek-map',
        onChoose: (typeOf, tarif, office) => {
          const name = 'address' in office ? office.address : office.name
          const type = 'address' in office ? office.type : typeOf
          const delivery_sum = tarif?.delivery_sum
          const tariff_name = tarif?.tariff_name
          const period_min = tarif?.period_min
          const period_max = tarif?.period_max
          onChange({ type, name, delivery_sum, tariff_name, period_min, period_max })
        },
      })
    })
    return () => {
      clearTimeout(timeOut)
    }
  }, [])

  return (
    <div
      className="mt-4 h-[400px] max-md:h-[300px] max-[586px]:mb-5 z-10 relative"
      id="cdek-map"
    ></div>
  )
}
