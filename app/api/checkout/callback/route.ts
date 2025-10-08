import { cartType } from '@/app/services/dto/cartTypes'
import { prisma } from '@/prisma/prisma-client'
import { PaymentCallbackData } from '@/types/yokassa'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData

    if (!body.object) {
      throw NextResponse.json({ error: 'Нету body' })
    }

    const order = await prisma.order.findFirst({
      where: {
        paymentId: body.object.id,
      },
    })

    if (!order) {
      throw NextResponse.json({ error: 'Такой заказ не найден' })
    }

    const isSucceded = body.object.status === 'succeeded'

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
    } else {
      const items = Object.values(order.items as string) as unknown as cartType['items'][]
      await Promise.all(
        items.map(async (obj) => {
          await prisma.size.update({
            where: {
              id: obj.productSizeId,
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
    return NextResponse.json({ message: 'Успешно изменен' })
  } catch (error) {
    console.log(error, 'Ошибка изменение статуса')
    return NextResponse.error()
  }
}
