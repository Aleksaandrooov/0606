import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingNavigationProfile } from '@/lib/Components/loading-navigation-profile';

export default function Loading() {
  return (
    <Container className="mt-5">
      <LoadingNavigationProfile />
      <div className="mb-10">
        <div className="mt-5 lg:border rounded-lg lg:p-5">
          <Skeleton className="h-8 w-24 mb-5" />
          <div className="grid lg:grid-cols-2 gap-3 mb-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton className="h-9" key={i} />
            ))}
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </Container>
  );
}
