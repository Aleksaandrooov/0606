import { authOptions } from '@/components/shared/auth-options';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({});
    }

    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email!,
      },
    });

    if (!user) {
      return NextResponse.json({});
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'Ошибка получения данных');
    return NextResponse.error();
  }
}
