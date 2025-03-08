import { Cart, CartItem, Product, Size } from '@prisma/client'

export type patchCartType = { type: 'increment' | 'decrement'; id: number; size: number }
export type cartType = Cart & {
  items: CartItem & {
    productItem: Product
    productSize: Size
  }
}
