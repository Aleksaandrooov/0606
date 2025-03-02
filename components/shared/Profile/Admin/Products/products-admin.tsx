'use client'

import { Button } from '@/components/ui/button'
import { AddProductButton } from '@/lib/Components/add-product-button'
import { CurrencyToPrice } from '@/lib/currency-to-price'
import { WbIcon } from '@/lib/Components/wb'
import React, { useState } from 'react'
import { ProductEditor } from './product-editor'
import { useForm } from 'react-hook-form'
import {
  productEditorDefaultSchema,
  productEditorSchema,
  TFormProductEditor,
} from '@/lib/formInpit/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShoppingCart } from 'lucide-react'
import { ModalProductDescription } from '@/components/shared/Modal/modal-product-description'
import { charactInter, nameValueForm } from '../../dto'
import { Characteristics, Product } from '@prisma/client'
import { ProductSelectEditor } from './product-select-editor'

export const ProductsAdmin = ({
  product,
}: {
  product: (Product & { characteristics: Characteristics[] })[]
}) => {
  const [formProduct, isFormProduct] = useState<nameValueForm>('default')
  const [changeProduct, isChangeProduct] = useState<number | undefined>(undefined)
  const form = useForm<TFormProductEditor>({
    resolver: zodResolver(
      formProduct === 'default' ? productEditorDefaultSchema : productEditorSchema,
    ),
  })
  const [images, setImages] = useState<(File | string)[]>([])
  const [charact, setCharact] = useState<charactInter[]>([])

  const handleFileChange = (file: File | null, index: number) => {
    setImages((prev) => {
      const updatedImages = [...prev]
      if (file) {
        if (index < updatedImages.length) {
          updatedImages[index] = file
        } else {
          updatedImages.push(file)
        }
      } else if (index < updatedImages.length) {
        updatedImages[index] = ''
      }
      return updatedImages
    })
  }

  const changeCharact = (t: 'name' | 'type', e: string, i: number, id?: number) => {
    setCharact((prev) => {
      const updateCharact = [...prev]
      if (!updateCharact[i]) {
        updateCharact.push({ name: '', type: '' })
      }
      updateCharact[i][t] = e

      if (t === 'name' && formProduct === 'wb') {
        updateCharact[i].id = id
      }

      return updateCharact
    })
  }

  return (
    <div className="flex mt-5 max-lg:flex-col items-center max-lg:gap-10 justify-around mb-5">
      <ProductEditor
        isChangeProduct={(t) => isChangeProduct(t)}
        changeProduct={changeProduct}
        changeForm={(s) => isFormProduct(s)}
        valueForm={formProduct}
        charact={charact}
        changeCharact={(t, e, i, id) => changeCharact(t, e, i, id)}
        clearCharact={() => setCharact([])}
        clearImage={() => setImages([])}
        images={images}
        changeImages={(e, i) => handleFileChange(e, i)}
        form={form}
      />
      <div className="w-[300px]">
        {formProduct === 'default' && (
          <ProductSelectEditor
            changeProduct={(e) => isChangeProduct(e)}
            productValue={changeProduct}
            form={form}
            changeCharact={(t) => setCharact(t)}
            product={product}
            setImage={(s: string[]) => setImages(s)}
          />
        )}
        <div className="mt-14 max-lg:mt-4 h-[380px] py-2 flex flex-col">
          {images.find((obj) => obj !== '') ? (
            <img
              className="h-[200px] mx-auto"
              src={
                !changeProduct
                  ? URL.createObjectURL(images.find((obj) => obj !== '') as Blob)
                  : 'https://0606.store/' + String(images.find((obj) => obj))
              }
            />
          ) : (
            <div className="h-[200px] items-center justify-center flex">
              <ShoppingCart size={92} strokeWidth={1.5} />
            </div>
          )}
          <h1 className="mt-4 flex-1 text-center px-4 line-clamp-3 overflow-hidden">
            {form.getValues('title') || 'Название'}
          </h1>
          <span className="text-center text-lg font-medium">
            <CurrencyToPrice
              oldPrice={Number(form.getValues('oldPrice')) || null}
              price={Number(form.getValues('price') || '')}
            />
          </span>
          <div className="flex justify-center mt-2 gap-2">
            <AddProductButton
              count={1}
              disabled
              id={0}
              className="w-[120px] text-sm"
              reduction={true}
            />
            {formProduct === 'wb' && (
              <Button disabled className="px-2" variant="outline">
                <WbIcon />
              </Button>
            )}
          </div>
        </div>
        {(charact.filter((obj) => obj.name && obj.type).length > 0 ||
          form.getValues('description')) && (
          <ModalProductDescription
            Characteristics={charact}
            description={form.getValues('description') ?? ''}
            className="mx-auto"
            count={1}
            id={0}
            price={Number(form.getValues('price') || '')}
          />
        )}
      </div>
    </div>
  )
}
