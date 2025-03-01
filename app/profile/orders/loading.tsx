import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingNavigationProfile } from '@/lib/Components/loading-navigation-profile';

export default function Loading() {
  return (
    <Container className="mt-5">
      <LoadingNavigationProfile />
      <div className="flex flex-col gap-2 mt-5 mx-auto max-w-[1000px]">
        {[...Array(3)].map((_, i) => (
          <Skeleton className="h-16 w-full mx-auto max-md:h-10" key={i} />
        ))}
      </div>
    </Container>
  );
}
