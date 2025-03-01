import { OrdersInter } from './dto/ordersDto';
import { axiosInstance } from './instance';

export const OrdersFetch = async (id: number) => {
  return (await axiosInstance.get<OrdersInter>('orders', { params: { id } })).data;
};
