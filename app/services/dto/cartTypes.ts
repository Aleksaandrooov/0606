import { Cart, CartItem, Product } from '@prisma/client';

export type patchCartType = { type: 'increment' | 'decrement'; id: number };
export type cartType = Cart & {
  items: CartItem & {
    productItem: Product;
  };
};
