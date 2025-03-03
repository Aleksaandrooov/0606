'use client'

import React, { useState } from 'react'
import { SettingItem } from './setting-item'
import {
  settingNameSchema,
  settingNumberSchema,
  settingPatronymicSchema,
  settingSurnameSchema,
} from '@/lib/formInpit/schema'
import { ZodType } from 'zod'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { CalendarPlus2, Trash2 } from 'lucide-react'
import { deleteSettingProfile } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { nameType } from './dto'

interface Props {
  user: User
}

const profileSettingArray: { name: nameType; label: string; type: ZodType }[] = [
  { name: 'name', label: 'Имя', type: settingNameSchema },
  { name: 'surname', label: 'Фамилия', type: settingSurnameSchema },
  { name: 'patronymic', label: 'Отчество', type: settingPatronymicSchema },
  { name: 'number', label: 'Телефон', type: settingNumberSchema },
]

export const ProfileSetting: React.FC<Props> = ({ user }) => {
  const router = useRouter()
  const [disabled, isDisabled] = useState(false)
  const deleteSetting = () => {
    isDisabled(true)
    deleteSettingProfile(user.email).then(() => isDisabled(false))
    router.refresh()
  }

  return (
    <div className="mb-10">
      <div className="mt-5 lg:border rounded-lg lg:p-5">
        <h1 className="text-lg mb-5">Профиль</h1>
        <div className="grid lg:grid-cols-2 gap-3">
          {profileSettingArray.map((obj, i) => (
            <SettingItem
              router={router}
              key={i}
              clear={disabled}
              {...obj}
              defaultValue={user[obj.name] as string}
              email={user.email}
            />
          ))}
        </div>
        <Button
          disabled={disabled}
          className="mt-4"
          variant="outline"
          onClick={() => deleteSetting()}
        >
          Сбросить <Trash2 size={18} />
        </Button>
      </div>
      <div className="mt-3 border rounded-lg p-3 w-min text-nowrap">
        <h1 className="flex gap-2 items-center max-sm:text-sm">
          Дата регистрации <CalendarPlus2 size={18} className="max-sm:size-4" />
        </h1>
        <span className="text-neutral-400 text-sm max-sm:text-xs">
          {user.createdAt.getDate() < 10 ? 0 : ''}
          {user.createdAt.getDate()}.{user.createdAt.getMonth() + 1 <= 9 ? 0 : ''}
          {user.createdAt.getMonth() + 1}.{user.createdAt.getFullYear()}
        </span>
      </div>
    </div>
  )
}
