'use client';

import React, { useEffect } from 'react';
import { PayCart } from './pay-cart';
import { FormProvider } from 'react-hook-form';
import { FormInput } from '@/lib/formInpit/formInput';
import { PaymentState } from './state/payment-state';
import { PaymentFormState } from './state/payment-form-state';
import { redirect } from 'next/navigation';
import { CdekMap } from './cdek-map';

export const DeliveryCart = () => {
  const { user, form } = PaymentFormState();
  const {
    onPaymentSumbit,
    totalPrice,
    cartItem,
    loading,
    loadingCart,
    changeDelivery,
    error,
    delivery,
    currencyValue,
    currency,
  } = PaymentState(user?.id);

  useEffect(() => {
    if (!cartItem.length && !loadingCart) {
      redirect('/cart');
    }
  }, [cartItem, loadingCart]);

  return (
    <div className="flex gap-8 mt-10 xl:justify-around max-xl:flex-col">
      <div className="flex-1 md:p-5 xl:max-w-[860px]">
        <FormProvider {...form}>
          <form id="form1" onSubmit={form.handleSubmit(onPaymentSumbit)}>
            <div className="mb-5 flex-1">
              <h1 className="text-lg mb-5">Информация для доставки</h1>
              <div className="grid-cols-2 max-md:grid-cols-1 grid gap-3">
                <FormInput label="Почта" className="col-span-2 max-md:col-span-1" name="email" />
                <FormInput label="Имя" name="name" />
                <FormInput label="Фамилия" name="surname" />
                <FormInput label="Отчество" name="patronymic" />
                <FormInput defValue={user?.number || ''} label="Телефон" name="number" />
              </div>
            </div>
          </form>
        </FormProvider>
        <div>
          <div className="flex justify-between items-end mb-5">
            <h1 className="text-lg">Способ доставки</h1>
            {error && <h2 className="text-sm text-red-500 rounded-md">Выберите способ доставки</h2>}
          </div>
          <CdekMap onChange={(data) => changeDelivery(data)} />
        </div>
      </div>
      <PayCart
        currencyValue={currencyValue}
        currency={currency}
        delivery={delivery}
        price={totalPrice}
        items={cartItem}
        loading={loading}
      />
    </div>
  );
};
