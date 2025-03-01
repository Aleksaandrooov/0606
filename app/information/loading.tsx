import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingBreadcrumb } from '@/lib/Components/loading-breadcrumb';

export default function Loading() {
  return (
    <Container className="my-5">
      <LoadingBreadcrumb />
      <div className="max-w-[1000px] mx-auto mt-10">
        <Skeleton className="mx-auto h-8 w-32 mb-2" />
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-8 w-[200px]" />
            <div className="ml-4 my-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full mb-2" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
