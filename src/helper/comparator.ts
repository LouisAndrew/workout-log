/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
/* eslint-disable curly */

import { CompleteExercise } from '@/types/Exercise';
import { E, getIds, sortByOrder } from './exercises-helper';

// eslint-disable-next-line import/prefer-default-export
export const deepEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  )
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  const hasSameProperties = keysA.every(
    // @ts-ignore
    (key) => keysB.includes(key) && deepEqual(a[key], b[key])
  );

  return hasSameProperties;
};

export const isTemplateChanged = (a: E[], b: E[]) => {
  if (a.length !== b.length) return true;

  // check if all exercise with ids are there
  const idsA = getIds(a);
  const idsB = getIds(b);
  if (!idsA.every((id) => idsB.includes(id))) return true;

  // check if order is changed
  const ordersA = getIds(sortByOrder(a));
  const ordersB = getIds(sortByOrder(b));
  if (!ordersA.every((e, i) => e === ordersB[i])) return true;

  // TODO: check for tags.

  return false;
};

export const areLogsChanged = (a: CompleteExercise, b: CompleteExercise) => {
  const logsA = a.logs;
  const logsB = b.logs;

  if (logsA.length !== logsB.length) return true;
  return logsA.some((log, index) => !deepEqual(log, logsB[index]));
};
