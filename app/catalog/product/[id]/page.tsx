import { ProductBottom } from '@/components/shared/Product/product-bottom'
import { ProductImages } from '@/components/shared/Product/product-images'
import { ProductTitle } from '@/components/shared/Product/product-title'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import Head from 'next/head'
import { PageProps } from '@/.next/types/app/page'

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const Product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      characteristics: true,
    },
  })

  if (!Product || !id) {
    redirect('/')
  }

  const metadata = {
    title: `${Product.title} | Каталог 0606`,
    description: `Купите ${Product.title} в нашем каталоге. Узнайте подробности о характеристиках, цене и доступности товара.`,
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Container className="mt-5 max-sm:px-4">
        <BreadCrumb name={Product.title} pref="Каталог" url="/catalog" />
        <div className="flex justify-around max-lg:flex-col items-center">
          <ProductImages Images={Product.image} />
          <ProductTitle {...Product} />
        </div>
        {Product.article && <ProductBottom article={Product.article} />}
      </Container>
    </>
  )
}
