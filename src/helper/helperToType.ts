import { WorkoutTemplate } from '@t/Workout';
import { CompleteExercise, CompleteExerciseNoLog } from '@t/Exercise';
import { ExerciseLogTableItem, ExerciseTable, TemplatesTable } from '@t/tables';
import { getIds, sortByOrder } from './exercises-helper';

export const exerciseTableToType = (
  e: ExerciseTable,
  order: number
): CompleteExerciseNoLog => {
  const { 'exercise-id': tableId, ...rest } = e;
  return {
    ...rest,
    id: tableId,
    tags: [],
    order,
  };
};

export const exerciseTypeToTable = (
  e: CompleteExerciseNoLog
): ExerciseTable => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, order, ...rest } = e;
  return {
    ...rest,
    'exercise-id': id,
    tags: [],
  };
};

export const templateTypeToTable = (t: WorkoutTemplate, userId: string): TemplatesTable => {
  const { templateId, exercises, ...rest } = t;
  return {
    ...rest,
    'template-id': `${userId}-${templateId}`,
    exercises: getIds(sortByOrder(exercises)),
  };
};

export const templateTableToType = (
  exercises: CompleteExerciseNoLog[],
  t: TemplatesTable,
  userId: string
): WorkoutTemplate => {
  const { 'template-id': tableId, ...rest } = t;
  return {
    ...rest,
    templateId: tableId.replace(`${userId}-`, ''),
    exercises,
  };
};

export const logTableToType = (l: ExerciseLogTableItem):CompleteExercise => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'template-id': templateId, 'exercise-id': tableId, logs, ...rest
  } = l;

  // const logsCasted = (logs as unknown) as ExerciseSetOrdered[];
  const logsParsed = JSON.parse(logs);
  const logsCasted = Object.keys(logsParsed).map((key) => ({ [key]: logs[parseInt(key, 10)] }));

  // @ts-ignore
  return {
    ...rest,
    id: tableId,
    // @ts-ignore
    logs: logsCasted
  };
};
