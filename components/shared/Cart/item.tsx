import { cartType, patchCartType } from '@/app/services/dto/cartTypes'
import { Button } from '@/components/ui/button'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { currencyFormat } from '@/zustand/currency-store'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = cartType['items'] & {
  currency: {
    KZT: number | null
    BYN: number | null
    RUB: number
  }
  currencyValue: currencyFormat
  deleteCart: (id: number, size: number) => Promise<unknown>
  updateCart: ({ type, id }: patchCartType) => Promise<unknown>
}

export const Item = ({
  productItem,
  productSize,
  currency,
  quantity,
  currencyValue,
  deleteCart,
  updateCart,
}: Props) => {
  const [disabled, isDisabled] = useState(false)
  const format = currencySimvol.find((obj) => obj.name === currencyValue)?.format
  const priceToFormat =
    Math.round((productItem.price * (currency[currencyValue] as number)) / 10) * 10

  const deleteItem = () => {
    isDisabled(true)
    deleteCart(productItem.id, productSize.id).then(() => {
      isDisabled(false)
    })
  }

  const updateItem = (type: patchCartType['type']) => {
    isDisabled(true)
    updateCart({ type, id: productItem.id, size: productSize.id }).then(() => isDisabled(false))
  }

  return (
    <div className="h-[100px] flex gap-5 max-sm:gap-2 items-center relative border-b last:border-b-0">
      <div className="w-[80px] max-md:w-[60px]">
        <img className="h-full w-full" src={'/' + productItem.image[0]} />
      </div>
      <Link
        href={'/catalog/product/' + productItem.id + '?size=' + productSize.id}
        className="my-auto flex-1"
      >
        <h1 className="max-sm:text-sm">
          {productItem.title} &quot;{productSize.title}&quot;
        </h1>
        <span className="text-neutral-400 text-sm max-sm:text-xs">Перейти к товару</span>
      </Link>
      {productSize.quntity ? (
        <div className="md:flex-1 max-sm:absolute right-10 -bottom-2 justify-center items-center flex gap-3">
          <Button
            onClick={() => updateItem('decrement')}
            disabled={disabled || quantity == 1}
            variant="outline"
            size="sm"
            className="h-7 w-7"
          >
            <Minus size={18} />
          </Button>
          <h1>{quantity}</h1>
          <Button
            onClick={() => updateItem('increment')}
            disabled={disabled || productSize.quntity <= quantity}
            variant="outline"
            size="sm"
            className="h-7 w-7"
          >
            <Plus size={18} />
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex items-center justify-between gap-5 max-sm:gap-2">
        {productSize.quntity ? (
          <div className="text-end">
            <h1>
              {numberReplace(priceToFormat * quantity)} {format}
            </h1>
            <span className="text-neutral-400 text-sm max-sm:text-xs">
              {numberReplace(priceToFormat)} {format} x{quantity}
            </span>
          </div>
        ) : (
          <div className="max-sm:text-sm">
            <h1>Нет в наличии</h1>
          </div>
        )}
        <Button
          onClick={() => deleteItem()}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="px-2 max-sm:absolute right-0 -bottom-2 max-sm:h-7"
        >
          <Trash2 size={18} className="size-[18px] max-sm:size-[14px]" />
        </Button>
      </div>
    </div>
  )
}
