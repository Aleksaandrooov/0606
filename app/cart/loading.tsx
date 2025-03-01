import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingBreadcrumb } from '@/lib/Components/loading-breadcrumb';

export default function Loading() {
  return (
    <Container className="mt-5 max-sm:px-4">
      <LoadingBreadcrumb />
      <div className="flex mt-10 gap-10 max-xl:flex-col">
        <div className="flex-1 p-5 max-md:p-0">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="flex flex-col gap-3 mt-2">
            {[...Array(3)].map((_, i) => (
              <div className="flex gap-2 h-[80px] items-center" key={i}>
                <Skeleton className="h-[60px] w-[60px] max-sm:h-[50px] max-sm:w-[50px]" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-[120px] max-sm:w-full" />
                </div>
                <div className="flex-1 max-sm:hidden">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-col flex gap-1 items-end">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-7 w-7" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[350px] max-xl:w-[400px] max-md:w-full md:mx-auto mb-10">
          <Skeleton className="h-14 mb-2" />
          <Skeleton className="h-44" />
        </div>
      </div>
    </Container>
  );
}
