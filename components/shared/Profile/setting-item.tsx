import { FormInput } from '@/lib/formInpit/formInput';
import {
  TFromSettingName,
  TFromSettingNumber,
  TFromSettingPatronymic,
  TFromSettingSurname,
} from '@/lib/formInpit/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { settingProfile } from '@/app/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { nameType } from './dto';

interface Props {
  label: string;
  name: nameType;
  type: ZodType<
    TFromSettingName | TFromSettingNumber | TFromSettingPatronymic | TFromSettingSurname
  >;
  defaultValue: string;
  email: string;
  clear: boolean;
  router: AppRouterInstance;
}

export const SettingItem: React.FC<Props> = ({
  name,
  defaultValue,
  label,
  type,
  clear,
  email,
  router,
}) => {
  const [disabled, isDisabled] = useState(false);
  const form = useForm({
    resolver: zodResolver(type),
    defaultValues: {
      name: defaultValue || '',
      surname: defaultValue || '',
      patronymic: defaultValue || '',
      number: defaultValue || '',
    },
  });

  const onSubmit = (data: {
    name: string;
    surname: string;
    patronymic: string;
    number: string;
  }) => {
    if (defaultValue !== data[name]) {
      isDisabled(true);
      settingProfile(name, data[name], email).then(() => isDisabled(false));
      router.refresh();
    }
  };

  const onSubmitPrevent = () => {
    event?.preventDefault();
    (document.activeElement as HTMLElement).blur();
  };

  useEffect(() => {
    if (clear) {
      form.reset({ name: '', surname: '', patronymic: '', number: '' });
    }
  }, [clear]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmitPrevent} onBlur={form.handleSubmit(onSubmit)}>
        <FormInput
          disabled={disabled}
          focus={true}
          defValue={defaultValue}
          name={name}
          label={label}
        />
      </form>
    </FormProvider>
  );
};
