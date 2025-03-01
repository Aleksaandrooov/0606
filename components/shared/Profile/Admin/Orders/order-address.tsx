import React from 'react';
import { deliveryInter } from './order-item';
import { words } from '@/lib/word-cals';
import { currencyFormat } from '@/zustand/currency-store';
import { currencySimvol } from '@/lib/Array/currency-simvol';
import { numberReplace } from '@/lib/numberReplace';

export const OrderAddress = ({
  address,
  tariff_name,
  period_min,
  period_max,
  delivery_sum,
  currency,
}: deliveryInter & { currency: currencyFormat }) => {
  return (
    <div className="mt-2 max-md:flex justify-between">
      <div className="grid grid-cols-9 max-md:grid-cols-1 max-md:gap-1 text-neutral-400 text-sm">
        <p className="md:col-span-4">Адресс</p>
        <p className="md:col-span-3">Тип</p>
        <p>Сроки</p>
        <p>Цена</p>
      </div>
      <div className="grid grid-cols-9 max-md:grid-cols-1 max-md:gap-1 text-sm max-md:text-end">
        <p className="md:col-span-4">{address}</p>
        <p className="md:col-span-3">{tariff_name}</p>
        <p>
          {period_min}
          {period_min === period_max ? '' : '-' + period_max}{' '}
          {period_max && words(period_max, ['день', 'дня', 'дней'])}
        </p>
        <p>
          {delivery_sum && numberReplace(delivery_sum)}{' '}
          {currencySimvol.find((obj) => obj.name === currency)?.format}
        </p>
      </div>
    </div>
  );
};
