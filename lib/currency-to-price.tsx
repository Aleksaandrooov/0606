import { currencyStore } from '@/zustand/currency-store'
import React from 'react'
import { currencySimvol } from './Array/currency-simvol'
import { numberReplace } from './numberReplace'

interface Props {
  price: number
  oldPrice: number | null
  className?: string
}

export const CurrencyToPrice: React.FC<Props> = ({ price, oldPrice, className }) => {
  const { currency, currencyValue } = currencyStore()

  return (
    <div className={className}>
      {oldPrice && (
        <del className="text-sm text-neutral-400 mr-1">
          {numberReplace(Math.round((oldPrice * (currency[currencyValue] as number)) / 10) * 10)}
        </del>
      )}
      {numberReplace(Math.round((price * (currency[currencyValue] as number)) / 10) * 10)}{' '}
      {currencySimvol.find((obj) => obj.name === currencyValue)?.format}
    </div>
  )
}
