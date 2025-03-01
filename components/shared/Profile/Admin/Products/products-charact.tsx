import { charactInter } from '@/app/services/dto/adminSearchDto';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface Props {
  itemsSearch: string;
  characs: charactInter;
  i: number;
  changeCharact: (t: 'name' | 'type', e: string, i: number, id?: number) => void;
  charact: { name: string; id?: number; type: string }[];
  formSelect: boolean;
}

export const ProductsCharact: React.FC<Props> = ({
  itemsSearch,
  characs,
  i,
  changeCharact,
  charact,
  formSelect,
}) => {
  const value = characs.data.find(
    (obj) => obj.charcID === charact.find((_, index) => i === index)?.id,
  );

  const disabled = characs.data.find((obj) => obj)?.subjectName !== itemsSearch && formSelect;

  return (
    <div className="flex gap-2">
      {formSelect ? (
        <Select
          value={String(value?.charcID)}
          disabled={disabled}
          onValueChange={(e: string) =>
            changeCharact(
              'name',
              characs.data.find((obj) => obj.charcID === Number(e))?.name || '',
              i,
              Number(e),
            )
          }>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {characs.data.map((obj) => (
              <SelectItem key={obj.charcID} value={String(obj.charcID)}>
                {obj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          value={charact.find((_, index) => i === index)?.name || ''}
          placeholder="Параметр"
          onChange={(e) => changeCharact('name', e.target.value, i)}
        />
      )}
      <div className="w-full flex gap-2 items-end">
        <Input
          value={charact.find((_, index) => i === index)?.type || ''}
          disabled={disabled}
          type={value?.charcType === 4 ? 'number' : undefined}
          placeholder="Свойство"
          onChange={(e) => changeCharact('type', e.target.value, i)}
        />
        {value?.unitName && <span className="text-neutral-400">{value.unitName}</span>}
      </div>
    </div>
  );
};
