import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export const fetchAuthMe = async () => {
  return (await axiosInstance.get<User>('/auth/me')).data;
};
