import { cartStore } from '@/zustand/cart-store';
import { currencyFormat, currencyStore } from '@/zustand/currency-store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const PreLoaderLoading = () => {
  const { fetchCurrency, setCurrencyValue, loading: loadingCurrency } = currencyStore();
  const { fetchCart, loading: loadingCart } = cartStore();
  const { status, data: session } = useSession();
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrency()
      .then(() => setCurrencyValue((localStorage.getItem('currency') as currencyFormat) || 'RUB'))
      .then(() => fetchCart());
    setLoading(true);
  }, [session]);

  useEffect(() => {
    if (!loadingCurrency && !loadingCart && status !== 'loading') {
      setRender(true);
    }
  }, [loadingCurrency, loadingCart, status]);

  return {
    render,
    loading,
    loadingCurrency,
    loadingCart,
  };
};
