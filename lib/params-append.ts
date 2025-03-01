import { ReadonlyURLSearchParams } from 'next/navigation';

export const paramsAppend = (
  params: ReadonlyURLSearchParams,
  title: string,
  titleTwo?: string,
  titleThree?: string,
) => {
  const newSearchParams = new URLSearchParams();
  params.forEach((value, key) => {
    if (key !== title && key !== titleTwo && key !== titleThree) {
      newSearchParams.append(key, value);
    }
  });
  return newSearchParams.toString();
};
