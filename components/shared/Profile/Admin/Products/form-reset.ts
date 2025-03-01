import { TFormProductEditor } from '@/lib/formInpit/schema'
import { UseFormReturn } from 'react-hook-form'

export const formReset = (form: UseFormReturn<TFormProductEditor>) => {
  form.reset({
    title: '',
    brand: '',
    item: '',
    length: '',
    oldPrice: '',
    width: '',
    height: '',
    price: '',
    quntity: '',
    description: '',
    article: '',
  })
}
