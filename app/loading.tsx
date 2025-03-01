import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex grow flex-col mx-2">
      <div className="flex justify-around items-center gap-5 pb-5">
        <div className="max-w-[400px] max-sm:max-w-[380px]">
          <Skeleton className="h-9 w-72 max-md:h-7 max-md:w-48 mb-1 max-sm:h-5 max-sm:w-full" />
          <Skeleton className="h-5 max-md:h-4 max-md:w-32 w-40 max-sm:w-full" />
          <div className="flex mt-4 max-sm:mt-3 gap-1 h-9 max-md:h-8">
            <Skeleton className="w-[120px]" />
            <Skeleton className="w-9" />
          </div>
        </div>
        <Skeleton className="h-[600px] w-[560px] max-xl:h-[500px] max-lg:w-[400px] max-lg:h-[400px] max-md:h-[300px] max-md:w-[300px] max-sm:w-[200px] max-sm:h-[220px]" />
      </div>
      <div className="flex justify-center gap-2 items-center">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className={i === 0 ? 'h-3 w-3' : 'h-2 w-2'} />
        ))}
      </div>
      <Container className="my-auto max-lg:px-4 grid max-lg:my-5 max-sm:grid-cols-1 grid-cols-4 max-lg:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[180px] max-sm:h-[120px]" />
        ))}
      </Container>
    </div>
  );
}
