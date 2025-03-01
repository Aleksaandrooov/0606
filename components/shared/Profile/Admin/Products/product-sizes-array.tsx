import { Input } from '@/components/ui/input';
import React from 'react';

export type sizeType = 'techSize' | 'wbSize' | 'price';

interface Props {
  changeSize: (t: sizeType, s: string, i: number) => void;
  i: number;
}

export const ProductSizesArray: React.FC<Props> = ({ changeSize, i }) => {
  return (
    <div className="flex gap-2">
      <Input onChange={(e) => changeSize('techSize', e.target.value, i)} placeholder="Размер (S)" />
      <Input
        onChange={(e) => changeSize('wbSize', e.target.value, i)}
        placeholder="Российский размер"
      />
      <Input onChange={(e) => changeSize('price', e.target.value, i)} placeholder="Цена" />
    </div>
  );
};
