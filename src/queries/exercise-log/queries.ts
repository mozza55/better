import { clientApi } from '../axios';
import { AxiosError } from 'axios';
import { GetExerciseLogVariables } from './types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ExerciseLog } from '@prisma/client';
import { QueryOptions } from '../types';

/**
 * 운동 기록 조회
 */
const useGetExerciseLog = <TData = ExerciseLog[]>(
  exerciseLogId: string,
  options?: QueryOptions<ExerciseLog[], AxiosError, TData>,
) => {
  return useQuery<ExerciseLog[], AxiosError, TData>({
    queryKey: ['getExerciseLog', exerciseLogId],
    queryFn: async () => {
      const { data } = await clientApi.get<ExerciseLog[]>(`/exercise-log/${exerciseLogId}`);
      return data;
    },
    ...options,
  });
};

/**
 * 운동 기록 목록 조회
 */
const useGetExerciseLogAll = <TData = ExerciseLog[]>(
  variables: GetExerciseLogVariables,
  options?: QueryOptions<ExerciseLog[], AxiosError, TData>,
) => {
  const queryKeys = [variables.startDate, variables.endDate];
  return useQuery<ExerciseLog[], AxiosError, TData>({
    queryKey: ['getExerciseLogAll', ...queryKeys],
    queryFn: async () => {
      const params = {
        ...variables,
      };
      const { data } = await clientApi.get<{ data: ExerciseLog[] }>(`/exercise-log`, { params });
      return data.data;
    },
    ...options,
  });
};

/**
 * 일자별 운동 기록 목록 조회
 */
const useGetExerciseLogGroupByDate = <TData = Record<string, ExerciseLog[]>>(
  variables: GetExerciseLogVariables,
  options?: QueryOptions<Record<string, ExerciseLog[]>, AxiosError, TData>,
) => {
  const queryKeys = [variables.startDate, variables.endDate];
  return useQuery<Record<string, ExerciseLog[]>, AxiosError, TData>({
    queryKey: ['getExerciseLogGroupByDate', ...queryKeys],
    queryFn: async () => {
      const params = {
        ...variables,
      };
      const { data: res } = await clientApi.get<{ data: ExerciseLog[] }>(`/exercise-log`, { params });

      const groupedData: Record<string, ExerciseLog[]> = {};
      res.data.forEach((item) => {
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
    },
    ...options,
  });
};

export { useGetExerciseLog, useGetExerciseLogAll, useGetExerciseLogGroupByDate };
