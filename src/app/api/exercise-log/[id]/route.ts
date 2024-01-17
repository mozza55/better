import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const exerciseLog = await prisma.exerciseLog.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return Response.json({ data: exerciseLog });
}
