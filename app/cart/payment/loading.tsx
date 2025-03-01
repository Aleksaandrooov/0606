import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingBreadcrumb } from '@/lib/Components/loading-breadcrumb';
import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <Container className="mt-5 max-md:px-4">
      <LoadingBreadcrumb />
      <div className="flex gap-8 mt-10 max-xl:flex-col">
        <div className="flex-1 md:p-5">
          <div className="mb-5 flex-1">
            <Skeleton className="h-7 w-48" />
            <div className="grid-cols-2 mt-4 max-md:grid-cols-1 grid gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn('h-9', i === 0 ? 'col-span-2 max-md:col-span-1' : '')}
                />
              ))}
            </div>
          </div>
          <div className="">
            <Skeleton className="h-7 w-40" />
            <div className="flex max-sm:flex-col mt-4 gap-3">
              {[...Array(2)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={
                    i === 0
                      ? 'md:w-[230px] sm:w-[200px] h-[110px] max-md:h-[100px]'
                      : 'h-[110px] md:w-[220px] sm:w-[190px] max-md:h-[100px]'
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[350px] max-xl:w-[400px] max-xl:mb-10 max-md:w-full mx-auto">
          <Skeleton className="h-48 mb-2" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </Container>
  );
}
