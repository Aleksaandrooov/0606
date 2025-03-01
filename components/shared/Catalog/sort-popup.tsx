'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { sortMap } from '@/lib/Array/sort-items';
import { paramsAppend } from '@/lib/params-append';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SortPopup = () => {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const type = searchParams.get('type');
  const params = paramsAppend(searchParams, 'order', 'type', 'page');
  const router = useRouter();

  const orderBy =
    sortMap.find((obj) => obj.order == order && obj.type == type) || sortMap.find((obj) => obj);

  const routerPush = (id: string) => {
    const sort = sortMap.find((obj) => obj.id == Number(id));
    router.push('/catalog?' + params + '&order=' + sort?.order + '&type=' + sort?.type);
  };

  return (
    <div className="text-center">
      <Select onValueChange={(e) => routerPush(e)} defaultValue={String(orderBy?.id)}>
        <SelectTrigger className="gap-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortMap.map((obj) => (
            <SelectItem key={obj.id} value={String(obj.id)}>
              {obj.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
