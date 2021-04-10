import { sortByOrder } from '@/helper/exercises-helper';
import {
  exerciseTableToType,
  exerciseTypeToTable,
} from '@/helper/helperToType';
import { CompleteExerciseNoLog } from '@/types/Exercise';
import { ExerciseTable } from '@/types/tables';
import { useStorage, TABLES } from './useStorage';

// eslint-disable-next-line import/prefer-default-export
export const useExercises = () => {
  const { read, update } = useStorage(TABLES.EXERCISES);

  const getMultipleExercises = async (ids: string[]) =>
    Promise.all(ids.map(async (id, index) => {
      const data = await read(undefined, { 'exercise-id': id });
      if (!data || data.error) {
        return null;
      }

      const s = data.data[0];
      return {
        ...s,
        id: s['exercise-id'],
        order: index
      };
    }));

  const saveMultipleExercises = async (e: CompleteExerciseNoLog[]) => {
    await Promise.all(
      sortByOrder(e).map((exercise) => {
        const table = exerciseTypeToTable(exercise);
        return update(table, { 'exercise-id': exercise.id });
      })
    );
  };

  const getExercise = async (exerciseId: string, order: number) => {
    const e = await read(undefined, { 'exercise-id': exerciseId });
    if (!e) {
      return null;
    }
    return exerciseTableToType(e.data[0] as ExerciseTable, order);
  };

  return { getMultipleExercises, saveMultipleExercises, getExercise };
};
