import { charactInter, itemsInter } from '@/app/services/dto/adminSearchDto';
import { FormInput } from '@/lib/formInpit/formInput';
import { TFormProductEditor } from '@/lib/formInpit/schema';
import { Check } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  setFocus: (b: boolean) => void;
  itemsSearch: string;
  focus: boolean;
  characs: charactInter;
  items: itemsInter;
  form: UseFormReturn<TFormProductEditor>;
}

export const ProductItemSearch: React.FC<Props> = ({
  setFocus,
  itemsSearch,
  characs,
  items,
  focus,
  form,
}) => {
  return (
    <div className="relative flex gap-3 items-center">
      <FormInput className="flex-1" name="item" onFocus={() => setFocus(true)} label="Предмет" />
      {characs.data.find((obj) => obj)?.subjectName === itemsSearch && <Check size={18} />}
      {focus && (
        <div className="flex flex-col absolute top-10 z-50 bg-zinc-950 w-full mt-1 rounded-md py-1 px-1 border">
          {items.data.map((obj, i) => (
            <div
              onClick={() => {
                form.setValue('item', obj.subjectName);
                setFocus(false);
              }}
              className="transition-all hover:bg-accent cursor-pointer py-1 px-2 rounded-md"
              key={i}>
              {obj.subjectName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
