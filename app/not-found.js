import { Button } from '@/components/ui/button';
import { Ban, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col grow justify-center items-center">
      <div className="flex items-center text-lg max-sm:text-base">
        <h1 className="border-r py-2 pr-3 mr-3 font-medium">404</h1>
        <span className="flex items-center gap-2">
          Такая страница не найдена <Ban strokeWidth={1.5} />
        </span>
      </div>
      <Link href="/">
        <Button variant="outline" className="flex gap-1 items-center mt-1">
          На главную <ChevronRight size={18} />
        </Button>
      </Link>
    </div>
  );
}
