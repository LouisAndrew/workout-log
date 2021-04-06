/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
/* eslint-disable curly */

// eslint-disable-next-line import/prefer-default-export
// export const isExerciseEqual = (a: CompleteExercise, b: CompleteExercise) => {
//   const { logs, ...restA } = a;
//   const { logs: logsB, ...restB } = b;

//   console.log({ logs, logsB });

//   return strictEqual(restA, restB);
// };

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
