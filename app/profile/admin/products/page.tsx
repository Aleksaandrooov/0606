import NotFound from '@/app/not-found'
import { ProductsAdmin } from '@/components/shared/Profile/Admin/Products/products-admin'
import { ProfileHeaderNavigationBar } from '@/components/shared/Profile/profile-header-navigation-bar'
import { Container } from '@/components/ui/container'
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'

export default async function Products() {
  const user = await getUserSession()

  if (user?.role !== 'ADMIN') {
    return <NotFound />
  }

  const product = await prisma.product.findMany({
    include: {
      characteristics: true,
      size: true,
    },
  })

  return (
    <Container>
      <ProfileHeaderNavigationBar id={4} role={user?.role} />
      <ProductsAdmin product={product} />
    </Container>
  )
}
