'use server'

import { prisma } from '@/prisma/prisma-client'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { render } from '@react-email/components'
import { Verificed } from '@/lib/Components/verificed'
import { sendEmailVerificed } from '@/components/shared/sendEmailVerificed'
import { nameType } from '@/components/shared/Profile/dto'
import { TFormPayment } from '@/lib/formInpit/schema'
import { cartType } from './services/dto/cartTypes'
import { currencyFormat } from '@/zustand/currency-store'
import { createPayment } from '@/lib/createPayment'
import { deliveryInteface } from '@/components/shared/Cart/Payment/state/payment-state'

export async function sendEmail(email: string) {
  try {
    const code = Math.random().toString().substring(2, 8)
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (findUser) {
      const fetchCode = await prisma.verificationCode.findFirst({
        where: {
          userId: findUser.id,
        },
      })

      if (fetchCode) {
        await prisma.verificationCode.delete({
          where: {
            userId: findUser.id,
          },
        })
      }

      await prisma.verificationCode.create({
        data: {
          userId: findUser.id,
          code,
        },
      })
    } else {
      const newUser = await prisma.user.create({
        data: {
          email,
        },
      })

      const cookie = await cookies()
      const token = cookie.get('cartToken')?.value

      if (token) {
        const cart = await prisma.cart.findFirst({
          where: {
            token,
          },
        })

        if (!cart) {
          cookie.delete('cartToken')
          return
        }

        await prisma.cart.update({
          where: {
            id: cart?.id,
          },
          data: {
            userId: newUser.id,
          },
        })
        cookie.delete('cartToken')
      } else {
        const tokenNew = crypto.randomUUID()

        await prisma.cart.create({
          data: {
            userId: newUser.id,
            token: tokenNew,
          },
        })

        await prisma.verificationCode.create({
          data: {
            userId: newUser.id,
            code,
          },
        })
      }
    }

    const emailHtml = await render(<Verificed code={code} />)
    await sendEmailVerificed({
      to: email,
      subject: 'Код подтверждения | 0606 store',
      html: emailHtml,
    })
  } catch (error) {
    console.log(error, 'Отправка кода')
  }
}

export async function settingProfile(type: nameType, text: string, email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return false
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: type === 'name' ? text : undefined,
        surname: type === 'surname' ? text : undefined,
        patronymic: type === 'patronymic' ? text : undefined,
        number: type === 'number' ? text : undefined,
      },
    })
  } catch (error) {
    console.log(error, 'Настройка профиля')
    return NextResponse.error()
  }
}

export async function deleteSettingProfile(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return false
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: '',
        surname: '',
        patronymic: '',
        number: '',
      },
    })
  } catch (error) {
    console.log(error, 'Удаление настроек профиля')
    return NextResponse.error()
  }
}

export async function createOrder(
  data: TFormPayment,
  delivery: deliveryInteface,
  items: cartType['items'][],
  totalAmount: number,
  currency: currencyFormat,
  userId?: number,
) {
  try {
    await Promise.all(
      items
        .filter((obj) => obj.productItem.quntity)
        .map(async (obj) => {
          const product = await prisma.product.findFirst({
            where: {
              id: obj.productItemId,
            },
          })
          if (product!.quntity! < obj.quantity) {
            throw new Error()
          }
          return obj
        }),
    )
    const token = crypto.randomUUID()
    const order = await prisma.order.create({
      data: {
        email: data.email,
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        number: data.number,

        address: delivery.name,
        type:
          delivery?.type === 'PVZ'
            ? 'Пункт выдачи'
            : delivery?.type === 'POSTAMAT'
              ? 'Постамат'
              : 'Доставка курьером',
        delivery_sum: delivery.delivery_sum,
        tariff_name: delivery.tariff_name,
        period_min: delivery.period_min,
        period_max: delivery.period_max,
        paymentId: '',
        paymentUrl: '',
        totalAmount: totalAmount,
        items,
        token,
        currency,
        status: 'pending',
        userId,
      },
    })

    const paymentData = await createPayment({
      amount: totalAmount,
      orderId: order.id,
      currency: currency,
      description: 'Оплата заказа #' + order.id,
    })
    if (!paymentData) {
      throw new Error('Ошибка создании заказа')
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
        paymentUrl: paymentData.confirmation.confirmation_url,
      },
    })

    await Promise.all(
      items
        .filter((obj) => obj.productItem.quntity)
        .map(async (obj) => {
          await prisma.product.update({
            where: {
              id: obj.productItemId,
            },
            data: {
              quntity: {
                decrement: obj.quantity,
              },
            },
          })
          await prisma.cartItem.delete({
            where: {
              id: obj.id,
            },
          })
        }),
    )

    return paymentData.confirmation.confirmation_url
  } catch (error) {
    console.log(error, 'Ошибка создания заказа')
    return NextResponse.error()
  }
}
