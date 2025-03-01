import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingBreadcrumb } from '@/lib/Components/loading-breadcrumb';

export default function Loading() {
  return (
    <div className="mt-5">
      <div className="border-b pb-1">
        <Container>
          <LoadingBreadcrumb />
          <div className="mt-10 flex justify-between items-center">
            <Skeleton className="h-6 w-[70px] max-md:h-5" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
        </Container>
      </div>
      <Container className="px-4 mt-1">
        <div className="grid grid-cols-5 gap-2 max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-[380px]" />
          ))}
        </div>
      </Container>
    </div>
  );
}
