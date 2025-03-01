import { PageProps } from '@/.next/types/app/page'
import { PaginationCatalog } from '@/components/shared/Catalog/pagination-catalog'
import { ProductItem } from '@/components/shared/Catalog/productItem'
import { SortPopup } from '@/components/shared/Catalog/sort-popup'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { FetchProducts } from '@/lib/fetch-products'
import { words } from '@/lib/word-cals'
import { Metadata } from 'next'

export interface paramsInterface {
  page: string
  order: 'price' | 'new'
  type: 'asc' | 'desc'
}

export const metadata: Metadata = {
  title: 'Каталог | 0606 ',
  description:
    'Откройте для себя широкий ассортимент качественных товаров в нашем каталоге. Выбирайте лучшее по отличным ценам с доставкой по РФ и РБ',
}

export default async function Page({
  searchParams,
}: PageProps & { searchParams: paramsInterface }) {
  const params = await searchParams
  const { products, count } = await FetchProducts(params)

  return (
    <div className="mt-5">
      <div className="border-b pb-1">
        <Container>
          <BreadCrumb name="Каталог" />
          <div className="mt-10 flex justify-between items-center max-md:text-sm">
            <div>
              <h1>
                {count} {words(count, ['товар', 'товара', 'товаров'])}
              </h1>
            </div>
            <SortPopup />
          </div>
        </Container>
      </div>
      <Container key={params.type} className="px-4">
        <div className="grid grid-cols-5 max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {products.map((obj) => (
            <ProductItem key={obj.id} {...obj} />
          ))}
        </div>
        <PaginationCatalog length={count} />
      </Container>
    </div>
  )
}
