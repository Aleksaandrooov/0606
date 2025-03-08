import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { ProductCurrency } from '../Product/product-currency'
import { AddProductButton } from '@/lib/Components/add-product-button'
import { cn } from '@/lib/utils'
import { Size } from '@prisma/client'

interface Props {
  id: number
  price: number
  className?: string
  description: string | null
  selectSize: Size | null
  Characteristics: { name: string; type: string }[]
}

export const ModalProductDescription = ({
  id,
  price,
  className,
  Characteristics,
  description,
  selectSize,
}: Props) => {
  return (
    <div className="mt-1 mb-2">
      <Sheet>
        <SheetTrigger
          className={cn(
            'transition-all hover:bg-secondary/80 flex lg:ml-auto gap-1 px-3 py-2 rounded-md text-sm',
            className,
          )}
        >
          Характеристики <ChevronRight size={18} />
        </SheetTrigger>
        <SheetContent className="sm:min-w-[500px] max-md:w-full overflow-y-auto scroll__hidden flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle>Характеристики/Описание</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <h1 className="mb-3">Основная информация</h1>
            <div className="flex flex-col gap-3">
              {Characteristics.filter((obj) => obj.name && obj.type).map((obj, i) => (
                <div key={i} className="flex text-sm justify-between">
                  <h1 className="text-neutral-400 pr-2 text-nowrap">{obj.name}</h1>
                  <div className="border-b flex-1"></div>
                  <h2 className="pl-2 text-end">{obj.type}</h2>
                </div>
              ))}
            </div>
          </div>
          {description && (
            <div className="mt-5">
              <h1 className="mb-4">Описание</h1>
              <div className="text-sm">{description}</div>
            </div>
          )}
          <div
            style={{ backgroundColor: 'rgb(10, 10, 10)' }}
            className="flex justify-between mt-auto sticky bottom-0 pb-4 pt-2 rounded-t-sm bg-zinc-950"
          >
            <AddProductButton
              size={selectSize?.id || 0}
              count={selectSize?.quntity || 0}
              disabled={!selectSize}
              id={id}
              className="w-[220px] max-sm:w-[164px] h-9"
            />
            <ProductCurrency oldPrice={null} price={price} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
