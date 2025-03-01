import { orderStatus } from '@/lib/Array/order-status';
import { cn } from '@/lib/utils';
import { Status } from '@prisma/client';
import React from 'react';

interface Props {
  status: Status;
  type?: boolean;
}

export const StatusOrder: React.FC<Props> = ({ status, type }) => {
  return (
    <div className={cn('flex gap-1 items-center', type ? 'gap-2 max-md:gap-1' : '')}>
      <div
        style={{
          backgroundColor: orderStatus.find((object) =>
            status === 'pending' ? object.name === 'fulfilled' : status === object.name,
          )?.color,
        }}
        className={cn('h-2 w-2 rounded-full', type ? 'h-4 w-4 max-md:h-3 max-md:w-3' : '')}></div>
      <h1 className={type ? 'text-xl max-md:text-lg' : ''}>
        {status === 'pending'
          ? 'Новый'
          : orderStatus.find((object) => object.name === status)?.text}
      </h1>
    </div>
  );
};
