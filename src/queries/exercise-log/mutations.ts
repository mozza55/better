import { AxiosError } from 'axios';
import { UseMutationOptions, useMutation } from 'react-query';
import { ExerciseLog, CreateExerciseLogVariables, UpdateExerciseLogVariables } from './types';
import { clientApi } from '../axios';

/**
 * 운동 기록 생성
 */
const useCreateExerciseLog = (options?: UseMutationOptions<ExerciseLog, AxiosError, CreateExerciseLogVariables>) => {
  return useMutation(
    ['createExerciseLog'],
    async (variables: CreateExerciseLogVariables) => {
      const { data } = await clientApi.post<ExerciseLog>('/exercise-log', {
        ...variables,
      });
      return data;
    },
    {
      ...options,
    },
  );
};

/**
 * 운동 기록 변경
 */
const useUpdateExerciseLog = (options?: UseMutationOptions<ExerciseLog, AxiosError, UpdateExerciseLogVariables>) => {
  return useMutation(
    ['updateExerciseLog'],
    async (variables: UpdateExerciseLogVariables) => {
      const { data } = await clientApi.patch<ExerciseLog>('/exercise-log', {
        ...variables,
      });
      return data;
    },
    {
      ...options,
    },
  );
};

export { useCreateExerciseLog, useUpdateExerciseLog };
