import { charactInter, itemsInter } from './dto/adminSearchDto';
import { axiosInstance } from './instance';

export const searchFetchItems = async (query: string) => {
  return (await axiosInstance.get<itemsInter>('/admin/items', { params: { query } })).data;
};

export const seatchFetchCharact = async (query: string) => {
  return (await axiosInstance.get<charactInter>('/admin/charact', { params: { query } })).data;
};
