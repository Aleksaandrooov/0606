import { Items } from '@/components/shared/Home/Items'
import { Poster } from '@/components/shared/Home/Poster'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
  const posts = await prisma.post.findMany()

  return (
    <div className="flex flex-col grow">
      <Poster posts={posts} />
      <Items />
    </div>
  )
}

export const dynamic = 'force-dynamic'
