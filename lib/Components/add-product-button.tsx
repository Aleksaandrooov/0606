import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { cn } from '../utils'
import { cartStore } from '@/zustand/cart-store'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  id: number
  reduction?: boolean
  disabled?: boolean
  count: number | null
  size: number
}

export const AddProductButton: React.FC<Props> = ({
  className,
  id,
  reduction,
  disabled,
  count,
  size,
}) => {
  const { postCart, cartItem } = cartStore()
  const [loading, isLoading] = useState(false)
  const router = useRouter()
  const onValueItem = cartItem.filter(
    (obj) => obj.productItemId === id && obj.productSize.id === size,
  ).length

  const voidProductItem = () => {
    if (!onValueItem) {
      isLoading(true)
      postCart(id, size).then(() => isLoading(false))
    } else {
      router.push('/cart')
    }
  }

  return (
    <Button
      style={{ backgroundColor: onValueItem ? 'hsl(var(--accent))' : '' }}
      loading={loading}
      disabled={disabled || !count || !size}
      onClick={() => voidProductItem()}
      variant="outline"
      type="button"
      className={cn('gap-1', className)}
    >
      {!count ? (
        <>Нет в наличии</>
      ) : !onValueItem ? (
        !reduction ? (
          'Добавить в корзину'
        ) : (
          'Добавить'
        )
      ) : (
        <>
          Перейти <ChevronRight size={18} />
        </>
      )}
    </Button>
  )
}
