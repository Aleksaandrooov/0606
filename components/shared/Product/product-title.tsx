'use client'

import { Button } from '@/components/ui/button'
import { WbIcon } from '@/lib/Components/wb'
import { Characteristics, Product, Size } from '@prisma/client'
import { ModalProductDescription } from '../Modal/modal-product-description'
import { ProductCurrency } from './product-currency'
import { AddProductButton } from '@/lib/Components/add-product-button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export const ProductTitle = ({
  title,
  price,
  oldPrice,
  article,
  id,
  characteristics,
  description,
  size,
}: Product & { characteristics: Characteristics[]; size: Size[] }) => {
  const router = useRouter()
  const params = useSearchParams()
  const selectSize =
    size.find((obj) => obj.id === Number(params.get('size'))) || size.find((obj) => obj)!
  const changeSize = (id: number) => {
    router.push(`?size=` + id)
  }

  const charact = characteristics.map((obj) => {
    const name = obj.title
    const type = obj.text
    return {
      name,
      type,
    }
  })

  const findCharact = charact.find((obj) => obj)
  return (
    <div className="lg:w-[480px] lg:text-end max-lg:w-full">
      <div className="lg:border-l lg:pl-16 py-5 max-lg:pt-0">
        <h1 className="text-xl max-lg:text-lg">{title}</h1>
        {findCharact && (
          <span className="text-neutral-400 text-sm">
            {findCharact?.name}: {findCharact?.type}
          </span>
        )}
        <ModalProductDescription
          Characteristics={charact}
          description={description}
          selectSize={selectSize}
          price={price}
          id={id}
        />
        <ul className="flex gap-2 lg:justify-end mb-3">
          {size.map((obj) => (
            <Button
              key={obj.id}
              onClick={() => changeSize(obj.id)}
              variant={obj.id === selectSize.id ? 'secondary' : 'outline'}
              className="border"
            >
              {obj.title}
            </Button>
          ))}
        </ul>
        <ProductCurrency
          oldPrice={oldPrice}
          price={price}
          className="mb-2 max-lg:flex-row-reverse"
        />
        <div className="flex items-center gap-2 lg:justify-end">
          <AddProductButton
            count={selectSize.quntity}
            size={selectSize.id}
            id={id}
            className="w-[180px]"
          />
          {article && (
            <Link href={'https://www.wildberries.ru/catalog/' + article + '/detail.aspx'}>
              <Button variant="outline">
                <WbIcon />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
