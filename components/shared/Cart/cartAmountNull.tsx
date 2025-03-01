import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';

export const CartAmountNull = () => {
  const { data: session } = useSession();

  return (
    <div className="flex grow justify-center flex-col items-center">
      <div className="flex gap-1 items-center">
        <ShoppingCart size={18} />| Корзина пуста
      </div>
      {!session && (
        <span className="text-neutral-400 text-sm text-center max-w-[400px]">
          Наполняли корзину при прошлом визите? Авторизуйтесь и добавленные товары появятся на
          странице
        </span>
      )}
    </div>
  );
};
