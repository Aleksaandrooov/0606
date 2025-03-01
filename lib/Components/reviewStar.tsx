import { Star, StarHalf } from 'lucide-react';
import React from 'react';

interface Props {
  grade?: number;
  className?: string;
}

export const ReviewStar: React.FC<Props> = ({ grade, className }) => {
  return (
    <div className="flex gap-1">
      {grade &&
        [...Array(Math.ceil(grade!))].map((_, i) => (
          <div key={i}>
            {/*className={i + 0.9 < grade ? '' : i + 0.4 < grade ? 'w-2' : ''}*/}
            {i + 0.9 < grade ? (
              <Star fill="orange" className={className} color="orange" strokeWidth={1.5} />
            ) : (
              <StarHalf className={className} color="orange" strokeWidth={1.5} />
            )}
          </div>
        ))}
    </div>
  );
};
