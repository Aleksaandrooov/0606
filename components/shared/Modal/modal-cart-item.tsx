import { cartType } from '@/app/services/dto/cartTypes'
import { Button } from '@/components/ui/button'
import { numberReplace } from '@/lib/numberReplace'
import { currencyFormat } from '@/zustand/currency-store'
import { X } from 'lucide-react'
import React from 'react'

interface Props {
  obj: cartType['items']
  disabled: boolean
  deleteItem: (id: number) => void
  currency: {
    KZT: number | null
    BYN: number | null
    RUB: number
  }
  currencyValue: currencyFormat
  format?: string
}

export const ModalCartItem: React.FC<Props> = ({
  obj,
  disabled,
  deleteItem,
  currency,
  currencyValue,
  format,
}) => {
  return (
    <div className="flex gap-2 border-b py-2 h-[90px]">
      <div className="w-[70px] my-auto">
        <img
          className="h-full max-h-[70px]"
          src={'https://0606.store/' + obj.productItem.image[0]}
        />
      </div>
      <h1 className="text-sm my-auto flex-1">{obj.productItem.title}</h1>
      <div className="flex flex-col items-end justify-between">
        <Button
          disabled={disabled}
          onClick={() => deleteItem(obj.productItemId)}
          variant="outline"
          className="h-7 w-7"
          size="icon"
        >
          <X size={16} />
        </Button>
        {obj.productItem.quntity ? (
          <h2 className="text-nowrap max-sm:text-sm">
            {numberReplace(
              Math.round((obj.productItem.price * (currency[currencyValue] as number)) / 10) * 10,
            )}{' '}
            {format}
            {obj.quantity > 1 ? (
              <span className="text-xs text-neutral-400"> (x{obj.quantity})</span>
            ) : (
              <></>
            )}
          </h2>
        ) : (
          <h1 className="text-sm">Нет в наличии</h1>
        )}
      </div>
    </div>
  )
}
