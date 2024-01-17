import { ExerciseLog } from '@prisma/client';

export type CreateExerciseLogVariables = Pick<ExerciseLog, 'date' | 'condition' | 'record'>;
export type UpdateExerciseLogVariables = Pick<ExerciseLog, 'date' | 'condition' | 'record' | 'id'>;

export type GetExerciseLogVariables = {
  startDate?: string;
  endDate?: string;
};
