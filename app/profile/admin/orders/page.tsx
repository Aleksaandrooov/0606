import { OrderAdmin } from '@/components/shared/Profile/Admin/Orders/order-admin'
import { ProfileHeaderNavigationBar } from '@/components/shared/Profile/profile-header-navigation-bar'
import { Container } from '@/components/ui/container'
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'
import NotFound from '../../../not-found'

export default async function Page() {
  const user = await getUserSession()

  if (user?.role !== 'ADMIN') {
    return <NotFound />
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <Container>
      <ProfileHeaderNavigationBar id={3} role={user?.role} />
      <OrderAdmin Orders={orders} />
    </Container>
  )
}
