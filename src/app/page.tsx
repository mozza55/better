import IconLogo from '@/assets/icons/icon_logo.svg';
import dayjs from 'dayjs';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]/options';
import HomeContainer from './_components/HomeContainer';
import { ExerciseLog } from '@prisma/client';

async function getExerciseLog() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return;
  }
  const startOfMonth = dayjs().startOf('month').toDate();
  const endOfMonth = dayjs().endOf('month').toDate();

  const res = await prisma.exerciseLog.findMany({
    where: {
      userId: Number(session.user.id),
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  const groupedData: Record<string, ExerciseLog[]> = {};
  res.forEach((item) => {
    const formattedDate = dayjs(item.date).format('YYYY-MM-DD');

    // 그룹화된 객체에 해당 날짜의 배열이 없다면 빈 배열로 초기화
    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = [];
    }

    // 해당 날짜의 배열에 데이터 추가
    groupedData[formattedDate].push(item);
  });

  // 그룹 내에서 시간 오름차순으로 정렬
  Object.keys(groupedData).forEach((date) => {
    groupedData[date].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return groupedData;
}

export default async function Page() {
  const data = await getExerciseLog();

  return (
    <main className="flex flex-col mh-screen">
      <div>
        <div className="w-52 py-4 px-3">
          <IconLogo />
        </div>
      </div>
      <HomeContainer initialData={data} />
    </main>
  );
}
