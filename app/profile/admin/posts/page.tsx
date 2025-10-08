import NotFound from '@/app/not-found'
import { PostsClient } from '@/components/shared/Profile/Admin/Posts/posts-client'
import { ProfileHeaderNavigationBar } from '@/components/shared/Profile/profile-header-navigation-bar'
import { Container } from '@/components/ui/container'
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'

export default async function Posts() {
  const user = await getUserSession()

  if (user?.role !== 'ADMIN') {
    return <NotFound />
  }

  const posts = await prisma.post.findMany()

  return (
    <Container>
      <ProfileHeaderNavigationBar id={5} role={user.role} />
      <div className="my-6">
        <PostsClient posts={posts} />
      </div>
    </Container>
  )
}
