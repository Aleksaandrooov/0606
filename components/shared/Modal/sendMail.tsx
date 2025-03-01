import { sendEmail } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/lib/formInpit/formInput'
import { ProfileLoginSchema, TFormProfileLogin } from '@/lib/formInpit/schema'
import { cn } from '@/lib/utils'
import { YandexLogo } from '@/lib/Components/YandexLogo'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  onSubmitEmail: (email: string) => void
  modalChange: (bool: boolean) => void
  email: string
}

export const SendMailProfile: React.FC<Props> = ({ onSubmitEmail, modalChange, email }) => {
  const [loading, isLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(ProfileLoginSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: TFormProfileLogin) => {
    try {
      isLoading(true)
      sendEmail(data.email).then(() => {
        onSubmitEmail(data.email)
        isLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 transition-all',
        email ? '-translate-x-80 opacity-0' : '',
      )}
    >
      <FormProvider {...form}>
        <form className="pt-5 flex flex-col px-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="Почта" />
          <Button variant="outline" className="mt-5" loading={loading}>
            Получить код <Send size={18} strokeWidth={1.5} />
          </Button>
          <Button
            onClick={() => signIn('yandex', { redirect: false })}
            disabled={loading}
            type="button"
            variant="outline"
            className="mt-2"
          >
            <div className="flex h-full rounded-full justify-center items-center bg-red-500">
              <YandexLogo className="h-full fill-white" />
            </div>
            Войти через Яндекс
          </Button>
        </form>
      </FormProvider>
      <span className="text-xs text-neutral-400 px-2 pt-1">
        Нажимая кнопку «Получить код», вы соглашаетесь с{' '}
        <Link onClick={() => modalChange(false)} href="/information/company" className="text-white">
          политикой конфиденциальности
        </Link>{' '}
        и условиями{' '}
        <Link onClick={() => modalChange(false)} href="/information/company" className="text-white">
          оферты
        </Link>
      </span>
    </div>
  )
}
