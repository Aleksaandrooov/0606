import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { deliveryOrderType, orderByType } from './order-filter';

interface Props {
  setDelivery: (e: deliveryOrderType) => void;
  setOrderBy: (e: orderByType) => void;
  delivery: deliveryOrderType;
  orderBy: orderByType;
}

export const OrderSelect: React.FC<Props> = ({ delivery, setDelivery, setOrderBy, orderBy }) => {
  return (
    <div className="flex gap-2 mt-2">
      <Select
        onValueChange={(e: deliveryOrderType) => setDelivery(e)}
        value={delivery}
        defaultValue="def">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="def">Доставка</SelectItem>
          <SelectItem value="delivery">Курьером</SelectItem>
          <SelectItem value="pointOffice">Пункт выдачи</SelectItem>
          <SelectItem value="pointPostamat">Постамат</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(e: orderByType) => setOrderBy(e)} value={orderBy} defaultValue="def">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Новые</SelectItem>
          <SelectItem value="desc">Старые</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
