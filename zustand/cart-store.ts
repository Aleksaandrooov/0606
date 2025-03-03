import { Api } from '@/app/services/ApiClient'
import { cartType, patchCartType } from '@/app/services/dto/cartTypes'
import { create } from 'zustand'

interface State {
  cartItem: cartType['items'][]
  totalPrice: number
  totalQuntity: number
  loading: boolean
}
interface Action {
  fetchCart: () => Promise<unknown>
  postCart: (id: number) => Promise<unknown>
  patchCart: ({ type, id }: patchCartType) => Promise<unknown>
  changeTotalAmount: () => void
}

export const cartStore = create<State & Action>((set) => ({
  cartItem: [],
  totalPrice: 0,
  totalQuntity: 0,
  loading: true,

  changeTotalAmount: () =>
    set((state) => ({
      totalPrice: state.cartItem.reduce((sum, curr) => {
        return sum + curr.productItem.quntity > 0 ? curr.quantity * curr.productItem.price : 0
      }, 0),
      totalQuntity: state.cartItem.reduce((sum, curr) => {
        return sum + curr.productItem.quntity > 0 ? curr.quantity : 0
      }, 0),
    })),

  fetchCart: async () => {
    const data = await Api.cart.fetchCart()
    const items = Array.isArray(data.items) ? data.items : []
    set({
      cartItem: items,
      loading: false,
    })
    cartStore.getState().changeTotalAmount()
  },
  postCart: async (id) => {
    const data = await Api.cart.postCart(id)
    const items = Array.isArray(data.items) ? data.items : []
    set({
      cartItem: items,
    })
    cartStore.getState().changeTotalAmount()
  },
  patchCart: async ({ type, id }) => {
    const data = await Api.cart.updateCart({ type, id })
    const items = Array.isArray(data.items) ? data.items : []
    set({
      cartItem: items,
    })
    cartStore.getState().changeTotalAmount()
  },
}))
