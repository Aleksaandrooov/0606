import { Order } from '@prisma/client';
import { useState } from 'react';

export type deliveryOrderType = 'delivery' | 'pointOffice' | 'pointPostamat' | 'def';
export type orderByType = 'asc' | 'desc';

export const OrderFilter = (Orders: Order[]) => {
  const [value, isValue] = useState('');
  const [itemsFilter, setItemsFilter] = useState<'all' | 'pending'>('all');
  const [delivery, setDelivery] = useState<deliveryOrderType>('def');
  const [orderBy, setOrderBy] = useState<orderByType>('asc');

  const items = Orders.filter((obj) =>
    itemsFilter === 'pending' ? obj.status === 'pending' || obj.status === 'paidFor' : obj,
  )
    .filter((obj) => obj.id.toString().includes(value))
    .filter((obj) =>
      delivery === 'pointPostamat'
        ? obj.type == 'Постамат'
        : delivery === 'pointOffice'
          ? obj.type == 'Пункт выдачи'
          : delivery === 'delivery'
            ? obj.type == 'Доставка курьером'
            : obj,
    )
    .sort((a, b) =>
      orderBy === 'asc'
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );

  return {
    setItemsFilter,
    isValue,
    setDelivery,
    setOrderBy,
    items,
    itemsFilter,
    value,
    delivery,
    orderBy,
  };
};
