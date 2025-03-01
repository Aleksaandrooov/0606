import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  url: string;
  i: number;
  index: number;
}

export const Image: React.FC<Props> = ({ url, index, i }) => {
  return (
    <div
      className={cn(
        'flex items-center h-full opacity-0 sm:duration-500 transition-all',
        index == i ? 'opacity-100 translate-x-0' : '',
        i > index ? 'sm:translate-x-5' : i < index ? 'sm:-translate-x-5' : '',
      )}>
      <img
        className={cn('sm:max-h-[500px] sm:max-w-[600px] max-sm:px-5', index == i ? '' : 'hidden')}
        src={'/' + url}
        alt={url}
      />
    </div>
  );
};
