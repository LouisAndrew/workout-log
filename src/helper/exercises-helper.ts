import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';

export type E = CompleteExercise | CompleteExerciseNoLog;
export const sortByOrder = (exercises: E[]) =>
  [...exercises].sort((e1, e2) => e1.order - e2.order);

export const getIds = (exercises: E[]) => exercises.map((e) => e.id);
