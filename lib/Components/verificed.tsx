import { Tailwind } from '@react-email/components'
import React from 'react'

export function Verificed({ code }: { code: string }): React.ReactElement {
  return (
    <Tailwind>
      <div className="mb-2 py-3 bg-accent px-4 rounded-md text-center text-lg">
        Ваш код: <strong>{code}</strong>
      </div>
      <div className="text-center">Введите эти цифры на экране входа или регистрации</div>
      <div className="my-2 pb-2">
        <h2>Важно!</h2>
        <div>
          В целях безопасности никому не пересылайте это письмо и не сообщайте код подтверждения.
        </div>
      </div>
      <div className="flex justify-end">
        <span>
          С уважением от команды <strong>0606</strong>
        </span>
      </div>
    </Tailwind>
  )
}
