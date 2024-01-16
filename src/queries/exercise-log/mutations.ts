import { AxiosError } from 'axios';
import { ExerciseLog, CreateExerciseLogVariables, UpdateExerciseLogVariables } from './types';
import { clientApi } from '../axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

/**
 * 운동 기록 생성
 */
const useCreateExerciseLog = (options?: UseMutationOptions<ExerciseLog, AxiosError, CreateExerciseLogVariables>) => {
  return useMutation({
    mutationKey: ['createExerciseLog'],
    mutationFn: async (variables: CreateExerciseLogVariables) => {
      const { data } = await clientApi.post<ExerciseLog>('/exercise-log', {
        ...variables,
      });
      return data;
    },
    ...options,
  });
};

/**
 * 운동 기록 변경
 */
const useUpdateExerciseLog = (options?: UseMutationOptions<ExerciseLog, AxiosError, UpdateExerciseLogVariables>) => {
  return useMutation({
    mutationKey: ['updateExerciseLog'],
    mutationFn: async (variables: UpdateExerciseLogVariables) => {
      const { data } = await clientApi.patch<ExerciseLog>('/exercise-log', {
        ...variables,
      });
      return data;
    },
  });
};

export { useCreateExerciseLog, useUpdateExerciseLog };
