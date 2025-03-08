import { Input } from '@/components/ui/input'
import React from 'react'
import { sizesInter } from '../../dto'

export type sizeType = 'techSize' | 'wbSize' | 'price' | 'quntity'

interface Props {
  changeSize: (t: sizeType, s: string, i: number) => void
  size?: sizesInter
  i: number
  formSelect: boolean
}

export const ProductSizesArray: React.FC<Props> = ({ changeSize, i, formSelect, size }) => {
  return (
    <div className="flex gap-2">
      <Input
        value={size?.techSize}
        onChange={(e) => changeSize('techSize', e.target.value, i)}
        placeholder="Размер (S)"
      />
      {formSelect && (
        <>
          <Input
            value={size?.wbSize}
            onChange={(e) => changeSize('wbSize', e.target.value, i)}
            placeholder="RU размер"
          />
          <Input
            value={size?.price || ''}
            onChange={(e) => changeSize('price', e.target.value, i)}
            placeholder="Цена"
            type="number"
          />
        </>
      )}
      <Input
        value={size?.quntity || ''}
        onChange={(e) => changeSize('quntity', e.target.value, i)}
        placeholder="Количество"
        type="number"
      />
    </div>
  )
}
