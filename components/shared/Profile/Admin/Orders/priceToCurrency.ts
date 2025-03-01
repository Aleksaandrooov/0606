import { currencyStore } from '@/zustand/currency-store';
import { Order } from '@prisma/client';

export const PriceToCurrency = (Orders: Order[]) => {
  const { currency } = currencyStore();
  const newOrders = Orders.filter((obj) => obj.status === 'pending' || obj.status === 'paidFor');
  const price = newOrders.reduce(
    (sum, curr) =>
      sum +
      (curr.currency === 'RUB'
        ? curr.totalAmount
        : curr.currency === 'BYN'
          ? curr.totalAmount / Number(currency.BYN)
          : curr.currency === 'KZT'
            ? curr.totalAmount / Number(currency.KZT)
            : 0),
    0,
  );

  return {
    price,
    newOrders,
  };
};
