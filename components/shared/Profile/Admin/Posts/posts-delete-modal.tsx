import { deletePost } from '@/app/admin'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Post } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
  posts: Post[]
}

export const PostsDeleteModal: React.FC<Props> = ({ posts }) => {
  const findIdPost = String(posts.find((obj) => obj)?.id)
  const [value, isValue] = useState(findIdPost)
  const router = useRouter()

  const onDeletePost = async () => {
    await deletePost(Number(value)).then(() => router.refresh())
    isValue(findIdPost)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:w-full max-sm:h-full">
        <DialogTitle>Удаление поста</DialogTitle>
        <div className="">
          <Select value={value} onValueChange={(id) => isValue(id)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {posts.map((obj) => (
                <SelectItem key={obj.id} value={String(obj.id)}>
                  {obj.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogClose asChild>
            <Button
              onClick={() => onDeletePost()}
              disabled={!value}
              variant="destructive"
              className="w-[120px] mt-3"
            >
              Удалить
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
