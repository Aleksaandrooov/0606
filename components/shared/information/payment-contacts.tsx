'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export const PaymentContacts = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const params = useSearchParams()
  const type = params.get('type') === 'contacts'
  useEffect(() => {
    if (type && ref.current)
      window.scrollTo({
        top: ref.current?.offsetTop - 100,
        behavior: 'smooth',
      })
  }, [type])

  return (
    <div ref={ref}>
      <h3>О себе</h3>
      <h4>Индивидуальный предприниматель Лепков Никита Дмитриевич УНП 791315000</h4>
      <h3>Связаться со мной</h3>
      <h4>
        Адрес электронной почты: <u>wrk0606store@yandex.ru</u>
      </h4>
      <h3>Банковские реквезиты</h3>
      <h4>
        Наименование банка: ЗАКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО &quot;АЛЬФА-БАНК&quot; Ул. Сурганова,
        43-47, 220013 Минск, Республика Беларусь
      </h4>
      <h4>Сокращённое наименование банка: ЗАО &quot;Альфа-Банк&quot;</h4>
      <h4>БИК: ALFABY2X</h4>
      <h4>SWIFT: ALFABY2X</h4>
      <h4>р/с: BY37ALFA30132F91490010270000 в бел.рублях – BYN</h4>
    </div>
  )
}
