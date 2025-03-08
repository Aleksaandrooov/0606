'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ReviewStar } from '@/lib/Components/reviewStar'
import { reviewGrade } from '@/lib/reviewGrade'
import React, { useEffect, useState } from 'react'
import { SwiperReviews } from './swiper-reviews'
import { Api } from '@/app/services/ApiClient'
import { OrdersInter } from '@/app/services/dto/ordersDto'
import { SquarePen } from 'lucide-react'
import Link from 'next/link'
import { LoadingOrders } from '@/lib/Components/loading-orders'

export const ProductBottom = ({ article }: { article: string | null }) => {
  const [orders, setOrders] = useState<OrdersInter>()
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    isLoading(true)
    try {
      async function fetch() {
        const data = await Api.orders.OrdersFetch(Number(article))
        setOrders(data)
        isLoading(false)
      }
      fetch()
    } catch (error) {
      console.log(error)
      isLoading(false)
    }
  }, [])

  const { countReviews, reviewsGrade, itemsReviews } = reviewGrade(orders)

  return (
    <div className="mb-10">
      <Button variant="secondary">Отзывы</Button>
      <div className="flex gap-5 mt-10 max-lg:flex-col">
        {!loading && orders?.data && orders?.data.countArchive > 0 ? (
          <div className="lg:border-r lg:pr-5">
            <div className="flex gap-3 items-center">
              <h1 className="text-4xl">{reviewsGrade}</h1>
              <div>
                <ReviewStar className="size-6" grade={reviewsGrade} />
                <span className="text-sm text-neutral-400">{countReviews} отзывов</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:max-w-[320px] mt-2">
              {itemsReviews
                ?.sort((a, b) => b.grade - a.grade)
                .map((obj, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm">
                    <h1>{obj.grade}</h1>
                    <Progress value={(obj.count / countReviews!) * 100} className="h-1" />
                  </div>
                ))}
            </div>
          </div>
        ) : !loading ? (
          <div className="flex-1 flex-col flex items-center gap-1 max-sm:items-stretch">
            <div className="flex items-center gap-3 max-sm:gap-2 max-sm:justify-between">
              <h1>Отзывов пока нет</h1>
              <div className="border-r h-full max-sm:hidden"></div>
              <Link href={'https://www.wildberries.ru/catalog/' + article + '/detail.aspx'}>
                <Button variant="outline" className="gap-1">
                  Написать отзыв <SquarePen size={16} />
                </Button>
              </Link>
            </div>
            <span className="text-sm max-sm:text-xs text-neutral-400 text-center">
              Поделитесь мнением о покупке и помогите другим покупателям сделать выбор
            </span>
          </div>
        ) : (
          <LoadingOrders />
        )}
        {orders && orders?.data.countArchive > 0 && (
          <SwiperReviews items={orders?.data.feedbacks} />
        )}
      </div>
    </div>
  )
}
