import { sortByOrder } from '@/helper/exercises-helper';
import { exerciseTableToType, exerciseTypeToTable } from '@/helper/helperToType';
import { CompleteExerciseNoLog } from '@/types/Exercise';
import { ExerciseTable } from '@/types/tables';
import { useStorage, TABLES } from './useStorage';

// eslint-disable-next-line import/prefer-default-export
export const useExercises = () => {
  const { read, update } = useStorage(TABLES.EXERCISES);

  const getMultipleExercises = async (ids: string[]) =>
    (await Promise.all(ids.map((id) => read(undefined, { 'exercise-id': id }))))
      .filter((data) => !!data && !data.error)
      .map((data) => (data as any).data[0])
      .map((e: any, index: number) => exerciseTableToType(e as ExerciseTable, index));

  const saveMultipleExercises = async (e: CompleteExerciseNoLog[]) => {
    await Promise.all(sortByOrder(e).map((exercise) => {
      const table = exerciseTypeToTable(exercise);
      return update(table, { 'exercise-id': exercise.id });
    }));
  };

  return { getMultipleExercises, saveMultipleExercises };
};
