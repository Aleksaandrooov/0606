import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Characteristics, Product, Size } from '@prisma/client'
import React from 'react'
import { formReset } from './form-reset'
import { UseFormReturn } from 'react-hook-form'
import { TFormProductEditor } from '@/lib/formInpit/schema'
import { charactInter, sizesInter } from '../../dto'

interface Props {
  product: (Product & { characteristics: Characteristics[]; size: Size[] })[]
  changeProduct: (id: number | undefined) => void
  form: UseFormReturn<TFormProductEditor>
  changeCharact: (d: charactInter[]) => void
  changeSizes: (d: sizesInter[]) => void
  pushSize: () => void
  clearSize: () => void
  productValue: number | undefined
  setImage: (d: string[]) => void
}

export const ProductSelectEditor: React.FC<Props> = ({
  product,
  productValue,
  changeProduct,
  changeSizes,
  clearSize,
  pushSize,
  form,
  changeCharact,
  setImage,
}) => {
  const change = (e: string) => {
    if (e === 'def') {
      formReset(form)
      setImage([])
      changeCharact([])
      clearSize()
      changeProduct(undefined)
    } else {
      const item = product.find((obj) => obj.id === Number(e))!
      changeProduct(Number(e))
      setImage(item.image)
      changeSizes(
        item.size.map((obj) => {
          return {
            techSize: obj.title,
            quntity: obj.quntity,
            wbSize: '',
          }
        }),
      )
      pushSize()
      form.reset({
        title: item.title,
        item: '',
        length: String(item.lenght),
        width: String(item.width),
        weight: String(item.weight),
        height: String(item.height),
        article: item.article || '',
        price: String(item.price),
        description: item.description || '',
      })
      const charact = item.characteristics.map((obj) => {
        const name = obj.title
        const type = obj.text
        return {
          name,
          type,
        }
      })
      changeCharact(charact)
    }
  }

  return (
    <Select
      value={String(productValue ?? 'def')}
      onValueChange={(e) => change(e)}
      defaultValue="def"
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="def">Редактирование товара</SelectItem>
        {product.map((obj) => (
          <SelectItem value={String(obj.id)} key={obj.id}>
            {obj.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
