import { ReviewStar } from '@/lib/Components/reviewStar';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { OrdersInter } from '@/app/services/dto/ordersDto';
import { DateArray } from '@/lib/Array/date';

export const SwiperReviews = ({ items }: { items?: OrdersInter['data']['feedbacks'] }) => {
  return (
    <Swiper
      spaceBetween={10}
      breakpoints={{
        800: {
          slidesPerView: 3,
        },
        500: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full">
      {items
        ?.filter((obj) => obj.pros || obj.text)
        .map((obj) => (
          <SwiperSlide key={obj.id}>
            <div className="h-32 overflow-auto scroll__hidden border bg-neutral-800/40 rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <h1>
                  <span className="font-bold">{obj.userName || 'Покупатель'}</span>{' '}
                  <span className="text-neutral-400 text-nowrap max-sm:text-xs">
                    {new Date(obj.createdDate).getDate()}{' '}
                    {DateArray(new Date(obj.createdDate).getMonth())}
                  </span>
                </h1>
                <ReviewStar className="size-4 max-sm:size-3" grade={obj.productValuation} />
              </div>
              <div className="flex mt-2 gap-1">
                <div className="flex-1">
                  {obj.pros && (
                    <div className="mb-2">
                      <h1 className="font-bold">Достоинства: </h1>
                      <span className="max-sm:text-xs">{obj.pros}</span>
                    </div>
                  )}
                  {obj.text && (
                    <div>
                      <h1 className="font-bold">Комментарий:</h1>
                      <span className="max-sm:text-xs">{obj.text}</span>
                    </div>
                  )}
                </div>
                {obj.photoLinks?.length > 0 && (
                  <img className="max-w-[50px] h-full" src={obj.photoLinks[0].miniSize} />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
