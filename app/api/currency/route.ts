import { prisma } from '@/prisma/prisma-client'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currencyBYN = await prisma.currency.findFirst({
      where: {
        name: 'BYN',
      },
    })
    const currencyKZT = await prisma.currency.findFirst({
      where: {
        name: 'KZT',
      },
    })

    const saved = new Date(currencyBYN?.updateAt || 0)
    const now = new Date()
    const savedDay = saved.toISOString().split('T')[0]
    const today = now.toISOString().split('T')[0]

    if (new Date(today) > new Date(savedDay)) {
      const newDate = (
        await axios('https://v6.exchangerate-api.com/v6/d3254ab944d08f9c90b8882e/latest/RUB')
      ).data

      if (!currencyBYN && !currencyKZT) {
        await prisma.currency.create({
          data: {
            name: 'BYN',
            price: newDate.conversion_rates.BYN,
          },
        })
        await prisma.currency.create({
          data: {
            name: 'KZT',
            price: newDate.conversion_rates.KZT,
          },
        })
      } else {
        await prisma.currency.update({
          where: {
            id: currencyBYN?.id,
          },
          data: {
            price: newDate.conversion_rates.BYN,
          },
        })
        await prisma.currency.update({
          where: {
            id: currencyKZT?.id,
          },
          data: {
            price: newDate.conversion_rates.KZT,
          },
        })
      }
    }

    const currency = await prisma.currency.findMany()
    return NextResponse.json(currency)
  } catch (error) {
    console.log(error)
    NextResponse.error()
  }
}
