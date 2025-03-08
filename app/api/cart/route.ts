import { patchCartType } from '@/app/services/dto/cartTypes'
import { authOptions } from '@/components/shared/auth-options'
import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value
    const session = await getServerSession(authOptions)

    if (!token && session) {
      token = session.user.cartToken
    }

    if (!token) {
      return NextResponse.json({ item: [] })
    }

    const cart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          include: {
            productItem: true,
            productSize: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!cart) {
      req.cookies.delete('cartToken')
      return NextResponse.json({ item: [] })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.log(error, 'Получение корзины')
    return NextResponse.error()
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value
    const session = await getServerSession(authOptions)

    if (!token && session) {
      token = session.user.cartToken
    }

    const { id, size } = (await req.json()) as { id: number; size: number }

    const productSize = await prisma.size.findFirst({
      where: {
        id: size,
      },
    })

    if (!productSize) {
      return NextResponse.error()
    }

    if (!token) {
      token = crypto.randomUUID()
    }

    let cart = await prisma.cart.findFirst({
      where: {
        token,
      },
    })
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          token,
        },
      })
    }

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        productItemId: id,
        cartId: cart.id,
        productSizeId: productSize.id,
      },
    })

    if (findCartItem) {
      await prisma.cartItem.delete({
        where: {
          id: findCartItem.id,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          productItemId: id,
          cartId: cart.id,
          quantity: 1,
          productSizeId: productSize.id,
        },
      })
    }

    const update = await prisma.cart.findFirst({
      where: {
        id: cart.id,
      },
      include: {
        items: {
          include: {
            productItem: true,
            productSize: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    const resp = NextResponse.json(update)

    if (!session) {
      resp.cookies.set('cartToken', token, {
        maxAge: 2147483647,
      })
    }

    return resp
  } catch (error) {
    console.log(error, 'Добавление товара')
    return NextResponse.error()
  }
}

export async function PATCH(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value
    const data = (await req.json()) as patchCartType
    const session = await getServerSession(authOptions)

    if (!token && session) {
      token = session.user.cartToken
    }

    if (!token) {
      return NextResponse.error()
    }

    const cart = await prisma.cart.findFirst({
      where: {
        token,
      },
    })

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productItemId: data.id,
        productSizeId: data.size,
        cartId: cart!.id,
      },
    })

    if (!cart || !cartItem) {
      req.cookies.delete('cartToken')
      return NextResponse.error()
    }

    if (data.type === 'increment') {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
          productSizeId: data.size,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      })
    } else {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
          productSizeId: data.size,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      })
    }

    const update = await prisma.cart.findFirst({
      where: {
        id: cart.id,
      },
      include: {
        items: {
          include: {
            productItem: true,
            productSize: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    const resp = NextResponse.json(update)

    if (!session) {
      resp.cookies.set('cartToken', token, {
        maxAge: 2147483647,
      })
    }

    return resp
  } catch (error) {
    console.log(error, 'Обновление товара')
    return NextResponse.error()
  }
}
