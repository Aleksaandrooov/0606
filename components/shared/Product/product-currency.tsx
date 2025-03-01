import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { numberReplace } from '@/lib/numberReplace'
import { cn } from '@/lib/utils'
import { currencyFormat, currencyStore } from '@/zustand/currency-store'
import React from 'react'

export const ProductCurrency = ({
  oldPrice,
  price,
  className,
}: {
  oldPrice: number | null
  price: number
  className?: string
}) => {
  const { currency, currencyValue, setCurrencyValue } = currencyStore()

  const onChangeCurrency = (e: currencyFormat) => {
    setCurrencyValue(e)
    localStorage.setItem('currency', e)
  }

  return (
    <div className={cn('flex justify-end gap-3 items-center text-xl max-lg:text-lg', className)}>
      <h2 className="flex max-lg:flex-row-reverse gap-2 items-end">
        {oldPrice && (
          <del className="text-sm text-neutral-400">
            {numberReplace(Math.round((oldPrice * (currency[currencyValue] as number)) / 10) * 10)}
          </del>
        )}
        {numberReplace(Math.round((price * (currency[currencyValue] as number)) / 10) * 10)}{' '}
        {currencySimvol.find((obj) => obj.name === currencyValue)?.format}
      </h2>
      <Select onValueChange={(e: currencyFormat) => onChangeCurrency(e)} value={currencyValue}>
        <SelectTrigger className="w-min">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencySimvol.map((obj, i) => (
            <SelectItem key={i} value={obj.name}>
              {obj.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
