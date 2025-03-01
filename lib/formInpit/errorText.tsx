import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return (
    <p style={{ color: '#ef4444' }} className={cn('text-sm', className)}>
      {text}
    </p>
  );
};
