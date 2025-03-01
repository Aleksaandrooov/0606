import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { WbIcon } from '@/lib/Components/wb';
import { CircleAlert, List } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const itemHome = [
  {
    name: 'Удобно заказать',
    span: 'Можно заказать как на сайте, так и на Wildberries',
    buttonWb: true,
    catalog: true,
  },
  {
    name: 'Быстрая доставка',
    span: 'Доставка в любую точку миру, в самые короткие сроки и гарантией что товар не повредится',
  },
  {
    name: 'Товары на Wildberries',
    span: 'Оффицально зарегестрированный аккаунт на wildbiries с более 50 отзывами',
    buttonWb: true,
  },
  { name: 'Качество', span: 'Высокое качество каждого товара' },
];

export const Items = () => {
  return (
    <Container className="my-auto max-lg:px-4 grid max-lg:my-5 max-sm:grid-cols-1 grid-cols-4 max-lg:grid-cols-2 gap-5">
      {itemHome.map((obj, i) => (
        <div
          key={i}
          className="rounded-xl my-10 max-lg:my-0 border text-center py-5 max-sm:py-3 px-2 flex flex-col">
          <h1 className="text-xl mb-2 max-md:text-base">{obj.name}</h1>
          <span className="text-sm text-neutral-400 flex-1 max-md:text-xs">{obj.span}</span>
          <div className="mt-4 flex justify-center gap-2">
            {!obj.catalog ? (
              <Link href={'/information/payment'}>
                <Button
                  className="flex gap-2 max-md:text-xs max-md:px-3 max-md:h-8"
                  variant="outline">
                  Подробнее
                  <CircleAlert size={18} />
                </Button>
              </Link>
            ) : (
              <Link href={'/catalog'}>
                <Button
                  className="flex gap-2 max-md:text-xs max-md:px-3 max-md:h-8"
                  variant="outline">
                  Каталог <List size={18} />
                </Button>
              </Link>
            )}
            {obj.buttonWb && (
              <Link href="https://www.wildberries.ru/seller/4307084">
                <Button variant="outline" className="max-md:px-3 max-md:h-8">
                  <WbIcon />
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </Container>
  );
};
