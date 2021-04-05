import { parseInt } from 'lodash';

export type Range = {
  start: number;
  end?: number;
};

export const stringToRange = (str: string): Range => {
  if (!str.includes('-')) {
    return { start: parseInt(str) };
  }

  const arr = str
    .split('-')
    .map((s) => parseInt(s))
    .filter((n) => !Number.isNaN(n));

  return { start: arr[0], end: arr[1] };
};

export const rangeToString = (r: Range): string => {
  const { start, end } = r;
  if (!end) {
    return start.toString();
  }

  return `${start}-${end}`;
};
