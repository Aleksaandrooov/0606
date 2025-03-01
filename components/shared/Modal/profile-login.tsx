'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChevronLeft, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import { SendMailProfile } from './sendMail'
import { VerifiedMail } from './verifiedMail'

export const ProfileLogin = () => {
  const [open, isOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <Dialog open={open} onOpenChange={(bool) => isOpen(bool)}>
      <DialogTrigger asChild>
        <Button size="sm" className="px-2" variant="ghost">
          <UserRoundPlus strokeWidth={1.5} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[380px] max-sm:w-full flex max-sm:items-center max-sm:h-full py-8 overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {!email ? (
              'Вход | Регистрация'
            ) : (
              <Button variant="outline" className="gap-1 px-3" onClick={() => setEmail('')}>
                <ChevronLeft size={18} /> Назад
              </Button>
            )}
          </DialogTitle>
          {!email ? (
            <SendMailProfile
              email={email}
              onSubmitEmail={(email: string) => setEmail(email)}
              modalChange={(bool) => isOpen(bool)}
            />
          ) : (
            <VerifiedMail
              clearEmail={() => setEmail('')}
              modalChange={(bool) => isOpen(bool)}
              email={email}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
