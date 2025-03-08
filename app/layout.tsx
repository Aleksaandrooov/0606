import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/shared/Header/Header'
import { Footer } from '@/components/shared/Footer/Footer'
import { Providers } from '@/lib/Components/providers'
import { FooterMobile } from '@/components/shared/Footer/Footer-mobile'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: '0606',
  description:
    'Широкий ассортимент стильной и качественной одежды для мужчин и женщин. Последние тренды, комфорт и доступные цены. У нас вы найдете всё для стильного гардероба!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
      <body className={cn('flex flex-col scroll__hidden', nunito.className)}>
        <Providers>
          <Header />
          <main className="flex-1 min-h-screen flex flex-col">{children}</main>
          <Footer />
          <FooterMobile />
        </Providers>
      </body>
    </html>
  )
}
