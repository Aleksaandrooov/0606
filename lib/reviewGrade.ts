import { OrdersInter } from '@/app/services/dto/ordersDto';
import { ReviewsCalc } from './reviews-calc';

export const reviewGrade = (item?: OrdersInter) => {
  const itemsReviews = item ? ReviewsCalc(item) : undefined;
  const reviewsGrade = item?.data.countArchive
    ? Number(
        (
          item.data.feedbacks.reduce((sum, curr) => {
            return sum + curr.productValuation;
          }, 0) / item.data.countArchive
        ).toFixed(2),
      )
    : undefined;

  const countReviews = itemsReviews?.reduce((sum, acc) => {
    return sum + acc.count;
  }, 0);

  return { reviewsGrade, countReviews, itemsReviews };
};
