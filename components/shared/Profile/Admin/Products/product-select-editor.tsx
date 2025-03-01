import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Characteristics, Product } from '@prisma/client';
import React from 'react';
import { formReset } from './form-reset';
import { UseFormReturn } from 'react-hook-form';
import { TFormProductEditor } from '@/lib/formInpit/schema';
import { charactInter } from '../../dto';

interface Props {
  product: (Product & { characteristics: Characteristics[] })[];
  changeProduct: (id: number | undefined) => void;
  form: UseFormReturn<TFormProductEditor>;
  changeCharact: (t: charactInter[]) => void;
  productValue: number | undefined;
  setImage: (s: string[]) => void;
}

export const ProductSelectEditor: React.FC<Props> = ({
  product,
  productValue,
  changeProduct,
  form,
  changeCharact,
  setImage,
}) => {
  const change = (e: string) => {
    if (e === 'def') {
      formReset(form);
      setImage([]);
      changeCharact([]);
      changeProduct(undefined);
    } else {
      const item = product.find((obj) => obj.id === Number(e))!;
      changeProduct(Number(e));
      setImage(item.image);
      form.reset({
        title: item.title,
        item: '',
        article: item.article || '',
        price: String(item.price),
        description: item.description || '',
        quntity: String(item.quntity),
      });
      const charact = item.characteristics.map((obj) => {
        const name = obj.title;
        const type = obj.text;
        return {
          name,
          type,
        };
      });
      changeCharact(charact);
    }
  };

  return (
    <Select
      value={String(productValue ?? 'def')}
      onValueChange={(e) => change(e)}
      defaultValue="def">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="def">Редактирование товара</SelectItem>
        {product.map((obj) => (
          <SelectItem value={String(obj.id)} key={obj.id}>
            {obj.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
