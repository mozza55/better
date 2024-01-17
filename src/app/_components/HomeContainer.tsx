'use client';
import React, { useMemo, useState } from 'react';
import { Calender } from '@/components/Calender';
import dayjs from 'dayjs';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGetExerciseLogGroupByDate } from '@/queries/exercise-log/queries';
import { ExerciseLog } from '@prisma/client';

const HomeContainer = ({ initialData }: { initialData?: Record<string, ExerciseLog[]> }) => {
  const router = useRouter();
  const [focusedDay, setFocusedDay] = useState(new Date());
  const currentMonth = useMemo(() => dayjs(focusedDay).startOf('month'), [focusedDay]);
  const { data: groupedExerciseLog } = useGetExerciseLogGroupByDate(
    {
      startDate: currentMonth.format('YYYY-MM-DD'),
      endDate: currentMonth.endOf('month').format('YYYY-MM-DD'),
    },
    {
      initialData: initialData,
    },
  );

  const handleMonthChange = (date: Date) => {
    setFocusedDay(date);
  };

  const handleAddClick = () => {
    router.push(`/exercise-log?date=${dayjs(focusedDay).format('YYYY-MM-DD')}`);
  };

  return (
    <>
      <div className="px-4 py-4">
        <Calender
          onMonthChange={handleMonthChange}
          onSelect={(date: Date) => {
            setFocusedDay(date);
          }}
        />
      </div>
      <div className="w-full flex-grow  flex flex-col items-center justify-between gap-8 pt-6 pb-10 ">
        <div className="w-full flex flex-col px-6 gap-4">
          <div className="font-semibold">{dayjs(focusedDay).format('YYYY년 M월 D일')}</div>
          {groupedExerciseLog?.[dayjs(focusedDay).format('YYYY-MM-DD')]?.map((e) => (
            <div
              className="bg-white rounded-2xl px-4 py-4 shadow-lg border-solid border-[1px] border-gray-100"
              key={e.id}
            >
              <div style={{ whiteSpace: 'pre-wrap' }}>{e.record}</div>
            </div>
          ))}
        </div>
        <button className="bg-slate-100 rounded-full py-3 px-6 " onClick={handleAddClick}>
          운동기록 추가하기
        </button>
        {/* <button
          className="bg-gray-100 rounded-full py-2 px-4"
          onClick={async () => {
            await signOut({ callbackUrl: '/auth/signin' });
          }}
        >
          로그아웃
        </button> */}
      </div>
    </>
  );
};

export default HomeContainer;
