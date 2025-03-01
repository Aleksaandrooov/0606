import { currencySimvol } from '@/lib/Array/currency-simvol';
import { numberReplace } from '@/lib/numberReplace';
import { Order } from '@prisma/client';
import React from 'react';
import { StatusOrder } from './status';
import { cn } from '@/lib/utils';

export const Chat = ({
  status,
  currency,
  totalAmount,
  name,
  createdAt,
  id,
  changeOrder,
  value,
}: Order & { changeOrder: (id: number) => void; value?: number }) => {
  const newDate = new Date();

  return (
    <div
      onClick={() => changeOrder(id)}
      className={cn(
        'border-b p-2 text-sm transition-all cursor-pointer',
        value === id ? 'bg-accent' : 'hover:bg-accent',
      )}>
      <div className="flex gap-1 items-center">
        <StatusOrder status={status} />
        <h3 className="text-neutral-400">№{id}</h3>
        <h2 className="ml-auto">
          {numberReplace(totalAmount)}{' '}
          {currencySimvol.find((object) => object.name === currency)?.format}
        </h2>
      </div>
      <div className="flex">
        <h1 className="text-neutral-400">{name}</h1>
      </div>
      <div className="flex justify-between">
        <h5>
          {createdAt.getDate() < 10 ? 0 : ''}
          {createdAt.getDate()}.{createdAt.getMonth() < 10 ? 0 : ''}
          {createdAt.getMonth() + 1}.{createdAt.getFullYear()}
        </h5>
        <div className="text-neutral-400 flex gap-1">
          <h1>
            {createdAt.getDate() === newDate.getDate()
              ? 'Сегодня'
              : createdAt.getDate() + 1 === newDate.getDate()
                ? 'Вчера'
                : ''}
          </h1>
          <h2>
            {createdAt.getHours() < 10 ? 0 : ''}
            {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? 0 : ''}
            {createdAt.getMinutes()}
          </h2>
        </div>
      </div>
    </div>
  );
};
