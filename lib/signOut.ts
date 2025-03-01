import { signOut } from 'next-auth/react';

export const singOut = async (callback?: string) => {
  if (callback) {
    await signOut({ callbackUrl: callback });
  } else {
    await signOut({ redirect: false });
  }
};
