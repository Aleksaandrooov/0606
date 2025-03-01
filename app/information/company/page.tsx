import { CompanyOfert } from '@/components/shared/information/company-ofert'
import { CompanyPoliticy } from '@/components/shared/information/company-politicy'
import { Container } from '@/components/ui/container'
import { BreadCrumb } from '@/lib/Components/Bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О компании | 0606 ',
  description:
    'Узнайте о нашей политике конфиденциальности и договоре публичной оферты. Мы гарантируем безопасность ваших данных и прозрачные условия сотрудничества.',
}

export default function Company() {
  return (
    <Container className="my-5">
      <BreadCrumb name="О компании" />
      <div className="flex flex-col gap-10 mt-10 max-w-[1000px] mx-auto [&_li]:list-disc [&_ul]:ml-14 [&_li]:mb-2 [&_h3]:mb-2 [&_h3]:text-lg max-sm:[&_h3]:text-base [&_h4]:ml-5 max-sm:[&_h4]:text-sm [&_h4]:mb-2">
        <section>
          <h2 className="text-center text-xl mb-2">Положение о политике конфиденциальности</h2>
          <CompanyPoliticy />
        </section>
        <div className="border-t"></div>
        <section>
          <h2 className="text-center text-xl mb-2">Договор публичной оферты</h2>
          <CompanyOfert />
        </section>
      </div>
    </Container>
  )
}
