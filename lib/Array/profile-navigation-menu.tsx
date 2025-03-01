import { MessageCircle, Package, PackagePlus, Plus, UserRoundPen } from 'lucide-react'

export const navigationMenuProfile = [
  { name: 'Профиль', url: '/profile', id: 1, icon: <UserRoundPen strokeWidth={1.75} /> },
  { name: 'Мои заказы', url: '/profile/orders', id: 2, icon: <Package strokeWidth={1.75} /> },
  {
    name: 'Все заказы',
    url: '/profile/admin/orders',
    id: 3,
    icon: <PackagePlus strokeWidth={1.75} />,
    admin: true,
  },
  { name: 'Добавление', url: '/profile/admin/products', id: 4, icon: <Plus />, admin: true },
  {
    name: 'Посты',
    url: '/profile/admin/posts',
    id: 5,
    icon: <MessageCircle strokeWidth={1.75} />,
    admin: true,
  },
]
