import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { LoadingBreadcrumb } from './loading-breadcrumb';

export const LoadingNavigationProfile = () => {
  return (
    <div className="">
      <LoadingBreadcrumb />
      <div className="mt-3 flex justify-center gap-2 max-md:hidden">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-28" />
        ))}
      </div>
    </div>
  );
};
