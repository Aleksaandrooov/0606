import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { nameValueForm } from '../../dto';

interface Props {
  value: nameValueForm;
  changeValue: (value: nameValueForm) => void;
  clearCharact: () => void;
  changeProduct: number | undefined;
}

export const ProductSelectForm: React.FC<Props> = ({
  value,
  changeValue,
  clearCharact,
  changeProduct,
}) => {
  return (
    <Select
      disabled={typeof changeProduct == 'number'}
      value={value}
      onValueChange={(e: nameValueForm) => {
        changeValue(e);
        clearCharact();
      }}>
      <SelectTrigger className="w-min">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">По умолчанию</SelectItem>
        <SelectItem value="wb">С добавлением карточки</SelectItem>
      </SelectContent>
    </Select>
  );
};
