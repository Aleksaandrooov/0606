import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Shirt } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const BreadCrumb = ({ name, pref, url }: { name: string; pref?: string; url?: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:flex-nowrap whitespace-nowrap max-sm:text-xs">
        <Link href="/">
          <BreadcrumbItem className="cursor-pointer flex items-center">
            <Shirt size={16} />
          </BreadcrumbItem>
        </Link>
        {pref && <BreadcrumbSeparator />}
        {pref && url && (
          <Link href={url}>
            <BreadcrumbItem className="cursor-pointer flex items-center">{pref}</BreadcrumbItem>
          </Link>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
