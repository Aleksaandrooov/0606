import { createOrder } from '@/app/actions'
import { TFormPayment } from '@/lib/formInpit/schema'
import { cartStore } from '@/zustand/cart-store'
import { currencyStore } from '@/zustand/currency-store'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export interface deliveryInteface {
  type: string
  name: string
  delivery_sum?: number
  tariff_name?: string
  period_min?: number
  period_max?: number
}

export const PaymentState = (userId?: number) => {
  const { cartItem, totalPrice, loading: loadingCart } = cartStore()
  const { currencyValue, currency } = currencyStore()
  const [delivery, isDelivery] = useState<deliveryInteface>()
  const [error, isError] = useState(false)
  const [loading, isLoading] = useState(false)

  const onPaymentSumbit = async (data: TFormPayment) => {
    if (!delivery) {
      return isError(true)
    }
    isLoading(true)
    const price =
      Math.round(
        ((totalPrice + (delivery?.delivery_sum ? Number(delivery?.delivery_sum) : 0)) *
          (currency[currencyValue] as number)) /
          10,
      ) * 10
    const url = await createOrder(data, delivery, cartItem, price, currencyValue, userId).catch(
      () => redirect('/cart'),
    )

    if (url) {
      isLoading(false)
      location.href = url as string
    }
  }

  const changeDelivery = (data: deliveryInteface) => {
    isDelivery(data)
    isError(false)
  }

  return {
    onPaymentSumbit,
    delivery,
    currency,
    totalPrice,
    cartItem,
    loading,
    loadingCart,
    changeDelivery,
    error,
    currencyValue,
  }
}
