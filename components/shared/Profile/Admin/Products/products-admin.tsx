'use client'

import { Button } from '@/components/ui/button'
import { AddProductButton } from '@/lib/Components/add-product-button'
import { CurrencyToPrice } from '@/lib/currency-to-price'
import { WbIcon } from '@/lib/Components/wb'
import React, { useState } from 'react'
import { ProductEditor } from './product-editor'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShoppingCart } from 'lucide-react'
import { ModalProductDescription } from '@/components/shared/Modal/modal-product-description'
import { nameValueForm } from '../../dto'
import { Characteristics, Product, Size } from '@prisma/client'
import { ProductSelectEditor } from './product-select-editor'
import {
  productEditorDefaultSchema,
  productEditorSchema,
  TFormProductEditor,
} from '@/lib/formInpit/schema'
import { ChangeProduct } from './use/changeProduct'

export const ProductsAdmin = ({
  product,
}: {
  product: (Product & { characteristics: Characteristics[]; size: Size[] })[]
}) => {
  const defaultSizes = { techSize: '', wbSize: '', price: undefined, quntity: undefined }
  const [formProduct, isFormProduct] = useState<nameValueForm>('default')
  const [changeProduct, isChangeProduct] = useState<number | undefined>(undefined)
  const form = useForm<TFormProductEditor>({
    resolver: zodResolver(
      formProduct === 'default' ? productEditorDefaultSchema : productEditorSchema,
    ),
  })
  const {
    changeCharact,
    changeSize,
    handleFileChange,
    setSizes,
    setImages,
    setCharact,
    images,
    sizes,
    charact,
  } = ChangeProduct(formProduct)

  return (
    <div className="flex mt-5 max-lg:flex-col items-center max-lg:gap-10 justify-around mb-5">
      <ProductEditor
        isChangeProduct={(t) => isChangeProduct(t)}
        changeProduct={changeProduct}
        changeForm={(s) => isFormProduct(s)}
        valueForm={formProduct}
        charact={charact}
        changeSize={(t, s, i) => changeSize(t, s, i)}
        clearSize={() => setSizes([defaultSizes])}
        sizes={sizes}
        changeCharact={(t, e, i, id) => changeCharact(t, e, i, id)}
        clearCharact={() => setCharact([])}
        clearImage={() => setImages([])}
        images={images}
        changeImages={(e) => handleFileChange(e)}
        form={form}
      />
      <div className="w-[340px]">
        {formProduct === 'default' && (
          <ProductSelectEditor
            changeSizes={(data) => setSizes(data)}
            clearSize={() => setSizes([defaultSizes])}
            pushSize={() =>
              setSizes((prev) => {
                const update = [...prev]
                update.push(defaultSizes)
                return update
              })
            }
            changeProduct={(e) => isChangeProduct(e)}
            productValue={changeProduct}
            form={form}
            changeCharact={(data) => setCharact(data)}
            product={product}
            setImage={(data) => setImages(data)}
          />
        )}
        <div className="mt-14 max-lg:mt-4 h-[380px] py-2 flex flex-col">
          {images.find((obj) => obj !== '') ? (
            <img
              className="h-[200px] object-cover mx-auto"
              src={URL.createObjectURL(images.find((obj) => obj !== '') as Blob)}
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
              size={0}
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
            selectSize={null}
            Characteristics={charact}
            description={form.getValues('description') ?? ''}
            className="mx-auto"
            id={0}
            price={Number(form.getValues('price') || '')}
          />
        )}
      </div>
    </div>
  )
}
