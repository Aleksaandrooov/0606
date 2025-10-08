'use client'

import { Progress } from '@/components/ui/progress'
import { PreLoaderLoading } from '@/lib/loading'
import { cn } from '@/lib/utils'
import React from 'react'
import { Logo } from '@/lib/Components/Logo'
import Link from 'next/link'

export const PreLoader = () => {
  const { render, loadingCurrency, loading, loadingCart } = PreLoaderLoading()
  return (
    <Link
      href="/"
      className={cn(
        'w-[70px] md:ml-5 max-md:flex justify-center h-full cursor-pointer',
        !render ? 'pointer-events-none' : '',
      )}
    >
      <div
        className={cn(
          'fixed left-0 right-0 top-0 bottom-0 opacity-100 h-screen z-20 bg-black transition-all duration-500 flex items-center justify-center',
          render ? 'opacity-0 pointer-events-none' : '',
        )}
      >
        <Progress
          className={cn(
            'w-[300px] max-md:w-[180px] mt-28 max-md:h-1 max-md:mt-16 transition-all duration-300 opacity-100',
            render ? 'opacity-0' : '',
          )}
          value={loading ? (!loadingCurrency ? (!loadingCart ? 100 : 50) : 25) : 0}
        />
      </div>
      <div
        className={cn(
          'loading rounded-br-3xl transition-all relative z-20',
          render ? 'move' : 'md:-ml-5',
        )}
      >
        <Logo
          className={cn(
            'transition-all duration-500',
            render ? 'h-[28px]' : 'h-[60px] max-md:h-[40px]',
          )}
        />
      </div>
    </Link>
  )
}
