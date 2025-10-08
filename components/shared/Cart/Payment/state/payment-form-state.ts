import { Api } from '@/app/services/ApiClient'
import { paymentSchema, TFormPayment } from '@/lib/formInpit/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const PaymentFormState = () => {
  const [user, isUser] = useState<User>()

  const form = useForm<TFormPayment>({
    resolver: zodResolver(paymentSchema),
  })
  useEffect(() => {
    async function getUser() {
      const data = await Api.me.fetchAuthMe()
      form.reset({
        name: data?.name || '',
        surname: data?.surname || '',
        patronymic: data?.patronymic || '',
        number: data?.number || '',
      })
      isUser(data)
    }
    getUser()
  }, [])

  return {
    user,
    form,
  }
}
