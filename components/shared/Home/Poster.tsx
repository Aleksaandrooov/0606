'use client'

import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { WbIcon } from '@/lib/Components/wb'
import { currencyStore } from '@/zustand/currency-store'
import { currencySimvol } from '@/lib/Array/currency-simvol'
import { Post } from '@prisma/client'

export const Poster = ({ posts }: { posts: Post[] }) => {
  const { currency, currencyValue } = currencyStore()

  return (
    <Swiper
      speed={1000}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      // autoplay={{
      //   delay: 3000,
      //   disableOnInteraction: false,
      // }}
      modules={[Pagination, Autoplay]}
      className="mySwiper1 w-full"
    >
      {posts.map((obj) => (
        <SwiperSlide key={obj.id} className="my-auto px-2">
          <div className="flex justify-around items-center pb-10">
            <div className="max-w-[400px]">
              <h1 className="text-2xl max-lg:text-xl max-md:text-base max-sm:text-sm">
                {obj.title}
                {obj.price
                  ? ' | ' + Math.round((obj.price * (currency[currencyValue] as number)) / 10) * 10
                  : ''}
                {obj.price
                  ? ' ' + currencySimvol.find((obj) => obj.name === currencyValue)?.format
                  : ''}
              </h1>
              <span className="text-neutral-400 max-lg:text-sm max-sm:text-xs">{obj.text}</span>
              <div className="flex gap-1 mt-4 max-lg:mt-2 items-center">
                {obj.buttonUrl && obj.buttonText && (
                  <Link href={obj.buttonUrl}>
                    <Button
                      variant="outline"
                      className="flex gap-1 max-md:text-xs max-md:px-3 max-md:h-8"
                    >
                      {obj.buttonText}
                      <ChevronRight size={18} />
                    </Button>
                  </Link>
                )}
                {obj.wbUrl && (
                  <Link href={obj.wbUrl}>
                    <Button variant="outline" className="px-3 max-md:h-8">
                      <WbIcon />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <Link href={obj.buttonUrl || obj.wbUrl || ''}>
              <img
                className="max-h-[600px] my-auto max-xl:max-h-[500px] max-lg:max-h-[400px] max-md:max-h-[300px] max-md:max-w-[250px] max-sm:max-w-[200px] max-sm:max-h-[250px]"
                src={'https://0606.store/' + obj.img}
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
