import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) {
    return new Response('error: user id가 존재하지 않습니다', { status: 400 });
  }
  const data = await req.json();

  const res = await prisma.exerciseLog.create({
    data: {
      ...data,
      userId: id,
    },
  });

  return Response.json({ data: res });
}
