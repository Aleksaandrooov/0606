import { cartType } from '@/app/services/dto/cartTypes'
import { prisma } from '@/prisma/prisma-client'
import { PaymentCallbackData } from '@/types/yokassa'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Такой заказ не найден' })
    }

    const isSucceded = body.object.status === 'succeeded'
    const isCanceled = body.object.status === 'canceled'

    if (isSucceded) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: 'paidFor',
          paymentUrl: '',
        },
      })
    }

    if (isCanceled) {
      const items = Object.values(order.items as string) as unknown as cartType['items'][]
      await Promise.all(
        items.map(async (obj) => {
          await prisma.product.updateMany({
            where: {
              id: obj.productItemId,
            },
            data: {
              quntity: {
                increment: obj.quantity,
              },
            },
          })
        }),
      )
      await prisma.order.delete({
        where: {
          id: order.id,
        },
      })
    }
  } catch (error) {
    console.log(error, 'Ошибка изменение статуса')
    return NextResponse.error()
  }
}
