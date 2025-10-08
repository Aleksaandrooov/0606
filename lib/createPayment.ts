import { PaymentData } from '@/types/yokassa'
import { currencyFormat } from '@/zustand/currency-store'
import axios from 'axios'

interface Props {
  description: string
  orderId: number
  amount: number
  currency: currencyFormat
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: details.currency,
      },
      capture: true,
      description: details.description,
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID || '',
        password: process.env.YOOKASSA_API_KEY || '',
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  )

  return data
}
