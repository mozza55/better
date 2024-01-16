'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import IconArrow from '@/assets/icons/icon_arrow.svg';
import { useRouter } from 'next/navigation';
import Radio from '@/components/Radio';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { isEmpty } from '@/utils/commonUtils';
import 'dayjs/locale/ko';
import TextareaAutosize from 'react-textarea-autosize';
import { useCreateExerciseLog } from '@/queries/exercise-log/mutations';

dayjs.locale('ko');

type Props = {
  params: {
    date?: Date;
  };
};

const conditions = [
  { value: 'best', label: '최상' },
  { value: 'good', label: '좋음' },
  { value: 'average', label: '보통' },
  { value: 'poor', label: '나쁨' },
  { value: 'worst', label: '최악' },
];

const Page = (props: Props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    date: props.params.date || new Date(),
    condition: '',
    record: '',
  });
  const isValidForm = useMemo(() => form.date && !isEmpty(form.condition) && !isEmpty(form.record), [form]);
  const { mutate: createExerciseLog, isPending } = useCreateExerciseLog();

  const handleSaveClick = () => {
    if (isValidForm) {
      createExerciseLog(
        {
          ...form,
        },
        {
          onSuccess: () => {
            router.push('/');
          },
        },
      );
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(
      produce((draft) => {
        draft.condition = e.target.value;
      }),
    );
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm(
      produce((draft) => {
        draft.record = e.target.value;
      }),
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col">
      <nav className="sticky top-0 flex justify-between items-center p-4 bg-slate-50">
        <button className="cursor-pointer w-8" onClick={handleBackClick}>
          <IconArrow stroke="#333333" />
        </button>
        <div>운동 기록</div>
        <button className="cursor-pointer w-8 disabled:text-gray-400" onClick={handleSaveClick} disabled={!isValidForm}>
          저장
        </button>
      </nav>
      <form className="flex-grow flex flex-col p-5 gap-5">
        <div className="flex flex-col gap-2 w-fit">
          <label>일자</label>
          <input type="text" value={dayjs(form.date).format('YYYY.MM.DD dddd')} disabled />
        </div>
        <div className="flex flex-col gap-2">
          <label>컨디션</label>
          <Radio.Group value={form.condition} onChange={handleRadioChange}>
            {conditions.map((e) => (
              <Radio.Button key={e.value} value={e.value}>
                {e.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="flex-grow flex flex-col gap-2">
          <label htmlFor="textarea">운동</label>
          <TextareaAutosize
            className="h-max"
            minRows={5}
            id="textarea"
            placeholder="오늘의 운동을 기록해보세요!"
            onChange={handleChangeTextArea}
          />
        </div>
      </form>
    </div>
  );
};
export default Page;
