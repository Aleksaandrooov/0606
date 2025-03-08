import { Container } from '@/components/ui/container'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadingBreadcrumb } from '@/lib/Components/loading-breadcrumb'

export default function Loading() {
  return (
    <Container className="mt-5 max-sm:px-4 flex-grow flex flex-col justify-center">
      <LoadingBreadcrumb />
      <div className="flex justify-around max-lg:flex-col items-center mb-20">
        <div className="">
          <div className="lg:min-h-[60vh] flex items-center">
            <Skeleton className="h-[450px] w-[450px] m-5" />
          </div>
          <div className="flex flex-wrap gap-1 mb-10 justify-center">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
        </div>
        <div className="lg:w-[480px] max-lg:w-full flex flex-col lg:items-end">
          <Skeleton className="h-9 w-96" />
          <Skeleton className="h-8 mt-1 w-48" />
          <Skeleton className="h-9 w-60 mt-2" />
          <div className="flex gap-2 h-9 mt-2">
            <Skeleton className="w-60" />
            <Skeleton className="w-9" />
          </div>
        </div>
      </div>
    </Container>
  )
}
