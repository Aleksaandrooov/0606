import { z } from 'zod'

export const ProfileLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
})

export const settingNameSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
})
export const settingSurnameSchema = z.object({
  surname: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
})
export const settingPatronymicSchema = z.object({
  patronymic: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
})
export const settingNumberSchema = z.object({
  number: z.string().min(9, { message: 'Введите корректный номер' }).max(10),
})

export const deliverySchema = z.object({
  address: z
    .string()
    .min(5, { message: 'Укажите коректный адрес' })
    .max(200, { message: 'Не более 200 символов' }),
  entrance: z
    .string()
    .min(1, { message: 'Заполните поле' })
    .max(3, { message: 'Не более 3 символов' }),
  floor: z
    .string()
    .min(1, { message: 'Заполните поле' })
    .max(3, { message: 'Не более 3 символов' }),
  flat: z.string().min(1, { message: 'Заполните поле' }).max(4, { message: 'Не более 4 символов' }),
})

export const deliveryPointSchema = z.object({
  pointOfIssue: z
    .string()
    .min(5, { message: 'Укажите коректный пункт выдачи' })
    .max(200, { message: 'Не более 200 символов' }),
})

export const paymentSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  name: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
  surname: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
  patronymic: z
    .string()
    .min(2, { message: 'Заполните поле' })
    .max(30, { message: 'Не более 30 символов' }),
  number: z.string().min(9, { message: 'Введите корректный номер' }).max(10),
})

export const productEditorSchema = z.object({
  brand: z.string().min(1, { message: 'Заполните поле' }),
  title: z.string().min(1, { message: 'Заполните поле' }),
  article: z.string().optional(),
  oldPrice: z.string().optional(),
  price: z.string().min(1, { message: 'Заполните поле' }),
  item: z.string().min(1, { message: 'Заполните поле' }),
  description: z
    .string()
    .min(1000, { message: 'Минимум 1000 символов' })
    .max(5000, { message: 'Максимум 5000 символов' }),
  quntity: z.string().min(1, { message: 'Заполните поле' }),
  length: z.string().min(1, { message: 'Заполните поле' }),
  width: z.string().min(1, { message: 'Заполните поле' }),
  height: z.string().min(1, { message: 'Заполните поле' }),
  weight: z.string().min(1, { message: 'Заполните поле' }),
})

export const productEditorDefaultSchema = z.object({
  title: z.string().min(1, { message: 'Заполните поле' }),
  price: z.string().min(1, { message: 'Заполните поле' }),
  oldPrice: z.string().optional(),
  quntity: z.string().min(1, { message: 'Заполните поле' }),
  description: z.string().optional(),
  article: z.string().optional(),
  length: z.string().min(1, { message: 'Заполните поле' }),
  width: z.string().min(1, { message: 'Заполните поле' }),
  height: z.string().min(1, { message: 'Заполните поле' }),
  weight: z.string().min(1, { message: 'Заполните поле' }),
})

export const postAddSchema = z.object({
  title: z.string().min(1, { message: 'Заполните поле' }),
  img: z.custom<FileList>((val) => val.length > 0, { message: 'Добавьте фото' }),
  price: z.string().optional(),
  text: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  wbUrl: z.string().optional(),
})

export type TFormProfileLogin = z.infer<typeof ProfileLoginSchema>
export type TFromSettingName = z.infer<typeof settingNameSchema>
export type TFromSettingSurname = z.infer<typeof settingSurnameSchema>
export type TFromSettingPatronymic = z.infer<typeof settingPatronymicSchema>
export type TFromSettingNumber = z.infer<typeof settingNumberSchema>
export type TFormDeliveryAddress = z.infer<typeof deliverySchema>
export type TFormDeliveryPoint = z.infer<typeof deliveryPointSchema>
export type TFormPayment = z.infer<typeof paymentSchema>
export type TFormProductEditor = z.infer<typeof productEditorSchema>
export type TFormProductEditorDefault = z.infer<typeof productEditorDefaultSchema>
export type TFormPostAdd = z.infer<typeof postAddSchema>
