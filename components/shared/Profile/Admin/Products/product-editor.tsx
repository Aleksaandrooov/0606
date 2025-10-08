import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormInput } from '@/lib/formInpit/formInput'
import { TFormProductEditor, TFormProductEditorDefault } from '@/lib/formInpit/schema'
import React, { useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { ProductsCharact } from './products-charact'
import { ProductSizesArray, sizeType } from './product-sizes-array'
import { ProductFetch } from './product-fetch'
import { ProductItemSearch } from './product-item-search'
import { charactInter, nameValueForm, sizesInter } from '../../dto'
import { createProduct, deleteProduct, editProduct } from '@/app/admin'
import { ProductSelectForm } from './product-select-form'
import { formReset } from './form-reset'
import { useRouter } from 'next/navigation'

interface Props {
  form: UseFormReturn<TFormProductEditor>
  changeImages: (e: File | null) => void
  images: (File | string)[]
  charact: charactInter[]
  changeCharact: (t: 'name' | 'type', e: string, i: number, id?: number) => void
  changeSize: (t: sizeType, s: string, i: number) => void
  clearCharact: () => void
  clearImage: () => void
  changeForm: (s: nameValueForm) => void
  valueForm: nameValueForm
  isChangeProduct: (t: number | undefined) => void
  changeProduct: number | undefined
  sizes: sizesInter[]
  clearSize: () => void
}

export const ProductEditor: React.FC<Props> = ({
  form,
  isChangeProduct,
  changeImages,
  images,
  sizes,
  charact,
  changeCharact,
  clearCharact,
  changeForm,
  valueForm,
  changeProduct,
  clearImage,
  changeSize,
  clearSize,
}) => {
  const [focus, setFocus] = useState(false)
  const itemsSearch = form.getValues('item')
  const formSelect = valueForm === 'wb'
  const { characs, items } = ProductFetch(focus, itemsSearch, clearCharact, formSelect)
  const router = useRouter()

  const onSubmit = async (data: TFormProductEditor | TFormProductEditorDefault) => {
    if (formSelect ? characs.data.find((obj) => obj)?.subjectName === itemsSearch : true) {
      if (!changeProduct) {
        await createProduct(data, sizes, charact, images as File[]).then(() => {
          clearCharact()
          clearImage()
          clearSize()
          formReset(form)
          router.refresh()
        })
      } else if (!('item' in data)) {
        await editProduct(data, charact, changeProduct, sizes, images as File[]).then(() => {
          clearCharact()
          formReset(form)
          clearImage()
          clearSize()
          isChangeProduct(undefined)
          router.refresh()
        })
      }
    }
  }

  return (
    <div className="flex-1 max-w-[600px] w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Добавление товара</h1>
        <ProductSelectForm
          changeProduct={changeProduct}
          clearCharact={() => clearCharact()}
          changeValue={(e) => changeForm(e)}
          value={valueForm}
        />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col flex gap-3 mx-auto mt-10">
          <FormInput name="title" label="Название" />
          {formSelect && <FormInput name="brand" label="Бренд" />}
          {formSelect && (
            <ProductItemSearch
              characs={characs}
              items={items}
              setFocus={(b) => setFocus(b)}
              focus={focus}
              form={form}
              itemsSearch={itemsSearch}
            />
          )}
          <div className="border p-3 rounded-md flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Фото</h1>
              {images.length > 0 && (
                <Button onClick={() => clearImage()} size="sm" variant="outline">
                  Очистить
                </Button>
              )}
            </div>
            <Input
              key={String(images)}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null
                changeImages(selectedFile)
              }}
              type="file"
            />
            {images.map((obj, i) => (
              <div key={i} className="flex gap-2 justify-between mx-2 items-center">
                <h2>{(obj as File).name}</h2>
                <img className="max-w-[50px] max-h-[50px]" src={URL.createObjectURL(obj as File)} />
              </div>
            ))}
          </div>
          {!formSelect && <FormInput name="article" label="Артикул (wb)" />}
          <div className="border p-3 rounded-md flex flex-col gap-3">
            <h1 className="text-sm">Габариты упаковки товара</h1>
            <FormInput name="length" label="Длина, см" />
            <FormInput name="width" label="Ширина, см" />
            <FormInput name="height" label="Высота, см" />
            <FormInput name="weight" label="Вес, гр" />
          </div>
          <div className="border p-3 rounded-md flex flex-col gap-3">
            <h1 className="text-sm">Размеры товара</h1>
            {sizes?.map((_, i) => (
              <ProductSizesArray
                formSelect={formSelect}
                size={sizes.find((_, index) => i === index)}
                changeSize={(t, s, i) => changeSize(t, s, i)}
                key={i}
                i={i}
              />
            ))}
          </div>
          <FormInput name="oldPrice" label="Цена без скидки (для сайта)" />
          <FormInput name="price" label="Цена (для сайта)" />
          {[...Array(charact.length + 1)]?.map((_, i) => (
            <ProductsCharact
              formSelect={formSelect}
              key={i}
              characs={characs}
              charact={charact}
              itemsSearch={itemsSearch}
              i={i}
              changeCharact={(t, e, i, id) => changeCharact(t, e, i, id)}
            />
          ))}
          <FormInput name="description" label="Описание" />
          <div className="flex gap-2">
            <Button type="submit" variant="outline" className="w-min">
              {changeProduct ? 'Изменить' : 'Добавить'}
            </Button>
            {changeProduct && (
              <Button
                onClick={() => {
                  deleteProduct(changeProduct).then(() => {
                    formReset(form)
                    clearCharact()
                    isChangeProduct(undefined)
                    router.refresh()
                    clearSize()
                    clearImage()
                  })
                }}
                type="button"
                variant="destructive"
                className="w-min"
              >
                Удалить
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
