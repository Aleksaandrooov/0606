import { ProfileHeaderNavigationBar } from '@/components/shared/Profile/profile-header-navigation-bar'
import { ProfileSetting } from '@/components/shared/Profile/profile-setting'
import { Container } from '@/components/ui/container'
import { getUserSession } from '@/lib/get-user-session'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Профиль | 0606',
}

export default async function Page() {
  const session = await getUserSession()

  return (
    <Container>
      <ProfileHeaderNavigationBar id={1} />
      <ProfileSetting user={session!} />
    </Container>
  )
}
