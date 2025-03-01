import { Api } from '@/app/services/ApiClient';
import { cartType, patchCartType } from '@/app/services/dto/cartTypes';
import { create } from 'zustand';

interface State {
  cartItem: cartType['items'][];
  totalPrice: number;
  totalQuntity: number;
  loading: boolean;
}
interface Action {
  fetchCart: () => Promise<unknown>;
  postCart: (id: number) => Promise<unknown>;
  patchCart: ({ type, id }: patchCartType) => Promise<unknown>;
}

export const cartStore = create<State & Action>((set) => ({
  cartItem: [],
  totalPrice: 0,
  totalQuntity: 0,
  loading: true,

  fetchCart: async () => {
    const data = await Api.cart.fetchCart();
    const items = Array.isArray(data.items) ? data.items : [];

    set({
      cartItem: items,
      loading: false,
      totalPrice: data.totalAmount,
      totalQuntity: data.quantity,
    });
  },
  postCart: async (id) => {
    const data = await Api.cart.postCart(id);
    const items = Array.isArray(data.items) ? data.items : [];

    set({
      cartItem: items,
      totalPrice: data.totalAmount,
      totalQuntity: data.quantity,
    });
  },
  patchCart: async ({ type, id }) => {
    const data = await Api.cart.updateCart({ type, id });
    const items = Array.isArray(data.items) ? data.items : [];

    set({
      cartItem: items,
      totalPrice: data.totalAmount,
      totalQuntity: data.quantity,
    });
  },
}));
