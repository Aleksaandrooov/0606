import { Currency } from '@prisma/client';
import { axiosInstance } from './instance';

export const fetchCurrency = async (): Promise<Currency[]> => {
  return (await axiosInstance.get<Currency[]>('currency')).data;
};
