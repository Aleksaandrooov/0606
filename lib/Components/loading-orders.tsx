import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import React from 'react'
import { cn } from '../utils'

export const LoadingOrders = () => {
  return (
    <>
      <div className="sm:max-w-[320px]">
        <div className="flex gap-2">
          <Skeleton className="h-12 w-20" />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-neutral-400"
                  fill="rgb(163 163 163 / var(--tw-text-opacity, 1))"
                />
              ))}
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Skeleton className="h-2" />
          <Skeleton className="h-2" />
        </div>
      </div>
      <div className="flex w-full gap-2 lg:ml-5 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              'h-32 w-full',
              i === 2 ? 'max-md:hidden' : i === 1 ? 'max-[500px]:hidden' : '',
            )}
          />
        ))}
      </div>
    </>
  )
}
