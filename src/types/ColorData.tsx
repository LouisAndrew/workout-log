import { Metric } from './Set';

/**
 * color data. e.g for bands
 */
export type ColorData = {
  color: string
  weight: number
  metric: Metric
  identifier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

// tailwindcolors
export const mockColorData: ColorData[] = [
  {
    color: '#10B981',
    weight: 40,
    metric: 'LBS',
    identifier: 1
  },
  {
    color: '#EF4444',
    weight: 30,
    metric: 'LBS',
    identifier: 2
  }
];
