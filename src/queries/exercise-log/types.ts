export type ExerciseLog = {
  id: string;
  date: Date;
  condition: string;
  record: string;
  userId: string;
};

export type CreateExerciseLogVariables = Omit<ExerciseLog, 'userId' | 'id'>;
export type UpdateExerciseLogVariables = Omit<ExerciseLog, 'userId'>;
