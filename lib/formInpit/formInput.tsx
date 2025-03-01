'use client';

import { useFormContext } from 'react-hook-form';
import { RequiredSymbol } from './required-symbol';
import { Input } from '@/components/ui/input';
import { ErrorText } from './errorText';
import { Check } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '../utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  focus?: boolean;
  defValue?: string;
  holder?: string;
}

const region = [
  { name: 'RU/KZ', format: '+7 (###) ### ## ##' },
  { name: 'BY', format: '+375 ## ### ## ##' },
];

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  focus,
  disabled,
  defValue,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [regionSelect, isSelect] = useState(
    defValue ? (defValue?.length !== 10 ? 'BY' : 'RU/KZ') : 'RU/KZ',
  );
  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const [focused, isFocused] = useState(false);

  useEffect(() => {
    if (name == 'number') {
      setValue(name, defValue);
    }
  }, []);

  const changeSelect = (e: string) => {
    isSelect(e);
    if (e === 'BY') {
      setValue(name, value.slice(0, 9));
    }
  };

  useEffect(() => {
    if (defValue) isSelect(defValue?.length !== 10 ? 'BY' : 'RU/KZ');
  }, [defValue]);

  return (
    <div className={className}>
      <div className="relative">
        {label && (
          <h1
            style={{
              top: value || focused ? '-10px' : '10px',
              left:
                name !== 'number'
                  ? value || focused
                    ? '10px'
                    : '5px'
                  : value || focused
                    ? '105px'
                    : '100px',
              color: focused ? 'white' : '',
            }}
            className="font-medium transition-all absolute text-sm pointer-events-none px-2 z-10 bg-zinc-950 rounded-md text-neutral-400">
            {label} {required && <RequiredSymbol />}
          </h1>
        )}
        {name !== 'number' ? (
          <Input
            onFocus={() => isFocused(true)}
            className="h-10 border pr-10"
            disabled={disabled}
            {...register(name)}
            onBlur={() => isFocused(false)}
            {...props}
          />
        ) : (
          <div className="flex gap-2">
            <Select value={regionSelect} onValueChange={(e) => changeSelect(e)}>
              <SelectTrigger className="w-min h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {region.map((obj, i) => (
                  <SelectItem key={i} value={obj.name}>
                    {obj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <PatternFormat
              onFocus={() => isFocused(true)}
              style={{ backgroundColor: '#09090b' }}
              format={region.find((obj) => obj.name === regionSelect)!.format}
              className="h-10 border text-sm rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full px-3 placeholder:text-gray-500"
              value={value}
              disabled={disabled}
              {...register(name)}
              onBlur={() => isFocused(false)}
              onValueChange={(values) => {
                const { value } = values;
                setValue(name, value);
              }}
            />
          </div>
        )}
        {focus && (
          <Check
            style={{ top: 10 }}
            size={18}
            className={cn(
              'z-20 absolute right-2 bg-zinc-950 text-neutral-400 transition-all opacity-0',
              !disabled && defValue === value && value && 'opacity-100',
            )}
          />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="h-4" />}
    </div>
  );
};
