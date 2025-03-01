import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { buyerArr, icons, InformationArr } from '@/lib/Array/footerArray'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="border-t py-5">
      <Container className="flex max-sm:flex-wrap max-sm:px-3 gap-2">
        <div className="flex max-sm:w-full justify-between gap-10 max-sm:gap-2">
          <div>
            <h1 className="max-sm:text-sm">Покупателю</h1>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {buyerArr.map((obj, i) => (
                <Link
                  className="text-sm max-sm:text-xs text-nowrap text-neutral-400 hover:text-white transition-all"
                  href={obj.url}
                  key={i}
                >
                  {obj.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="max-sm:text-sm">О компании</h1>
            <div className="flex flex-col gap-1 mt-1">
              {InformationArr.map((obj, i) => (
                <Link
                  className="text-sm max-sm:text-xs text-neutral-400 hover:text-white transition-all"
                  href={obj.url}
                  key={i}
                >
                  {obj.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-auto max-sm:ml-0 max-sm:flex max-sm:w-full items-center justify-between">
          <h1 className="max-sm:text-sm">wrk0606store@yandex.ru</h1>
          <div className="flex mt-2 max-sm:mt-1 max-sm:justify-start justify-end">
            {icons.map((obj, i) => (
              <Link key={i} href={obj.url}>
                <Button variant="ghost" className="px-2 py-1">
                  {obj.svg}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
