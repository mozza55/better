'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import IconArrow from '@/assets/icons/icon_arrow.svg';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleSignIn = () => {
    signIn('kakao', { redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col">
      <nav className="p-5">
        <div className="cursor-pointer w-8" onClick={handleBackClick}>
          <IconArrow stroke="#333333" />
        </div>
      </nav>
      <div className="flex flex-col p-5 gap-6">
        <h1 className="text-4xl font-semibold">
          Better는 로그인 후 <br />
          이용할 수 있어요
        </h1>
        <div className="text-xl font-semibold">
          간편하게 SNS 로그인하고 <br />
          운동 기록을 남겨보세요!
        </div>
        <div>
          <div className="mt-16">
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center rounded-md border-[1px] border-black-100 bg-white px-6 py-4"
            >
              카카오 계정으로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
