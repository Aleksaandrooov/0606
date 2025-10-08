'use client'

import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ModalCart } from '../Modal/modal-cart'
import { ProfileLogin } from '../Modal/profile-login'
import { useSession } from 'next-auth/react'
import { ProfileHeader } from './profileHeader'
import { cn } from '@/lib/utils'

export const HeaderButtons = ({ className }: { className?: string }) => {
  const { data: session } = useSession()

  return (
    <div className={cn('flex gap-2', className)}>
      <Link href="/catalog">
        <Button size="sm" className="px-2" variant="ghost">
          <List strokeWidth={1.5} />
        </Button>
      </Link>
      <ModalCart />
      {!session ? <ProfileLogin /> : <ProfileHeader />}
    </div>
  )
}
