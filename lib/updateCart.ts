import { prisma } from '@/prisma/prisma-client';

export const updateCart = async (id: number) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: id,
    },
    include: {
      productItem: true,
    },
  });

  const totalPrice = cartItems
    .filter((obj) => obj.productItem.quntity !== 0)
    .reduce((sum, curr) => sum + curr.quantity * curr.productItem.price, 0);
  const totalQuntity = cartItems
    .filter((obj) => obj.productItem.quntity !== 0)
    .reduce((sum, curr) => sum + curr.quantity, 0);

  return await prisma.cart.update({
    where: {
      id,
    },
    data: {
      totalAmount: totalPrice,
      quantity: totalQuntity,
    },
    include: {
      items: {
        include: {
          productItem: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
};
