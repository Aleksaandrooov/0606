import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigationMenuProfile } from '@/lib/Array/profile-navigation-menu';
import { singOut } from '@/lib/signOut';
import { UserRole } from '@prisma/client';
import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const ProfileHeader = ({ role }: { role: UserRole }) => {
  const path = usePathname();
  const callback = path.includes('profile') ? '/' : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="px-2" variant="ghost">
          <UserRound strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigationMenuProfile
            .filter((obj) => (role === 'ADMIN' ? obj : !obj.admin))
            .map((obj) => (
              <Link key={obj.id} href={obj.url}>
                <DropdownMenuItem className="flex justify-between">
                  {obj.name} {obj.icon}
                </DropdownMenuItem>
              </Link>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => singOut(callback)} className="flex justify-between">
            Выйти <LogOut />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
