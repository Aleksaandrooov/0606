import { CartItems } from '@/components/shared/Cart/CartItems'
import { CartPayments } from '@/components/shared/Cart/CartPayments'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Корзина | 0606 ',
  description:
    'Ваши выбранные товары в одном месте. Проверьте заказ и оформите покупку легко и быстро!',
}

export default function Page() {
  return (
    <Container className="mt-5 max-sm:px-4 flex flex-col grow">
      <BreadCrumb name="Корзина" />
      <div className="flex mt-10 gap-10 max-xl:flex-col grow h-full">
        <CartItems />
        <CartPayments />
      </div>
    </Container>
  )
}
