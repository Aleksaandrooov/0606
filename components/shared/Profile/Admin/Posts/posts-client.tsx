'use client'

import { addPost } from '@/app/admin'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/lib/formInpit/formInput'
import { postAddSchema, TFormPostAdd } from '@/lib/formInpit/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { PostsDeleteModal } from './posts-delete-modal'
import { Post } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
  posts: Post[]
}

export const PostsClient: React.FC<Props> = ({ posts }) => {
  const router = useRouter()
  const form = useForm<TFormPostAdd>({
    resolver: zodResolver(postAddSchema),
  })

  const onSubmit = async (data: TFormPostAdd) => {
    await addPost(data).then(() =>
      form.reset({
        title: '',
        price: '',
        text: '',
        buttonText: '',
        buttonUrl: '',
        wbUrl: '',
      }),
    )
    form.setValue('img', null!)
    router.refresh()
  }

  return (
    <div className="flex justify-around max-lg:flex-col items-center">
      <div className="max-w-[500px] w-full">
        <h2 className="text-xl mb-3">Создание поста</h2>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormInput name="title" label="Название" />
            <FormInput name="img" type="file" />
            <FormInput name="price" label="Цена (Необязательно)" />
            <FormInput name="text" label="Описание (Необязательно)" />
            <FormInput name="buttonText" label="Текст кнопки (Необязательно)" />
            <FormInput name="buttonUrl" label="Ссылка кнопки (Необязательно)" />
            <FormInput name="wbUrl" label="Ссылка на wb (Необязательно)" />
            <div className="flex gap-3">
              <Button variant="secondary" className="w-[120px]">
                Создать
              </Button>
              {posts.length > 0 && <PostsDeleteModal posts={posts} />}
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="h-[400px] w-[400px] flex justify-center items-center">
        {form.getValues('img')?.length > 0 ? (
          <img src={URL.createObjectURL(form.getValues('img')[0])} />
        ) : (
          <Image />
        )}
      </div>
    </div>
  )
}
