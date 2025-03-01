import { changeStatusOrder, changeTrackOrder } from '@/app/admin';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderStatus } from '@/lib/Array/order-status';
import { cn } from '@/lib/utils';
import { Status } from '@prisma/client';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  id: number;
  status: Status;
  track: string | null;
}

export const OrderItemSelect: React.FC<Props> = ({ id, status, track }) => {
  const [value, setValue] = useState(track ? track : '');
  const router = useRouter();
  const changeStatus = async (s: Status) => {
    await changeStatusOrder(id, s).then(() => router.refresh());
  };
  const onSubmit = async () => {
    event?.preventDefault();
    (document.activeElement as HTMLElement).blur();
    if (track !== value) {
      await changeTrackOrder(id, value).then(() => router.refresh());
    }
  };

  return (
    <div className="ml-auto items-center gap-2 flex max-md:justify-between max-md:w-full">
      <div className="flex items-center max-md:flex-row-reverse gap-2">
        <Check
          size={18}
          className={cn('transition-all opacity-0', value === track && value ? 'opacity-100' : '')}
        />
        <form onSubmit={onSubmit} onBlur={onSubmit} className="w-full">
          <Input placeholder="Трек-код" value={value} onChange={(e) => setValue(e.target.value)} />
          <Input className="hidden" type="submit" />
        </form>
      </div>
      <Select onValueChange={(s: Status) => changeStatus(s)} value={status}>
        <SelectTrigger className="w-min">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {orderStatus.map((obj, i) => (
            <SelectItem key={i} value={obj.name}>
              {obj.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
