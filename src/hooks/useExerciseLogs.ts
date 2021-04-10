import { sortByOrder } from '@/helper/exercises-helper';
import { ExerciseLogTableItem } from '@t/tables';

import { CompleteExercise } from '@/types/Exercise';
import { Workout } from '@/types/Workout';
import { useStorage, TABLES } from './useStorage';
import { useTemplate } from './useTemplates';
import { useExercises } from './useExercises';

// eslint-disable-next-line import/prefer-default-export
export const useExerciseLogs = () => {
  const { create, read, update } = useStorage(TABLES.LOGS);
  const { getTemplate } = useTemplate();
  const { getExercise } = useExercises();

  const createSingleLogDocument = async (data: ExerciseLogTableItem) =>
    create(data);

  const createLogs = async (templateId: string, userId: string) => {
    try {
      const template = await getTemplate(templateId, userId);
      if (!template) {
        return false;
      }

      const { exercises } = template;
      const date = new Date();
      const arr = await Promise.all(
        sortByOrder(exercises).map(({ id }) => {
          const tableItem: ExerciseLogTableItem = {
            'template-id': templateId,
            'exercise-id': id,
            logs: {},
            date: date.getTime(),
          };

          return createSingleLogDocument(tableItem);
        })
      );

      return arr.every((bool) => bool) ? date : false;
    } catch (e) {
      return false;
    }
  };

  const getLogs = async (templateId: string, timestamp: number) => {
    try {
      const { data }: any = await read(undefined, {
        'template-id': templateId,
        date: timestamp,
      });

      const exercises = await Promise.all(
        (data as ExerciseLogTableItem[])
          .map(async (dt, index) => {
            const exercise = await getExercise(dt['exercise-id'], index);
            console.log({ exercise });
            if (!exercise) {
              return null;
            }

            const logsData = JSON.parse(dt.logs);
            const logs = Object.keys(logsData).map((key) => logsData[key]);
            console.log({ logs, logsData });

            return {
              ...exercise,
              logs
            };
          })
          .filter((e) => !!e)
      );
      console.log(exercises);

      return exercises as CompleteExercise[];
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const saveLogs = async (
    workout: Workout,
    isTemplateUpdated: boolean,
    userId: string
  ) => {
    if (!isTemplateUpdated) {
      const { exercises, date, templateId } = workout;
      const exerciseTables: ExerciseLogTableItem[] = exercises.map((e) => {
        const { id, logs } = e;
        return {
          logs: JSON.stringify(
            logs
              .map((l, i) => ({ ...l, index: i }))
              .reduce((a, b) => {
                const { index, ...rest } = b;
                return { ...a, [index]: rest };
              }, {})
          ),
          'exercise-id': id,
          'template-id': `${userId}-${templateId}`,
          date: date.getTime(),
        };
      });

      const req = await Promise.all(
        exerciseTables.map((et) =>
          update(
            et,
            {
              'exercise-id': et['exercise-id'],
              date: et.date,
            },
            true
          ))
      );
      return req.every((value) => value);
    }
    return false;
  };

  return { createLogs, getLogs, saveLogs };
};
