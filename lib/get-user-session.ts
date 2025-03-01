import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/components/shared/auth-options';
import { redirect } from 'next/navigation';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user!.email!,
    },
  });

  return user ?? redirect('/');
};
