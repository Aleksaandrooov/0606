import { paramsInterface } from '@/app/catalog/page'
import { prisma } from '@/prisma/prisma-client'

export const countProductOnPage = 40

export async function FetchProducts(params: paramsInterface) {
  const order = params.order || 'new'
  const type = params.type || 'desc'
  const page = Number(params.page)

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      orderBy: [
        {
          createdAt: order === 'new' ? type : undefined,
          price: order === 'price' ? type : undefined,
        },
      ],
      include: {
        size: true,
      },
      skip: page > 0 ? (page - 1) * countProductOnPage || undefined : undefined,
      take: countProductOnPage,
    }),
    prisma.product.count(),
  ])

  return { products, count }
}
