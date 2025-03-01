import { axiosInstance } from './instance';
import { cartType, patchCartType } from './dto/cartTypes';

export const fetchCart = async (): Promise<cartType> => {
  return (await axiosInstance.get<cartType>('/cart')).data;
};
export const postCart = async (id: number): Promise<cartType> => {
  return (await axiosInstance.post<cartType>('/cart', id)).data;
};
export const updateCart = async ({ type, id }: patchCartType): Promise<cartType> => {
  return (await axiosInstance.patch<cartType>('/cart', { type, id })).data;
};
