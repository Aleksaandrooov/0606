'use server'
import { TFormPostAdd, TFormProductEditor, TFormProductEditorDefault } from '@/lib/formInpit/schema'
import { charactInter, fetchCreateProductInter, sizesInter } from '@/components/shared/Profile/dto'
import { prisma } from '@/prisma/prisma-client'
import { Status } from '@prisma/client'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

export const changeStatusOrder = async (id: number, status: Status) => {
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  } catch (error) {
    console.log('Не удалось обновить статус заказа', error)
    NextResponse.error()
  }
}

export const changeTrackOrder = async (id: number, track: string) => {
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        track,
      },
    })
  } catch (error) {
    console.log(error, 'Не удалось обновить трек-код заказа')
    NextResponse.error()
  }
}

export const createProduct = async (
  data: TFormProductEditor | TFormProductEditorDefault,
  sizesArray: sizesInter[],
  charact: charactInter[],
  images: File[],
) => {
  try {
    const { description, title, price, article, oldPrice, weight, height, length, width } = data
    const characteristics = charact
      .filter((obj) => obj.id && obj.type)
      .map((obj) => {
        const id = obj.id!
        const value = obj.type
        return { id, value }
      })

    if ('item' in data) {
      const sizes = sizesArray.filter((obj) => obj.price && obj.techSize && obj.wbSize)
      const { brand, description, length, width, height } = data

      const product: fetchCreateProductInter = {
        subjectID: charact.find((obj) => obj)?.id as number,
        variants: {
          vendorCode: 'Артикул продавца',
          brand,
          description,
          title,
          dimensions: {
            length: Number(length),
            width: Number(width),
            height: Number(height),
          },
          sizes,
          characteristics,
        },
      }
      await axios
        .post('https://content-api.wildberries.ru/content/v2/cards/upload', {
          product,
        })
        .catch(() => {
          console.log('Ошибка создание карточки')
          return NextResponse.error()
        })
    }
    const sizes = sizesArray.filter((obj) => obj.techSize && obj.quntity) // получаем размеры
    const savedFiles = []

    for (const item of images) {
      if (item instanceof File) {
        const name = Date.now() + '-' + item.name
        const filePath = path.join('public', name)
        const buffer = Buffer.from(await item.arrayBuffer())
        fs.writeFileSync(filePath, buffer)
        savedFiles.push(name)
      }
    }

    const productCreate = await prisma.product.create({
      data: {
        title,
        oldPrice: oldPrice ? Number(oldPrice) : undefined,
        price: Number(price),
        description,
        image: savedFiles,
        article,
        width: Number(width),
        weight: Number(weight),
        height: Number(height),
        lenght: Number(length),
      },
    })

    await Promise.all(
      sizes.map(async (obj) => {
        await prisma.size.create({
          data: {
            title: obj.techSize,
            quntity: obj.quntity!,
            productId: productCreate.id,
          },
        })
      }),
    )

    await Promise.all(
      charact
        .filter((obj) => obj.name && obj.type)
        .map(async (obj) => {
          await prisma.characteristics.create({
            data: {
              title: obj.name,
              text: obj.type,
              productId: productCreate.id,
            },
          })
        }),
    )
  } catch (error) {
    console.log(error, 'Не удалось добавить товар')
    NextResponse.error()
  }
}

export const editProduct = async (
  data: TFormProductEditorDefault,
  charact: charactInter[],
  id: number,
  sizesArray: sizesInter[],
) => {
  try {
    const sizes = sizesArray.filter((obj) => obj.techSize && obj.quntity)
    const { title, price, description, article, oldPrice, weight, height, length, width } = data
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    })

    if (!product) {
      console.log('Ошибка редактирования')
      return NextResponse.error()
    }

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        title,
        oldPrice: oldPrice ? Number(oldPrice) : undefined,
        price: Number(price),
        article,
        description: description || '',
        width: Number(width),
        lenght: Number(length),
        height: Number(height),
        weight: Number(weight),
      },
    })

    await prisma.size.deleteMany({
      where: {
        productId: product.id,
      },
    })

    await Promise.all(
      sizes.map(
        async (obj) =>
          await prisma.size.create({
            data: {
              title: obj.techSize,
              quntity: obj.quntity!,
              productId: product.id,
            },
          }),
      ),
    )

    await prisma.characteristics.deleteMany({
      where: {
        productId: product.id,
      },
    })

    await Promise.all(
      charact
        .filter((obj) => obj.name && obj.type)
        .map(async (obj) => {
          await prisma.characteristics.create({
            data: {
              title: obj.name,
              text: obj.type,
              productId: product.id,
            },
          })
        }),
    )
  } catch (error) {
    console.log(error, 'Ошибка редактирования')
    return NextResponse.error()
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
    })

    if (!product) {
      console.log('Ошибка удаление')
      return NextResponse.error()
    }

    await prisma.cartItem.deleteMany({
      where: {
        productItemId: id,
      },
    })

    await prisma.size.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.characteristics.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.product.delete({
      where: {
        id,
      },
    })

    product.image.map((obj) => {
      const filePath = path.join('public', obj)
      fs.unlinkSync(filePath)
    })
  } catch (error) {
    console.log(error, 'Ошибка удаление')
    return NextResponse.error()
  }
}

export const addPost = async (data: TFormPostAdd) => {
  try {
    const { title, img, text, price, wbUrl, buttonText, buttonUrl } = data

    const name = Date.now() + '-' + img[0].name
    const filePath = path.join('public', name)
    const buffer = Buffer.from(await img[0].arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    await prisma.post.create({
      data: {
        title,
        img: name,
        text,
        wbUrl,
        price: Number(price),
        buttonText,
        buttonUrl,
      },
    })
  } catch (error) {
    console.log(error, 'Ошибка добавлени поста')
    return NextResponse.error()
  }
}

export const deletePost = async (id: number) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    })

    const filePath = path.join('public', post.img)
    fs.unlinkSync(filePath)
  } catch (error) {
    console.log(error, 'Ошибка удаления поста')
    return NextResponse.error()
  }
}
