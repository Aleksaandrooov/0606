'use client';

import { Api } from '@/app/services/ApiClient';
import { create } from 'zustand';

interface State {
  currency: {
    KZT: number | null;
    BYN: number | null;
    RUB: number;
  };
  loading: boolean;
  currencyValue: currencyFormat;
}

interface Action {
  fetchCurrency: () => Promise<unknown>;
  setCurrencyValue: (type: currencyFormat) => void;
}

export type currencyFormat = 'RUB' | 'KZT' | 'BYN';

export const currencyStore = create<State & Action>((set) => ({
  currency: {
    KZT: null,
    BYN: null,
    RUB: 1,
  },
  currencyValue: 'RUB',
  loading: true,

  fetchCurrency: async () => {
    const data = await Api.currency.fetchCurrency();

    set({
      loading: false,
      currency: {
        KZT: data.find((obj) => obj.name === 'KZT')!.price,
        BYN: data.find((obj) => obj.name === 'BYN')!.price,
        RUB: 1,
      },
    });
  },
  setCurrencyValue: (type) => {
    set({
      currencyValue: type,
    });
  },
}));
