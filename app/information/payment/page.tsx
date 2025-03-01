import { Payment } from '@/components/shared/information/payment'
import { PaymentContacts } from '@/components/shared/information/payment-contacts'
import { PaymentDelivery } from '@/components/shared/information/payment-delivery'
import { PaymentReturn } from '@/components/shared/information/payment-return'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Покупателю | 0606 ',
  description:
    'Узнайте о наших условиях оплаты товаров, возрастных ограничениях, вариантах доставки и способах связи с нами. Мы заботимся о вашем комфорте и безопасности при покупке.',
}

export default function PaymentPage() {
  return (
    <Container className="my-5 [&_ul]:ml-10 [&_li]:mb-2 [&_h3]:mb-2 [&_h3]:text-lg max-sm:[&_h3]:text-base [&_h4]:ml-5 max-sm:[&_h4]:text-sm [&_h4]:mb-2">
      <BreadCrumb name="Покупателю" />
      <div className="flex flex-col gap-10 mt-10 max-w-[1000px] mx-auto">
        <section>
          <h2 className="text-center text-xl mb-2">Политика оплаты товара</h2>
          <Payment />
        </section>
        <div className="border-b"></div>
        <section>
          <h2 className="text-center text-xl mb-2">Возврат товара</h2>
          <PaymentReturn />
        </section>
        <div className="border-b"></div>
        <section>
          <h2 className="text-center text-xl mb-2">Доставка</h2>
          <PaymentDelivery />
        </section>
        <div className="border-b"></div>
        <section>
          <h2 className="text-center text-xl mb-2">Контакты</h2>
          <PaymentContacts />
        </section>
      </div>
    </Container>
  )
}
