import { DeliveryCart } from '@/components/shared/Cart/Payment/delivery-cart'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Оформление заказа | 0606 ',
  description: 'Ваши товары уже выбраны. Осталось лишь заполнить данные и оплатить!',
}

export default function Payment() {
  return (
    <Container className="mt-5 max-md:px-4">
      <BreadCrumb pref="Корзина" url="/cart" name="Оформление заказа" />
      <DeliveryCart />
    </Container>
  )
}
