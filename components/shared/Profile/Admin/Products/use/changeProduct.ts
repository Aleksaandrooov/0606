import { useState } from 'react'
import { charactInter, nameValueForm, sizesInter } from '../../../dto'
import { sizeType } from '../product-sizes-array'

export const ChangeProduct = (formProduct: nameValueForm) => {
  const defaultSizes = { techSize: '', wbSize: '', price: undefined, quntity: undefined }

  const [images, setImages] = useState<(File | string)[]>([])
  const [charact, setCharact] = useState<charactInter[]>([])
  const [sizes, setSizes] = useState<sizesInter[]>([defaultSizes])

  console.log(sizes)

  const changeSize = (t: sizeType, s: string, i: number) => {
    setSizes((prev) => {
      const updateCharact = [...prev]
      if (!updateCharact[i + 1]) {
        updateCharact.push(defaultSizes)
      }

      if (t === 'price' || t === 'quntity') {
        updateCharact[i][t] = s
      } else {
        updateCharact[i][t] = s
      }

      return updateCharact
    })
  }

  const handleFileChange = (file: File | null) => {
    setImages((prev) => {
      const updatedImages = [...prev]
      if (file) {
        updatedImages.push(file)
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

  return {
    changeCharact,
    handleFileChange,
    changeSize,
    charact,
    sizes,
    images,
    setSizes,
    setImages,
    setCharact,
  }
}
