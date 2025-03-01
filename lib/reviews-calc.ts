// import { ReviewsItem } from '@prisma/client';

import { OrdersInter } from '@/app/services/dto/ordersDto';

export const ReviewsCalc = (items: OrdersInter) => {
  return items.data.feedbacks.reduce((sum: { count: number; grade: number }[], acc) => {
    const index = sum.findIndex((obj) => obj.grade == acc.productValuation);
    if (index !== -1) {
      sum[index].count++;
    } else {
      sum.push({ count: 1, grade: acc.productValuation });
    }
    return sum;
  }, []);
};
