import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface Props {
  email: string;
  modalChange: (bool: boolean) => void;
  clearEmail: () => void;
}

export const VerifiedMail: React.FC<Props> = ({ email, modalChange, clearEmail }) => {
  const [error, isError] = useState(false);
  const [loading, isLoading] = useState(false);

  const onSubmit = async (code: string) => {
    isLoading(true);
    const resp = await signIn('credentials', {
      email: email,
      code,
      redirect: false,
    });

    if (resp?.ok) {
      clearEmail();
      modalChange(false);
      isLoading(false);
    } else {
      isError(true);
      isLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <h1 className="text-sm">
        <span className="text-neutral-400">Код отправлен на</span> {email}
        <InputOTP
          autoFocus
          disabled={loading}
          onChange={() => isError(false)}
          onComplete={(e) => onSubmit(e)}
          pattern={REGEXP_ONLY_DIGITS}
          maxLength={6}>
          <InputOTPGroup className="mt-3 mx-auto">
            {[...Array(3)].map((_, i) => (
              <InputOTPSlot
                className={cn('size-[46px] transition-all', error ? 'border-red-600' : '')}
                key={i}
                index={i}
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator className="mt-2" />
          <InputOTPGroup className="mt-3 mx-auto">
            {[...Array(3)].map((_, i) => (
              <InputOTPSlot
                className={cn('size-[46px] transition-all', error ? 'border-red-600' : '')}
                key={i + 3}
                index={i + 3}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </h1>
    </div>
  );
};
