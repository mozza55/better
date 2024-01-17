import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/options';
import { NextRequest } from 'next/server';
import { paramsToObject } from '@/utils/commonUtils';
import dayjs from 'dayjs';

type GetParam = {
  startDate?: string;
  endDate?: string;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) {
    return new Response('error: user id가 존재하지 않습니다', { status: 400 });
  }
  const params = paramsToObject(req.nextUrl.searchParams) as GetParam;

  const exerciseLog = await prisma.exerciseLog.findMany({
    where: {
      userId: Number(id),
      date: {
        gte: params.startDate && dayjs(params.startDate).toDate(),
        lte: params.endDate && dayjs(params.endDate).endOf('date').toDate(),
      },
    },
  });

  return Response.json({ data: exerciseLog });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) {
    return new Response('error: user id가 존재하지 않습니다', { status: 400 });
  }
  const data = await req.json();

  const exerciseLog = await prisma.exerciseLog.create({
    data: {
      ...data,
      userId: id,
    },
  });

  return Response.json({ data: exerciseLog });
}
