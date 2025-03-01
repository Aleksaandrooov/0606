import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import React from 'react';

export const LoadingBreadcrumb = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-5 w-4" />
      <ChevronRight size={12} />
      <Skeleton className="h-5 w-[70px]" />
    </div>
  );
};
