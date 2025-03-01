import { OrderItems } from '@/components/shared/Profile/order-items'
import { ProfileHeaderNavigationBar } from '@/components/shared/Profile/profile-header-navigation-bar'
import { Container } from '@/components/ui/container'
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'
import { PackageOpen } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Мои заказы | 0606',
}

export default async function Orders() {
  const session = await getUserSession()

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <Container className={!orders.length ? 'flex flex-col grow' : ''}>
      <ProfileHeaderNavigationBar id={2} />
      {orders.length ? (
        <div className="mt-5"></div>
      ) : (
        <div className="justify-center my-auto flex gap-1 items-center md:text-lg">
          У вас ещё нету заказов | <PackageOpen strokeWidth={1.5} className="md:size-7" />
        </div>
      )}
      {orders?.map((obj, i) => <OrderItems key={obj.id} {...obj} i={i} />)}
    </Container>
  )
}
