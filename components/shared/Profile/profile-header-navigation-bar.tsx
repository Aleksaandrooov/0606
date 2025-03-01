'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationMenuProfile } from '@/lib/Array/profile-navigation-menu';
import { BreadCrumb } from '@/lib/Components/Bread-crumb';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

interface Props {
  id: number;
}

export const ProfileHeaderNavigationBar: React.FC<Props> = ({ id }) => {
  const { data: session } = useSession();

  return (
    <div className="mt-5">
      <BreadCrumb
        name={id === 1 ? 'Профиль' : navigationMenuProfile.find((obj) => obj.id === id)!.name}
        url="/profile"
        pref={id === 1 ? undefined : 'Профиль'}
      />
      <NavigationMenu className="mx-auto mt-3 max-md:hidden">
        <NavigationMenuList>
          {navigationMenuProfile
            .filter((obj) => (session?.user?.role === 'ADMIN' ? obj : !obj.admin))
            .map((obj) => (
              <NavigationMenuItem key={obj.id}>
                <Link href={obj.url} legacyBehavior passHref>
                  <NavigationMenuLink
                    style={{ backgroundColor: id === obj.id ? 'hsl(var(--accent))' : '' }}
                    className={navigationMenuTriggerStyle()}>
                    {obj.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
